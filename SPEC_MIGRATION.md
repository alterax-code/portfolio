PORTFOLIO MIGRATION
PLAN DE PROJET
Lucas Jacob — lucas-jacob.com
De HTML/CSS/JS vers Next.js + Vercel
Document de specification technique
Version 1.0 — 12/04/2026
Auteur
Lucas Jacob (alterax)
Domaine
lucas-jacob.com
Repo GitHub
github.com/alterax-code/portfolio
Hebergement
Vercel (Hobby Plan)
Outil de dev
Claude Code (terminal)
Email pro
contact@lucas-jacob.com
Page 1 / 18
Portfolio Migration — Lucas Jacob

---
SOMMAIRE
1. Etat des lieux — Ce qu'on a aujourd'hui
2. Objectifs — Ce qu'on veut obtenir
3. Architecture technique — Comment on le fait
4. Charte graphique — Le design a conserver
5. Structure des pages et sections
6. Systeme de carrousel — Gain de place
7. Projets a mettre en avant
8. Stack technique et dependances
9. Plan de migration pas a pas
10. Deploiement Vercel + DNS
11. Workflow Claude Code
12. Checklist finale
Page 2 / 18
Portfolio Migration — Lucas Jacob

---
1. ETAT DES LIEUX
1.1 Portfolio actuel (GitHub Pages)
Le portfolio actuel est heberge sur GitHub Pages a l'adresse alterax-code.github.io/portfolio/. Il
s'agit d'un site statique en HTML/CSS/JavaScript pur, sans aucun framework. Il a ete cree dans le
cadre du module T-ENT-500 a EPITECH fin 2024.
Fichiers actuels :
Fichier
Role
Status
index.html
Structure HTML du site
A migrer vers JSX/React
style.css
Design dark/rouge complet (800+
lignes)
A convertir en Tailwind + CSS
modules
script.js
Typing effect, modal CV, scroll,
nav
A migrer en hooks React
likes.js
Systeme de likes (appelle
likes.php)
A remplacer par API Route
Next.js
likes.php
Backend PHP pour likes
A supprimer (remplace par API
Route)
assets/
Images + CV PDF
A migrer dans /public
1.2 Problemes identifies
• Contenu obsolete : Les projets listes (recettes PHP, pendu Pygame, Unreal Engine) datent de fin
2024 et ne refletent plus le niveau actuel.
• Competences manquantes : Aucune mention de Rust, Java, Node.js, React, Data Science, ni
des projets significatifs (VOLT, Fist of Steel, PrankGuard, optimisation 5G).
• CV date : Le CV affiche est de septembre 2024.
• Page trop longue : Toutes les sections affichent tous leurs elements en colonne, rendant le scroll
excessif.
• Pas de framework : Un portfolio en HTML pur ne montre pas de competence technique avancee
a un recruteur.
• PHP inutilisable : Le systeme de likes en PHP ne fonctionne pas sur GitHub Pages.
• Domaine mort : lucas-jacob.com affiche une erreur 404 Vercel (DEPLOYMENT_NOT_FOUND).
1.3 Infrastructure actuelle
Service
Provider
Status
Page 3 / 18
Portfolio Migration — Lucas Jacob

---
Domaine
Namecheap
lucas-jacob.com (actif, DNS OK)
DNS
Namecheap
PremiumDNS
A record: 76.76.21.21 (Vercel)
Hebergement
Vercel (Hobby)
Aucun projet deploye
Code source
GitHub (alterax-code)
Repo 'portfolio' existant
Email
Google Workspace
contact@lucas-jacob.com (actif)
GitHub Pages
GitHub
alterax-code.github.io/portfolio (actif)
Page 4 / 18
Portfolio Migration — Lucas Jacob

