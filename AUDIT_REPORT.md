# AUDIT REPORT — Migration Portfolio lucas-jacob.com
> Rédigé le 2026-04-12. Sources : index.html, style.css (~850 lignes), script.js, likes.js, likes.php, CLAUDE.md.
> PDF inaccessible (pdftoppm absent sur la machine) → analyse basée sur les sources réelles + CLAUDE.md.

---

## ⚠️ DÉCOUVERTES CRITIQUES (à lire en premier)

### 1. DISCORDANCE MAJEURE : Thème bleu/clair ≠ thème rouge/sombre
Le **code actuel** utilise un thème **bleu Material (#1976d2) sur fond clair (#f4f4f4)**.
Le **CLAUDE.md** dit `--primary-red: #DC143C | --bg-dark: #0A0A0A | conserver à l'identique`.

Ces deux réalités sont incompatibles. La migration implique donc **une refonte visuelle complète**, pas seulement un changement de stack. Le temps estimé est donc sous-évalué d'un facteur 2.

### 2. PROJETS DANS LE HTML ≠ PROJETS DANS CLAUDE.MD
- **HTML actuel** : site-recettes, jeu-pygame, jeu-unreal (projets débutant, 2024)
- **CLAUDE.md** : VOLT (Rust), Fist of Steel (Java), PrankGuard (Python), Opti 5G, Job Board, portfolio

6 nouveaux projets à créer from scratch. Le carrousel prévu doit afficher **6 cards**, pas 3.

### 3. FORMULAIRE DE CONTACT CASSÉ
Le `<form>` n'a ni `action` ni handler JS. Il est actuellement **non-fonctionnel**.

### 4. CV DATÉ SEPTEMBRE 2024
En avril 2026, le CV a **19 mois**. Tout recruteur verra que le site n'est pas maintenu.

### 5. LIKES SYSTEM MORT SUR VERCEL
PHP + écriture fichier JSON = impossible sur Vercel (serverless Node.js uniquement).
Solution actuelle incompatible avec la cible de déploiement.

---

## 1. STACK

### Next.js

**Version** : En avril 2026, Next.js 15 est stable et recommendé. Next.js 14 = déprécié de facto.
Utiliser `create-next-app@latest` imposera Next.js 15.

**Next.js vs Astro** :

| Critère | Next.js 15 | Astro 5 |
|---|---|---|
| JS par défaut | Oui (hydration complète) | 0KB (islands architecture) |
| Lighthouse perf | Bon | Excellent |
| Courbe apprentissage | Moyenne | Faible |
| Valeur CV | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Static export | ✅ `output: 'export'` | ✅ natif |
| API Routes | ✅ | ✅ (endpoints) |

**Verdict** : Pour un portfolio **statique**, Astro est techniquement supérieur. Mais Next.js vaut plus sur un CV de dev qui vise "full-stack confirmé". ✅ **Garder Next.js 15** (pas 14) pour la valeur signal.

**App Router vs Pages Router** : Pour un site statique mono-page, la différence est quasi nulle. App Router = plus moderne, meilleur pour les metadata OG. ✅ **Garder App Router**.

**Static export** : `output: 'export'` dans next.config.ts suffit. Aucun serveur nécessaire, déployable partout (Vercel, GitHub Pages, Cloudflare Pages). ✅ **À activer**.

---

### Carrousel

| Lib | Poids gzippé | Complexité | Verdict |
|---|---|---|---|
| Swiper | ~100KB | Élevée | ❌ overkill |
| Embla | ~3KB | Faible | ⚠️ acceptable |
| CSS `scroll-snap` | **0KB** | Nulle | ✅ **suffisant** |

Pour 6 projets et ~6 tech cards, `scroll-snap-type: x mandatory` + `scroll-snap-align: start` est 100% suffisant. Pas de lib.

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}
.carousel-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

❌ **Supprimer** Embla/Swiper. CSS natif uniquement.

---

### Animations

| Option | Poids | Support 2026 | Verdict |
|---|---|---|---|
| Framer Motion | ~45KB | Excellent | ❌ overkill |
| CSS animations | 0KB | Universel | ✅ déjà en place |
| View Transitions API | 0KB | Chrome 111+, Firefox 119+, Safari 18 | ✅ production-ready |

Les animations actuelles (fade-in scroll, hover lifts, blink cursor) sont déjà en CSS pur et fonctionnent bien. La View Transitions API peut gérer les transitions entre états sans lib.

