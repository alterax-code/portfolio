# ✅ CHECKLIST RAPIDE - Migration Portfolio Next.js

## 📥 ÉTAPE 1 : Télécharger et organiser

- [ ] Télécharger TOUS les fichiers de ce dossier
- [ ] Les placer dans votre dossier `portfolio` local
- [ ] Créer le dossier `public/assets/images/`
- [ ] Créer le dossier `public/assets/documents/`
- [ ] Copier vos images dans `public/assets/images/`
- [ ] Copier votre CV dans `public/assets/documents/`

## 💻 ÉTAPE 2 : Installation

```bash
cd /mnt/c/Users/lucas/Desktop/CoursEpitech/portfolio
npm install
```

## 🚀 ÉTAPE 3 : Test

```bash
npm run dev
```

Ouvrir : http://localhost:3000

## ✅ ÉTAPE 4 : Vérifications

- [ ] Le nom s'affiche avec l'effet typing
- [ ] La navbar change au scroll
- [ ] Les animations fade-in fonctionnent
- [ ] La modale CV s'ouvre et se ferme
- [ ] Les boutons "J'aime" fonctionnent
- [ ] Le design est identique à l'original

## 📤 ÉTAPE 5 : GitHub

```bash
mkdir _old
mv index.html style.css script.js likes.js likes.php _old/
git add .
git commit -m "🚀 Migration vers Next.js"
git push origin main
```

## 🌐 ÉTAPE 6 : Déploiement Vercel

1. Aller sur vercel.com
2. Se connecter avec GitHub
3. Importer le repo portfolio
4. Cliquer sur Deploy

## 🎉 C'EST FINI !

Votre portfolio Next.js est en ligne !

---

## 📁 Fichiers les plus importants

1. `app/page.tsx` - Votre portfolio complet
2. `app/api/likes/route.ts` - API des likes
3. `components/LikeButton.tsx` - Bouton like
4. `app/globals.css` - Tout votre CSS

## 🆘 Problèmes ?

### Erreur "Module not found"
```bash
npm install
```

### Images ne s'affichent pas
Vérifiez : `public/assets/images/profile.png` existe

### Likes ne fonctionnent pas
Vérifiez : `data/likes.json` existe

### Port 3000 déjà utilisé
```bash
npx kill-port 3000
npm run dev
```

---

**Temps estimé : 15 minutes**

Bon courage ! 🚀
