# 🚀 Démarrage Rapide - Supabase

## ⚡ Configuration en 5 minutes

### 1️⃣ Créer le projet Supabase (2 min)
1. Allez sur [supabase.com](https://supabase.com) et créez un compte
2. Cliquez sur "New Project"
3. Donnez un nom à votre projet et choisissez un mot de passe
4. Attendez que le projet soit créé

### 2️⃣ Récupérer les clés (30 sec)
Dans votre projet Supabase :
- Allez dans **Settings** → **API**
- Copiez **Project URL**
- Copiez **anon public** (pour le frontend)
- Copiez **service_role** (pour le backend - GARDEZ-LA SECRÈTE!)

### 3️⃣ Configurer les variables (1 min)

**Fichier `/Users/Apple/Desktop/idea_box/.env`** (créez-le) :
```env
VITE_SUPABASE_URL=collez_votre_project_url_ici
VITE_SUPABASE_ANON_KEY=collez_votre_anon_key_ici
```

**Fichier `/Users/Apple/Desktop/idea_box/server/.env`** (modifiez-le) :
```env
SUPABASE_URL=collez_votre_project_url_ici
SUPABASE_SERVICE_KEY=collez_votre_service_role_key_ici
JWT_SECRET=supersecretkeychangeit
PORT=3000
```

### 4️⃣ Créer les tables (1 min)
1. Dans Supabase, allez dans **SQL Editor**
2. Cliquez sur **New Query**
3. Ouvrez le fichier `server/supabase-schema.sql`
4. Copiez tout le contenu et collez-le dans l'éditeur
5. Cliquez sur **Run** (ou Ctrl+Enter)
6. Vérifiez dans **Table Editor** que les 5 tables sont créées

### 5️⃣ Vérifier la configuration (30 sec)
```bash
cd server
node check-config.js
```

Si tout est vert ✅, passez à l'étape suivante !

### 6️⃣ Créer les utilisateurs (30 sec)
```bash
cd server
node seed.js
```

Vous devriez voir :
```
✅ Admin user created: Collable
✅ Regular user created: Employe
```

### 7️⃣ Démarrer l'application (30 sec)

**Terminal 1 - Backend** :
```bash
cd server
npm start
```

**Terminal 2 - Frontend** :
```bash
npm run dev
```

### 8️⃣ Tester ! 🎉
1. Ouvrez http://localhost:5173
2. Connectez-vous avec :
   - Username: `Collable`
   - Password: `admin123`
3. Testez toutes les fonctionnalités !

---

## ✅ Checklist de vérification

- [ ] Projet Supabase créé
- [ ] Clés API récupérées
- [ ] Fichier `.env` frontend créé et configuré
- [ ] Fichier `.env` backend configuré
- [ ] Script SQL exécuté (5 tables créées)
- [ ] `node check-config.js` → tout vert ✅
- [ ] `node seed.js` → utilisateurs créés
- [ ] Backend démarré (port 3000)
- [ ] Frontend démarré (port 5173)
- [ ] Connexion réussie dans l'app

---

## 🆘 Problèmes courants

### "Missing Supabase environment variables"
→ Vérifiez que les fichiers `.env` sont bien créés et remplis

### "Cannot find module './supabase'"
→ Vous êtes dans le bon dossier ? `cd server`

### Les tables ne se créent pas
→ Vérifiez que vous avez bien exécuté le script SQL complet

### "Error: 401" ou "Error: 403"
→ Vérifiez que vous utilisez la bonne clé (anon pour frontend, service_role pour backend)

### Les données ne s'affichent pas
→ Vérifiez la console du navigateur et les logs du serveur

---

## 📚 Documentation complète

Pour plus de détails, consultez :
- `SUPABASE_MIGRATION.md` - Guide complet
- `MIGRATION_SUMMARY.md` - Résumé des changements

Bon développement ! 🚀
