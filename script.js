// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Mark page as loaded to trigger animations
    document.body.classList.add('loaded');
    
    initNavigation();
    initScrollAnimations();
    initInteractions();
});

// Navigation dots update
function initNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            navDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        updateActiveNavDot();
    });
}

function updateActiveNavDot() {
    const sections = document.querySelectorAll('.section, #hero');
    const navDots = document.querySelectorAll('.nav-dot');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 300) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });
}

// Scroll animations - Fixed to prevent re-triggering
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe section titles
    document.querySelectorAll('.section-title').forEach(el => {
        observer.observe(el);
    });
    
    // Observe about section
    document.querySelectorAll('.about-text, .about-stats').forEach(el => {
        observer.observe(el);
    });
    
    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(el => {
        observer.observe(el);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(el => {
        observer.observe(el);
    });
}

// Interactive effects - Optimized
function initInteractions() {
    // Hero content parallax on scroll - Optimized with throttling
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const heroContent = document.querySelector('.hero-content');
                const scrollPosition = window.pageYOffset;
                
                if (scrollPosition < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Skill cards interaction
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) rotateX(5deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
    
    // Project cards interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-image').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image').style.transform = 'scale(1)';
        });
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
