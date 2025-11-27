# 💡 Idea Box - Plateforme Collaborative

Une application web moderne pour la gestion d'idées, le bien-être des employés et la communication d'équipe.

## ✨ Fonctionnalités

### 🎯 Boîte à Idées
- Soumission d'idées innovantes
- Système de likes
- Commentaires et discussions
- Modération de contenu

### 🛡️ Safe Space
- Partage anonyme de messages
- Catégorisation par humeur
- Espace sécurisé et bienveillant
- Modération automatique

### 🚨 Urgence
- Signalement de situations critiques
- Niveaux d'urgence (Moyen, Élevé, Critique)
- Suivi de statut (En attente, En cours, Résolu)
- Gestion administrative

### ✨ About U
- Partage de rêves et objectifs
- Système de surprises pour contenu inspirant
- Pseudonymes pour la confidentialité
- Types : Rêve, Objectif, Passion, Histoire

### 👨‍💼 Dashboard Admin
- Vue d'ensemble de toutes les données
- Gestion des urgences
- Modération des contenus
- Statistiques

## 🚀 Technologies

### Frontend
- **React** + **TypeScript**
- **Vite** pour le build
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **React Router** pour la navigation
- **Lucide React** pour les icônes

### Backend
- **Node.js** + **Express**
- **Supabase** (PostgreSQL) pour la base de données
- **JWT** pour l'authentification
- **bcrypt** pour le hachage des mots de passe
- **Bad Words** pour la modération

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase (gratuit)

### Démarrage Rapide

Consultez le guide complet : **[QUICKSTART.md](./QUICKSTART.md)**

Résumé :
```bash
# 1. Cloner le projet
git clone <votre-repo>
cd idea_box

# 2. Installer les dépendances
npm install
cd server && npm install && cd ..

# 3. Configurer Supabase (voir QUICKSTART.md)

# 4. Démarrer l'application
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend  
npm run dev
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Démarrage en 5 minutes
- **[SUPABASE_MIGRATION.md](./SUPABASE_MIGRATION.md)** - Guide complet Supabase
- **[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)** - Résumé de la migration
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guide de déploiement

## 🔐 Sécurité

- Authentification JWT
- Hachage bcrypt des mots de passe
- Modération automatique du contenu
- Row Level Security (RLS) avec Supabase
- Variables d'environnement pour les secrets

## 🎨 Design

- Interface moderne et épurée
- Animations fluides
- Thèmes de couleurs pastel
- Responsive design
- Accessibilité

## 👥 Utilisateurs par défaut

Après avoir exécuté `node seed.js` :

- **Admin** : `Collable` / `admin123`
- **User** : `Employe` / `user123`

## 🌐 Déploiement

### Frontend (Vercel)
```bash
# Variables d'environnement
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_API_URL=https://votre-backend.onrender.com
```

### Backend (Render)
```bash
# Variables d'environnement
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx
JWT_SECRET=votre_secret_unique
PORT=3000
```

Consultez **[DEPLOYMENT.md](./DEPLOYMENT.md)** pour les instructions détaillées.

## 📊 Structure du Projet

```
idea_box/
├── src/                    # Frontend React
│   ├── components/         # Composants réutilisables
│   ├── pages/             # Pages de l'application
│   ├── hooks/             # Hooks personnalisés
│   ├── lib/               # Utilitaires et config
│   └── App.tsx            # Point d'entrée
├── server/                # Backend Node.js
│   ├── index.js           # Serveur Express
│   ├── supabase.js        # Client Supabase
│   ├── seed.js            # Script de seed
│   ├── check-config.js    # Vérification config
│   └── utils/             # Utilitaires serveur
└── public/                # Assets statiques
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 🆘 Support

- Consultez la documentation dans les fichiers `.md`
- Vérifiez les issues GitHub
- Contactez l'équipe de développement

## 🎯 Roadmap

- [ ] Notifications en temps réel
- [ ] Export de données
- [ ] Thèmes personnalisables
- [ ] Application mobile
- [ ] Intégration Slack/Teams
- [ ] Analytics avancés

---

Développé avec ❤️ pour améliorer la collaboration et le bien-être en entreprise.
