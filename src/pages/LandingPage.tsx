import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ArrowRight, Lightbulb, Shield, X, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);

                if (data.role === 'ADMIN') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setError(data.error || 'Identifiants incorrects');
            }
        } catch (err) {
            setError('Impossible de se connecter au serveur');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-pastel-blue/20 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-pastel-lavender/20 rounded-full blur-[120px] opacity-60" />

            {/* Navigation */}
            <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/logoCollable11.png" alt="Logo" className="h-12 w-auto drop-shadow-sm" />
                </div>
                <button
                    onClick={() => setShowLogin(true)}
                    className="px-8 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all hover:scale-105 font-medium shadow-lg shadow-slate-900/20"
                >
                    Se connecter
                </button>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pt-24 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm mb-6 text-sm font-medium text-slate-600">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span>La nouvelle ère de la collaboration</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900">
                            Vos idées façonnent <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue to-pastel-lavender">
                                notre futur
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-600 leading-relaxed max-w-lg"
                    >
                        Une plateforme unique pour partager vos initiatives et vous exprimer en toute liberté. Ensemble, construisons un environnement de travail meilleur.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        <div className="p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white shadow-sm hover:shadow-md transition-all group">
                            <div className="w-14 h-14 bg-pastel-blue/20 rounded-2xl flex items-center justify-center mb-4 text-pastel-blue group-hover:scale-110 transition-transform">
                                <Lightbulb className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-slate-800">Boîte à Idées</h3>
                            <p className="text-slate-500 leading-relaxed">Proposez des concepts innovants et votez pour ceux qui vous inspirent.</p>
                        </div>
                        <div className="p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white shadow-sm hover:shadow-md transition-all group">
                            <div className="w-14 h-14 bg-pastel-lavender/20 rounded-2xl flex items-center justify-center mb-4 text-pastel-lavender group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-slate-800">Safe Space</h3>
                            <p className="text-slate-500 leading-relaxed">Un espace anonyme et bienveillant pour partager vos ressentis.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Composition */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden lg:block h-[600px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-2xl rounded-[3rem] border border-white/50 shadow-2xl p-8 transform rotate-[-6deg] hover:rotate-0 transition-all duration-700">
                        <div className="h-full w-full bg-slate-50/50 rounded-[2rem] overflow-hidden relative">
                            {/* Abstract UI Elements representation */}
                            <div className="absolute top-8 left-8 right-8 h-32 bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center animate-pulse">
                                <div className="w-16 h-16 bg-pastel-blue/20 rounded-xl" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                                    <div className="h-3 bg-slate-100 rounded-full w-1/2" />
                                </div>
                            </div>
                            <div className="absolute top-48 left-8 right-8 h-32 bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center animate-pulse delay-150">
                                <div className="w-16 h-16 bg-pastel-lavender/20 rounded-xl" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 bg-slate-100 rounded-full w-2/3" />
                                    <div className="h-3 bg-slate-100 rounded-full w-1/2" />
                                </div>
                            </div>
                            {/* Floating elements */}
                            <div className="absolute bottom-12 right-12 p-4 bg-slate-800 text-white rounded-2xl shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    <span className="font-medium">En ligne</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Login Modal */}
            <AnimatePresence>
                {showLogin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setShowLogin(false);
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl w-full max-w-md relative overflow-hidden"
                        >
                            <button
                                onClick={() => setShowLogin(false)}
                                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-400" />
                            </button>

                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Bon retour !</h2>
                                <p className="text-slate-500">Connectez-vous pour continuer</p>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm text-center border border-red-100">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600 ml-1">Nom d'utilisateur</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pastel-blue transition-colors" />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-pastel-blue focus:ring-4 focus:ring-pastel-blue/10 transition-all outline-none"
                                            placeholder="Votre identifiant"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600 ml-1">Mot de passe</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pastel-blue transition-colors" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-pastel-blue focus:ring-4 focus:ring-pastel-blue/10 transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Se connecter
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
