'use client';

import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.61, 1, 0.88, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: {
            duration: 0.3,
            ease: [0.61, 1, 0.88, 1]
        }
    }
};

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full min-h-screen"
        >
            {children}
        </motion.div>
    );
}