---
2. OBJECTIFS
2.1 Objectifs principaux
• Migrer vers Next.js : Reconstruire le portfolio avec le framework React/Next.js pour demontrer
une maitrise technique avancee.
• Deployer sur Vercel : Connecter le repo GitHub a Vercel pour un deploiement continu
automatique sur lucas-jacob.com.
• Conserver l'identite visuelle : Garder le theme dark/rouge (crimson), la meme charte graphique,
les memes couleurs, la meme 'pate'.
• Reduire la longueur de page : Implementer des carrousels horizontaux pour les sections
multi-elements (projets, competences) au lieu d'empiler verticalement.
• Mettre a jour le contenu : Remplacer les projets obsoletes par les vrais projets significatifs et
mettre a jour les competences.
• Garder GitHub Pages : Conserver la version HTML comme archive/backup sur
alterax-code.github.io/portfolio.
2.2 Resultat attendu
Un portfolio moderne, rapide, responsive, deploye sur lucas-jacob.com via Vercel, avec
deploiement automatique a chaque push GitHub. Le site conserve le design dark/rouge actuel mais
avec une navigation plus compacte grace aux carrousels. Le contenu reflete le niveau reel de Lucas
Jacob en avril 2026 : MSc Data Science EPITECH, stack Python/Rust/Java/React/Node.js, projets
ambitieux (VOLT, PrankGuard, Fist of Steel, optimisation 5G).
Page 5 / 18
Portfolio Migration — Lucas Jacob

