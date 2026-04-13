# AUDIT REPORT V2 — Portfolio lucas-jacob.com
> Rédigé le 2026-04-12 | Sources : SPEC_COMPLETE.md (33p), SPEC_MIGRATION.md (18p), AUDIT_REPORT.md, index.html, style.css (~850 lignes), script.js, likes.js, likes.php

---

## AVERTISSEMENT PRÉLIMINAIRE — DÉCOUVERTE CRITIQUE

**Le premier audit avait raison pour la mauvaise raison.**

Il concluait que le thème bleu/clair du CSS était une "discordance" avec les specs. C'est correct — mais la raison vraie est différente : **les specs affirment "extraire ces valeurs du CSS actuel" (section 11.1 SPEC_COMPLETE) alors que ces valeurs n'existent PAS dans le CSS réel.** La vérification ligne par ligne du style.css confirme qu'il n'y a aucun `#DC143C`, aucun `#0A0A0A` comme fond global, aucun glow rouge sur les titres. Ce n'est pas une divergence — c'est une **spec qui décrit un design futur comme s'il était déjà implémenté.**

Conséquences directes :
1. La totalité du thème visuel est à créer from scratch
2. La phrase "conserver à l'identique" est trompeuse : il n'y a rien à conserver, seulement à créer
3. Tout audit précédent qui se basait sur "le design actuel" est donc fondé sur du vent

---

## 1. VALIDATION DU PREMIER AUDIT

### Stack

