import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Shield } from 'lucide-react';
import clsx from 'clsx';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isSafeSpace = location.pathname === '/safe-space';

    return (
        <div className={clsx(
            "min-h-screen transition-colors duration-700 ease-in-out font-sans",
            isSafeSpace ? "bg-pastel-lavender/30" : "bg-pastel-blue/30"
        )}>
            <nav className="p-6 flex justify-center items-center gap-8">
                <Link to="/" className="relative group">
                    <div className={clsx(
                        "p-4 rounded-2xl transition-all duration-300 flex items-center gap-3",
                        !isSafeSpace ? "bg-white shadow-lg scale-105" : "bg-white/50 hover:bg-white/80"
                    )}>
                        <Lightbulb className={clsx("w-6 h-6", !isSafeSpace ? "text-pastel-blue" : "text-gray-400")} />
                        <span className={clsx("font-medium", !isSafeSpace ? "text-gray-800" : "text-gray-500")}>
                            Boîte à Idées
                        </span>
                    </div>
                </Link>

                <Link to="/safe-space" className="relative group">
                    <div className={clsx(
                        "p-4 rounded-2xl transition-all duration-300 flex items-center gap-3",
                        isSafeSpace ? "bg-white shadow-lg scale-105" : "bg-white/50 hover:bg-white/80"
                    )}>
                        <Shield className={clsx("w-6 h-6", isSafeSpace ? "text-pastel-lavender" : "text-gray-400")} />
                        <span className={clsx("font-medium", isSafeSpace ? "text-gray-800" : "text-gray-500")}>
                            Safe Space
                        </span>
                    </div>
                </Link>
            </nav>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};
