# DECISIONS — Validées le 12/04/2026

## Stratégie
- Faire vanilla (GitHub Pages) EN PREMIER, puis Next.js (Vercel/lucas-jacob.com)
- Ne PAS supprimer la version vanilla après — elle reste comme backup

## Stack Next.js
- Next.js 15 (pas 14) — utiliser `npx create-next-app@latest`
- TypeScript : oui
- Tailwind CSS + CSS custom properties (hybride)
- Embla Carousel (2.4KB) pour les carrousels
- PAS de Framer Motion — CSS natif uniquement (garder en mémoire pour plus tard)
- PAS de next-intl — Custom React Context pour i18n
- Resend + Server Action pour le formulaire de contact
- output: 'export' — NON (incompatible avec Server Action Resend)

## Features
- Likes : SUPPRIMER entièrement. Remplacer par lien vers GitHub stars du repo
- Contact vanilla : Formspree (Web3Forms si quota insuffisant)
- Contact Next.js : Resend + Server Action
- i18n vanilla : data-attributes (data-fr / data-en)
- i18n Next.js : Custom Context + data/translations.ts + localStorage

## Contenu
- Ordre projets : VOLT → Opti 5G (5e national) → PrankGuard → Fist of Steel → Job Board → Portfolio → Recettes
- Compétences : SUPPRIMER Blender/3D. Rust passe de 65% à 70%
- Concours : 5e place nationale (pas 6e — corrigé d'après le CV réel)
- Bio/textes : utiliser ceux de SPEC_COMPLETE.md Partie A (sections 1-5)
- CV : CV_Jacob_Lucas.pdf (version 2025-2026, à jour)
- Portfolio URL sur le CV : remplacer github.io par lucas-jacob.com après déploiement Next.js

## Corrections par rapport aux specs
- SPEC_COMPLETE section 11 dit "valeurs extraites du CSS actuel" → FAUX, ces valeurs n'existent pas, elles sont à CRÉER
- SPEC_COMPLETE/MIGRATION disent "6e national" → FAUX, c'est 5e (vérifié sur CV)
- SPEC_COMPLETE dit "Next.js 14+" → utiliser Next.js 15
- Timeline estimée 8h → réaliste : ~13h pour Next.js, ~5-6h pour vanilla
