# 🚀 Guide de Déploiement

## Frontend (Vercel - Recommandé)

### Étape 1 : Préparer le projet
1. Assurez-vous que votre code est sur GitHub
2. Commitez tous vos changements

### Étape 2 : Déployer sur Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Cliquez sur "New Project"
4. Importez votre repository
5. Configurez les variables d'environnement :
   - `VITE_SUPABASE_URL` = votre URL Supabase
   - `VITE_SUPABASE_ANON_KEY` = votre clé anon
6. Cliquez sur "Deploy"

### Configuration Build
Vercel détecte automatiquement Vite, mais vérifiez :
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## Backend (Render - Recommandé)

### Étape 1 : Préparer le projet
1. Assurez-vous que `server/` est dans votre repository
2. Le fichier `package.json` doit avoir le script `start`

### Étape 2 : Déployer sur Render
1. Allez sur [render.com](https://render.com)
2. Connectez-vous avec GitHub
3. Cliquez sur "New +" → "Web Service"
4. Sélectionnez votre repository
5. Configurez :
   - **Name**: idea-box-api
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Étape 3 : Variables d'environnement
Dans Render, ajoutez :
- `SUPABASE_URL` = votre URL Supabase
- `SUPABASE_SERVICE_KEY` = votre service role key
- `JWT_SECRET` = votre secret JWT
- `PORT` = 3000 (ou laissez vide, Render le définira)

### Étape 4 : Mettre à jour le frontend
Une fois le backend déployé, mettez à jour votre frontend :

Dans `.env` (ou variables Vercel) :
```env
VITE_API_URL=https://votre-app.onrender.com
```

Redéployez le frontend sur Vercel.

---

## Alternative : Railway

### Backend sur Railway
1. Allez sur [railway.app](https://railway.app)
2. Connectez GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Sélectionnez votre repo
5. Configurez :
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
6. Ajoutez les variables d'environnement

---

## Alternative : Netlify (Frontend)

### Déployer sur Netlify
1. Allez sur [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Connectez GitHub et sélectionnez le repo
4. Configurez :
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Ajoutez les variables d'environnement
6. Deploy

---

## Checklist de déploiement

### Avant le déploiement
- [ ] Code committé sur GitHub
- [ ] `.env` ajouté au `.gitignore`
- [ ] Projet Supabase créé et configuré
- [ ] Tables créées dans Supabase
- [ ] Utilisateurs seed créés (optionnel en prod)
- [ ] Application testée localement

### Backend
- [ ] Déployé sur Render/Railway
- [ ] Variables d'environnement configurées
- [ ] Service démarré sans erreur
- [ ] URL du backend notée

### Frontend
- [ ] Déployé sur Vercel/Netlify
- [ ] Variables d'environnement configurées
- [ ] `VITE_API_URL` pointe vers le backend déployé
- [ ] Build réussi
- [ ] Application accessible

### Tests post-déploiement
- [ ] Page de connexion s'affiche
- [ ] Connexion fonctionne
- [ ] Création d'idées fonctionne
- [ ] Messages Safe Space fonctionnent
- [ ] Urgences fonctionnent
- [ ] About U fonctionne
- [ ] Dashboard admin accessible

---

## 🔧 Dépannage

### Erreur CORS
Si vous avez des erreurs CORS, vérifiez dans `server/index.js` :
```javascript
app.use(cors({
    origin: ['https://votre-frontend.vercel.app'],
    credentials: true
}));
```

### Variables d'environnement non reconnues
- Sur Vercel : Redéployez après avoir ajouté les variables
- Sur Render : Redémarrez le service manuellement

### Build échoue
- Vérifiez les logs de build
- Assurez-vous que toutes les dépendances sont dans `package.json`
- Vérifiez que les imports sont corrects

### Base de données vide
- Connectez-vous au backend déployé
- Exécutez le seed : créez un endpoint `/api/seed` temporaire
- Ou créez les utilisateurs manuellement dans Supabase

---

## 🔐 Sécurité en production

### À FAIRE
- [ ] Changez `JWT_SECRET` pour une valeur unique et forte
- [ ] Activez HTTPS (automatique sur Vercel/Render)
- [ ] Configurez les CORS correctement
- [ ] Limitez les requêtes (rate limiting)
- [ ] Activez les logs d'erreur

### À NE PAS FAIRE
- ❌ Committer les fichiers `.env`
- ❌ Exposer la `service_role key` côté client
- ❌ Utiliser des secrets par défaut en production
- ❌ Désactiver CORS complètement

---

## 📊 Monitoring

### Supabase
- Dashboard → Logs
- Vérifiez les requêtes
- Surveillez l'utilisation

### Render/Railway
- Logs en temps réel
- Métriques de performance
- Alertes d'erreur

### Vercel
- Analytics
- Logs de build
- Métriques de performance

---

## 💰 Coûts

### Gratuit
- **Supabase**: 500 MB de base de données, 2 GB de bande passante
- **Vercel**: 100 GB de bande passante
- **Render**: 750 heures/mois (service peut dormir après inactivité)

### Si vous dépassez
- Supabase: ~25$/mois pour le plan Pro
- Vercel: ~20$/mois pour le plan Pro
- Render: ~7$/mois pour service toujours actif

---

Bon déploiement ! 🚀
