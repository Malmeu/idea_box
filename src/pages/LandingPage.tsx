import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ArrowRight, Lightbulb, Shield, X, Sparkles, Heart, Users } from 'lucide-react';

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
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 overflow-hidden relative">
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
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-pastel-blue to-pastel-lavender">
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative hidden lg:block h-[600px]"
                >
                    <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/10 backdrop-blur-xl rounded-[3rem] border border-white/50 shadow-xl p-8">
                        <div className="h-full w-full bg-slate-50/30 rounded-4xl overflow-hidden relative">

                            {/* Carte Idée 1 - Style réel */}
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-8 left-8 right-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                                    <span className="text-xs bg-pastel-blue/20 px-2 py-1 rounded-full text-slate-700">
                                        💡 Innovation
                                    </span>
                                    <span className="text-xs flex items-center gap-1 text-yellow-600">
                                        <span>🟡</span>
                                        <span className="font-medium">Moyenne</span>
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                    Hackathon interne
                                </h3>
                                <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                                    Organiser un hackathon trimestriel pour innover ensemble !
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                                        #innovation
                                    </span>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                                        #team
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-pastel-pink">
                                        <div className="p-2 rounded-full bg-pastel-pink/20">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                        </div>
                                        <span className="font-medium">12</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <div className="p-2 rounded-full bg-slate-50">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                        </div>
                                        <span className="font-medium">5</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Carte Safe Space 1 - Style réel */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute top-64 left-12 right-4 bg-pastel-lavender/40 rounded-2xl p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200/50">
                                    <span className="text-xs bg-white/50 px-2 py-1 rounded-full">
                                        💙 Émotions
                                    </span>
                                    <span className="text-lg" title="grateful">
                                        🙏
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                    Merci pour le soutien
                                </h3>
                                <p className="text-slate-700 font-medium leading-relaxed font-handwriting text-sm">
                                    "Merci pour l'écoute bienveillante lors de la réunion d'hier. Ça m'a vraiment aidé."
                                </p>
                                <div className="mt-4 text-right">
                                    <span className="text-xs text-slate-500/80">
                                        21:23
                                    </span>
                                </div>
                            </motion.div>

                            {/* Carte Safe Space 2 - Plus petite */}
                            <motion.div
                                animate={{
                                    y: [0, -6, 0],
                                }}
                                transition={{
                                    duration: 4.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                                className="absolute top-[480px] right-8 w-64 bg-pastel-mint/40 rounded-2xl p-5 shadow-sm"
                            >
                                <p className="text-slate-700 font-medium leading-relaxed font-handwriting text-sm">
                                    "Je me sens plus serein depuis que je peux m'exprimer ici 🌸"
                                </p>
                                <div className="mt-3 text-right">
                                    <span className="text-xs text-slate-500/80">
                                        20:15
                                    </span>
                                </div>
                            </motion.div>

                            {/* Badge "En ligne" */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute bottom-8 right-8 p-4 bg-slate-800 text-white rounded-2xl shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={{
                                            opacity: [1, 0.5, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="w-2 h-2 bg-green-400 rounded-full"
                                    />
                                    <span className="font-medium text-sm">En ligne</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Features Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-white to-pastel-blue/10" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Pourquoi nous rejoindre ?</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Une plateforme pensée pour libérer la parole et stimuler l'innovation collective.</p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield className="w-6 h-6 text-pastel-blue" />,
                                title: "Espace Sécurisé",
                                desc: "L'anonymat est garanti pour vous permettre de vous exprimer sans crainte.",
                                color: "bg-pastel-blue/20"
                            },
                            {
                                icon: <Users className="w-6 h-6 text-pastel-lavender" />,
                                title: "Intelligence Collective",
                                desc: "Co-construisez les projets de demain avec l'ensemble des collaborateurs.",
                                color: "bg-pastel-lavender/20"
                            },
                            {
                                icon: <Heart className="w-6 h-6 text-pastel-pink" />,
                                title: "Bienveillance",
                                desc: "Un environnement positif où chaque voix compte et est respectée.",
                                color: "bg-pastel-pink/20"
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pastel-mint/10 rounded-full blur-[100px] opacity-60 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-12">Comment ça marche ?</h2>
                            <div className="space-y-10">
                                {[
                                    {
                                        step: "01",
                                        title: "Proposez",
                                        desc: "Partagez une idée ou un ressenti en quelques clics, de manière identifiée ou anonyme."
                                    },
                                    {
                                        step: "02",
                                        title: "Collaborez",
                                        desc: "La communauté vote, commente et enrichit les propositions."
                                    },
                                    {
                                        step: "03",
                                        title: "Réalisez",
                                        desc: "Les meilleures idées sont sélectionnées et mises en œuvre par les équipes."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-6 group">
                                        <div className="text-5xl font-bold text-pastel-blue/30 font-serif group-hover:text-pastel-blue/50 transition-colors">{item.step}</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-pastel-lavender/20 rounded-full blur-3xl opacity-60" />
                            <div className="relative bg-white p-4 rounded-[2rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border border-slate-100">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                    alt="Team collaboration"
                                    className="rounded-[1.5rem] w-full h-auto"
                                />
                                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-pastel-${i === 1 ? 'blue' : i === 2 ? 'pink' : 'green'} flex items-center justify-center text-[10px] text-white font-bold`}>
                                                    {String.fromCharCode(64 + i)}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm font-medium text-slate-700">Rejoignez +150 collaborateurs</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 py-12 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/logoCollable11.png" alt="Logo" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
                        <span className="text-slate-400 text-sm">© 2024 IdeaBox. All rights reserved.</span>
                    </div>
                    <div className="flex gap-8 text-slate-400 text-sm font-medium">
                        <a href="#" className="hover:text-pastel-blue transition-colors">Confidentialité</a>
                        <a href="#" className="hover:text-pastel-blue transition-colors">Conditions</a>
                        <a href="#" className="hover:text-pastel-blue transition-colors">Contact</a>
                    </div>
                </div>
            </footer>

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
                            className="bg-white rounded-4xl p-8 md:p-12 shadow-2xl w-full max-w-md relative overflow-hidden"
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
