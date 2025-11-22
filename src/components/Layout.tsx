import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Shield, LayoutDashboard, LogOut } from 'lucide-react';
import clsx from 'clsx';

import { SolarSystem } from './backgrounds/SolarSystem';
import { Garden } from './backgrounds/Garden';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSafeSpace = location.pathname === '/safe-space';
    const isDashboard = location.pathname === '/dashboard';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className={clsx(
            "min-h-screen transition-colors duration-700 ease-in-out font-sans relative",
            isSafeSpace ? "bg-pastel-lavender/30" : "bg-pastel-blue/30"
        )}>
            {/* Animated Backgrounds */}
            {!isDashboard && (
                <>
                    <div className={clsx("absolute inset-0 transition-opacity duration-1000", isSafeSpace ? "opacity-0" : "opacity-100")}>
                        <SolarSystem />
                    </div>
                    <div className={clsx("absolute inset-0 transition-opacity duration-1000", isSafeSpace ? "opacity-100" : "opacity-0")}>
                        <Garden />
                    </div>
                </>
            )}

            <div className="relative z-10">
                <nav className="p-6 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-6">
                    <div className="flex items-center gap-3">
                        <img src="/logoCollable11.png" alt="Logo" className="h-12 w-auto drop-shadow-sm" />
                    </div>

                    <div className="flex justify-center items-center gap-4 md:gap-8">
                        <Link to="/" className="relative group">
                            <div className={clsx(
                                "p-3 md:p-4 rounded-2xl transition-all duration-300 flex items-center gap-3",
                                !isSafeSpace && location.pathname !== '/dashboard' ? "bg-white shadow-lg scale-105" : "bg-white/50 hover:bg-white/80"
                            )}>
                                <Lightbulb className={clsx("w-5 h-5 md:w-6 md:h-6", !isSafeSpace && location.pathname !== '/dashboard' ? "text-pastel-blue" : "text-gray-400")} />
                                <span className={clsx("font-medium text-sm md:text-base", !isSafeSpace && location.pathname !== '/dashboard' ? "text-gray-800" : "text-gray-500")}>
                                    Boîte à Idées
                                </span>
                            </div>
                        </Link>

                        <Link to="/safe-space" className="relative group">
                            <div className={clsx(
                                "p-3 md:p-4 rounded-2xl transition-all duration-300 flex items-center gap-3",
                                isSafeSpace ? "bg-white shadow-lg scale-105" : "bg-white/50 hover:bg-white/80"
                            )}>
                                <Shield className={clsx("w-5 h-5 md:w-6 md:h-6", isSafeSpace ? "text-pastel-lavender" : "text-gray-400")} />
                                <span className={clsx("font-medium text-sm md:text-base", isSafeSpace ? "text-gray-800" : "text-gray-500")}>
                                    Safe Space
                                </span>
                            </div>
                        </Link>

                        {localStorage.getItem('role') === 'ADMIN' && (
                            <Link to="/dashboard" className="relative group">
                                <div className={clsx(
                                    "p-3 md:p-4 rounded-2xl transition-all duration-300 flex items-center gap-3",
                                    location.pathname === '/dashboard' ? "bg-white shadow-lg scale-105" : "bg-white/50 hover:bg-white/80"
                                )}>
                                    <LayoutDashboard className={clsx("w-5 h-5 md:w-6 md:h-6", location.pathname === '/dashboard' ? "text-slate-800" : "text-gray-400")} />
                                    <span className={clsx("font-medium text-sm md:text-base", location.pathname === '/dashboard' ? "text-gray-800" : "text-gray-500")}>
                                        Admin
                                    </span>
                                </div>
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="p-3 md:p-4 rounded-2xl bg-red-50 hover:bg-red-100 transition-all duration-300 flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm md:text-base">Déconnexion</span>
                    </button>
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
        </div>
    );
};

