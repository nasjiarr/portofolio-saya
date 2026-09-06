// Main Application
class PortfolioApp {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        this.cursorDot = document.querySelector('.cursor-dot');
        this.cursorOutline = document.querySelector('.cursor-outline');
        this.init();
    }
    
    init() {
        this.initNavigation();
        this.initMobileMenu();
        this.initCustomCursor();
        this.initProjectHover();
        this.initSmoothScroll();
    }
    
    initNavigation() {
        // Scroll effect on navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
        
        // Active section indicator
        const sections = document.querySelectorAll('.section, .hero');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    initMobileMenu() {
        this.mobileMenuToggle.addEventListener('click', () => {
            this.mobileMenuToggle.classList.toggle('active');
            this.mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = this.mobileMenuOverlay.classList.contains('active') 
                ? 'hidden' 
                : 'auto';
        });
        
        // Close mobile menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenuToggle.classList.remove('active');
                this.mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    initCustomCursor() {
        if (window.innerWidth <= 768) return;
        
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursorDot.style.left = `${mouseX}px`;
            this.cursorDot.style.top = `${mouseY}px`;
            
            // Smooth follow for outline
            setTimeout(() => {
                outlineX = mouseX;
                outlineY = mouseY;
                this.cursorOutline.style.left = `${outlineX}px`;
                this.cursorOutline.style.top = `${outlineY}px`;
            }, 50);
        });
        
        // Hover effect on interactive elements
        document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursorOutline.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursorOutline.classList.remove('hover');
            });
        });
    }
    
    initProjectHover() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
    
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});