// Welcome Screen Functionality
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.querySelector('.welcome-screen');
    const enterButton = document.querySelector('.enter-button');
    const body = document.body;

    // Show welcome screen
    body.classList.add('loading');

    // Handle enter button click
    enterButton.addEventListener('click', () => {
        welcomeScreen.classList.add('fade-out');
        body.classList.remove('loading');
        
        // Remove welcome screen from DOM after animation
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 500);
    });
});

// Enhanced Welcome Screen Functionality
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.querySelector('.welcome-screen');
    const enterButton = document.querySelector('.enter-button');
    const welcomeContent = document.querySelector('.welcome-content');
    const body = document.body;
    const icons = document.querySelectorAll('.welcome-icon');

    // Show welcome screen
    body.classList.add('loading');

    // Animate icons randomly
    icons.forEach(icon => {
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const randomRotate = Math.random() * 20 - 10;
            icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 3000);
    });

    // Add hover effect to welcome content
    welcomeContent.addEventListener('mousemove', (e) => {
        const rect = welcomeContent.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = welcomeContent.offsetWidth / 2;
        const centerY = welcomeContent.offsetHeight / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;
        
        welcomeContent.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    welcomeContent.addEventListener('mouseleave', () => {
        welcomeContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Handle enter button click with enhanced transition
    enterButton.addEventListener('click', () => {
        welcomeScreen.classList.add('fade-out');
        body.classList.remove('loading');
        
        // Add transition effects to main content
        document.querySelectorAll('section').forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            setTimeout(() => {
                section.style.transition = 'all 0.8s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Remove welcome screen from DOM after animation
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 800);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 2000; // Changed to 2 seconds
    const animationDuration = 800; // 800ms transition

    // Initialize first slide
    slides[0].classList.add('active');
    updateSlideContent(0);

    function updateSlideContent(index) {
        const activeContent = slides[index].querySelector('.slide-content');
        if (activeContent) {
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translate(-50%, -30%)';
            
            setTimeout(() => {
                activeContent.style.opacity = '1';
                activeContent.style.transform = 'translate(-50%, -50%)';
            }, 50);
        }
    }

    function moveToSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            const content = slide.querySelector('.slide-content');
            if (content) {
                content.style.opacity = '0';
                content.style.transform = 'translate(-50%, -30%)';
            }
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update slide content with animation
        updateSlideContent(index);
        
        // Update current slide index
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        moveToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        moveToSlide(currentSlide);
    }

    // Event listeners with debounce
    let isTransitioning = false;

    function handleSlideChange(direction) {
        if (!isTransitioning) {
            isTransitioning = true;
            if (direction === 'next') {
                nextSlide();
            } else {
                prevSlide();
            }
            resetInterval();
            setTimeout(() => {
                isTransitioning = false;
            }, animationDuration);
        }
    }

    prevBtn.addEventListener('click', () => handleSlideChange('prev'));
    nextBtn.addEventListener('click', () => handleSlideChange('next'));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isTransitioning && currentSlide !== index) {
                moveToSlide(index);
                resetInterval();
            }
        });
    });

    // Auto advance slides
    function startInterval() {
        slideInterval = setInterval(() => handleSlideChange('next'), intervalTime);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Start auto-advance
    startInterval();

    // Pause on hover
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startInterval);
});

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

// Add stagger animation delay to nav items
navItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Close menu when clicking on a link
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Enhanced Scroll Animations
const scrollElements = document.querySelectorAll('.scroll-animate, section h2');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('active');
    if (element.tagName.toLowerCase() === 'h2') {
        element.classList.add('animate');
    }
};

const hideScrollElement = (element) => {
    element.classList.remove('active');
    if (element.tagName.toLowerCase() === 'h2') {
        element.classList.remove('animate');
    }
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 85)) {
            displayScrollElement(el);
        }
    });
};

// Throttle function to limit the rate at which the scroll handler fires
const throttle = (fn, wait) => {
    let time = Date.now();
    return () => {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    };
};

window.addEventListener('scroll', throttle(handleScrollAnimation, 100));

// Initialize scroll animations
handleScrollAnimation();

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        message: contactForm.querySelector('textarea').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error(data.error || 'Error sending message');
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
        console.error('Error:', error);
    }
});