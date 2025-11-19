import React from 'react';

interface PromptDisplayProps {
    value: string;
    onChange: (value: string) => void;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ value, onChange }) => {
    return (
        <div className="mb-3">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Generated Prompt</h3>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Select subject and style to generate prompt..."
                className="w-full p-3 text-xs text-gray-600 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] max-h-[120px] resize-none"
            />
        </div>
    );
};

export default PromptDisplay;
