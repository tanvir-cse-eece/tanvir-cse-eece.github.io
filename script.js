/* ========================================
   MD. TANVIR HOSSAIN - RESEARCH PORTFOLIO
   Professional Academic JavaScript
   Smooth Animations & Clean Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initParallaxBadges();
});

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll effect for navbar
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', throttle(handleScroll, 100));

    // Mobile navigation toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active navigation on scroll
    const updateActiveNav = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    allNavLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', throttle(updateActiveNav, 100));
    updateActiveNav();

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
    const typedText = document.getElementById('typedText');
    if (!typedText) return;

    const roles = [
        'Machine Learning Researcher',
        'Deep Learning Engineer',
        'NLP Specialist',
        'AI Safety Advocate',
        'Computer Vision Practitioner'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 3000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 600; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing after initial delay
    setTimeout(type, 1500);
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   BACK TO TOP
   ======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    const handleScroll = () => {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', throttle(handleScroll, 100));

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'warning');
            return;
        }

        // Compose Gmail URL
        const to = 'tanvir.eece.mist@gmail.com';
        const subjectLine = subject || `Portfolio Inquiry from ${name}`;
        const bodyContent = [
            `Dear Md. Tanvir Hossain,`,
            '',
            `My name is ${name}${email ? ` (${email})` : ''}.`,
            '',
            message,
            '',
            '---',
            'Message sent via Research Portfolio'
        ].join('\n');

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;

        // Open Gmail
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');

        showNotification('Opening your email client...', 'success');
        form.reset();
    });
}

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const icon = type === 'success' ? 'fa-check-circle' :
                 type === 'warning' ? 'fa-exclamation-triangle' :
                 'fa-info-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    // Styles
    const colors = {
        success: { bg: '#2e7d5a', shadow: 'rgba(46, 125, 90, 0.3)' },
        warning: { bg: '#b8860b', shadow: 'rgba(184, 134, 11, 0.3)' },
        info: { bg: '#1e3a5f', shadow: 'rgba(30, 58, 95, 0.3)' }
    };

    const colorSet = colors[type] || colors.info;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 28px;
        background: ${colorSet.bg};
        color: white;
        font-size: 14px;
        font-weight: 500;
        border-radius: 12px;
        box-shadow: 0 8px 32px ${colorSet.shadow};
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Add notification animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(120%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(120%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

/* ========================================
   PARALLAX BADGES
   ======================================== */
function initParallaxBadges() {
    const badges = document.querySelectorAll('.profile-badge');
    if (!badges.length) return;

    let ticking = false;

    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                badges.forEach((badge, index) => {
                    const speed = 0.03 * (index + 1);
                    const yOffset = scrollY * speed;
                    badge.style.transform = `translateY(${yOffset}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScroll);
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* ========================================
   CARD INTERACTIONS
   ======================================== */
document.querySelectorAll('.research-card, .project-card, .publication-card, .contact-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

/* ========================================
   IMAGE LAZY LOADING
   ======================================== */
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';

    const loadImage = () => {
        img.style.opacity = '1';
    };

    if (img.complete) {
        loadImage();
    } else {
        img.addEventListener('load', loadImage);
    }
});

/* ========================================
   FOCUS STATES FOR ACCESSIBILITY
   ======================================== */
document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--accent-primary)';
        this.style.outlineOffset = '3px';
    });

    el.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

/* ========================================
   CONSOLE BRANDING
   ======================================== */
console.log(
    '%c Research Portfolio %c Md. Tanvir Hossain ',
    'background: #1e3a5f; color: white; padding: 12px 20px; border-radius: 8px 0 0 8px; font-weight: bold; font-size: 14px;',
    'background: #f7f5f2; color: #1e3a5f; padding: 12px 20px; border-radius: 0 8px 8px 0; font-weight: 600; font-size: 14px;'
);
console.log('%c tanvir.eece.mist@gmail.com | Seeking RA Opportunities in US Research Labs', 'color: #1e3a5f; font-size: 12px;');
