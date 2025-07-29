//Main JS for the whole website
// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    body.style.overflow = "";
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

    **/

// Scroll behavior for navigation
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    body.classList.add("nav-scrolled");
  } else {
    body.classList.remove("nav-scrolled");
  }
});

// Initialize scroll state
window.dispatchEvent(new Event("scroll"));

//about
// Mobile Menu Toggle
// Add scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  serviceCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});


// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // FormSubmit handles the actual submission
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            showSuccessMessage();
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showErrorMessage();
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h4>Message Sent Successfully!</h4>
        <p>Thank you for contacting us. We'll respond within 24 hours.</p>
    `;
    contactForm.prepend(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

function showErrorMessage() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'success-message';
    errorDiv.style.background = '#ff6b6b';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <h4>Error Sending Message</h4>
        <p>Please try again or contact us directly at info@archdearch.com</p>
    `;
    contactForm.prepend(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}


// File input display functionality
function updateFileName(input) {
    const fileNameDisplay = document.getElementById('file-name');
    if (input.files.length > 0) {
        fileNameDisplay.textContent = input.files[0].name;
        
        // Validate file size
        if (input.files[0].size > 5 * 1024 * 1024) { // 5MB
            fileNameDisplay.textContent = 'File too large (max 5MB)';
            fileNameDisplay.style.color = '#ff6b6b';
            input.value = ''; // Clear the file input
        } else {
            fileNameDisplay.style.color = '';
        }
    } else {
        fileNameDisplay.textContent = 'No file chosen';
    }
}

/* 
// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Here you would typically send the form data to a server
  // For this example, we'll just log it and show an alert
  console.log({ name, email, subject, message });
  alert("Thank you for your message! We will get back to you soon.");

  // Reset form
  contactForm.reset();
});
*/

// Update active nav link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

/*

            // Update logo based on theme
            function updateLogo() {
            const logo = document.getElementById('theme-logo');
            const isLight = document.documentElement.classList.contains('light-mode');
            
            logo.src = isLight ? 'pics/arch_de_arch.png' : 'pics/arch_de_arch_w.png';
            }

            // Run on page load + theme switch
            updateLogo();
            document.addEventListener('DOMContentLoaded', updateLogo);
    */
