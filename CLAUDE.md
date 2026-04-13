# Portfolio Lucas Jacob — Config Projet

## What
2 chantiers séquentiels :
1. Mise à jour vanilla HTML/CSS/JS (GitHub Pages — alterax-code.github.io/portfolio/)
2. Migration Next.js 15 + deploy Vercel (lucas-jacob.com)

Specs complètes : SPEC_COMPLETE.md (33p) + SPEC_MIGRATION.md (18p)
Audits : AUDIT_REPORT.md + AUDIT_REPORT_V2.md
Décisions validées : DECISIONS.md

## Current State
- Site HTML/CSS/JS sur GitHub Pages (contenu obsolète 2024)
- lucas-jacob.com = 404 Vercel (rien déployé)
- Theme : CSS contient DEUX thèmes (bleu legacy + dark/rouge dans les variables)
- CV à jour (2025-2026) disponible : CV_Jacob_Lucas.pdf

## Decisions (validées par Lucas)
- Carrousel : Embla Carousel (2.4KB)
- Animations : CSS natif UNIQUEMENT (pas Framer Motion)
- Contact : Resend + Server Action (Next.js) / Formspree (vanilla)
- Likes : SUPPRIMER → remplacer par liens GitHub stars
- i18n : Custom React Context (Next.js) / data-attributes (vanilla)
- Projets ordre : VOLT → Opti 5G (5e national) → PrankGuard → Fist of Steel → Job Board → Portfolio → Recettes
- Compétences : supprimer Blender, Rust → 70%
- Concours : 5e place nationale (PAS 6e — vérifié sur le CV)

## Design — À IMPLÉMENTER (n'existe pas encore dans le CSS)
- --primary-red: #DC143C | --dark-red: #8B0000 | --bg-dark: #0A0A0A
- Le thème dark/rouge est NOUVEAU — le CSS actuel est bleu/clair
- Glow, gradients, scrollbar custom, particules, hover lifts = tout à créer

## Commands
- `npm run dev` / `npm run build` / `npm run lint` (Next.js)

## Rules
- IMPORTANT: Lire SPEC_COMPLETE.md et DECISIONS.md AVANT de coder
- IMPORTANT: Un commit par étape logique
- IMPORTANT: Tester responsive (mobile/tablette/desktop) à chaque composant
- Répondre en français, code en anglais
