/**
 * Vaibhav Vegad - Portfolio Interactive Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation Menu Toggle (Mobile)
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener("click", () => {
            hamburgerMenu.classList.toggle("open");
            navMenu.classList.toggle("open");
        });

        // Close menu when links are clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerMenu.classList.remove("open");
                navMenu.classList.remove("open");
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 3. Scroll Active Section Highlighting (ScrollSpy)
    const sections = document.querySelectorAll("section");
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    
    window.addEventListener("scroll", scrollSpy);
    scrollSpy(); // run once on load

    // 4. Typewriter Effect
    const typewriterElement = document.getElementById("typewriter-text");
    const phrases = ["PHP Web Developer", "Laravel Enthusiast", "Backend Engineer", "Quick Learner"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster when deleting
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // standard typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    if (typewriterElement) {
        type();
    }

    // 5. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Option to unobserve once animation is complete
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 6. Contact Form Simulation & Toast notification
    const contactForm = document.getElementById("portfolio-contact-form");
    const toast = document.getElementById("toast-msg");
    const submitBtn = document.getElementById("form-submit-btn");

    if (contactForm && toast) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Disable button during submission loader effect
            if (submitBtn) {
                submitBtn.disabled = true;
                const originalContent = submitBtn.innerHTML;
                submitBtn.innerHTML = `<span>Sending...</span>`;
            }

            // Simulate server response delay
            setTimeout(() => {
                // Show success Toast
                toast.classList.add("show");
                
                // Clear Form inputs
                contactForm.reset();

                // Re-enable button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
                }

                // Hide Toast after 4 seconds
                setTimeout(() => {
                    toast.classList.remove("show");
                }, 4000);

            }, 1200);
        });
    }

    // 7. Dynamic Footer Year
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