---
3. ARCHITECTURE TECHNIQUE
3.1 Stack technologique
Couche
Technologie
Pourquoi
Framework
Next.js 14+ (App Router)
SSR, routing, API routes, optimisation
images
UI
React 18+
Composants, hooks, state management
Styling
Tailwind CSS + CSS custom
properties
Rapidite de dev + variables pour le
theme dark/rouge
Animations
Framer Motion
Animations fluides, transitions de page,
carrousels
Carrousel
Embla Carousel ou Swiper
Carrousel tactile, responsive, leger
Icones
Lucide React
Icones modernes, tree-shakable
Langage
TypeScript
Typage, autocompletion, qualite de code
Deploiement
Vercel
CI/CD auto, preview deploys, SSL gratuit
Hebergement
code
GitHub
Repo existant, integration Vercel native
3.2 Structure du projet Next.js
portfolio-nextjs/
|-- app/
| |-- layout.tsx (Layout global + metadata SEO)
| |-- page.tsx (Page d'accueil = le portfolio)
| |-- globals.css (Variables CSS theme dark/rouge)
| |-- api/
| |-- likes/route.ts (API Route pour systeme de likes)
|-- components/
| |-- Navbar.tsx (Navigation fixe avec logo LJ)
| |-- Hero.tsx (Header avec typing effect)
| |-- About.tsx (Section A propos + profil)
| |-- Skills.tsx (Competences avec carrousel)
| |-- Projects.tsx (Projets avec carrousel)
| |-- Timeline.tsx (Parcours chronologique)
| |-- Contact.tsx (Formulaire de contact)
Page 6 / 18
Portfolio Migration — Lucas Jacob

---
| |-- Footer.tsx (Pied de page)
| |-- ui/
| |-- Carousel.tsx (Composant carrousel reutilisable)
| |-- ProgressBar.tsx (Barre de progression)
| |-- TechTag.tsx (Badge technologie)
| |-- ProjectCard.tsx (Carte projet pour carrousel)
| |-- SkillCard.tsx (Carte competence pour carrousel)
|-- data/
| |-- projects.ts (Donnees des projets)
| |-- skills.ts (Donnees des competences)
| |-- timeline.ts (Donnees du parcours)
|-- public/
| |-- images/ (Photos, screenshots projets)
| |-- documents/ (CV PDF)
|-- tailwind.config.ts (Config Tailwind + theme custom)
|-- next.config.js (Config Next.js)
|-- package.json
|-- tsconfig.json
Page 7 / 18
Portfolio Migration — Lucas Jacob

---
4. CHARTE GRAPHIQUE
Le design actuel doit etre conserve a l'identique. Voici les specifications exactes extraites du CSS
actuel :
4.1 Palette de couleurs
Variable
Valeur
Usage
--primary-red
#DC143C (Crimson)
Couleur principale, titres, accents,
boutons
--dark-red
#8B0000 (Dark Red)
Gradients, hover states, degradés
--bg-dark
#0A0A0A
Fond de page principal
--bg-dark-2
#1A1A1A
Fond des cartes et sections alternees
--text-light
#E0E0E0
Texte principal sur fond sombre
--accent-red
#FF0000
Accents vifs, glow effects
4.2 Effets visuels a conserver
• Gradients : linear-gradient(135deg, #1a0000, #0a0a0a) pour la navbar, degradés rouge/noir pour
les boutons.
• Glow effect : text-shadow: 0 0 10px rgba(220, 20, 60, 0.5) sur les titres.
• Bordures lumineuses : border: 1px solid rgba(220, 20, 60, 0.3) sur les cartes, qui passe a solid
sur hover.
• Box-shadow rouge : box-shadow: 0 8px 30px rgba(220, 20, 60, 0.4) au hover des cartes.
• Fond particules : Background avec radial-gradient subtils rouges et animation de particules.
• Barres de progression : Gradient rouge avec animation glow pulsante.
• Scrollbar custom : Rouge sur fond noir.
• Typing effect : Curseur clignotant sur le nom dans le header.
4.3 Typographie
Le site actuel utilise Arial/sans-serif. Pour la version Next.js, on conservera une font sans-serif
system avec possibilite d'utiliser Inter ou Geist (fonts optimisees par Vercel/Next.js). Le logo 'LJ'
dans la navbar reste en bold.
Page 8 / 18
Portfolio Migration — Lucas Jacob

---
5. STRUCTURE DES PAGES ET SECTIONS
Le portfolio est une Single Page Application (SPA) avec les sections suivantes, dans cet ordre :
Section
Contenu
Layout
1. Navbar
Logo LJ + liens ancres (A propos,
Competences, Projets, Contact)
Fixe en haut, blur au scroll
2. Hero
Nom avec typing effect, titre 'Dev Full
Stack & Data', boutons CV
Full viewport height, fond avec
particules
3. A propos
Parcours (reconversion, EPITECH),
photo profil, liens sociaux
Grid 2 colonnes (texte + profil
card)
4.
Competences
4-5 domaines (Frontend, Backend,
Data/Python, Langages systeme, Outils)
CARROUSEL horizontal de skill
cards
5. Projets
6+ projets majeurs avec screenshots,
description, tech tags
CARROUSEL horizontal de
project cards
6. Parcours
Timeline chronologique (patisserie >
fibre > autoformation > EPITECH)
Timeline verticale compacte
7. Contact
Email contact@lucas-jacob.com, liens
GitHub/LinkedIn, formulaire
Formulaire centre + infos contact
8. Footer
Copyright, liens rapides
Barre simple
Page 9 / 18
Portfolio Migration — Lucas Jacob

---
6. SYSTEME DE CARROUSEL
Le carrousel est la modification majeure du design. Au lieu d'empiler les elements verticalement (ce
qui rend la page tres longue), on les affiche dans un slider horizontal navigable.
6.1 Sections concernees
• Section Competences : Chaque domaine de competence (Frontend, Backend, Data, Systeme,
Outils) devient une 'slide' dans le carrousel. L'utilisateur navigue horizontalement avec des fleches
ou par swipe tactile.
• Section Projets : Chaque projet devient une carte dans le carrousel. Les cartes montrent un
apercu (image + titre + tech tags) et on peut cliquer pour voir le detail.
6.2 Specifications du carrousel
• Librairie recommandee : Embla Carousel (leger, 2.4kb gzip, React natif, tactile) ou Swiper (plus
complet, plus lourd).
• Navigation : Fleches gauche/droite + dots indicateurs + swipe tactile sur mobile.
• Cards visibles : 1 card sur mobile, 2 sur tablette, 3 sur desktop.
• Animation : Transition slide fluide avec Framer Motion ou CSS transitions.
• Autoplay : Non, l'utilisateur controle la navigation.
• Loop : Oui, le carrousel boucle a l'infini.
• Style des fleches : Cercles rouges (--primary-red) avec icone chevron blanc, glow au hover.
• Style des dots : Points rouges, le dot actif est plus grand et plus lumineux.
6.3 Gain de place estime
Actuellement, la section competences affiche 4 blocs de ~400px de haut empiles = ~1600px. Avec le
carrousel, elle n'occupera que ~500px (1 card visible + navigation). Meme gain pour les projets : 3
projets empiles (~2400px) deviennent ~600px. Gain total estime : ~3000px de scroll en moins, soit
une page environ 2x plus courte.
Page 10 / 18
Portfolio Migration — Lucas Jacob

---
7. PROJETS A METTRE EN AVANT
Les 3 projets actuels (recettes PHP, pendu Pygame, Unreal Engine) doivent etre remplaces ou
completes par des projets qui refletent le niveau reel :
Projet
Stack
Description
VOLT
Rust
Langage de scripting custom avec VM bytecode,
pipeline data, web playground
Fist of Steel
Java / LibGDX
Jeu 2D complet : sprites, Tiled maps, IA ennemis,
audio, menus, sauvegardes
PrankGuard
Python / Windows
App de securite avec reconnaissance faciale,
gestion USB, blocage reseau
Optimisation 5G
Python / C++
Algorithmes de placement d'antennes : recuit
simule, genetique, metaheuristiques
Portfolio
Next.js / React
Ce portfolio lui-meme (meta!), avec carrousels,
theme custom, deploy Vercel
Job Board
Node / React /
MySQL
Plateforme de recherche d'emploi avec
WebSocket, authentification, CRUD
Chaque carte projet dans le carrousel affichera : screenshot/preview, titre, description courte, tech
tags (badges colores), lien GitHub, date de realisation. Un clic ouvre un detail complet (modal ou
page dediee).
Page 11 / 18
Portfolio Migration — Lucas Jacob

---
8. STACK TECHNIQUE ET DEPENDANCES
8.1 Dependances npm a installer
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --app
--src-dir=false
cd portfolio-nextjs
# Dependances principales
npm install framer-motion # Animations
npm install embla-carousel-react # Carrousel
npm install lucide-react # Icones
npm install @tailwindcss/typography # Prose styling
# Dev dependencies (deja incluses par create-next-app)
# typescript, @types/react, tailwindcss, postcss, autoprefixer
8.2 Configuration Tailwind (tailwind.config.ts)
Etendre la config Tailwind avec les couleurs du theme dark/rouge pour pouvoir utiliser des classes
comme bg-dark, text-primary-red, border-primary-red/30, etc. Cela permet de conserver
exactement la meme charte graphique tout en beneficiant de l'utilitaire Tailwind.
Page 12 / 18
Portfolio Migration — Lucas Jacob

---
9. PLAN DE MIGRATION PAS A PAS
Ce plan est concu pour etre execute avec Claude Code dans le terminal. Chaque etape est
autonome et testable.
Etape
Description
Duree
Etape 1 : Initialisation
Creer le projet Next.js avec TypeScript et Tailwind.
Configurer les couleurs du theme dans
tailwind.config.ts et globals.css. Tester avec npm run
dev.
30 min
Etape 2 : Layout +
Navbar
Creer le layout global (metadata SEO, fonts,
structure). Migrer la navbar avec le logo LJ, les liens
ancres, et l'effet blur au scroll.
30 min
Etape 3 : Hero Section
Migrer le header avec le typing effect (useEffect +
useState), les boutons CV, le fond avec
particules/gradient.
30 min
Etape 4 : Section A
propos
Migrer la grille A propos avec le parcours, la photo
profil, les liens sociaux. Mettre a jour le contenu
(reconversion, EPITECH MSc).
30 min
Etape 5 : Composant
Carousel
Creer le composant Carousel reutilisable avec Embla
Carousel. Fleches, dots, responsive (1/2/3 cards),
swipe tactile.
45 min
Etape 6 : Section
Competences
Migrer les skill cards dans le carrousel. Mettre a jour
les competences (ajouter Rust, Java, Data Science,
etc.). Barres de progression avec animation.
45 min
Etape 7 : Section
Projets
Creer les project cards dans le carrousel. Ajouter les
vrais projets (VOLT, Fist of Steel, PrankGuard, 5G,
etc.). Tech tags, liens GitHub.
45 min
Etape 8 : Timeline +
Contact + Footer
Migrer la timeline du parcours. Creer le formulaire de
contact (avec action mailto ou API). Footer avec
copyright et liens.
30 min
Etape 9 : Animations
Ajouter les animations Framer Motion : fade-in au
scroll (intersection observer), transitions de slide,
hover effects sur les cartes.
30 min
Etape 10 : Modal CV +
SEO
Migrer le modal de visualisation du CV. Optimiser les
metadata SEO, Open Graph, favicon. Tester
responsive.
30 min
Etape 11 :
Deploiement
Push sur GitHub. Importer le projet sur Vercel. Lier
lucas-jacob.com. Tester le deploiement automatique.
20 min
Etape 12 : Polish
Tests finaux (mobile, tablette, desktop). Performance
(Lighthouse). Corrections de bugs. Accessibilite.
30 min
Page 13 / 18
Portfolio Migration — Lucas Jacob

---
Duree totale estimee : ~6h30 de travail avec Claude Code.
Page 14 / 18
Portfolio Migration — Lucas Jacob

---
10. DEPLOIEMENT VERCEL + DNS
10.1 Configuration DNS actuelle (Namecheap)
Type
Host
Value
Role
A
@
76.76.21.21
Pointe vers Vercel
CNAME
www
cname.vercel-dns.com
www vers Vercel
TXT
@
google-site-verification=...
Verification Google
Workspace
TXT
google._domaink
ey
v=DKIM1;k=rsa;p=...
DKIM pour emails
MX
@
smtp.google.com (prio 1)
Email Google Workspace
10.2 Etapes de deploiement sur Vercel
• 1. Pousser le code Next.js sur le repo GitHub alterax-code/portfolio (ou un nouveau repo dedie).
• 2. Aller sur vercel.com et se connecter.
• 3. Cliquer 'Import Project' et selectionner le repo GitHub.
• 4. Framework : Next.js (detecte automatiquement).
• 5. Cliquer 'Deploy' — Vercel build et deploie automatiquement.
• 6. Aller dans Settings > Domains et ajouter lucas-jacob.com.
• 7. Vercel verifie les DNS (deja configures) et active le SSL.
• 8. Chaque git push futur declenche un redeploiement automatique.
NB : L'ancienne version HTML reste accessible sur alterax-code.github.io/portfolio/ via GitHub
Pages, independamment du deploiement Vercel.
Page 15 / 18
Portfolio Migration — Lucas Jacob

---
11. WORKFLOW CLAUDE CODE
Claude Code est l'outil principal pour developper ce projet. Voici comment structurer les sessions :
11.1 Prompt initial recommande
"Voici le PDF de specification de mon projet de migration de portfolio.
[joindre le PDF]
Je veux migrer mon portfolio HTML/CSS/JS vers Next.js 14 avec
TypeScript et Tailwind. Le design doit rester identique (theme
dark/rouge crimson). Les sections competences et projets doivent
utiliser un carrousel horizontal (Embla Carousel).
Commence par l'etape 1 : initialiser le projet Next.js et
configurer le theme dans tailwind.config.ts et globals.css."
11.2 Bonnes pratiques avec Claude Code
• Procedez etape par etape : Ne demandez pas tout d'un coup. Faites une etape, testez, puis
passez a la suivante.
• Fournissez le contexte : Joignez ce PDF et les fichiers source (style.css surtout) pour que
Claude Code reproduise le design.
• Testez a chaque etape : Lancez npm run dev et verifiez le rendu avant de passer a la suite.
• Commitez souvent : Un commit par etape pour pouvoir rollback facilement.
• Utilisez les fichiers data/ : Mettez les donnees (projets, competences) dans des fichiers
TypeScript separes pour faciliter les mises a jour.
Page 16 / 18
Portfolio Migration — Lucas Jacob

---
12. CHECKLIST FINALE
Initialisation
I Projet Next.js cree avec TypeScript + Tailwind
I Theme dark/rouge configure dans tailwind.config.ts
I Variables CSS dans globals.css
I npm run dev fonctionne
Composants
I Navbar avec logo LJ et liens ancres
I Hero avec typing effect et boutons CV
I Section A propos avec contenu a jour
I Carousel composant reutilisable (Embla)
I Section Competences avec carrousel
I Section Projets avec carrousel
I Timeline du parcours
I Formulaire de contact
I Footer
I Modal CV
Contenu
I Projets mis a jour (VOLT, Fist of Steel, PrankGuard, 5G, etc.)
I Competences a jour (Rust, Java, Python, React, Node, Data Science)
I CV PDF a jour
I Photo de profil
I Liens GitHub et LinkedIn corrects
I Email contact@lucas-jacob.com dans le contact
Design
I Theme dark/rouge identique au site actuel
I Carrousels fonctionnels (fleches, dots, swipe)
I Animations Framer Motion (fade-in, hover)
I Responsive (mobile, tablette, desktop)
I Scrollbar custom rouge
Deploiement
Page 17 / 18
Portfolio Migration — Lucas Jacob

---
I Code push sur GitHub
I Projet importe sur Vercel
I lucas-jacob.com lie au projet Vercel
I SSL actif (HTTPS)
I Deploiement auto a chaque push
I GitHub Pages toujours actif en backup
Quality Assurance
I Lighthouse score > 90 (performance, SEO, accessibilite)
I Test sur Chrome, Firefox, Safari
I Test mobile (iOS + Android)
I Metadata SEO et Open Graph
I Favicon configuree
Page 18 / 18
Portfolio Migration — Lucas Jacob

---
