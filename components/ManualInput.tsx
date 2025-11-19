import React from 'react';

interface ManualInputProps {
    value: string;
    onChange: (value: string) => void;
}

const ManualInput: React.FC<ManualInputProps> = ({ value, onChange }) => {
    return (
        <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Custom Subject</h3>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your own subject..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
        </div>
    );
};

export default ManualInput;
