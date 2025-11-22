import React from 'react';
import { motion } from 'framer-motion';

export const SolarSystem: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute bg-white rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: Math.random() * 0.5 + 0.2
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: Math.random() * 4 + 1 + 'px',
                        height: Math.random() * 4 + 1 + 'px',
                    }}
                />
            ))}

            {/* Sun */}
            <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-yellow-300 via-orange-300 to-transparent rounded-full blur-[80px] opacity-60" />

            {/* Solar System Container - Centered but slightly offset */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]">

                {/* Orbit 1 - Mercury-ish */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] border border-slate-300/30 rounded-full animate-[spin_10s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-400 rounded-full shadow-sm" />
                </div>

                {/* Orbit 2 - Venus-ish */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] border border-slate-300/30 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                    <div className="absolute top-1/4 left-[15%] w-6 h-6 bg-orange-200 rounded-full shadow-sm" />
                </div>

                {/* Orbit 3 - Earth-ish */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border border-slate-300/30 rounded-full animate-[spin_25s_linear_infinite]">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-blue-300 rounded-full shadow-sm flex items-center justify-center">
                        {/* Moon */}
                        <div className="absolute -top-4 -right-4 w-2 h-2 bg-slate-200 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Orbit 4 - Mars-ish */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-slate-300/30 rounded-full animate-[spin_40s_linear_infinite_reverse]">
                    <div className="absolute top-1/2 right-0 translate-x-1/2 w-5 h-5 bg-red-300 rounded-full shadow-sm" />
                </div>
            </div>
        </div>
    );
};
