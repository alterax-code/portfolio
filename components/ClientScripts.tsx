'use client';

import { useEffect, useRef } from 'react';

export default function ClientScripts() {
  const hasTyped = useRef(false);

  useEffect(() => {
    // Effet typing pour le nom (s'exécute une seule fois)
    if (!hasTyped.current) {
      const typingText = document.getElementById('typing-text');
      const textToType = 'JACOB Lucas';
      let index = 0;

      // Vider le texte d'abord
      if (typingText) {
        typingText.textContent = '';
      }

      function typeWriter() {
        if (typingText && index < textToType.length) {
          typingText.textContent += textToType.charAt(index);
          index++;
          setTimeout(typeWriter, 150);
        }
      }

      typeWriter();
      hasTyped.current = true;
    }

    // Effet scroll sur la navbar
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Effet fade-in sur les éléments
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkVisibility() {
      fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
          element.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Vérifier au chargement

    // Scroll smooth pour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            const offsetTop = (targetSection as HTMLElement).offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }
        }
      });
    });

    // Styles pour les animations de notification
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }

      @keyframes heartBeat {
        0%, 100% {
          transform: scale(1);
        }
        25% {
          transform: scale(1.3);
        }
        50% {
          transform: scale(1.1);
        }
        75% {
          transform: scale(1.2);
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  return null;
}