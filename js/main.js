// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // Navbar shrink effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize the 3D network background using Vanta.js
    if (document.getElementById('hero-background')) {
        VANTA.NET({
            el: '#hero-background',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x0063f8,
            backgroundColor: 0x0a1128,
            points: 10.00,
            maxDistance: 25.00,
            spacing: 20.00
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Course filtering functionality
    const filterButtons = document.querySelectorAll('.btn-filter');
    const courseItems = document.querySelectorAll('.course-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                courseItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000; // Animation duration in ms
            const startTime = Date.now();
            const initialValue = 0;

            function updateCount() {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;

                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    // Using easeOutQuart easing function for more natural animation
                    const easedProgress = 1 - Math.pow(1 - progress, 4);
                    const currentValue = Math.floor(initialValue + (target - initialValue) * easedProgress);
                    counter.innerText = currentValue.toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            }

            updateCount();
        });
    }

    // Animate counters when they become visible
    const counterSection = document.querySelector('.counter-section');

    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(counterSection);
    }

    // Handle tab transitions for better user experience
    const statisticsTabs = document.querySelectorAll('#statisticsTabs button');
    const tabContent = document.querySelectorAll('.tab-pane');

    if (statisticsTabs.length > 0) {
        statisticsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetId = this.getAttribute('data-bs-target').substring(1);
                const targetContent = document.getElementById(targetId);

                // Apply entrance animation to elements inside the newly active tab
                if (targetContent) {
                    setTimeout(() => {
                        const animatedElements = targetContent.querySelectorAll('[data-aos]');
                        animatedElements.forEach(el => {
                            el.classList.add('aos-animate');
                        });
                    }, 300);
                }
            });
        });
    }

    // Skill bar animation for career skills
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';

            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-in-out';
            }, 300);
        });
    }

    // Animate skill bars when career tab becomes visible
    const careersTab = document.querySelector('#careers-tab');

    if (careersTab) {
        careersTab.addEventListener('shown.bs.tab', function() {
            animateSkillBars();
        });
    }

    // Make statistics cards and charts interactive with hover effects
    const statCards = document.querySelectorAll('.threat-stat-card, .industry-fact-card, .skill-card');

    if (statCards.length > 0) {
        statCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Animate shield on hero section
    const shieldOuter = document.querySelector('.shield-outer');
    if (shieldOuter) {
        animateShield();
    }

    function animateShield() {
        const icons = document.querySelectorAll('.floating-icons .icon');

        icons.forEach((icon, index) => {
            const delay = index * 0.5;
            icon.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite ${delay}s`;
        });
    }

    // Testimonial carousel autoplay configuration
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            pause: 'hover'
        });
    }

    // Form submissions with validation
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }

                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value.trim())) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    }
                }
            });

            if (isValid) {
                // Show success message (in a real application, this would submit the form)
                const formParent = form.parentElement;
                form.style.display = 'none';

                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.innerHTML = '<h4>Thank you!</h4><p>Your submission has been received. We will get back to you shortly.</p>';

                formParent.appendChild(successMessage);

                // Reset form fields
                form.reset();
            }
        });

        // Remove validation styling on input
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    });

    // Dynamic interactive elements for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // Add particles effect to hero section
        createParticles();
    }

    function createParticles() {
        // This is a simple particles effect - in a real application 
        // you might use a library like particles.js
        const heroSection = document.querySelector('.hero-section');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.overflow = 'hidden';
        particlesContainer.style.zIndex = '1';

        heroSection.insertBefore(particlesContainer, heroSection.firstChild);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 5 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
            particlesContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                50% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});