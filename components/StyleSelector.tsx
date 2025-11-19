import React, { useState, useMemo } from 'react';
import promptsData from '@/assets/prompts.json';

interface StyleSelectorProps {
    onSelect: (style: string) => void;
    selectedStyle: string;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ onSelect, selectedStyle }) => {
    // Group styles by 'group' property
    const groupedStyles = useMemo(() => {
        const groups: Record<string, typeof promptsData> = {};
        promptsData.forEach(item => {
            if (!groups[item.group]) {
                groups[item.group] = [];
            }
            groups[item.group].push(item);
        });
        return groups;
    }, []);

    const groupNames = Object.keys(groupedStyles);
    const [activeGroup, setActiveGroup] = useState(groupNames[0]);

    const currentGroupItems = groupedStyles[activeGroup] || [];

    return (
        <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Style</h3>
            <div className="flex overflow-x-auto pb-2 mb-2 gap-2 scrollbar-thin scrollbar-thumb-gray-300">
                {groupNames.map((group) => (
                    <button
                        key={group}
                        onClick={() => setActiveGroup(group)}
                        className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${activeGroup === group
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {group}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                {currentGroupItems.map((item) => (
                    <button
                        key={item.style}
                        onClick={() => onSelect(item.style)} // Using style name as identifier
                        className={`px-2 py-2 text-xs rounded-md text-left border transition-all truncate ${selectedStyle === item.style
                                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        title={item.prompt}
                    >
                        {item.style}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StyleSelector;
