import React, { useState, useEffect } from 'react';
import SubjectSelector from '@/components/SubjectSelector';
import StyleSelector from '@/components/StyleSelector';
import ManualInput from '@/components/ManualInput';
import RandomButton from '@/components/RandomButton';
import ActionButtons from '@/components/ActionButtons';
import PromptDisplay from '@/components/PromptDisplay';
import subjectsData from '@/assets/subjects.json';
import promptsData from '@/assets/prompts.json';
import './style.css';

function App() {
  const [subject, setSubject] = useState('');
  const [styleName, setStyleName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [copyLabel, setCopyLabel] = useState('Copy');
  const [editablePrompt, setEditablePrompt] = useState('');

  const handleRandom = () => {
    setIsAnimating(true);

    // Simple animation simulation
    let count = 0;
    const maxCount = 10;
    const interval = setInterval(() => {
      // Pick random subject
      const randomGroup = subjectsData[Math.floor(Math.random() * subjectsData.length)];
      const randomSubject = randomGroup.items[Math.floor(Math.random() * randomGroup.items.length)];

      // Pick random style
      const randomStyleObj = promptsData[Math.floor(Math.random() * promptsData.length)];

      setSubject(randomSubject);
      setStyleName(randomStyleObj.style);

      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 100);
  };

  const getFullPrompt = () => {
    const selectedStyleObj = promptsData.find(p => p.style === styleName);
    const stylePrompt = selectedStyleObj ? selectedStyleObj.prompt : '';

    const parts = [];
    if (subject) parts.push(subject);
    if (stylePrompt) parts.push(stylePrompt);

    return parts.join(', ');
  };

  // Update editable prompt when subject or style changes
  useEffect(() => {
    setEditablePrompt(getFullPrompt());
  }, [subject, styleName]);

  const handleCopy = async () => {
    const prompt = editablePrompt;
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFill = async () => {
    const prompt = editablePrompt;
    if (!prompt) return;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        await chrome.tabs.sendMessage(tab.id, {
          type: 'FILL_PROMPT',
          payload: prompt
        });
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      // Could show an error toast here if needed
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen font-sans">
      <h1 className="text-xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500">
        AI Draw Helper
      </h1>

      <div className="space-y-3">
        <RandomButton
          onRandom={handleRandom}
          isAnimating={isAnimating}
        />

        <PromptDisplay
          value={editablePrompt}
          onChange={setEditablePrompt}
        />

        <ActionButtons
          onCopy={handleCopy}
          onFill={handleFill}
          copyLabel={copyLabel}
        />

        <div className="border-t border-gray-200 my-3 pt-3">
          <SubjectSelector
            selectedSubject={subject}
            onSelect={setSubject}
          />

          <ManualInput
            value={subject}
            onChange={setSubject}
          />

          <StyleSelector
            selectedStyle={styleName}
            onSelect={setStyleName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
