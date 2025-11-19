import React from 'react';
import { Dices } from 'lucide-react';
import { motion } from 'framer-motion';

interface RandomButtonProps {
    onRandom: () => void;
    isAnimating: boolean;
}

const RandomButton: React.FC<RandomButtonProps> = ({ onRandom, isAnimating }) => {
    return (
        <div className="mb-4 flex justify-center">
            <motion.button
                onClick={onRandom}
                disabled={isAnimating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isAnimating ? { rotate: 360 } : {}}
                transition={isAnimating ? { duration: 0.5, repeat: Infinity, ease: "linear" } : {}}
                className={`
          flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white shadow-lg
          ${isAnimating ? 'bg-yellow-500 cursor-wait' : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600'}
        `}
            >
                <Dices size={20} />
                {isAnimating ? 'Rolling...' : 'Randomize!'}
            </motion.button>
        </div>
    );
};

export default RandomButton;