| Recommandation AUDIT V1 | Statut | Détail |
|---|---|---|
| Next.js 15 (pas 14) | ✅ CONFIRMÉ | Les specs disent "14+" = placeholder. `create-next-app@latest` donne 15.x en avril 2026. Pas de raison de verrouiller à 14. |
| ❌ Framer Motion → CSS natif | ⚠️ NUANCÉ | Les specs l'incluent explicitement pour fade-in scroll + hovers. Techniquement, l'IO + CSS transitions couvrent 95% des besoins. **Verdict final : skip Framer Motion** — les barres de progression animées et les fade-in se font en CSS pur, le carousel Embla gère ses propres transitions. Framer Motion = 45KB pour un portfolio. |
| ❌ Swiper/Embla → CSS scroll-snap | ❌ INVALIDÉ | Le premier audit sous-estimait les specs du carousel. Les requirements incluent : loop infini, dots auto-générés, responsive 1/2/3 cards, swipe tactile, fleches stylisées. CSS scroll-snap ne peut pas gérer le loop ni les dots dynamiques. **Embla à 2.4KB gzip est justifié.** |
| Tailwind + CSS custom properties | ✅ CONFIRMÉ | Section 11 SPEC_COMPLETE et section 8.2 SPEC_MIGRATION convergent : étendre Tailwind config + CSS vars pour le thème. |
| `output: 'export'` | ⚠️ NUANCÉ | Valide SEULEMENT si Formspree (pas d'API route contact) et localStorage/API externe pour les likes. Incompatible avec `app/api/likes/route.ts` mentionné dans SPEC_MIGRATION. Voir section 6. |
| Supabase pour les likes | ⚠️ NUANCÉ | Les specs ne précisent pas de base de données pour les likes en Next.js. SPEC_MIGRATION liste une API Route mais sans stockage spécifié. Supabase est valide mais introduit une dépendance externe. Alternative : Vercel KV ou suppression pure. |
| Resend pour le contact | ⚠️ NUANCÉ | Les specs recommandent Formspree (Option A) ou Nodemailer (Option B). Resend est techniquement supérieur mais nécessite une Server Action. **Pour rapidité de déploiement : Formspree. Pour signal technique sur le CV : Resend.** Décision selon priorité. |

### Architecture / Design

| Recommandation AUDIT V1 | Statut | Détail |
|---|---|---|
| SPA mono-page | ✅ CONFIRMÉ | Les deux specs convergent : SPA avec sections + anchors. |
| Structure `data/projects.ts` | ✅ CONFIRMÉ | Section 10.1 SPEC_COMPLETE et section 3.2 SPEC_MIGRATION définissent exactement cette structure. |
| `<dialog>` natif pour modal CV | ⚠️ NUANCÉ | Les specs décrivent une modal custom (section 12 "CvModal"). `<dialog>` est plus accessible mais les specs ne le mentionnent pas. Changement mineur, mais à valider. |
| Particules canvas 2D custom | ✅ CONFIRMÉ | SPEC_COMPLETE section 11.2 : "Fond particules : Background avec radial-gradient subtils rouges et animation de particules." Les specs ne prescrivent pas de lib — canvas custom est le choix optimal. |
| Hamburger mobile manquant | ✅ CONFIRMÉ | Section 12 SPEC_COMPLETE : "Sur mobile : menu hamburger." Le CSS actuel fait `display: none` sur les nav-links à 768px — aucun fallback hamburger. À créer. |

### Contenu

| Recommandation AUDIT V1 | Statut | Détail |
|---|---|---|
| Ordre projets modifié (Opti 5G en #2) | ⚠️ NUANCÉ | Les specs mettent Fist of Steel en #2 (après VOLT) pour la complexité POO/équipe. Le premier audit mettait Opti 5G en #2 pour le "6e national." Les deux sont défendables. Voir section 2. |
| CV sept 2024 = urgent | ✅ CONFIRMÉ | Les deux specs listent "CV PDF à jour" dans la checklist mais ne fournissent pas le CV mis à jour. C'est un prérequis humain, pas technique. |
| Contenu bilingue FR/EN | ✅ CONFIRMÉ — et sous-estimé | SPEC_COMPLETE fournit des textes FR/EN complets pour TOUT le contenu. C'est plus de travail que prévu (7 projets × 2 langues × description courte + longue). |
| "1 an et demi" obsolète | ✅ CONFIRMÉ | Section 8 SPEC_COMPLETE : "Supprimer '1 an et demi'." Déjà identifié et prévu. |

---

## 2. ANALYSE CONTENU (Partie A, SPEC_COMPLETE)

### Textes bio FR/EN — Qualité pour un recruteur

**Points forts :**
- La structure "parcours atypique → titre pro → EPITECH MSc" est efficace : elle transforme une reconversion en asset
- "Ce qui me distingue" = direct, répond à la question du recruteur avant qu'il la pose
- Mention de VOLT comme "création d'un langage de programmation en Rust" : signal technique fort
- Version EN de qualité équivalente — pas une traduction mécanique

**Problèmes à corriger :**
- "Parcours atypique passant par différents secteurs" — trop vague. La section Timeline mentionne pâtisserie → fibre optique → code. Un recruteur tech trouve ça humain et mémorable. Assumer ce parcours plutôt que le cacher.
- "Je suis actuellement en recherche d'une alternance" — dès que tu obtiens l'alternance, ce texte est faux. Prévoir une mise à jour ou formuler en "disponible pour alternance dès [date]".
- Titre "Développeur Full Stack & Data Science" dans le typing effect et la navbar : c'est long. Réduire à "Full Stack & Data Science" ou l'afficher sur 2 lignes.

**Décision : les textes de la spec sont bons à utiliser tels quels** avec les deux corrections ci-dessus.

### Compétences — Réalisme des niveaux

| Technologie | Niveau Spec | Verdict |
|---|---|---|
| HTML5/CSS3 à 85% | ✅ Cohérent | Portfolio + projets multiples |
| JavaScript ES6+ à 80% | ✅ Cohérent | |
| React à 65% | ✅ Cohérent | Portfolio + Job Board |
| Rust à 65% | ⚠️ Sous-évalué | Construire un compilateur + VM bytecode = compréhension profonde. Un recruteur senior verrait 70-75% minimum. |
| Machine Learning à 40% | ✅ Honnête | "Concepts RAG, préparation entretien" = débutant+. Ne pas gonfler. |
| Blender/3D à 30% | ❌ Inutile | "Modélisation basique, Lens Studio" ne dit rien à un recruteur web/data. Supprimer cette entrée. |
| C/C++ à 40% | ✅ Cohérent | "Projets EPITECH, optimisation 5G" |
| Docker à 40% | ⚠️ À vérifier | Si pas utilisé régulièrement, le mentionner peut être contre-productif si le recruteur pose des questions |

**Recommandation :** Supprimer Blender. Rehausser Rust à 70%. Garder tout le reste.

### Ordre des 7 projets — Optimal ?

**Ordre SPEC_COMPLETE :** VOLT → Fist of Steel → PrankGuard → Opti 5G → Job Board → Portfolio → Recettes

**Analyse depuis la perspective recruteur :**

| Position | Projet SPEC | Argument pour | Argument contre |
|---|---|---|---|
| #1 | VOLT (Rust) | ✅ Unicité absolue — personne d'autre n'a construit un compilateur | Rust est niche |
| #2 | Fist of Steel (Java) | ✅ Travail d'équipe + complexité technique | Score quantifié < 6e national |
| #3 | PrankGuard (Python) | ✅ Cybersécurité + vision par ordinateur | |
| #4 | Opti 5G (Python/C++) | **⚠️ "6e national" devrait être en #2** | L'achievement est le meilleur signal quantifié du portfolio |
| #5 | Job Board (Node/React/MySQL) | ✅ Full-stack complet | |
| #6 | Portfolio (Next.js) | ✅ Meta-projet | |
| #7 | Recettes (PHP) | ✅ Position finale correcte | Le plus faible, mais montre la progression |

**Recommandation :** Échanger Opti 5G (#4) et Fist of Steel (#2) :
→ VOLT → **Opti 5G (6e national)** → PrankGuard → **Fist of Steel** → Job Board → Portfolio → Recettes

Un "6e place nationale" est un chiffre que le recruteur retient. Le mettre en #2 maximise son impact.

### Timeline — Complète ?

La timeline de la spec est bonne mais manque deux entrées :
- ❌ Pas de mention du **Titre Pro RNCP 5** obtenu en 2024 (pourtant mentionné dans la bio)
- ❌ Pas de mention de la **compétition 5G 2025** (séparée des projets, c'est un événement daté)
- ✅ "Ne pas mentionner le parcours antérieur" = décision correcte — le code confirme cette stratégie

La timeline est compacte et claire. Les 7 entrées couvrent 2023-2026 avec une progression visible.

### Descriptions FR/EN projets — Qualité

Toutes les descriptions sont de qualité professionnelle. Quelques observations :

- **VOLT** : La mention du "web playground interactif" est un excellent ajout — montre que le projet est accessible à quelqu'un qui veut tester.
- **Fist of Steel** : "Développé en équipe" est important à mentionner — signal collaboration.
- **PrankGuard** : "Application de sécurité Windows" — préciser si c'est une application déployée ou un POC.
- **Opti 5G** : "6e place nationale" apparaît dans la description. ✅ Bien visible.
- **Recettes** : "Premier projet full stack" — la spec le positionne explicitement comme démonstration de progression. Correct.

---

## 3. ANALYSE VANILLA (Partie B, SPEC_COMPLETE)

### Carrousel vanilla JS (section 7)

**Ce qui est solide :**
- Architecture viewport/track/cards est standard et éprouvée
- `transform: translateX()` = performant (GPU compositing)
- Génération dynamique des dots = correct

**Ce qui manque dans la spec :**
- Pas de `ResizeObserver` — si la fenêtre est redimensionnée après init, le carousel ne recalcule pas le nombre de cards visibles
- Le mécanisme de loop n'est pas spécifié. Loop infini propre = soit cloner les premiers/derniers slides (Embla-style), soit modulo. La spec dit juste "revenir à 0" = pas un vrai loop, juste un reset
- Pas de gestion du `overflow: hidden` sur le body pendant un swipe horizontal pour éviter le scroll vertical parasite
- Swipe : threshold de détection non précisé (combien de pixels = swipe ?)

**Verdict :** Utilisable pour la version backup GitHub Pages. Pas de loop propre — à accepter pour la version vanilla.

### i18n data-attributes (section 9)

**Ce qui fonctionne :**
```javascript
el.textContent = el.getAttribute('data-' + currentLang);
```

**Ce qui ne fonctionne pas :**
- `placeholder` des inputs : `textContent` ne modifie pas les placeholders → les labels des champs de formulaire restent dans la langue initiale
- `alt` des images : inaccessible par cette méthode
- `aria-label` : inaccessible
- Balises `<title>` et `<meta>` : impossibles à changer côté client de manière SEO-friendly
- Le toggle ne change pas l'attribut `lang` du `<html>` → les screen readers ne savent pas la langue active

**Fix minimal pour la version vanilla :**
```javascript
// Au lieu de juste textContent
el.textContent = el.getAttribute('data-' + currentLang);
// Ajouter :
if (el.hasAttribute('data-placeholder-' + currentLang)) {
  el.placeholder = el.getAttribute('data-placeholder-' + currentLang);
}
document.documentElement.lang = currentLang;
```

**Verdict :** Fragile mais acceptable pour un backup GitHub Pages. Ne pas essayer d'en faire plus sans React.

### Likes localStorage

Pour la version vanilla :
- Sémantiquement : un "like" qui ne persiste que sur votre propre navigateur n'est pas un like, c'est un bookmark
- **Acceptable pour la version backup** — personne n'ira sur GitHub Pages quand Vercel est live
- Impact zéro sur la version Next.js principale

### Contact — Comparaison des services

| Service | Free tier | Spam | Setup | Verdict |
|---|---|---|---|---|
| **Formspree** | 50 soumissions/mois | Basique | HTML form POST | Spec recommande → OK pour démo |
| **Web3Forms** | 250 soumissions/mois | Honeypot | API key client-side | ✅ Meilleur ratio volume/simplicité |
| **EmailJS** | 200 emails/mois | Faible | SDK + clé exposée | ⚠️ Clé API dans le frontend |
| **Resend** | 100/jour | Configurable | Server Action + .env | ✅ Best practice mais Next.js seulement |

**Pour la version vanilla :** Web3Forms (5× plus de quota que Formspree, même simplicité)
**Pour Next.js :** Formspree (rapidité) ou Resend (signal tech). Resend si vous voulez montrer que vous savez faire une Server Action.

### Durée réaliste pour la mise à jour vanilla

La spec ne donne pas de total pour la Partie B. Estimation :
- 10 modifications index.html (section 6) : 2h (contenu seul)
- Carousel CSS + JS (section 7) : 1.5h
- i18n (section 9) : 1h
- 7 projets HTML : 1h
- **Total vanilla : ~5-6h**

Question stratégique : si vous faites la version vanilla, vous re-faites en grande partie le même travail que Next.js. **Ne pas faire les deux.**

---

## 4. ANALYSE NEXT.JS (Partie C, SPEC_COMPLETE + SPEC_MIGRATION)

### Next.js 14 vs 15

Les deux specs disent "14+" — ce `+` est intentionnel et signifie "14 minimum, utiliser ce qui est disponible."
En avril 2026, `npx create-next-app@latest` donne Next.js 15. **Utiliser 15.**

Différences importantes entre 14 et 15 pour ce projet :
- **Async request APIs** (15) : `cookies()`, `headers()`, `params` sont maintenant async → affecter les API routes si on en crée
- **Turbopack stable** (15) : `next dev --turbo` est stable → build dev plus rapide
- **React 19** (15) : `useActionState`, `useFormStatus` → simplifie le formulaire de contact

### Embla vs CSS scroll-snap — Verdict définitif

La spec est détaillée sur les requirements du carousel (section 13 SPEC_COMPLETE) :

```
- Loop infini
- Dots auto-générés (nombre variable selon les données)
- Responsive : 1/2/3 cards selon breakpoint
- Swipe tactile
- Flèches stylisées avec glow rouge
- Dot actif plus grand avec glow
```

CSS scroll-snap couvre : swipe tactile, responsive partiel.
CSS scroll-snap **ne couvre pas** : loop infini, dots dynamiques, flèches controllables par JS.

**Embla à 2.4KB gzip couvre tout.** Le premier audit avait tort.

### Framer Motion — Verdict définitif

Ce que la spec veut Framer Motion pour faire :
- Fade-in au scroll → `IntersectionObserver + CSS transitions` (déjà dans le site actuel, 0 dépendance)
- Hover sur les cartes → CSS `:hover` + `transition`
- Transitions de slide du carousel → Embla gère ça

Il n'y a **aucune animation** dans les specs qui nécessite Framer Motion.

**Décision : supprimer Framer Motion.** 45KB économisés. Animations identiques.

Exception possible : si vous voulez des `AnimatePresence` (animations de sortie du DOM) pour la modal CV. Mais `<dialog>` natif avec CSS `@keyframes` suffit.

### Tailwind pur vs Tailwind + CSS modules

La spec est explicite : Tailwind + CSS custom properties. La config Tailwind doit étendre les couleurs :

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'primary-red': '#DC143C',
      'dark-red': '#8B0000',
      'bg-dark': '#0A0A0A',
      'bg-dark-2': '#1A1A1A',
      'text-light': '#E0E0E0',
      'accent-red': '#FF0000',
    }
  }
}
```

Les effets qui **doivent rester en CSS custom** (impossibles à exprimer proprement en Tailwind) :
- `text-shadow: 0 0 10px rgba(220, 20, 60, 0.5)` (glow titres)
- `::webkit-scrollbar` + `scrollbar-color` (scrollbar rouge)
- Canvas particles
- Animation `@keyframes` pour les barres de progression

### output: 'export' — Applicable ou non ?

Dépend des choix faits pour contact + likes :

| Choix | output: 'export' | Pros | Cons |
|---|---|---|---|
| Formspree + localStorage likes | ✅ Possible | Déployable GitHub Pages aussi | Likes non persistants cross-user |
| Formspree + Supabase likes (fetch côté client) | ✅ Possible | Likes persistants | Supabase key exposée en client (OK pour likes publics) |
| Nodemailer API Route + API likes | ❌ Impossible | Full server-side | Vercel uniquement, pas GitHub Pages |

**Recommandation :** Formspree + appels Supabase côté client → `output: 'export'` activé → déployable partout.

### next-intl vs Custom Context

**next-intl** en 2026 :
- Route-based i18n : `/fr/`, `/en/` dans l'URL
- 40KB+ de dépendances
- Configuration complexe du middleware
- SEO optimal (Google indexe `/fr/` et `/en/` séparément)

**Custom Context** (ce que la spec décrit, section 14) :
- Un seul URL (`lucas-jacob.com`), toggle change la langue sans rechargement
- 0 dépendance
- Simple : `createContext` + `localStorage`
- SEO : Google indexe seulement la version FR (langue par défaut)
- Adéquat pour un portfolio personnel

**Verdict : Custom Context.** Pour un portfolio, le SEO multilingue est secondaire. La simplicité de l'implémentation prime. La spec recommande elle-même "custom" en option.

### Formspree vs Resend + Server Action

**Formspree (spec recommande) :**
```jsx
<form action="https://formspree.io/f/xxxxx" method="POST">
  {/* champs */}
</form>
```
- Zero config React
- Fonctionne même sans JS (fallback natif)
- 50/mois gratuit (largement suffisant pour un portfolio)

**Resend + Server Action :**
```typescript
// app/actions.ts
'use server'
import { Resend } from 'resend';
// ...envoi email + validation Zod
```
- Montre une Server Action dans le code (signal React 19 / Next.js 15)
- Montre la gestion d'une API key
- 100/jour gratuit

**Verdict :** Si vous avez 30 minutes de plus, faites Resend — un recruteur qui lit le code verrait une Server Action Next.js 15, ce qui est plus impressionnant qu'un POST à Formspree. Si vous voulez livrer vite, Formspree.

---

## 5. DESIGN — AUDIT CSS APPROFONDI

### Réalité du CSS actuel (vérification complète)

Après lecture intégrale des ~850 lignes de style.css, voici ce qui existe réellement :

**Couleurs présentes dans le CSS :**
- Primary: `#1976d2` (bleu Material) — 40+ occurrences
- Fonds: `#f4f4f4` (body), `white` (cards)
- Textes: `#333`, `#555`, `#666`, `#888`
- Exceptions rouges : `#d32f2f` (close modal uniquement), `#ff4757` (like hover uniquement)
- Exception sombre : `background: #0a0a0a` sur les images projet (fond des screenshots)

**Ce que les specs réclament et qui n'existe PAS :**
- Fond de page `#0A0A0A` → inexistant
- Cards `#1A1A1A` → inexistant
- `#DC143C` comme couleur principale → inexistant
- `text-shadow` glow rouge → inexistant
- `backdrop-filter: blur` sur la navbar → inexistant
- `scrollbar-color` rouge → inexistant
- Barres de progression avec gradient rouge pulsant → les barres actuelles sont bleues unies
- Canvas particles → inexistant

**Patterns CSS réutilisables (structure, pas couleurs) :**

| Pattern | Ligne approx. | Réutilisable ? |
|---|---|---|
| `.fade-in` / `.visible` avec transitions | L.199-208 | ✅ Oui — même logique, nouvelles couleurs |
| Hover lift `translateY(-10px)` | L.226-228 | ✅ Oui |
| Modal avec `backdrop-filter: blur(10px)` | L.636-657 | ✅ Oui |
| Structure `.project-card-detailed` | L.434-564 | ✅ Adapter au nouveau thème |
| `.tech-tag` badge | L.492-500 | ✅ Réutilisable (changer couleurs) |
| Responsive breakpoint `@media (max-width: 768px)` | L.748 | ✅ Garder les breakpoints |
| `.like-button` états (défaut, hover, liked) | L.810-849 | ✅ Réutilisable |

**Code mort / à ne pas migrer :**
- `.timeline` (non utilisé dans le HTML actuel)
- `.projects-grid` (remplacé par carousel)
- `.skill-analysis`, `.skill-header`, `.skill-content` (structure complètement différente dans les specs)
- `.skills-summary` / `.summary-grid` (remplacé par timeline verticale)
- Tout `#1976d2` et ses variantes

### Animations — État réel vs Specs

| Animation | Dans style.css actuel | Dans les specs | Action |
|---|---|---|---|
| `blink` (curseur typing) | ✅ Oui (L.92-99) | ✅ Conserver | Réutiliser |
| `bounce` (hover CV download) | ✅ Oui (L.157-164) | Non mentionné | Garder |
| `pulse` (hover CV view) | ✅ Oui (L.170-177) | Non mentionné | Garder |
| `fade-in` scroll | ✅ Oui (CSS + JS) | ✅ Conserver | Réutiliser la logique, IO |
| `fadeIn` modal | ✅ Oui (L.650-657) | ✅ Conserver | Réutiliser |
| `heartBeat` like | Dans likes.js (JS) | Non mentionné | Garder |
| Glow pulsant progress bars | ❌ Absent | ✅ Créer | À ajouter |
| Particles header | ❌ Absent | ✅ Créer | Canvas 2D |
| Navbar blur au scroll | ⚠️ Partiel (`rgba(25,118,210,0.95)`, pas de `backdrop-filter`) | ✅ Créer | Ajouter `backdrop-filter: blur(10px)` |
| Scrollbar rouge | ❌ Absent | ✅ Créer | `::webkit-scrollbar` + `scrollbar-color` |

**Conclusion design :** ~70% du design est à créer from scratch. 30% du CSS est de la structure réutilisable.

---

## 6. RISQUES ET DÉPENDANCES

### Cartographie des bloquants

```
CV mis à jour (humain)
    └─► BLOQUANT ABSOLU avant lancement public
    
Contenu textes/projets (dans spec)
    └─► Disponible dans SPEC_COMPLETE Partie A
    └─► Non bloquant : utiliser le contenu de la spec tel quel
    
Screenshots projets (manquants)
    └─► Spec dit "placeholder ou couleur du thème" → ACCEPTABLE
    └─► Non bloquant pour le lancement
    
Base de données pour les likes Next.js
    └─► Spec lacunaire (API Route sans storage spécifié)
    └─► Solution : localStorage côté client (simple) ou Supabase (persistant)
    └─► Non bloquant si on accepte localStorage
    
Alternance trouvée avant mise à jour du texte
    └─► Risque : texte "en recherche d'alternance" devient faux
    └─► Non bloquant mais à anticiper : prévoir une variable dans translations.ts
```

### Vanilla PUIS Next.js vs Directement Next.js ?

**Scénario A : Vanilla update d'abord (5-6h), puis Next.js (8-10h)**
- Total : 13-16h
- Avantage : site mis à jour rapidement sur GitHub Pages (visibilité immédiate)
- Inconvénient : 70% du travail en doublon (tous les textes, tous les projets)

**Scénario B : Directement Next.js (8-10h)**
- Total : 8-10h
- Avantage : 50% de temps économisé
- Inconvénient : pendant les 8-10h de dev, lucas-jacob.com affiche "DEPLOYMENT_NOT_FOUND"

**Recommandation : Scénario B**

La raison pour Scénario A s'effondre dès qu'on réalise que :
1. Le site actuel GitHub Pages a un contenu de 2024 — personne n'est en train de le regarder
2. lucas-jacob.com est déjà cassé (404 Vercel) — le statu quo est déjà mauvais
3. Faire la vanilla update est du temps gaspillé si Next.js suit dans la semaine

**Exception :** Si tu as une entrevue dans 2 jours et que tu veux quelque chose de correct sur GitHub Pages très vite — là oui, fais d'abord une mise à jour vanilla minimale.

---

## 7. PLAN D'ACTION FINAL

### Durée réaliste par phase

| Phase | Contenu | Estimation réaliste |
|---|---|---|
| **1 — Init** | create-next-app, tailwind config, globals.css (vars + scrollbar + reset dark), types de base | 1.5h |
| **2 — Données** | `data/projects.ts`, `data/skills.ts`, `data/timeline.ts`, `data/translations.ts` (FR+EN complet depuis SPEC_COMPLETE Partie A) | 1.5h |
| **3 — Layout + Navbar** | LangContext, layout.tsx, Navbar (hamburger mobile inclus), metadata SEO | 1h |
| **4 — Hero** | Typing effect, boutons CV, particles canvas, gradient rouge | 1h |
| **5 — About** | Grid 2 colonnes, texte parcours, profil card, photo, liens sociaux | 45min |
| **6 — Carousel (composant)** | Embla React, flèches, dots, responsive 1/2/3, swipe, loop | 1h |
| **7 — Skills** | 5 SkillCards dans Carousel, barres de progression animées (CSS), niveaux | 45min |
| **8 — Projects** | 7 ProjectCards dans Carousel, placeholders images, tech tags, liens GitHub, date | 1h |
| **9 — Timeline** | Verticale compacte, points rouges, 7 entrées de la spec | 30min |
| **10 — Contact** | Formulaire + Resend Server Action (ou Formspree si pressé) | 45min |
| **11 — Modal CV + Footer** | `<dialog>` natif, preview image, download button, footer 2026 | 30min |
| **12 — i18n** | LangContext + hook `useTranslations`, wiring dans tous les composants | 1h |
| **13 — Deploy** | Push GitHub, import Vercel, liaison lucas-jacob.com, env vars | 30min |
| **14 — Polish** | Tests mobile/tablette/desktop, Lighthouse, aria-labels, `<Image>` next/image | 1h |
| **TOTAL** | | **~13h** (SPEC_COMPLETE estime 8h — sous-évalué) |

### Ce qui peut être parallélisé

Avec Claude Code : **tout est séquentiel** (une session à la fois). Mais certaines phases sont découplées et peuvent être préparées en dehors du code :

- **Préparer les assets avant de coder** : rassembler les screenshots projets (même en basse résolution), updater le CV PDF → fait à l'avance = 0h de blocage en session
- **Écrire les données FR/EN dans un doc texte** avant la Phase 2 → copier-coller plutôt que typer en live

### Chemin critique pour site live le plus vite

```
Phase 1 (Init) → Phase 2 (Données) → Phase 3 (Layout) → Phase 13 (Deploy)
```

Après ces 4 phases (~4.5h), vous avez un site live sur lucas-jacob.com avec le bon thème et le bon contenu, même sans tous les composants. Le carousel et les animations peuvent être ajoutés après.

---

## 8. VERDICT FINAL

### Les specs sont-elles une bonne base de travail ?

**SPEC_COMPLETE.md : OUI, excellente base** — 33 pages avec le contenu exact FR/EN, les niveaux de compétences, les descriptions projets, la timeline, les specs visuelles détaillées, le plan étape par étape. C'est du travail sérieux.

**SPEC_MIGRATION.md : Bonne base, mais obsolète sur certains points** — Plan de migration correct mais daté (Next.js 14, pas de mention i18n, timeline 6h30 trop optimiste). SPEC_COMPLETE.md le remplace sur tous les points.

### Décisions mauvaises à changer

| Décision dans les specs | Problème | Remplacement |
|---|---|---|
| Next.js 14 | Obsolète | Next.js 15 (`@latest`) |
| Framer Motion | 45KB pour des fade-ins | CSS IntersectionObserver |
| "Ces valeurs sont extraites du CSS actuel" (section 11) | Faux — aucune de ces valeurs n'existe dans style.css | Reformuler : "ces valeurs DOIVENT être implémentées" |
| 6h30 / 8h | Sous-évalué de 40-60% | 12-13h avec i18n et full design |
| Blender dans les compétences | Signal négatif | Supprimer |
| Fist of Steel en #2 | Opti 5G a un chiffre (6e national) | Opti 5G en #2, Fist en #4 |
| `likes/route.ts` sans DB précisée | Lacune de spec | localStorage client ou Supabase |

### Ce qui manque encore

1. **Le CV mis à jour** — non-technique mais bloquant absolu. Tout le reste peut être codé, mais un portfolio de développeur en 2026 avec un CV de septembre 2024 est un signal de négligence.

2. **Screenshots des projets** — Non bloquants (placeholders acceptés), mais idéalement à rassembler pendant le dev.

3. **Une phrase de contexte sur l'alternance** — "Je suis actuellement en recherche d'alternance" → doit devenir une variable facilement mise à jour (`data/translations.ts`), pas du texte hardcodé.

4. **Test du domaine email** — contact@lucas-jacob.com est actif (Google Workspace configuré selon SPEC_MIGRATION DNS). Tester avant de brancher le formulaire.

5. **Favicon** — Mentionnée dans la checklist mais aucune spec sur le design. Un "LJ" rouge sur fond noir en SVG prend 10 minutes et complète le branding.

### Note finale

La spec est un document de qualité qui prouve que la conception a été pensée sérieusement. Le seul vrai mensonge est dans la section 11 ("valeurs extraites du CSS actuel") — ce point crée une fausse sécurité sur l'effort de design. Une fois ce malaise résolu conceptuellement, le projet est parfaitement exécutable.

**L'obstacle numéro un n'est pas technique. C'est le CV.**
