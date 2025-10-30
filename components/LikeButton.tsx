'use client';

import { useEffect, useState } from 'react';

interface LikeButtonProps {
  projectId: string;
}

export default function LikeButton({ projectId }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Charger les likes au montage
  useEffect(() => {
    loadLikes();
  }, []);

  // Charger les likes depuis l'API
  const loadLikes = async () => {
    try {
      const response = await fetch('/api/likes?action=get');
      const data = await response.json();

      if (data.success && data.likes[projectId] !== undefined) {
        setLikes(data.likes[projectId]);
        
        // Vérifier si déjà liké (cookie)
        const hasLiked = document.cookie
          .split('; ')
          .find(row => row.startsWith(`liked_${projectId}=`));
        
        setIsLiked(!!hasLiked);
      }
    } catch (error) {
      console.error('Erreur chargement likes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer le clic sur le bouton like
  const handleLike = async () => {
    if (isLiked) {
      showNotification('Vous avez déjà liké ce projet !', 'info');
      return;
    }

    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project: projectId }),
      });

      const data = await response.json();

      if (data.success) {
        setLikes(data.likes);
        setIsLiked(true);
        showNotification('❤️ Merci pour votre soutien !', 'success');
      } else {
        showNotification(data.message, 'info');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('Erreur réseau', 'error');
    }
  };

  // Afficher une notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;

    if (type === 'success') {
      notification.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    } else if (type === 'error') {
      notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    } else {
      notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  };

  if (isLoading) {
    return (
      <button className="like-button" disabled>
        <svg
          className="heart-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="like-count">...</span> J'aime
      </button>
    );
  }

  return (
    <button
      className={`like-button ${isLiked ? 'liked' : ''}`}
      onClick={handleLike}
      disabled={isLiked}
    >
      <svg
        className="heart-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="like-count">{likes}</span> J'aime
    </button>
  );
}
