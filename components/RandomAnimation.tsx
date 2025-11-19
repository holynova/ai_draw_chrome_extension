import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RandomAnimationProps {
    items: string[];
    isAnimating: boolean;
    finalIndex: number;
    label: string;
}

const RandomAnimation: React.FC<RandomAnimationProps> = ({ items, isAnimating, finalIndex, label }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [itemOffsets, setItemOffsets] = useState<number[]>([]);

    // Create a long array by repeating items multiple times for smooth scrolling
    const extendedItems = [...items, ...items, ...items, ...items, ...items];

    // Calculate item positions after render
    useEffect(() => {
        if (containerRef.current) {
            const itemElements = containerRef.current.querySelectorAll('.scroll-item');
            const offsets: number[] = [];
            itemElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const containerRect = containerRef.current!.getBoundingClientRect();
                offsets.push(el.getBoundingClientRect().left - containerRect.left);
            });
            setItemOffsets(offsets);
        }
    }, [extendedItems.length]);

    // Calculate the target position
    // We want the item at (items.length * 2 + finalIndex) to be centered
    const targetItemIndex = items.length * 2 + finalIndex;
    const containerWidth = containerRef.current?.offsetWidth || 400;
    const targetOffset = itemOffsets[targetItemIndex] || 0;
    const centerOffset = containerWidth / 2;

    // Start position (centered on middle of extended array)
    const startItemIndex = items.length * 2;
    const startOffset = itemOffsets[startItemIndex] || 0;

    return (
        <div className="mb-3">
            <div className="text-xs font-semibold text-gray-600 mb-1">{label}</div>
            <div className="relative h-16 bg-gradient-to-r from-sky-100 via-white to-sky-100 rounded-lg overflow-hidden border-2 border-sky-200">
                {/* Center red line indicator */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 z-10 transform -translate-x-1/2"></div>

                {/* Scrolling items */}
                <div ref={containerRef} className="relative h-full overflow-hidden">
                    <motion.div
                        className="flex gap-2 h-full items-center absolute"
                        initial={{ x: centerOffset - startOffset }}
                        animate={{
                            x: centerOffset - targetOffset,
                        }}
                        transition={{
                            duration: isAnimating ? 3 : 0,
                            ease: [0.25, 0.1, 0.25, 1.0],
                        }}
                    >
                        {extendedItems.map((item, index) => (
                            <div
                                key={`${item}-${index}`}
                                className="scroll-item flex-shrink-0 bg-white rounded-md shadow-sm border border-gray-200 px-4 h-12 flex items-center justify-center text-xs font-medium text-gray-700 whitespace-nowrap"
                            >
                                {item}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RandomAnimation;
