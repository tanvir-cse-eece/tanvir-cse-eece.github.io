/* ========================================
   TANVIR HOSSAIN - PORTFOLIO JAVASCRIPT
   Modern Interactions & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initTypingAnimation();
    initRevealAnimations();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initCountAnimation();
    initParallaxEffects();
    initImageLoad();
});

/* ========================================
   HEADER & NAVIGATION
   ======================================== */
function initHeader() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const scrollY = window.scrollY;

        // Add scrolled class
        if (scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        lastScrollY = scrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ========================================
   TYPING ANIMATION
   ======================================== */
function initTypingAnimation() {
    const element = document.getElementById('typingText');
    if (!element) return;

    const roles = [
        'Security & Privacy ML Researcher',
        'Social Media Safety Analyst',
        'Adversarial Robustness Enthusiast',
        'Trustworthy NLP Practitioner',
        'Data-driven Cybersecurity Research Candidate'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 60;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            speed = 30;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            speed = 60;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1200);
}

/* ========================================
   REVEAL ANIMATIONS
   ======================================== */
function initRevealAnimations() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-80px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ========================================
   BACK TO TOP
   ======================================== */
function initBackToTop() {
    const button = document.getElementById('backTop');
    if (!button) return;

    let ticking = false;

    const updateButton = () => {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateButton);
            ticking = true;
        }
    });

    button.addEventListener('click', () => {
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

        if (!name || !email || !subject || !message) {
            showToast('Please fill in all fields.', 'warning');
            return;
        }

        const to = 'tanvir.eece.mist@gmail.com';
        const emailSubject = subject || `Portfolio Inquiry from ${name}`;
        const body = [
            `Dear Md. Tanvir Hossain,`,
            '',
            `My name is ${name} (${email}).`,
            '',
            message,
            '',
            '---',
            'Sent via Research Portfolio'
        ].join('\n');

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;

        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        showToast('Opening email client...', 'success');
        form.reset();
    });
}

/* ========================================
   TOAST NOTIFICATIONS
   ======================================== */
function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    const colors = {
        success: { bg: '#10b981', shadow: 'rgba(16, 185, 129, 0.3)' },
        warning: { bg: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.3)' },
        info: { bg: '#3b82f6', shadow: 'rgba(59, 130, 246, 0.3)' }
    };

    const color = colors[type] || colors.info;

    Object.assign(toast.style, {
        position: 'fixed',
        top: '100px',
        right: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 24px',
        background: color.bg,
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        borderRadius: '12px',
        boxShadow: `0 8px 30px ${color.shadow}`,
        zIndex: '10000',
        animation: 'toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Toast animation styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes toastSlideIn {
        from { transform: translateX(120%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes toastSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(120%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyles);

/* ========================================
   COUNT ANIMATION
   ======================================== */
function initCountAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCount(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCount(element, target) {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + '+';
        }
    }

    requestAnimationFrame(update);
}

/* ========================================
   PARALLAX EFFECTS
   ======================================== */
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.orb');
    const cards = document.querySelectorAll('.floating-card');

    if (!orbs.length && !cards.length) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;

        orbs.forEach((orb, index) => {
            const speed = 0.02 * (index + 1);
            const yOffset = scrollY * speed;
            orb.style.transform = `translateY(${yOffset}px)`;
        });

        cards.forEach((card, index) => {
            const speed = 0.015 * (index + 1);
            const yOffset = scrollY * speed;
            card.style.transform = `translateY(${yOffset}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/* ========================================
   IMAGE LAZY LOADING
   ======================================== */
function initImageLoad() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
}

/* ========================================
   CARD HOVER EFFECTS
   ======================================== */
document.querySelectorAll('.research-card, .project-item, .pub-card, .cap-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

/* ========================================
   FOCUS ACCESSIBILITY
   ======================================== */
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #0f3f78';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

/* ========================================
   CURSOR EFFECTS (Optional enhancement)
   ======================================== */
document.querySelectorAll('.btn, .social-icon, .social-btn, .project-links a, .pub-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.cursor = 'pointer';
    });
});

/* ========================================
   CONSOLE SIGNATURE
   ======================================== */
console.log(
    '%c Research Portfolio %c Md. Tanvir Hossain ',
    'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 12px 20px; border-radius: 8px 0 0 8px; font-weight: bold; font-size: 14px;',
    'background: #f8fafc; color: #3b82f6; padding: 12px 20px; border-radius: 0 8px 8px 0; font-weight: 600; font-size: 14px; border: 1px solid #e2e8f0;'
);
console.log('%c Seeking Research Assistantship Opportunities in US Labs', 'color: #64748b; font-size: 12px;');
console.log('%c tanvir.eece.mist@gmail.com', 'color: #3b82f6; font-size: 12px; font-weight: 600;');
