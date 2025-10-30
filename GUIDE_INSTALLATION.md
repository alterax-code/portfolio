# 🚀 Portfolio Next.js - Guide de Migration et Installation

## 📦 Vous avez tous les fichiers !

Tous les fichiers Next.js ont été créés. Voici ce que vous devez faire maintenant :

## 🔥 Étape 1 : Copier les fichiers sur votre machine

Téléchargez TOUS les fichiers que je vous ai fournis et placez-les dans votre dossier `portfolio` :

```
portfolio/
├── app/
│   ├── api/
│   │   └── likes/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ClientScripts.tsx
│   ├── CVModal.tsx
│   └── LikeButton.tsx
├── data/
│   └── likes.json
├── public/
│   └── assets/
│       ├── images/
│       │   ├── profile.png
│       │   ├── recettes.png
│       │   ├── pygame.png
│       │   ├── unreal.png
│       │   └── CV_2025-09-04_Lucas_Jacob_page-0001.jpg
│       └── documents/
│           └── CV_2025-09-04_Lucas_Jacob.pdf
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

## 🖼️ Étape 2 : Placer vos images

**IMPORTANT:** Déplacez vos images et documents dans le dossier `public/assets/` :

```bash
# Depuis le dossier portfolio
mkdir -p public/assets/images
mkdir -p public/assets/documents

# Copiez vos images
cp assets/images/* public/assets/images/

# Copiez vos documents (CV)
cp assets/documents/* public/assets/documents/
```

## 📥 Étape 3 : Installer les dépendances

```bash
# Assurez-vous d'être dans le dossier portfolio
cd /mnt/c/Users/lucas/Desktop/CoursEpitech/portfolio

# Installer les dépendances Next.js
npm install
```

Cette commande va installer :
- Next.js 14
- React 18
- TypeScript
- Et toutes les dépendances nécessaires

## 🚀 Étape 4 : Démarrer le serveur de développement

```bash
npm run dev
```

Votre portfolio sera accessible sur : **http://localhost:3000**

## ✅ Étape 5 : Vérifier que tout fonctionne

Ouvrez http://localhost:3000 dans votre navigateur et vérifiez :

1. ✅ L'effet typing du nom s'affiche
2. ✅ La navbar change au scroll
3. ✅ Les animations fade-in fonctionnent
4. ✅ La modale du CV s'ouvre/ferme
5. ✅ Les boutons "J'aime" fonctionnent
6. ✅ Le design dark/rouge est identique à votre version originale

## 🎨 Le design est-il conservé ?

**OUI !** Tout votre CSS a été préservé dans `app/globals.css`. Le site aura exactement le même aspect visuel.

## 🔧 Commandes disponibles

```bash
# Développement (avec hot-reload)
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

## 📤 Étape 6 : Mettre à jour GitHub

Une fois que tout fonctionne :

```bash
# Sauvegarder les anciens fichiers
mkdir _old
mv index.html style.css script.js likes.js likes.php _old/

# Ajouter les nouveaux fichiers
git add .
git commit -m "Migration vers Next.js avec API Routes"
git push origin main
```

## 🌐 Étape 7 : Déployer sur Vercel (GRATUIT)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez votre repo `portfolio`
4. Vercel détectera automatiquement Next.js
5. Cliquez sur "Deploy"

**C'est tout !** Votre site sera en ligne en 2 minutes sur un domaine gratuit comme : `votre-nom.vercel.app`

## 🎯 Différences avec l'ancienne version

| Avant (HTML/PHP) | Maintenant (Next.js) |
|------------------|----------------------|
| `likes.php` | `app/api/likes/route.ts` |
| `likes.js` | `components/LikeButton.tsx` |
| `script.js` | `components/ClientScripts.tsx` |
| `index.html` | `app/page.tsx` |
| `style.css` | `app/globals.css` |

## 🚨 Problèmes courants

### Erreur : "Module not found"
```bash
npm install
```

### Le CSS ne s'applique pas
Vérifiez que `globals.css` est bien importé dans `app/layout.tsx`

### Les images ne s'affichent pas
Vérifiez que vos images sont dans `public/assets/images/`

### Les likes ne fonctionnent pas
Vérifiez que le dossier `data/` existe et contient `likes.json`

## 🎉 Prochaines étapes

1. **Webhooks GitHub** : Pour afficher automatiquement vos projets
2. **Formulaire de contact fonctionnel** : Avec Resend ou EmailJS
3. **Analytics** : Ajouter Google Analytics
4. **SEO avancé** : Optimiser pour les moteurs de recherche

## 💡 Besoin d'aide ?

Si vous avez des erreurs, envoyez-moi :
1. Le message d'erreur complet
2. Ce que vous avez tapé dans le terminal

---

**Félicitations !** 🎊 Vous avez migré votre portfolio vers Next.js, une stack moderne et professionnelle !
