import React, { useState, useRef } from 'react';
import subjectsData from '@/assets/subjects.json';

interface SubjectSelectorProps {
    onSelect: (subject: string) => void;
    selectedSubject: string;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onSelect, selectedSubject }) => {
    const [activeGroup, setActiveGroup] = useState(subjectsData[0].group);
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

    const currentGroupItems = subjectsData.find(g => g.group === activeGroup)?.items || [];

    return (
        <div className="mb-3">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Subject</h3>
            <div className="flex overflow-x-auto pb-2 mb-2 gap-2">
                {subjectsData.map((group) => (
                    <button
                        key={group.group}
                        ref={(el) => (groupRefs.current[group.group] = el)}
                        onClick={() => handleGroupClick(group.group)}
                        className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${activeGroup === group.group
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {group.group}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                {currentGroupItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => onSelect(item)}
                        className={`px-2 py-2 text-xs rounded-md text-center border transition-all ${selectedSubject === item
                                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SubjectSelector;
