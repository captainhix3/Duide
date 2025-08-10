// JavaScript for Guide Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initScrollEffects();
    initAnimations();
    initInteractiveElements();
    initNavbarEffects();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeButtons = document.querySelectorAll('[data-theme]');
    const body = document.body;
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });
    
    function setTheme(theme) {
        // Remove existing theme classes
        body.classList.remove('dark-theme', 'light-theme');
        
        // Add new theme class
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.add('light-theme');
        }
        
        // Update active button
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const sidebarCards = document.querySelectorAll('.sidebar-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Navbar background opacity
        if (scrolled > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Parallax effect for sidebar cards
        sidebarCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            card.style.transform = translateY(${yPos}px);
        });
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.ai-section, .main-heading, .sidebar-card');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .sidebar-card:nth-child(1).animate-in {
            transition-delay: 0.1s;
        }
        
        .sidebar-card:nth-child(2).animate-in {
            transition-delay: 0.2s;
        }
        
        .sidebar-card:nth-child(3).animate-in {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(style);
}

// Interactive Elements
function initInteractiveElements() {
    // Play button functionality
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // Add ripple effect
            createRipple(this, event);
            
            // Simulate video play (you can replace with actual video logic)
            showNotification('Video would play here!');
        });
    }
    
    // Arrow buttons functionality
    const arrowBtns = document.querySelectorAll('.arrow-btn');
    arrowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            createRipple(this, event);
            
            const card = this.closest('.sidebar-card');
            if (card.classList.contains('explore-card')) {
                showNotification('Explore collections feature coming soon!');
            } else if (card.classList.contains('faq-card')) {
                showNotification('FAQ section would open here!');
            }
        });
    });
    
    // Sidebar card hover effects
    const sidebarCards = document.querySelectorAll('.sidebar-card');
    sidebarCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Tag interactions
    const tags = document.querySelectorAll('.tags-section .badge');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showNotification(Filtering by: ${this.textContent});
        });
    });
}

// Navbar Effects
function initNavbarEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section (if exists)
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Utility Functions
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Advanced Animations
function initAdvancedAnimations() {
    // Floating particles effect
    createFloatingParticles();
    
    // Mouse follow effect
    initMouseFollowEffect();
}

function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            animation: float-particle ${5 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

function initMouseFollowEffect() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }
}

// Initialize advanced animations
setTimeout(initAdvancedAnimations, 1000);