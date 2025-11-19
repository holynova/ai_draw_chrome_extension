import React from 'react';
import { Copy, Send } from 'lucide-react';

interface ActionButtonsProps {
    onCopy: () => void;
    onFill: () => void;
    copyLabel?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCopy, onFill, copyLabel = 'Copy' }) => {
    return (
        <div className="flex gap-3 mt-4">
            <button
                onClick={onCopy}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors font-medium"
            >
                <Copy size={18} />
                {copyLabel}
            </button>
            <button
                onClick={onFill}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
            >
                <Send size={18} />
                Fill to AI
            </button>
        </div>
    );
};

export default ActionButtons;
