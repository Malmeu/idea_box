# 🚀 Migration vers Supabase - Guide Complet

## 📋 Étapes de Configuration

### 1. Créer un Projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - **Name**: idea-box (ou le nom de votre choix)
   - **Database Password**: Choisissez un mot de passe fort
   - **Region**: Choisissez la région la plus proche
5. Attendez que le projet soit créé (~2 minutes)

### 2. Récupérer les Clés d'API

1. Dans votre projet Supabase, allez dans **Settings** > **API**
2. Notez les informations suivantes :
   - **Project URL** (commence par `https://xxx.supabase.co`)
   - **anon/public key** (pour le frontend)
   - **service_role key** (pour le backend - GARDEZ-LA SECRÈTE !)

### 3. Configurer les Variables d'Environnement

#### Frontend (`/Users/Apple/Desktop/idea_box/.env`)
```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
```

#### Backend (`/Users/Apple/Desktop/idea_box/server/.env`)
```env
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_KEY=votre_service_role_key_ici
JWT_SECRET=supersecretkeychangeit
PORT=3000
```

### 4. Créer les Tables dans Supabase

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Cliquez sur **New Query**
3. Copiez-collez le contenu du fichier `server/supabase-schema.sql`
4. Cliquez sur **Run** (ou appuyez sur Ctrl+Enter)
5. Vérifiez que toutes les tables sont créées dans **Table Editor**

### 5. Créer les Utilisateurs Initiaux

Dans le terminal, depuis le dossier `server` :

```bash
cd server
node seed.js
```

Cela créera deux utilisateurs :
- **Admin** : `Collable` / `admin123`
- **User** : `Employe` / `user123`

### 6. Démarrer l'Application

#### Terminal 1 - Backend
```bash
cd server
npm start
# ou pour le mode développement avec auto-reload :
npx nodemon index.js
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

### 7. Tester l'Application

1. Ouvrez votre navigateur sur `http://localhost:5173`
2. Connectez-vous avec `Collable` / `admin123`
3. Testez les différentes fonctionnalités :
   - ✅ Boîte à Idées
   - ✅ Safe Space
   - ✅ Urgence
   - ✅ About U
   - ✅ Dashboard Admin

## 🔧 Dépannage

### Erreur "Missing Supabase environment variables"
- Vérifiez que vous avez bien créé les fichiers `.env`
- Vérifiez que les clés sont correctes (pas d'espaces avant/après)

### Les données ne se sauvegardent pas
- Vérifiez que les tables sont bien créées dans Supabase
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez les logs du serveur

### Erreur de connexion
- Vérifiez que le serveur est bien démarré
- Vérifiez que l'URL de Supabase est correcte
- Vérifiez que les policies RLS sont bien configurées

## 📊 Structure de la Base de Données

- **users** : Utilisateurs de l'application
- **ideas** : Idées soumises dans la Boîte à Idées
- **messages** : Messages du Safe Space
- **emergencies** : Signalements d'urgence
- **about_u** : Partages About U

## 🔐 Sécurité

- La `service_role key` donne un accès complet à la base de données
- Ne la partagez JAMAIS et ne la commitez JAMAIS dans Git
- Utilisez toujours des variables d'environnement
- Pour la production, ajoutez `.env` dans `.gitignore`

## 🚀 Déploiement

### Frontend (Vercel/Netlify)
Ajoutez les variables d'environnement dans les settings :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Backend (Render/Railway/Heroku)
Ajoutez les variables d'environnement :
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `JWT_SECRET`
- `PORT`

## ✅ Avantages de Supabase

- ✅ Base de données PostgreSQL hébergée
- ✅ Pas besoin de gérer SQLite localement
- ✅ Backups automatiques
- ✅ Interface d'administration
- ✅ API REST automatique
- ✅ Authentification intégrée (si besoin)
- ✅ Storage pour fichiers (si besoin)
- ✅ Temps réel (si besoin)

## 📝 Notes

- Les anciennes données Prisma/SQLite ne sont pas migrées automatiquement
- Vous pouvez supprimer le dossier `prisma` et `dev.db` une fois que tout fonctionne
- Supabase offre un plan gratuit généreux pour commencer
