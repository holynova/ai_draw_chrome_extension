import React, { useState, useMemo, useRef } from 'react';
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
    const groupRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    const handleGroupClick = (groupName: string) => {
        setActiveGroup(groupName);
        // Auto-scroll to center
        setTimeout(() => {
            const buttonElement = groupRefs.current[groupName];
            if (buttonElement) {
                buttonElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }, 0);
    };

    const currentGroupItems = groupedStyles[activeGroup] || [];

    return (
        <div className="mb-3">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Style</h3>
            <div className="flex overflow-x-auto pb-2 mb-2 gap-2">
                {groupNames.map((group) => (
                    <button
                        key={group}
                        ref={(el) => { groupRefs.current[group] = el; }}
                        onClick={() => handleGroupClick(group)}
                        className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${activeGroup === group
                                ? 'bg-rose-400 text-white'
                                : 'bg-amber-100 text-gray-700 hover:bg-amber-200'
                            }`}
                    >
                        {group}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                {currentGroupItems.map((item) => (
                    <button
                        key={item.style}
                        onClick={() => onSelect(item.style)}
                        className={`px-2 py-2 text-xs rounded-md text-left border transition-all truncate ${selectedStyle === item.style
                                ? 'border-rose-300 bg-rose-50 text-rose-700 shadow-sm'
                                : 'border-amber-200 hover:border-amber-300 hover:bg-amber-50'
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
