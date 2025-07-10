// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Add stagger effect for multiple elements
            if (entry.target.classList.contains('project-card')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
            }
        }
    });
}, observerOptions);

// Advanced scroll animations
const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-category')) {
                entry.target.classList.add('slide-in-left');
            } else if (entry.target.classList.contains('education-item')) {
                entry.target.classList.add('slide-in-right');
            } else if (entry.target.classList.contains('stat')) {
                entry.target.classList.add('scale-in');
            }
        }
    });
}, { threshold: 0.3 });

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section-header, .about-text, .education-item, .skill-category, .project-card, .contact-item, .contact-form, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
        advancedObserver.observe(el);
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Create mailto link with form data
    const mailtoLink = `mailto:reachout.mohan9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Email client opened! Thank you for your message.', 'success');
    
    // Reset form
    this.reset();
});

// Enhanced animations for new sections
function initializeNewSections() {
    // Quote section animation
    const quoteSection = document.querySelector('.quote-section');
    if (quoteSection) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelector('.quote-content').classList.add('fade-in');
                    setTimeout(() => {
                        entry.target.querySelector('.personal-quote').classList.add('slide-in-left');
                    }, 300);
                }
            });
        }, { threshold: 0.3 });
        quoteObserver.observe(quoteSection);
    }

    // Focus areas stagger animation
    const focusCards = document.querySelectorAll('.focus-card');
    const focusObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(focusCards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('scale-in');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    focusCards.forEach(card => focusObserver.observe(card));

    // Philosophy points animation
    const philosophyPoints = document.querySelectorAll('.philosophy-point');
    const philosophyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(philosophyPoints).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('slide-in-right');
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    philosophyPoints.forEach(point => philosophyObserver.observe(point));

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Blog cards animation
    const blogCards = document.querySelectorAll('.blog-card');
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(blogCards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    blogCards.forEach(card => blogObserver.observe(card));
}

// Enhanced blog card interactions
function addBlogInteractions() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click event for blog read more buttons
    const readMoreButtons = document.querySelectorAll('.blog-read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Blog feature coming soon! Stay tuned for full articles.', 'info');
        });
    });
}

// Motivational quote rotation
function rotateQuotes() {
    const quotes = [
        {
            text: "The only way to do great work is to love what you do. Technology is not just about code; it's about creating solutions that make a difference in people's lives.",
            author: "Steve Jobs"
        },
        {
            text: "Code is like humor. When you have to explain it, it's bad. But when it works perfectly, it's pure magic.",
            author: "Cory House"
        },
        {
            text: "The best time to plant a tree was 20 years ago. The second best time is now. The same applies to learning to code.",
            author: "Chinese Proverb (Adapted)"
        },
        {
            text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
            author: "Patrick McKenzie"
        }
    ];

    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author span');
    
    if (quoteText && quoteAuthor) {
        let currentQuoteIndex = 0;
        
        function changeQuote() {
            quoteText.style.opacity = '0';
            quoteAuthor.style.opacity = '0';
            
            setTimeout(() => {
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                quoteText.textContent = quotes[currentQuoteIndex].text;
                quoteAuthor.textContent = `— ${quotes[currentQuoteIndex].author}`;
                
                quoteText.style.opacity = '1';
                quoteAuthor.style.opacity = '1';
            }, 300);
        }
        
        // Change quote every 10 seconds
        setInterval(changeQuote, 10000);
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Define colors for different types
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: colors[type] || colors.success,
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fontWeight: '500',
        fontSize: '0.9rem',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = `© ${currentYear} Mohan Ram Majhi. All rights reserved.`;
    }
});

// Skills animation on scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Trigger skills animation when skills section is in view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced scroll animations
function addScrollTriggerAnimations() {
    const scrollElements = document.querySelectorAll('.project-card, .skill-category, .stat, .education-item');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > 
            (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

// Mouse parallax effect for project cards
function addProjectCardParallax() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    addScrollTriggerAnimations();
    addProjectCardParallax();
    
    // Add floating animation to hero elements
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('floating');
    }
});

// Social links functionality
document.addEventListener('DOMContentLoaded', () => {
    // GitHub links
    document.querySelectorAll('a[href*="github.com/mohanxz1"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the default behavior happen (open GitHub)
            console.log('Opening GitHub profile...');
        });
    });
    
    // Instagram links
    document.querySelectorAll('a[href*="instagram.com/mohanxz_"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the default behavior happen (open Instagram)
            console.log('Opening Instagram profile...');
        });
    });
    
    // Email links
    document.querySelectorAll('a[href="mailto:reachout.mohan9@gmail.com"]').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Opening email client...');
        });
    });
});

// Phone number click handler
document.addEventListener('DOMContentLoaded', () => {
    const phoneElements = document.querySelectorAll('.contact-details p');
    phoneElements.forEach(element => {
        if (element.textContent.includes('9764587063')) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                // Copy phone number to clipboard
                navigator.clipboard.writeText('9764587063').then(() => {
                    showNotification('Phone number copied to clipboard!', 'success');
                }).catch(() => {
                    showNotification('Could not copy phone number. Please copy manually: 9764587063', 'error');
                });
            });
        }
    });
});

// Instagram username click handler
document.addEventListener('DOMContentLoaded', () => {
    const instaElements = document.querySelectorAll('.contact-details p');
    instaElements.forEach(element => {
        if (element.textContent.includes('@mohanxz_')) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                window.open('https://instagram.com/mohanxz_', '_blank');
            });
        }
    });
});

// GitHub username click handler
document.addEventListener('DOMContentLoaded', () => {
    const githubElements = document.querySelectorAll('.contact-details p');
    githubElements.forEach(element => {
        if (element.textContent.includes('mohanxz1')) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                window.open('https://github.com/mohanxz1', '_blank');
            });
        }
    });
});

// Loading screen (optional)
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // Initialize animations
    document.body.classList.add('loaded');
});

// Profile Image Loading
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profileImg');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    if (profileImg && profilePlaceholder) {
        // Initially hide the placeholder
        profilePlaceholder.style.display = 'none';
        
        // Check if image loads successfully
        profileImg.onload = function() {
            console.log('Profile image loaded successfully');
            profilePlaceholder.style.display = 'none';
            profileImg.style.display = 'block';
        };
        
        // If image fails to load, show placeholder
        profileImg.onerror = function() {
            console.log('Profile image failed to load, showing placeholder');
            profileImg.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        };
        
        // Test if image exists
        const testImg = new Image();
        testImg.onload = function() {
            profileImg.src = this.src;
        };
        testImg.onerror = function() {
            profileImg.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        };
        testImg.src = 'profile.jpg?' + new Date().getTime();
    }
});

function showImageFallback(imgElement) {
    // Create a fallback element
    const fallback = document.createElement('div');
    fallback.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d4ff, #00ffff);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000000;
        font-size: 4rem;
        font-weight: bold;
        font-family: 'Inter', sans-serif;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        box-shadow: inset 0 0 20px rgba(255,255,255,0.2);
    `;
    fallback.textContent = 'MRM';
    
    // Replace the image with fallback
    imgElement.style.display = 'none';
    imgElement.parentNode.appendChild(fallback);
    
    console.log('Using fallback profile image');
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Form input animations
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentNode.classList.add('focused');
        }
    });
});

