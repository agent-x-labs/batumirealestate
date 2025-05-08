document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let isNavOpen = false;
    
    // Add scroll class to header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation
    navToggle.addEventListener('click', () => {
        if (!isNavOpen) {
            navMenu.classList.add('active');
            navToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        isNavOpen = !isNavOpen;
    });
    
    // Close mobile nav when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            isNavOpen = false;
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle active class on clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Simple form submission (can be expanded for actual implementation)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObject = Object.fromEntries(formData);
            
            // For demonstration purposes - in production, send to server
            console.log('Form submitted with data:', formDataObject);
            
            // Show success message
            alert('Thank you for your interest! Our team will contact you shortly with your confidential investment brochure.');
            
            // Reset form
            contactForm.reset();
        });
    }
});
