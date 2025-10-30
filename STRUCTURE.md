# 📂 STRUCTURE DU PROJET - Portfolio Next.js

## 🗂️ Arborescence complète

```
portfolio/
│
├── 📁 app/                          # Dossier principal Next.js (App Router)
│   │
│   ├── 📁 api/                      # API Routes (Backend)
│   │   └── 📁 likes/
│   │       └── route.ts             # ✅ API pour les likes (POST/GET)
│   │
│   ├── globals.css                  # ✅ TOUS vos styles CSS (27KB)
│   ├── layout.tsx                   # ✅ Layout principal + métadonnées SEO
│   └── page.tsx                     # ✅ Page d'accueil (tout le portfolio)
│
├── 📁 components/                   # Composants React réutilisables
│   ├── ClientScripts.tsx            # ✅ Effets JS (typing, scroll, fade-in)
│   ├── CVModal.tsx                  # ✅ Modale pour afficher le CV
│   └── LikeButton.tsx               # ✅ Bouton like interactif
│
├── 📁 data/                         # Données du projet
│   └── likes.json                   # ✅ Stockage des likes
│
├── 📁 public/                       # Fichiers publics accessibles
│   └── 📁 assets/
│       ├── 📁 images/               # ⚠️ METTEZ VOS IMAGES ICI
│       │   ├── profile.png
│       │   ├── recettes.png
│       │   ├── pygame.png
│       │   ├── unreal.png
│       │   └── CV_2025-09-04_Lucas_Jacob_page-0001.jpg
│       │
│       └── 📁 documents/            # ⚠️ METTEZ VOTRE CV PDF ICI
│           └── CV_2025-09-04_Lucas_Jacob.pdf
│
├── .gitignore                       # ✅ Fichiers à ignorer dans Git
├── next.config.js                   # ✅ Configuration Next.js
├── package.json                     # ✅ Dépendances et scripts npm
├── tsconfig.json                    # ✅ Configuration TypeScript
│
├── README.md                        # ✅ Documentation complète
├── GUIDE_INSTALLATION.md            # ✅ Guide d'installation détaillé
├── INSTRUCTIONS_FINALES.md          # ✅ Instructions finales
└── CHECKLIST.md                     # ✅ Checklist rapide
```

## 📝 Description détaillée des fichiers

### 🔧 Configuration

| Fichier | Description | Important ? |
|---------|-------------|-------------|
| `package.json` | Dépendances Next.js, React, TypeScript | ⚠️ CRITIQUE |
| `tsconfig.json` | Configuration TypeScript | ⚠️ CRITIQUE |
| `next.config.js` | Configuration Next.js | ⚠️ CRITIQUE |
| `.gitignore` | Fichiers à ne pas versionner | ✅ Recommandé |

### 🎨 Application (dossier `app/`)

| Fichier | Remplace | Description |
|---------|----------|-------------|
| `app/layout.tsx` | Header HTML | Layout + métadonnées SEO |
| `app/page.tsx` | `index.html` | Page d'accueil complète |
| `app/globals.css` | `style.css` | Tous vos styles CSS (27KB) |

### 🔌 API (dossier `app/api/`)

| Fichier | Remplace | Description |
|---------|----------|-------------|
| `app/api/likes/route.ts` | `likes.php` | API pour gérer les likes (GET/POST) |

### ⚛️ Composants (dossier `components/`)

| Fichier | Remplace | Description |
|---------|----------|-------------|
| `ClientScripts.tsx` | `script.js` | Effets typing, scroll, animations |
| `CVModal.tsx` | Code dans `index.html` | Modale pour le CV |
| `LikeButton.tsx` | `likes.js` | Bouton like interactif |

### 💾 Données (dossier `data/`)

| Fichier | Remplace | Description |
|---------|----------|-------------|
| `likes.json` | `likes.json` | Stockage des likes (identique) |

### 🖼️ Assets (dossier `public/`)

