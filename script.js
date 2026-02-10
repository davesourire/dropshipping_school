/**
 * Dropshipping School - Tunnel de Vente
 * Script JavaScript Vanilla pour les fonctionnalités interactives
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // 1. INITIALISATION
    // ====================
    console.log('Dropshipping School - Initialisation');
    
    // ====================
    // 2. COMPTE À REBOURS
    // ====================
    function initCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        // Définir la date de fin (24h à partir de maintenant)
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);
        
        function updateCountdown() {
            const now = new Date();
            const timeLeft = endTime - now;
            
            if (timeLeft <= 0) {
                countdownElement.textContent = '00:00:00';
                // Réinitialiser le compte à rebours pour démo
                endTime.setHours(endTime.getHours() + 24);
                return;
            }
            
            // Calculer heures, minutes, secondes
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Formater l'affichage
            countdownElement.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Mettre à jour immédiatement puis toutes les secondes
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // ====================
    // 3. SLIDER D'IMAGES - Version HTML directe
    // ====================
    function initImageSlider() {
        const sliderTrack = document.getElementById('slider-track');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const sliderDots = document.getElementById('slider-dots');
        
        if (!sliderTrack) return;
        
        // Récupérer toutes les slides définies dans le HTML
        const slideElements = document.querySelectorAll('.slider-slide');
        
        let currentSlide = 0;
        let slideInterval;
        
        // Créer les dots de navigation basés sur le nombre de slides
        slideElements.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full bg-gray-600 hover:bg-gray-400 transition-all duration-300';
            dot.setAttribute('aria-label', `Aller à l'image ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('#slider-dots button');
        
        // Fonction pour mettre à jour la position du slider
        function updateSlider() {
            // Calculer la transformation en fonction du nombre de slides visibles
            let transformValue;
            const screenWidth = window.innerWidth;
            
            if (screenWidth >= 1024) {
                // Desktop - 3 slides visibles
                transformValue = currentSlide * (100 / 3);
            } else if (screenWidth >= 768) {
                // Tablet - 2 slides visibles
                transformValue = currentSlide * 50;
            } else {
                // Mobile - 1 slide visible
                transformValue = currentSlide * 100;
            }
            
            sliderTrack.style.transform = `translateX(-${transformValue}%)`;
            
            // Mettre à jour l'état des dots
            updateDots();
        }
        
        // Fonction pour mettre à jour les dots
        function updateDots() {
            dots.forEach((dot, index) => {
                const isActive = index === currentSlide;
                dot.classList.toggle('bg-gray-600', !isActive);
                dot.classList.toggle('bg-cyan-500', isActive);
                dot.classList.toggle('w-3', !isActive);
                dot.classList.toggle('w-8', isActive);
            });
        }
        
        // Fonction pour aller à un slide spécifique
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            
            // Gérer les limites
            if (currentSlide >= slideElements.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slideElements.length - 1;
            }
            
            updateSlider();
            resetInterval();
        }
        
        // Fonction pour passer au slide suivant
        function nextSlide() {
            currentSlide++;
            if (currentSlide >= slideElements.length) {
                currentSlide = 0;
            }
            updateSlider();
        }
        
        // Fonction pour passer au slide précédent
        function prevSlide() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slideElements.length - 1;
            }
            updateSlider();
        }
        
        // Réinitialiser l'intervalle automatique
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Événements pour les boutons de navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }
        
        // Démarrer le slider automatique
        resetInterval();
        updateSlider();
        
        // Pause au survol
        sliderTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderTrack.addEventListener('mouseleave', resetInterval);
        
        // Gestion du redimensionnement de la fenêtre
        window.addEventListener('resize', updateSlider);
    }
    
    // ====================
    // 4. ANIMATION AU SCROLL
    // ====================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);
        
        // Observer les sections pour l'animation
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
    
    // ====================
    // 5. SUIVI DES CLICS CTA
    // ====================
    function initCTATracking() {
        const ctas = document.querySelectorAll('a[href*="chariow.com"]');
        
        ctas.forEach(cta => {
            cta.addEventListener('click', function(e) {
                // En production, ajouter ici le code de tracking (Google Analytics, FB Pixel, etc.)
                console.log(`CTA cliqué: ${this.textContent.trim()}`);
                
                // Exemple de tracking
                // gtag('event', 'conversion', {'send_to': 'AW-123456789/AbC-D_EFGHijklmnOpQRST'});
                // fbq('track', 'Purchase', {value: 497.00, currency: 'EUR'});
            });
        });
    }
    
    // ====================
    // 6. VALIDATION DES FORMULAIRES
    // ====================
    function initFormValidation() {
        // Pour les futurs formulaires (newsletter, etc.)
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validation basique
                const emailInput = this.querySelector('input[type="email"]');
                if (emailInput && !isValidEmail(emailInput.value)) {
                    showNotification('Veuillez entrer une adresse email valide.', 'error');
                    emailInput.focus();
                    return;
                }
                
                // Simulation d'envoi
                showNotification('Merci ! Votre demande a été enregistrée.', 'success');
                this.reset();
            });
        });
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        function showNotification(message, type) {
            // Créer une notification temporaire
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${
                type === 'error' ? 'bg-red-900 text-white' : 'bg-green-900 text-white'
            }`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Supprimer après 3 secondes
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }
    
    // ====================
    // 7. INITIALISATION GLOBALE
    // ====================
    function init() {
        initCountdown();
        initImageSlider();
        initScrollAnimations();
        initCTATracking();
        initFormValidation();
        
        // Ajouter une classe pour les animations de fade-in
        const style = document.createElement('style');
        style.textContent = `
            .animate-fade-in {
                animation: fadeIn 1s ease-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        console.log('Dropshipping School - Initialisation terminée');
    }
    
    // Lancer l'initialisation
    init();
});