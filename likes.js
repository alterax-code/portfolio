
async function loadLikes() {
    try {
        const response = await fetch('likes.php?action=get');
        const data = await response.json();
        
        if (data.success) {

            Object.keys(data.likes).forEach(projectId => {
                const button = document.querySelector(`[data-project="${projectId}"]`);
                if (button) {
                    const countSpan = button.querySelector('.like-count');
                    countSpan.textContent = data.likes[projectId];
                    

                    if (getCookie(`liked_${projectId}`)) {
                        button.classList.add('liked');
                        button.disabled = true;
                    }
                }
            });
        }
    } catch (error) {
        console.error('Erreur chargement likes:', error);
    }
}


function setupLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-button');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const projectId = this.getAttribute('data-project');
            

            if (this.classList.contains('liked')) {
                showNotification('Vous avez déjà liké ce projet !', 'info');
                return;
            }
            

            this.disabled = true;
            
            try {
                const response = await fetch(`likes.php?action=like&project=${projectId}`);
                const data = await response.json();
                
                if (data.success) {

                    const countSpan = this.querySelector('.like-count');
                    countSpan.textContent = data.likes;
                    

                    this.classList.add('liked');
                    

                    const heartIcon = this.querySelector('.heart-icon');
                    heartIcon.style.animation = 'none';
                    setTimeout(() => {
                        heartIcon.style.animation = 'heartBeat 0.5s ease';
                    }, 10);
                    
                    showNotification('❤️ Merci pour votre soutien !', 'success');
                } else {
                    showNotification(data.message, 'info');
                    this.disabled = false;
                }
            } catch (error) {
                console.error('Erreur:', error);
                showNotification('Erreur réseau', 'error');
                this.disabled = false;
            }
        });
    });
}


function showNotification(message, type = 'info') {

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
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

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
`;
document.head.appendChild(style);


window.addEventListener('load', () => {
    loadLikes();
    setupLikeButtons();
});