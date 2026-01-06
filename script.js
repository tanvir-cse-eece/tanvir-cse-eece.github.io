/* ========================================
   TANVIR HOSSAIN PORTFOLIO - JAVASCRIPT
   Interactive Features & Animations
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Initialize all features
    initNavigation();
    // typing effect disabled per user request
    // initTypingEffect();
    initCustomCursor();
    initRotatingTokens();
    initScrollEffects();
    initCounterAnimation();
    initContactForm();
});

/* ========================================
   ROTATING HERO TOKENS
   Rotates tokens one-by-one at the same spot with a blinking effect
   ======================================== */
function initRotatingTokens() {
    const tokens = ['DevSecOps', 'Cybersecurity', 'Network Engg.', 'EDA & Research'];
    const el = document.querySelector('.rotating-token');
    if (!el) return;

    let idx = 0;
    const charDelay = 60; // ms between letters
    const hold = 1400; // ms to hold the full token
    const fadeStagger = 30; // ms stagger when fading out

    function clearElement() {
        while (el.firstChild) el.removeChild(el.firstChild);
    }

    function typeToken(token, cb) {
        clearElement();
        const spans = [];
        for (let i = 0; i < token.length; i++) {
            const span = document.createElement('span');
            // preserve visible gaps by converting normal spaces to non-breaking spaces
            span.textContent = token[i] === ' ' ? '\u00A0' : token[i];
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(6px)';
            span.style.transition = `opacity ${charDelay * 0.9}ms ease, transform ${charDelay * 0.9}ms ease`;
            el.appendChild(span);
            spans.push(span);
        }

        // reveal letters sequentially
        spans.forEach((s, i) => {
            setTimeout(() => {
                s.style.opacity = '1';
                s.style.transform = 'translateY(0)';
            }, i * charDelay);
        });

        // after fully typed and held, fade out sequentially
        const totalIn = spans.length * charDelay;
        setTimeout(() => {
            spans.forEach((s, i) => {
                setTimeout(() => {
                    s.style.opacity = '0';
                    s.style.transform = 'translateY(-6px)';
                }, i * fadeStagger);
            });
            // call callback after fade completes
            setTimeout(() => cb && cb(), spans.length * fadeStagger + 250);
        }, totalIn + hold);
    }

    function showNext() {
        typeToken(tokens[idx], () => {
            idx = (idx + 1) % tokens.length;
            setTimeout(showNext, 300);
        });
    }

    // initial start shortly after load
    setTimeout(showNext, 500);
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
}

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const titles = [
        'Full-Stack',
        'ML / DL',
        'DevSecOps'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingDelay = 1800; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingDelay = 400; // Pause before new word
        }

        setTimeout(type, typingDelay);
    }

    // Start typing effect
    type();
}

/* ========================================
   CUSTOM CURSOR - Premium Interactive
   ======================================== */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    // Only enable on desktop
    if (window.innerWidth < 1024) return;
    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    // Smooth cursor animation
    function animateCursor() {
        // Main cursor follows the mouse directly (no lag) to match original pointer speed
        cursorX = mouseX;
        cursorY = mouseY;
        cursor.style.left = (cursorX - 6) + 'px';
        cursor.style.top = (cursorY - 6) + 'px';

        // Follower retains a smooth trailing motion
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        cursorFollower.style.left = (followerX - 24) + 'px';
        cursorFollower.style.top = (followerY - 24) + 'px';

        requestAnimationFrame(animateCursor);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Show cursor on first movement
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    });

    animateCursor();

    // Interactive elements - buttons, links, cards
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .btn, .social-link, .nav-link, .detail-card, .timeline-content, .club-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });

    // Text elements - show text cursor style
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span:not(.skill-item span)');
    
    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-text');
            cursorFollower.classList.add('cursor-text');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-text');
            cursorFollower.classList.remove('cursor-text');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.8';
    });
}

/* ========================================
   SCROLL EFFECTS
   ======================================== */
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 * (index + 1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Use Intersection Observer to trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Create mailto link with form data
        const subject = encodeURIComponent(data.subject || 'Portfolio Contact');
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n\n` +
            `Message:\n${data.message}`
        );

        // Open email client
        window.location.href = `mailto:tanvir.eece.mist@gmail.com?subject=${subject}&body=${body}`;

        // Show success message
        showNotification('Opening your email client...', 'success');
        
        // Reset form
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

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00d4ff' : '#7b2cbf'};
        color: #0a0a0f;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   SKILL BARS ANIMATION
   ======================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* ========================================
   PROJECT FILTER (Optional Enhancement)
   ======================================== */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filter === 'all' || project.classList.contains(filter)) {
                    project.style.display = 'block';
                    project.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

/* ========================================
   THEME TOGGLE (Optional Enhancement)
   ======================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* ========================================
   LOADING ANIMATION
   ======================================== */
window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }

    // Trigger entrance animations
    document.body.classList.add('loaded');
});

/* ========================================
   LAZY LOADING IMAGES
   ======================================== */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

/* ========================================
   MOBILE TOUCH EFFECTS
   ======================================== */
if ('ontouchstart' in window) {
    document.querySelectorAll('.btn, .project-card, .social-link').forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', () => {
            el.style.transform = '';
        });
    });
}

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('%c👋 Welcome to Tanvir Hossain\'s Portfolio!', 
    'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%c📧 Contact: tanvir.eece.mist@gmail.com', 
    'color: #a0a0b0; font-size: 14px;');