❌ **Supprimer** Framer Motion. ✅ **Garder CSS + ajouter View Transitions API** pour les transitions modal/section.

---

### Tailwind CSS

Le thème cible a des effets très spécifiques : glow rouge, gradients noirs/rouges, scrollbar custom, particules. Reproduire ça avec Tailwind impose des classes arbitraires partout (`bg-[#DC143C]`, `shadow-[0_0_20px_#DC143C]`).

CSS custom properties (variables) + modules CSS donnent un contrôle plus précis et un code plus lisible pour ce type de design.

**Mais** : Tailwind accélère le layout (navbar, grid, responsive). Solution hybride :

⚠️ **Modifier** : Tailwind pour le layout/spacing + CSS modules pour les effets custom (glow, gradients, scrollbar, particules).

```css
/* globals.css */
:root {
  --primary-red: #DC143C;
  --dark-red: #8B0000;
  --bg-dark: #0A0A0A;
  --glow-red: 0 0 20px rgba(220, 20, 60, 0.5);
}
```

---

### TypeScript

Le JS actuel fait ~90 lignes (script.js + likes.js). TypeScript n'apporte rien en sécurité de type pour ce volume. En revanche, il **démontre une compétence** à un recruteur qui lit le repo.

✅ **Garder TypeScript** uniquement pour la valeur signal. Ne pas en abuser — pas de types complexes là où `string` et `boolean` suffisent.

---

## 2. ARCHITECTURE

### Structure de fichiers recommandée

```
src/
  app/
    layout.tsx          ← metadata globale, font, scrollbar
    page.tsx            ← shell SPA avec sections
    globals.css         ← variables CSS + reset + scrollbar
  components/
    sections/
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Contact.tsx
    ui/
      Carousel.tsx
      Modal.tsx
      ParticleField.tsx
      LikeButton.tsx
  data/
    projects.ts         ← données des 6 projets
    skills.ts
  lib/
    actions.ts          ← Server Actions (likes, contact)
```

### SPA vs Multi-pages

Single Page Application = **meilleur choix** pour un portfolio :
- Une seule URL à partager/coller sur LinkedIn
- Navigation fluide entre sections
- Scroll anchor SEO acceptable (Google indexe les sections avec ID)
- Pas de pénalité SEO significative pour un site perso

✅ **Garder SPA** avec sections et `id` anchors.

---

## 3. DESIGN

### État réel du CSS actuel

Après lecture intégrale des ~850 lignes :

**Palette actuelle (BLEU/CLAIR)** — sera intégralement remplacée :
- Primary: `#1976d2` (Material Blue)
- Background: `#f4f4f4` (gris clair)
- Cards: `white`
- Text: `#333`, `#555`

