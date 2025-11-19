export default defineContentScript({
  matches: ['*://gemini.google.com/*', '*://chatgpt.com/*', '*://chat.openai.com/*'],
  main() {
    console.log('AI Draw Helper content script loaded');

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'FILL_PROMPT') {
        const prompt = message.payload;
        fillPrompt(prompt);
      }
    });

    function fillPrompt(text: string) {
      // Try to find the input area. Selectors might need updates as sites change.

      // Gemini
      const geminiInput = document.querySelector('div[contenteditable="true"].rich-textarea');

      // ChatGPT
      const chatgptInput = document.querySelector('#prompt-textarea');

      const target = geminiInput || chatgptInput;

      if (target) {
        if (target instanceof HTMLElement) {
          target.focus();

          // For contenteditable (Gemini)
          if (target.getAttribute('contenteditable') === 'true') {
            // This is a bit hacky but often necessary for rich text editors
            document.execCommand('insertText', false, text);
          } else if (target instanceof HTMLTextAreaElement) {
            // For textarea (ChatGPT)
            target.value = text;
            target.dispatchEvent(new Event('input', { bubbles: true }));
          } else {
            // Fallback for other types
            (target as any).value = text;
            target.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      } else {
        console.warn('AI Draw Helper: Could not find input field');
        alert('Could not find input field. Please click on the input box and try again.');
      }
    }
  },
});
