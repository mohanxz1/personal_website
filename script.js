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

// Initialize all new functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeNewSections();
    addBlogInteractions();
    rotateQuotes();
});