⚠️ **IMPORTANT** : Vous devez créer ce dossier et y mettre vos fichiers !

```
public/
└── assets/
    ├── images/
    │   ├── profile.png              ← Votre photo de profil
    │   ├── recettes.png             ← Screenshot projet recettes
    │   ├── pygame.png               ← Screenshot projet pygame
    │   ├── unreal.png               ← Screenshot projet unreal
    │   └── CV_2025-09-04_Lucas_Jacob_page-0001.jpg  ← Image CV
    │
    └── documents/
        └── CV_2025-09-04_Lucas_Jacob.pdf  ← CV PDF téléchargeable
```

## 🔄 Comparaison Avant / Après

### Version HTML/PHP (Avant)
```
portfolio/
├── index.html          # Tout le HTML
├── style.css           # Tous les styles
├── script.js           # Effets JavaScript
├── likes.js            # Logique des likes
├── likes.php           # API backend
├── likes.json          # Données
└── assets/
    ├── images/
    └── documents/
```

### Version Next.js (Après)
```
portfolio/
├── app/
│   ├── page.tsx            # HTML converti en React
│   ├── globals.css         # Styles identiques
│   ├── layout.tsx          # Structure + SEO
│   └── api/
│       └── likes/
│           └── route.ts    # Backend Node.js
│
├── components/
│   ├── ClientScripts.tsx   # Effets JS
│   ├── CVModal.tsx         # Modale CV
│   └── LikeButton.tsx      # Bouton like
│
├── data/
│   └── likes.json          # Données identiques
│
├── public/
│   └── assets/             # Images et documents
│
└── [config files]
```

## 🎯 Fichiers critiques à ne PAS oublier

### 1️⃣ Fichiers Next.js (déjà créés ✅)
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`

### 2️⃣ Vos assets (à copier ⚠️)
- `public/assets/images/profile.png`
- `public/assets/images/recettes.png`
- `public/assets/images/pygame.png`
- `public/assets/images/unreal.png`
- `public/assets/images/CV_2025-09-04_Lucas_Jacob_page-0001.jpg`
- `public/assets/documents/CV_2025-09-04_Lucas_Jacob.pdf`

## 📦 Taille des fichiers

| Fichier | Taille | Statut |
|---------|--------|--------|
| `app/page.tsx` | ~16 KB | ✅ Créé |
| `app/globals.css` | 27 KB | ✅ Créé |
| `app/layout.tsx` | 1 KB | ✅ Créé |
| `app/api/likes/route.ts` | 4 KB | ✅ Créé |
| `components/LikeButton.tsx` | 4 KB | ✅ Créé |
| `components/CVModal.tsx` | 2 KB | ✅ Créé |
| `components/ClientScripts.tsx` | 3 KB | ✅ Créé |

**Total : ~61 KB de code** (sans les images)

## 🚨 Erreurs communes à éviter

### ❌ Mauvais
```
portfolio/
├── assets/              # ❌ Ancien dossier
│   └── images/
```

### ✅ Correct
```
portfolio/
├── public/              # ✅ Nouveau dossier Next.js
│   └── assets/
│       └── images/
```

## 💡 Conseils

1. **Ne modifiez PAS** la structure des dossiers Next.js (`app/`, `components/`, etc.)
2. **Mettez TOUS vos assets** dans `public/assets/`
3. **Utilisez les chemins** qui commencent par `/assets/` dans le code (pas `../assets/`)
4. **Testez d'abord en local** avec `npm run dev` avant de déployer

## 🔍 Comment vérifier que tout est en place ?

```bash
# Vérifier que tous les fichiers sont présents
ls -la app/
ls -la components/
ls -la data/
ls -la public/assets/images/
ls -la public/assets/documents/

# Si une commande renvoie "No such file or directory", créez le dossier manquant
```

---

**Structure créée avec ❤️ pour Lucas Jacob**  
*Tous les fichiers Next.js sont prêts ! Il ne reste plus qu'à copier vos images.*