**Ce qui est bon et réutilisable :**
- Logique `.fade-in` / `.visible` via IntersectionObserver (✅ garder)
- Structure `.project-card-detailed` (✅ adapter)
- Modal avec `backdrop-filter: blur(10px)` (✅ garder l'approche)
- Hover lifts `translateY(-10px)` (✅ garder)
- Bouton like + animation heartBeat (✅ garder)
- Responsive breakpoint `@media (max-width: 768px)` (✅ garder)

**Code mort / à supprimer :**
- `.timeline` (non utilisé dans le HTML actuel)
- `.projects-grid` (remplacé par carrousel)
- `.skill-header`, `.skill-content` (section restructurée)
- `.skills-summary` / `.summary-grid` (à reconsidérer)
- Couleur `#1976d2` partout (remplacée)

**"Conserver à l'identique" — est-ce réaliste avec Tailwind ?**
Non, pas pour les effets suivants :
- Scrollbar custom rouge (`scrollbar-color`, `::webkit-scrollbar`)
- Glow effects (`box-shadow: 0 0 20px rgba(220,20,60,0.5)`)
- Particules animées (canvas JS ou `@keyframes` avec pseudo-éléments)

Ces 3 éléments **doivent rester en CSS pur** ou en composant canvas. Tailwind ne peut pas les exprimer proprement.

---

## 4. FEATURES

### Système de Likes

**Problème** : PHP + écriture `likes.json` = mort sur Vercel.

| Option | Coût | Complexité | Persistance |
|---|---|---|---|
| PHP actuel | 0€ | Déjà fait | ❌ incompatible Vercel |
| localStorage | 0€ | Trivial | ❌ par appareil seulement |
| Supabase (free tier) | 0€ | Faible | ✅ cross-users, real DB |
| Upstash Redis | 0€ | Faible | ✅ fast, edge-compatible |
| Supprimer | 0€ | Nul | N/A |

**Recommandation** : ⚠️ **Modifier** → Supabase avec Server Action Next.js 15. Table simple :
```sql
CREATE TABLE likes (project_id TEXT PRIMARY KEY, count INT DEFAULT 0);
```
Protection anti-spam : `localStorage` flag côté client (comme maintenant avec cookies). Supabase free tier = 500MB, largement suffisant.

Si la complexité freine la livraison : ❌ **Supprimer** les likes et utiliser les étoiles GitHub directement via l'API publique GitHub (0 infrastructure).

### Formulaire de Contact

**État actuel** : `<form>` sans `action`, **entièrement cassé**.

| Option | Coût | Spam | Verdict |
|---|---|---|---|
| `mailto:` | 0€ | Aucun | ❌ UX horrible (ouvre client mail) |
| Resend | 0€/100 emails par jour | Faible | ✅ recommandé |
| Formspree | 0€/50 soumissions/mois | Moyen | ⚠️ acceptable |
| Server Action + Resend | 0€ | Configurable | ✅ optimal |

**Recommandation** : ✅ **Resend** via Server Action. SDK simple, 100 mails/jour gratuit, pas d'infrastructure.

```typescript
// app/actions.ts
'use server'
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
```

### Modal CV

La modal actuelle (image JPG du CV) est une **UX acceptable** mais montre un CV de sept 2024.

Options alternatives :
- `<dialog>` natif HTML5 : meilleur accessibility, plus simple que la DIY modal actuelle
- Embed PDF avec `<iframe>` : montre le vrai PDF, pas une image

**Problème principal** : le CV est **vieux de 19 mois**. L'UX de la modal compte moins que la fraîcheur du contenu.

⚠️ **Modifier** : Remplacer `<div id="cvModal">` par `<dialog>` natif + mettre à jour le PDF avant lancement. La modal image → embed PDF est un bonus.

### Typing Effect

Cliché ? Oui. Cliché efficace ? Aussi oui.

L'effet actuel type "JACOB Lucas" à 150ms/char. Simple, court, reconnaissable.
En 2026, l'effet reste courant sur les portfolios dev. Il ne nuit pas.

✅ **Garder** — mais réduire la vitesse à 80-100ms (plus fluide) et ajouter un cursor qui disparaît après la fin.

### Particules animées dans le header

**Non implémentées** dans le code actuel. À créer from scratch.

Options :
- `tsParticles` / `particles.js` : libs dédiées (~15-30KB), configuration JSON
- Canvas 2D custom : ~50 lignes JS, 0 dépendance, contrôle total
- CSS `@keyframes` avec pseudo-éléments : 0 JS, limité à <20 particules statiques

**Recommandation** : ✅ **Canvas 2D custom**. Pour 30-50 particules rouges qui dérivent, le canvas est léger et maîtrisé.

---

## 5. PERFORMANCE

### Images

Problèmes actuels :
- `profile.png` : PNG = lourd, pas de lazy loading
- `recettes.png`, `pygame.png`, `unreal.png` : même problème
- `CV_2025-09-04_Lucas_Jacob_page-0001.jpg` : image JPG du CV (~200-500KB ?)

Avec Next.js `<Image>` :
- Conversion automatique WebP/AVIF
- Lazy loading natif
- `sizes` prop pour responsive
- Placeholder blur

✅ **Utiliser `next/image` partout**. Gain Lighthouse attendu : +15-20 points performance.

### Fonts

Actuellement : `font-family: Arial, sans-serif` (système). Léger, pas de requête réseau.

Alternatives :
- `next/font/google` : charge la font en build time, 0 FOUT, 0 requête réseau runtime
- Garder Arial : acceptable, mais pas distinctif

⚠️ **Modifier** → `next/font/google` avec Geist ou Inter pour le body, garder une font mono pour le code. Impact Lighthouse CLS = 0.

### Bundle Size — Risques

Dépendances potentiellement lourdes à éviter :
- Framer Motion : ~45KB → ❌ non
- Swiper : ~100KB → ❌ non
- Three.js pour les particules : ~600KB → ❌ non

Stack cible visée : Next.js 15 + Tailwind (purgé) + CSS custom = bundle < 80KB JS. Réaliste.

### Lighthouse Score Cible

Avec `output: 'export'` + `next/image` + pas de libs lourdes + fonts optimisées :

| Métrique | Attendu |
|---|---|
| Performance | 95-100 |
| Accessibility | 90+ (si aria-labels corrects) |
| Best Practices | 100 |
| SEO | 95+ |

**Risques** pour l'accessibilité :
- Bouton "Voir mon CV" sans `aria-haspopup="dialog"`
- Like buttons sans `aria-label` explicite
- Contraste rouge sur noir à vérifier (DC143C sur 0A0A0A = ratio ~5.3:1 ✅ mais tester les variantes)

---

## 6. CONTENU

### Projets — Ordre optimal pour un recruteur

**Ordre actuel dans CLAUDE.md** (à revoir) :
VOLT, Fist of Steel, PrankGuard, Opti 5G, Job Board, portfolio

**Ordre recommandé pour impact recruteur** :
1. **VOLT** (Rust) — rareté + système → ouvre l'œil
2. **Opti 5G** — projet technique/réseau → montre profondeur
3. **Job Board** — full-stack web → pertinent pour les offres web
4. **PrankGuard** (Python) — IA/sécurité → différenciant
5. **Fist of Steel** (Java) — game dev → fun, montre diversité
6. **Portfolio** (Next.js) — le site lui-même → peut faire partie du carrousel

### Compétences — Cohérence avec le vrai niveau

Problèmes dans l'HTML actuel :
- React listé à "Débutant / 3 mois" → si tu migres vers Next.js, cette entrée doit être mise à jour
- "1 an et demi" d'expérience → en avril 2026, c'est plutôt 2 ans et demi
- PHP à "8 mois" → données de 2024, probablement plus maintenant
- Rust (VOLT) et Java (Fist of Steel) non mentionnés dans la table de compétences

⚠️ **Mettre à jour entièrement** la section compétences avec les vraies données 2026.

### Sections manquantes

| Section | Utile ? | Verdict |
|---|---|---|
| Témoignages | Peu probable à ce stade | ❌ skip |
| Certifications | Si disponibles (EPITECH, cours) | ⚠️ optionnel |
| Blog | Effort élevé, signal fort | ➕ roadmap future uniquement |
| Expériences pro | Stage, alternance ? | ➕ si applicable |
| Timeline EPITECH | Déjà partiellement en place | ✅ garder |

### Footer

Affiche `© 2025 Lucas Jacob` — en 2026. ⚠️ Corriger.

---

## 7. TIMELINE

### Estimation PDF vs Réalité

L'estimation de **6h30 avec Claude Code** suppose une migration de thème → thème. Mais c'est en réalité :
- Refonte visuelle complète (bleu/clair → rouge/sombre)
- 6 nouveaux projets à créer (contenu + images)
- Likes system à remplacer (Supabase setup)
- Contact form à créer from scratch (Resend)
- Particules à implémenter
- CV à mettre à jour
- Tous les textes à mettre à jour (années, tech)

**Estimation réaliste : 12-18h de travail effectif** (ou 4-6 sessions de 3h).

### Ordre optimal d'implémentation

```
Phase 1 — Foundation (2-3h)
  1. create-next-app@latest (Next.js 15, TypeScript, Tailwind, App Router)
  2. globals.css : variables CSS, scrollbar custom, reset dark theme
  3. Layout.tsx : navbar + footer + metadata OG
  4. Déploiement Vercel initial (domaine lucas-jacob.com)

Phase 2 — Sections statiques (3-4h)
  5. Hero : titre, typing effect, particules canvas, boutons CV
  6. About : photo, bio mise à jour, table compétences 2026
  7. Skills : carrousel CSS scroll-snap avec tech icons

Phase 3 — Projets (2-3h)
  8. data/projects.ts : 6 projets avec images, descriptions, liens
  9. Projects carousel
  10. Images : WebP optimisées via next/image

Phase 4 — Fonctionnel (2-3h)
  11. Contact form + Resend Server Action
  12. Likes system : Supabase setup + Server Action
  13. Modal CV → <dialog> natif + PDF mis à jour

Phase 5 — Polish (1-2h)
  14. Responsive mobile (navbar hamburger menu manquant !)
  15. Accessibilité (aria-labels, focus styles)
  16. Lighthouse audit + corrections
  17. Metadata SEO complète (OG image, sitemap)
```

**Étapes sous-estimées dans le PDF** (supposé) :
- Setup Supabase et variables d'environnement Vercel : 1h
- Création du contenu (textes, images) des 6 nouveaux projets : 2h
- Responsive navbar (actuellement `display: none` sur mobile, aucun hamburger) : 1h
- CV mis à jour : hors scope technique, mais bloquant

---

## 8. RECOMMANDATIONS

### STACK
| Décision | Verdict | Raison |
|---|---|---|
| Next.js 14 | ❌ → Next.js **15** | 14 = déprécié. `@latest` donne 15 |
| App Router | ✅ GARDER | Metadata API supérieure |
| `output: 'export'` | ➕ AJOUTER | Static = plus rapide, plus simple |
| TypeScript | ✅ GARDER | Signal CV, overhead minimal |
| Tailwind | ⚠️ MODIFIER | Tailwind layout + CSS custom pour glow/particules/scrollbar |
| Framer Motion | ❌ SUPPRIMER | CSS + View Transitions API suffisent |
| Embla/Swiper | ❌ SUPPRIMER | CSS scroll-snap natif, 0KB |
| Astro | ❌ (pour l'instant) | Next.js > valeur CV |

### ARCHITECTURE
| Décision | Verdict | Raison |
|---|---|---|
| SPA mono-page | ✅ GARDER | Meilleur partage URL |
| Structure `/components/sections/` | ✅ GARDER | Claire, scalable |
| `data/projects.ts` | ➕ AJOUTER | Séparer données/UI |
| Server Actions | ✅ GARDER | Likes + contact sans API route séparée |

### DESIGN
| Décision | Verdict | Raison |
|---|---|---|
| Thème sombre + crimson | ✅ GARDER | Cohérent CLAUDE.md, différenciant |
| CSS custom properties pour les couleurs | ✅ ESSENTIEL | Ne pas hardcoder `#DC143C` partout |
| Animations fade-in CSS | ✅ GARDER | Déjà bon, 0KB |
| Hover lifts | ✅ GARDER | Good UX |
| Navbar hamburger mobile | ➕ AJOUTER | Actuellement `display: none` sur mobile = site inutilisable |
| Scrollbar custom rouge | ✅ GARDER (CSS pur) | Signature visuelle |
| Particules canvas | ➕ AJOUTER | Prévu, pas encore implémenté |

### FEATURES
| Feature | Verdict | Alternative |
|---|---|---|
| Likes PHP | ❌ SUPPRIMER/REMPLACER | Supabase Server Action (ou GitHub stars) |
| Contact form (broken) | ⚠️ MODIFIER | Resend + Server Action |
| Modal CV (image) | ⚠️ MODIFIER | `<dialog>` natif + PDF actualisé |
| Typing effect | ✅ GARDER | Court, iconique |
| Particules header | ➕ AJOUTER | Canvas 2D custom ~50 lignes |

### CONTENU
| Élément | Verdict | Action requise |
|---|---|---|
| 3 projets actuels (HTML) | ❌ REMPLACER | 6 nouveaux projets CLAUDE.md |
| CV sept 2024 | ⚠️ URGENT | Mettre à jour avant lancement |
| "1 an et demi" d'expérience | ❌ FAUX | Corriger → ~2.5 ans en avril 2026 |
| Rust/Java dans compétences | ➕ AJOUTER | VOLT et Fist of Steel le justifient |
| Footer "2025" | ❌ FAUX | → 2026 |
| Navbar hamburger mobile | ➕ AJOUTER | Inexistant actuellement |

---

## VERDICT GLOBAL

Le plan de migration est **ambitieux mais réaliste** à condition de :

1. **Accepter que c'est une refonte complète**, pas une migration. Le thème change entièrement.
2. **Mettre à jour le contenu AVANT le code** (CV, textes, images des 6 projets).
3. **Viser Next.js 15**, pas 14.
4. **Éliminer Framer Motion et Swiper** — zéro justification pour un portfolio.
5. **Sécuriser le contact form et les likes** dès la Phase 4 — actuellement ces deux features sont soit cassées soit mortes.

La question la plus importante n'est pas la stack — c'est : **est-ce que le CV est prêt ?** Un portfolio parfait avec un CV de sept 2024 = signal négatif fort.
