import LikeButton from '@/components/LikeButton';
import CVModal from '@/components/CVModal';
import ClientScripts from '@/components/ClientScripts';

export default function Home() {
  return (
    <>
      <ClientScripts />
      
      <nav id="navbar">
        <div className="container nav-container">
          <div className="logo">LJ</div>
          <ul className="nav-links">
            <li><a href="#about">À propos</a></li>
            <li><a href="#skills-analysis">Compétences</a></li>
            <li><a href="#last-projects">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <header>
        <h1 id="typing-text"></h1>
        <p>Développeur Web Full-Stack</p>
        <div className="cv-buttons">
          <a
            href="/assets/documents/CV_2025-09-04_Lucas_Jacob.pdf"
            download="CV_Lucas_Jacob.pdf"
            className="cv-button cv-download"
          >
            <span>Télécharger mon CV</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
          <CVModal />
        </div>
      </header>

      <section id="about">
        <div className="container">
          <h2>À propos</h2>

          <div className="about-grid">
            <div className="about-card fade-in">
              <h3>Mon Parcours</h3>
              <p>
                Actuellement étudiant à <strong>EPITECH</strong>, je me forme au
                développement informatique depuis maintenant
                <strong> 1 an et demi</strong>. Passionné par la création de
                solutions web innovantes, j&apos;ai rapidement développé des
                compétences solides en développement front-end et back-end.
              </p>
              <p>
                Mon parcours m&apos;a permis de maîtriser plusieurs langages et
                technologies, et de réaliser des projets concrets qui démontrent
                ma capacité à transformer des idées en applications
                fonctionnelles.
              </p>
              <p>
                <strong>Objectif professionnel :</strong> Devenir développeur
                full-stack confirmé et contribuer à des projets innovants dans une
                équipe dynamique.
              </p>
            </div>

            <div className="about-card profile-card fade-in">
              <h3>Profile</h3>
              <img
                src="/assets/images/profile.png"
                alt="Lucas Jacob - Développeur Web Full-Stack"
                className="profile-img"
              />
              <p>
                <strong>Lucas JACOB</strong><br />
                Développeur Full-Stack<br />
                Étudiant EPITECH<br />
                Passionné par les nouvelles technologies
              </p>
              <div className="social-links">
                <a
                  href="https://github.com/alterax-code"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jcb-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="about-card fade-in">
              <h3>Compétences Techniques</h3>
              <table>
                <thead>
                  <tr>
                    <th>Technologie</th>
                    <th>Niveau</th>
                    <th>Expérience</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>HTML/CSS</td>
                    <td>Avancé</td>
                    <td>1.5 ans</td>
                  </tr>
                  <tr>
                    <td>JavaScript</td>
                    <td>Intermédiaire+</td>
                    <td>1 an</td>
                  </tr>
                  <tr>
                    <td>PHP</td>
                    <td>Intermédiaire</td>
                    <td>8 mois</td>
                  </tr>
                  <tr>
                    <td>MySQL</td>
                    <td>Intermédiaire</td>
                    <td>8 mois</td>
                  </tr>
                  <tr>
                    <td>Python</td>
                    <td>Intermédiaire</td>
                    <td>6 mois</td>
                  </tr>
                  <tr>
                    <td>React</td>
                    <td>Débutant</td>
                    <td>3 mois</td>
                  </tr>
                  <tr>
                    <td>Git</td>
                    <td>Intermédiaire</td>
                    <td>1 an</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="skills-analysis">
        <div className="container">
          <h2>Analyse de mes Compétences</h2>
          <p className="section-intro">
            Voici une analyse détaillée de mes réalisations et de ma progression
            dans le développement de mes compétences techniques.
          </p>

          <div className="skill-analysis fade-in">
            <h3>Développement Web Front-End</h3>
            <div className="skill-level">Niveau : Avancé</div>

            <h4>Compétences acquises</h4>
            <div className="skill-block">
              <ul>
                <li>
                  <strong>HTML5 / CSS3</strong> : Maîtrise des standards modernes,
                  sémantique HTML, Flexbox, Grid, animations CSS
                </li>
                <li>
                  <strong>JavaScript</strong> : Manipulation du DOM, événements,
                  fetch API, async/await, ES6+
                </li>
                <li>
                  <strong>Responsive Design</strong> : Mobile-first, media
                  queries, adaptation multi-écrans
                </li>
                <li>
                  <strong>Accessibilité</strong> : ARIA, structure sémantique,
                  navigation clavier
                </li>
              </ul>
            </div>

            <h4>Réalisations concrètes</h4>
            <div className="skill-block">
              <ul>
                <li>
                  Création de ce portfolio avec animations, modal, scroll fluide
                  et système de likes interactif
                </li>
                <li>
                  Interface responsive testée sur mobile, tablette et desktop
                </li>
                <li>Implémentation d&apos;un carrousel de projets GitHub dynamique</li>
              </ul>
            </div>

            <h4>Progression</h4>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: '85%' }}>85%</div>
              </div>
            </div>
            <p className="progress-note">
              J&apos;ai progressé de débutant à avancé en 1.5 ans. Mes prochains
              objectifs : maîtriser React et TypeScript.
            </p>
          </div>

          <div className="skill-analysis fade-in">
            <h3>Développement Back-End</h3>
            <div className="skill-level">Niveau : Intermédiaire</div>

            <h4>Compétences acquises</h4>
            <div className="skill-block">
              <ul>
                <li>
                  <strong>PHP</strong> : POO, gestion de sessions, cookies,
                  manipulation de fichiers JSON
                </li>
                <li>
                  <strong>MySQL</strong> : Conception de bases de données,
                  requêtes SQL, jointures, CRUD
                </li>
                <li>
                  <strong>API RESTful</strong> : Création d&apos;endpoints, gestion des
                  requêtes HTTP, réponses JSON
                </li>
                <li>
                  <strong>Sécurité</strong> : Validation des données, prévention
                  injections SQL, authentification
                </li>
              </ul>
            </div>

            <h4>Réalisations concrètes</h4>
            <div className="skill-block">
              <ul>
                <li>
                  Site de recettes avec authentification complète et base de
                  données MySQL
                </li>
                <li>
                  Système de likes avec API PHP, stockage JSON et protection par
                  cookies
                </li>
                <li>
                  CRUD complet : création, lecture, modification, suppression de
                  données
                </li>
                <li>Upload et gestion d&apos;images côté serveur</li>
              </ul>
            </div>

            <h4>Progression</h4>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: '70%' }}>70%</div>
              </div>
            </div>
            <p className="progress-note">
              Passé de bases théoriques à des applications fonctionnelles en 8
              mois. Objectif : approfondir Node.js et les architectures MVC.
            </p>
          </div>

          <div className="skill-analysis fade-in">
            <h3>Programmation Python & Game Development</h3>
            <div className="skill-level">Niveau : Intermédiaire</div>

            <h4>Compétences acquises</h4>
            <div className="skill-block">
              <ul>
                <li>
                  <strong>Python</strong> : Syntaxe, structures de données, POO,
                  gestion d&apos;erreurs
                </li>
                <li>
                  <strong>Pygame</strong> : Boucle de jeu, sprites, collisions,
                  gestion des événements
                </li>
                <li>
                  <strong>Unreal Engine</strong> : Blueprints, level design,
                  inputs joueur, caméras 3D
                </li>
                <li>
                  <strong>Logique algorithmique</strong> : Optimisation,
                  résolution de problèmes
                </li>
              </ul>
            </div>

            <h4>Réalisations concrètes</h4>
            <div className="skill-block">
              <ul>
                <li>
                  Jeu du pendu en Pygame avec interface graphique et système de
                  score
                </li>
                <li>
                  Projet 3D dans Unreal Engine avec interactions et environnements
                </li>
                <li>Gestion de collisions et animations de sprites</li>
              </ul>
            </div>

            <h4>Progression</h4>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: '65%' }}>65%</div>
              </div>
            </div>
            <p className="progress-note">
              Découverte du game dev il y a 6 mois. Objectif : approfondir l&apos;IA de
              jeu et les systèmes complexes.
            </p>
          </div>

          <div className="skill-analysis fade-in">
            <h3>Outils & Méthodes</h3>
            <div className="skill-level">Niveau : Intermédiaire</div>

            <h4>Compétences acquises</h4>
            <div className="skill-block">
              <ul>
                <li>
                  <strong>Git & GitHub</strong> : Versioning, branches, commits,
                  pull requests, collaboration
                </li>
                <li>
                  <strong>VS Code</strong> : Extensions, debugging, raccourcis,
                  productivité
                </li>
                <li>
                  <strong>Méthode agile</strong> : Sprints, itérations, user
                  stories (EPITECH)
                </li>
                <li>
                  <strong>Documentation</strong> : README, commentaires de code,
                  markdown
                </li>
              </ul>
            </div>

            <h4>Réalisations concrètes</h4>
            <div className="skill-block">
              <ul>
                <li>
                  Tous mes projets sont versionnés sur GitHub avec historique
                  propre
                </li>
                <li>Documentation complète de chaque projet</li>
                <li>Travail en équipe sur des projets collaboratifs à EPITECH</li>
              </ul>
            </div>

            <h4>Progression</h4>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}>75%</div>
              </div>
            </div>
            <p className="progress-note">
              Utilisation quotidienne depuis 1 an. Objectif : maîtriser GitHub
              Actions et CI/CD.
            </p>
          </div>

          <div className="skills-summary fade-in">
            <h3>Synthèse de ma Progression</h3>
            <div className="summary-grid">
              <div className="summary-card">
                <h4>Début 2024</h4>
                <p>Découverte du développement web avec HTML/CSS</p>
              </div>
              <div className="summary-card">
                <h4>Mi-2024</h4>
                <p>Premier projet full-stack avec PHP et MySQL</p>
              </div>
              <div className="summary-card">
                <h4>Fin 2024</h4>
                <p>Maîtrise du front-end et découverte du game dev</p>
              </div>
              <div className="summary-card">
                <h4>Aujourd&apos;hui</h4>
                <p>
                  Développeur full-stack capable de mener des projets complets
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="last-projects">
        <div className="container">
          <h2>Mes Projets</h2>

          <div className="project-card-detailed fade-in" data-project-id="site-recettes">
            <img src="/assets/images/recettes.png" alt="Site de recettes de cuisine" />

            <div className="project-content">
              <h3>Site de recettes de cuisine</h3>

              <div className="like-section">
                <LikeButton projectId="site-recettes" />
              </div>

              <p className="project-description">
                Application web complète permettant de créer, partager et découvrir
                des recettes de cuisine. Système d&apos;authentification, CRUD complet et
                interface responsive.
              </p>

              <div className="project-section">
                <h4>🛠 Technologies utilisées :</h4>
                <div className="tech-tags">
                  <span className="tech-tag">PHP</span>
                  <span className="tech-tag">MySQL</span>
                  <span className="tech-tag">HTML/CSS</span>
                  <span className="tech-tag">JavaScript</span>
                </div>
              </div>

              <div className="project-section">
                <h4>Compétences développées :</h4>
                <ul>
                  <li>
                    Base de données relationnelle (tables utilisateurs et recettes)
                  </li>
                  <li>Authentification et gestion de sessions</li>
                  <li>CRUD complet (ajout, modification, suppression de recettes)</li>
                  <li>Upload et gestion d&apos;images</li>
                  <li>Design responsive mobile-first</li>
                </ul>
              </div>

              <div className="project-section">
                <h4>Défis surmontés :</h4>
                <p>
                  Sécurisation des formulaires contre les injections SQL, gestion du
                  redimensionnement d&apos;images uploadées, création d&apos;une interface
                  intuitive.
                </p>
              </div>

              <div className="project-section">
                <h4>Ce que j&apos;ai appris :</h4>
                <p>
                  J&apos;ai découvert l&apos;importance de la validation des données côté
                  serveur, la structuration d&apos;une base de données et la gestion de
                  l&apos;état utilisateur.
                </p>
              </div>

              <div className="project-links">
                <a
                  href="https://github.com/alterax-code/recettes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  Code source
                </a>
              </div>

              <div className="project-date">
                <small>Réalisé en : Septembre 2024</small>
              </div>
            </div>
          </div>

          <div className="project-card-detailed fade-in" data-project-id="jeu-pygame">
            <img
              src="/assets/images/pygame.png"
              alt="Jeu développé avec Python et Pygame"
            />

            <div className="project-content">
              <h3>Jeu Python avec Pygame</h3>

              <div className="like-section">
                <LikeButton projectId="jeu-pygame" />
              </div>

              <p className="project-description">
                Jeu vidéo 2D développé en Python avec la librairie Pygame. Projet
                d&apos;étude pour apprendre les bases de la programmation et de la logique
                de jeu.
              </p>

              <div className="project-section">
                <h4>🛠 Technologies utilisées :</h4>
                <div className="tech-tags">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Pygame</span>
                </div>
              </div>

              <div className="project-section">
                <h4>Compétences développées :</h4>
                <ul>
                  <li>Logique de programmation avec Python</li>
                  <li>Boucle de jeu et gestion d&apos;événements</li>
                  <li>Gestion de sprites et animations</li>
                  <li>Détection de collisions</li>
                  <li>Interface graphique simple</li>
                </ul>
              </div>

              <div className="project-section">
                <h4>Défis surmontés :</h4>
                <p>
                  Comprendre la boucle de jeu infinie, gérer les FPS, optimiser les
                  collisions pour éviter les ralentissements.
                </p>
              </div>

              <div className="project-section">
                <h4>Ce que j&apos;ai appris :</h4>
                <p>
                  Python est un langage polyvalent qui va au-delà du web. J&apos;ai
                  découvert la logique de programmation orientée jeu vidéo.
                </p>
              </div>

              <div className="project-links">
                <a
                  href="https://github.com/alterax-code/pygame-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  Code source
                </a>
              </div>

              <div className="project-date">
                <small>Réalisé en : Octobre 2024</small>
              </div>
            </div>
          </div>

          <div className="project-card-detailed fade-in" data-project-id="jeu-unreal">
            <img
              src="/assets/images/unreal.png"
              alt="Jeu développé avec Unreal Engine"
            />

            <div className="project-content">
              <h3>Jeu Unreal Engine</h3>

              <div className="like-section">
                <LikeButton projectId="jeu-unreal" />
              </div>

              <p className="project-description">
                Projet de jeu 3D développé avec Unreal Engine. Expérimentation avec la
                création de jeux 3D, les blueprints et le level design.
              </p>

              <div className="project-section">
                <h4>🛠 Technologies utilisées :</h4>
                <div className="tech-tags">
                  <span className="tech-tag">Unreal Engine</span>
                  <span className="tech-tag">Blueprints</span>
                  <span className="tech-tag">C++</span>
                </div>
              </div>

              <div className="project-section">
                <h4>Compétences développées :</h4>
                <ul>
                  <li>Découverte d&apos;un moteur de jeu professionnel</li>
                  <li>Programmation visuelle avec Blueprints</li>
                  <li>Création de niveaux et environnements 3D</li>
                  <li>Gestion de caméras et inputs joueur</li>
                  <li>Initiation au C++ pour le gaming</li>
                </ul>
              </div>

              <div className="project-section">
                <h4>Défis surmontés :</h4>
                <p>
                  Prise en main d&apos;un outil complexe, comprendre la logique des
                  blueprints, optimiser les performances 3D.
                </p>
              </div>

              <div className="project-section">
                <h4>Ce que j&apos;ai appris :</h4>
                <p>
                  Le développement de jeux 3D nécessite une approche différente.
                  Unreal Engine est un outil puissant mais demande du temps pour
                  maîtriser.
                </p>
              </div>

              <div className="project-links">
                <a
                  href="https://github.com/alterax-code/unreal-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  Code source
                </a>
              </div>

              <div className="project-date">
                <small>Réalisé en : Novembre 2024</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2>Contact</h2>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="lastname">Nom</label>
              <input type="text" id="lastname" name="lastname" required />
            </div>

            <div className="form-group">
              <label htmlFor="firstname">Prénom</label>
              <input type="text" id="firstname" name="firstname" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>

            <button type="submit">Envoyer le message</button>
          </form>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Lucas Jacob - Tous droits réservés</p>
      </footer>
    </>
  );
}
