import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Shield, LayoutDashboard, LogOut, AlertTriangle, Sparkles } from 'lucide-react';
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
    const isEmergency = location.pathname === '/emergency';
    const isAboutU = location.pathname === '/about-u';
    const isDashboard = location.pathname === '/dashboard';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className={clsx(
            "min-h-screen transition-colors duration-700 ease-in-out font-sans relative",
            isSafeSpace ? "bg-pastel-lavender/30" :
                isEmergency ? "bg-pastel-red/10" :
                    isAboutU ? "bg-gradient-to-br from-purple-50 to-pink-50" :
                        "bg-pastel-blue/30"
        )}>
            {/* Animated Backgrounds */}
            {!isDashboard && (
                <>
                    <div className={clsx("absolute inset-0 transition-opacity duration-1000", isSafeSpace || isEmergency || isAboutU ? "opacity-0" : "opacity-100")}>
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
                                location.pathname === '/' ? "bg-white shadow-lg scale-105" : "bg-white/50 hover:bg-white/80"
                            )}>
                                <Lightbulb className={clsx("w-5 h-5 md:w-6 md:h-6", location.pathname === '/' ? "text-pastel-blue" : "text-gray-400")} />
                                <span className={clsx("font-medium text-sm md:text-base", location.pathname === '/' ? "text-gray-800" : "text-gray-500")}>
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

                        <Link to="/emergency" className="relative group">
                            <div className={clsx(
                                "p-3 md:p-4 rounded-2xl transition-all duration-300 flex items-center gap-3",
                                isEmergency ? "bg-white shadow-lg scale-105" : "bg-white/50 hover:bg-white/80"
                            )}>
                                <AlertTriangle className={clsx("w-5 h-5 md:w-6 md:h-6", isEmergency ? "text-pastel-red" : "text-gray-400")} />
                                <span className={clsx("font-medium text-sm md:text-base", isEmergency ? "text-gray-800" : "text-gray-500")}>
                                    Urgence
                                </span>
                            </div>
                        </Link>

                        <Link to="/about-u" className="relative group">
                            <div className={clsx(
                                "p-3 md:p-4 rounded-2xl transition-all duration-300 flex items-center gap-3",
                                isAboutU ? "bg-white shadow-lg scale-105" : "bg-white/50 hover:bg-white/80"
                            )}>
                                <Sparkles className={clsx("w-5 h-5 md:w-6 md:h-6", isAboutU ? "text-purple-500" : "text-gray-400")} />
                                <span className={clsx("font-medium text-sm md:text-base", isAboutU ? "text-gray-800" : "text-gray-500")}>
                                    About U
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {localStorage.getItem('role') === 'ADMIN' && (
                            <Link to="/dashboard">
                                <button className="p-3 md:p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 text-slate-700 hover:text-slate-900">
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="font-medium text-sm md:text-base hidden md:inline">Admin</span>
                                </button>
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="p-3 md:p-4 rounded-2xl bg-red-50 hover:bg-red-100 transition-all duration-300 flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium text-sm md:text-base hidden md:inline">Déconnexion</span>
                        </button>
                    </div>
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