// Enhanced Mobile Responsiveness and Touch Interactions

// Mobile device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Touch event handlers for better mobile experience
function addTouchInteractions() {
    // Enhanced mobile navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Touch gestures for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        const swipeThreshold = 50;
        const deltaX = touchEndX - touchStartX;

        // Swipe right to open menu (when near left edge)
        if (deltaX > swipeThreshold && touchStartX < 50 && !navMenu.classList.contains('active')) {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
        }
        // Swipe left to close menu
        else if (deltaX < -swipeThreshold && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // Enhanced scroll behavior for mobile
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateNavbarOnScroll();
                updateActiveNavLinks();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

// Optimized scroll functions
function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateActiveNavLinks() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Responsive image loading with lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Device orientation change handler
function handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalculate viewport height for mobile
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            // Close mobile menu on orientation change
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Trigger resize event for other components
            window.dispatchEvent(new Event('resize'));
        }, 500); // Delay to ensure orientation change is complete
    });
}

// Viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

// Performance optimizations for mobile
function optimizeForMobile() {
    if (isMobileDevice()) {
        // Reduce animation complexity on mobile
        document.body.classList.add('mobile-device');
        
        // Disable hover effects on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) {
                .project-card:hover,
                .social-link:hover,
                .btn:hover {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Use passive event listeners for better scroll performance
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
    }
}

// Enhanced form validation for mobile
function enhanceFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add real-time validation
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        clearFieldError(field);
        
        // Field-specific validation
        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email';
                    isValid = false;
                }
                break;
            case 'subject':
                if (!value) {
                    errorMessage = 'Subject is required';
                    isValid = false;
                }
                break;
            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            animation: slideDown 0.3s ease;
        `;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Improved intersection observer for better performance
function createOptimizedIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for grid items
                if (entry.target.parentNode.classList.contains('projects-grid') ||
                    entry.target.parentNode.classList.contains('skills-grid') ||
                    entry.target.parentNode.classList.contains('focus-grid')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    return observer;
}

// Smooth scrolling with mobile optimization
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70; // Account for fixed navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after navigation
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Initialize all mobile enhancements
document.addEventListener('DOMContentLoaded', () => {
    setViewportHeight();
    handleOrientationChange();
    addTouchInteractions();
    optimizeForMobile();
    enhanceFormValidation();
    initLazyLoading();
    initSmoothScrolling();
    
    // Initialize optimized intersection observer
    const observer = createOptimizedIntersectionObserver();
    const animateElements = document.querySelectorAll('.section-header, .about-text, .education-item, .skill-category, .project-card, .contact-item, .contact-form, .stat, .focus-card, .philosophy-point');
    animateElements.forEach(el => observer.observe(el));
    
    console.log('Mobile enhancements initialized');
});

// Performance monitoring for mobile
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                
                // Log any performance issues
                if (navigation.loadEventEnd - navigation.loadEventStart > 3000) {
                    console.warn('Slow page load detected. Consider optimizing resources.');
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformanceMetrics();
