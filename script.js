/* ========================================
   TANVIR HOSSAIN - RESEARCH PORTFOLIO
   Modern Interactive JavaScript
   Clean Animations & Smooth Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initCounterAnimation();
    initContactForm();
    initSmoothScroll();
    initBackToTop();
    initParallax();
});

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const navItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);

            if (navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    navItem.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
    const roleText = document.getElementById('roleText');
    if (!roleText) return;

    const roles = [
        'Machine Learning Researcher',
        'Deep Learning Engineer',
        'NLP Specialist',
        'Computer Vision Expert',
        'AI Safety Advocate'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1500);
}

/* ========================================
   SCROLL ANIMATIONS (AOS-like)
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(counter) {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
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

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const to = 'tanvir.eece.mist@gmail.com';
        const subjectLine = subject || `Message from ${name}`;
        const bodyLines = [
            `Dear Tanvir,`,
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            '',
            message,
            '',
            '---',
            'Sent from Research Portfolio'
        ];

        const body = encodeURIComponent(bodyLines.join('\n'));
        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subjectLine)}&body=${body}`;

        window.open(url, '_blank', 'noopener');
        showNotification('Opening your email client...', 'success');
        form.reset();
    });
}

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        background: linear-gradient(135deg, #0369a1 0%, #0891b2 100%);
        color: white;
        font-size: 14px;
        font-weight: 500;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(3, 105, 161, 0.3);
        z-index: 10000;
        animation: notificationSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.4s ease forwards';
        setTimeout(() => notification.remove(), 400);
    }, 3500);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes notificationSlideIn {
        from {
            transform: translateX(120%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes notificationSlideOut {
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
document.head.appendChild(notificationStyles);

/* ========================================
   PARALLAX EFFECT
   ======================================== */
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.bg-gradient-orb');

        orbs.forEach((orb, index) => {
            const speed = 0.02 * (index + 1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ========================================
   CARD HOVER EFFECTS
   ======================================== */
document.querySelectorAll('.research-card, .project-card, .info-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

/* ========================================
   IMAGE LOADING
   ======================================== */
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    if (img.complete) {
        img.style.opacity = '1';
    }
});

/* ========================================
   KEYBOARD ACCESSIBILITY
   ======================================== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

/* ========================================
   FOCUS MANAGEMENT
   ======================================== */
document.querySelectorAll('.btn, .nav-item, .social-icon, .project-link, .pub-link').forEach(el => {
    el.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--accent-primary)';
        this.style.outlineOffset = '2px';
    });
    el.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

/* ========================================
   CONSOLE WELCOME
   ======================================== */
console.log(
    '%c Research Portfolio %c Md. Tanvir Hossain ',
    'background: linear-gradient(135deg, #0369a1, #0891b2); color: white; padding: 10px 16px; border-radius: 8px 0 0 8px; font-weight: bold;',
    'background: #f1f5f9; color: #1e293b; padding: 10px 16px; border-radius: 0 8px 8px 0; font-weight: 500;'
);
console.log('%c tanvir.eece.mist@gmail.com | Seeking RA Opportunities', 'color: #0369a1; font-size: 12px;');

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedParallax = debounce(initParallax, 10);
window.addEventListener('scroll', debouncedParallax);
