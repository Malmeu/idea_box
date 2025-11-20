import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/');
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue/20 via-white to-pastel-lavender/20 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/50 w-full max-w-md relative overflow-hidden"
            >
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-pastel-blue/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pastel-lavender/20 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col items-center">
                    <motion.img
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        src="/logoCollable11.png"
                        alt="Collable Logo"
                        className="h-24 mb-8 drop-shadow-sm hover:scale-105 transition-transform duration-500"
                    />

                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenue</h2>
                    <p className="text-slate-500 mb-8 text-center">Connectez-vous pour accéder à votre espace</p>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm w-full text-center border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="w-full space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 ml-1">Nom d'utilisateur</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pastel-blue transition-colors" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-pastel-blue focus:ring-4 focus:ring-pastel-blue/10 transition-all outline-none"
                                    placeholder="Collable"
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

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Se connecter
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
