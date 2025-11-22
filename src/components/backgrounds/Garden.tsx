import React from 'react';
import { motion } from 'framer-motion';

export const Garden: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Sun/Light source */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-yellow-100 via-yellow-50 to-transparent rounded-full blur-[60px] opacity-60" />

            {/* Floating Clouds */}
            <motion.div
                className="absolute top-[10%] left-[10%] w-32 h-12 bg-white/40 rounded-full blur-xl"
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-[20%] right-[20%] w-48 h-16 bg-white/30 rounded-full blur-xl"
                animate={{ x: [0, -80, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Flowers/Plants Container */}
            <div className="absolute bottom-0 left-0 right-0 h-64 flex justify-around items-end opacity-50">
                {/* Plant 1 */}
                <motion.div
                    className="w-2 h-32 bg-green-300/50 rounded-t-full origin-bottom relative"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-300/60 rounded-full" />
                    <div className="absolute top-8 -right-4 w-6 h-4 bg-green-300/50 rounded-full rounded-bl-none" />
                </motion.div>

                {/* Plant 2 */}
                <motion.div
                    className="w-2 h-48 bg-green-400/40 rounded-t-full origin-bottom relative"
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-purple-300/60 rounded-full" />
                    <div className="absolute top-12 -left-4 w-6 h-4 bg-green-400/40 rounded-full rounded-br-none" />
                </motion.div>

                {/* Plant 3 */}
                <motion.div
                    className="w-2 h-24 bg-green-200/60 rounded-t-full origin-bottom relative"
                    animate={{ rotate: [-8, 8, -8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-200/60 rounded-full" />
                </motion.div>

                {/* Plant 4 */}
                <motion.div
                    className="w-2 h-40 bg-emerald-300/40 rounded-t-full origin-bottom relative hidden md:block"
                    animate={{ rotate: [3, -3, 3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-300/60 rounded-full" />
                    <div className="absolute top-10 -right-4 w-8 h-4 bg-emerald-300/40 rounded-full rounded-bl-none" />
                </motion.div>
            </div>

            {/* Butterflies */}
            <motion.div
                className="absolute"
                animate={{
                    x: [0, 100, 200, 100, 0],
                    y: [0, -50, 0, 50, 0],
                    rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ top: '40%', left: '20%' }}
            >
                <div className="text-2xl opacity-60">🦋</div>
            </motion.div>

            <motion.div
                className="absolute"
                animate={{
                    x: [0, -150, -50, 0],
                    y: [0, 100, 50, 0],
                    rotate: [0, -15, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
                style={{ top: '30%', right: '30%' }}
            >
                <div className="text-xl opacity-50">🦋</div>
            </motion.div>
        </div>
    );
};
