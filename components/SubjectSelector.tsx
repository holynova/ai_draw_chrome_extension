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
                        ref={(el) => { groupRefs.current[group.group] = el; }}
                        onClick={() => handleGroupClick(group.group)}
                        className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${activeGroup === group.group
                                ? 'bg-emerald-500 text-white'
                                : 'bg-sky-100 text-gray-700 hover:bg-sky-200'
                            }`}
                    >
                        {group.group}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
                {currentGroupItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => onSelect(item)}
                        className={`px-2 py-2 text-xs rounded-md text-center border transition-all ${selectedSubject === item
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm'
                                : 'border-sky-200 hover:border-sky-300 hover:bg-sky-50'
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
