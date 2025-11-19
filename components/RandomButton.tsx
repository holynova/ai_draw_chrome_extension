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
                className={`
          flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white shadow-lg
          ${isAnimating ? 'bg-amber-400' : 'bg-gradient-to-r from-emerald-400 to-sky-400 hover:from-emerald-500 hover:to-sky-500'}
        `}
            >
                <Dices size={20} />
                {isAnimating ? 'Rolling...' : 'Randomize!'}
            </motion.button>
        </div>
    );
};

export default RandomButton;
