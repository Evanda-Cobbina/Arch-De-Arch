
            // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    let menuIsOpen = false;

    hamburger.addEventListener('click', () => {
        menuIsOpen = !menuIsOpen;
       hamburger.classList.toggle('active');
       navLinks.classList.toggle('active');

    if(menuIsOpen) {
        body.style.overflow = 'hidden';
        // Disable scroll-based active link updates while menu is open
        window.removeEventListener('scroll', updateActiveLink);
    } else {
        body.style.overflow = '';
        // Re-enable scroll-based active link updates
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Update immediately
    }
});

// Extract the active link update logic into a separate function
function updateActiveLink() {
    if(menuIsOpen) return; // Don't update during menu open
    
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initialize
window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768) { // Only for mobile
            menuIsOpen = false;
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
            window.addEventListener('scroll', updateActiveLink);
        }
        
        // Update active link
        document.querySelectorAll('.nav-links a').forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
            });
        });

        
    //For the theme toggle
    const themeToggle = document.querySelector(".theme-toggle");
    const toggleText = document.querySelector(".theme-toggle .text");
    const toggleIcon = document.querySelector(".theme-toggle .icon");
    const logo = document.getElementById("site-logo");

    // Update all theme-related elements
    function updateTheme() {
    const isLightMode = body.classList.contains("light-mode");

    // 1. Update toggle button
    toggleText.textContent = isLightMode ? "Dark" : "Light";
    toggleIcon.textContent = isLightMode ? "🌙" : "☀️";

    // 2. Update logo
    logo.src = isLightMode ? "pics/arch_de_arch.png" : "pics/arch_de_arch_w.png";

    // 3. Save preference
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    }

    // Theme toggle event
    themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    updateTheme();
    });

    // Initialize theme on load
    function initTheme() {
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
    }
    updateTheme();
    }

    // Run when page loads
    document.addEventListener("DOMContentLoaded", initTheme);


        /* 
        // Theme Toggle
        const themeToggle = document.querySelector('.theme-toggle');
        const toggleText = document.querySelector('.theme-toggle .text');
        const toggleIcon = document.querySelector('.theme-toggle .icon');

        function updateThemeToggle() {
            if(body.classList.contains('light-mode')) {
                toggleText.textContent = 'Dark';
                toggleIcon.textContent = '🌙';
            } else {
                toggleText.textContent = 'Light';
                toggleIcon.textContent = '☀️';
            }
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            updateThemeToggle();
            
            // Save theme preference
            localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
        });

        // Check for saved theme preference
        if(localStorage.getItem('theme') === 'light') {
            body.classList.add('light-mode');
        }
        updateThemeToggle();

        */

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if(window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Initialize scroll state
        window.dispatchEvent(new Event('scroll'));

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });



        // Update active nav link based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if(link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body");
    body.style.opacity = "0";
    
    setTimeout(() => {
        body.style.transition = "opacity 1.5s ease";
        body.style.opacity = "1";
    }, 300); // Slight delay before animation
});

// Update active nav link based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if(link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

            // Initialize Swiper
    const swiper = new Swiper('.locations-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
