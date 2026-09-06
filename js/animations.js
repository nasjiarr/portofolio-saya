// Scroll Animations
class ScrollAnimator {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        // Add animation classes to elements
        this.prepareElements();
        
        // Create Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        // Observe elements
        this.observeElements();
    }
    
    prepareElements() {
        // Section headers
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('animate-on-scroll');
        });
        
        // About content
        document.querySelectorAll('.about-text').forEach(el => {
            el.classList.add('animate-on-scroll');
            el.dataset.animation = 'fade-left';
        });
        
        document.querySelectorAll('.about-visual').forEach(el => {
            el.classList.add('animate-on-scroll');
            el.dataset.animation = 'fade-right';
        });
        
        // Skill categories
        document.querySelectorAll('.skill-category').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.dataset.animation = 'scale';
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Timeline items
        document.querySelectorAll('.timeline-item').forEach(el => {
            el.classList.add('animate-on-scroll');
            el.dataset.animation = 'fade-left';
        });
        
        // Project cards
        document.querySelectorAll('.project-card').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Education card
        document.querySelectorAll('.education-card').forEach(el => {
            el.classList.add('animate-on-scroll');
            el.dataset.animation = 'fade-right';
        });
        
        // Contact links
        document.querySelectorAll('.contact-link').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Contact actions
        document.querySelectorAll('.contact-actions').forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    }
    
    observeElements() {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimator();
});