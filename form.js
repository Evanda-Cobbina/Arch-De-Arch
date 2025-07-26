// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBktrf9CquD-eR_fYQDjKhcPMQ5bTgdhC0",
  authDomain: "arch-de-arch-3ddf4.firebaseapp.com",
  projectId: "arch-de-arch-3ddf4",
  storageBucket: "arch-de-arch-3ddf4.appspot.com", // Fixed typo: was `.firebasestorage.app`
  messagingSenderId: "84087786237",
  appId: "1:84087786237:web:e59e9f101b5321d996cc94"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit handler
window.submitBooking = async function (event) {
  event.preventDefault(); // ✅ Prevent default form submit behavior

  // Get form values
  const firstname = document.getElementById('firstName').value.trim();
  const lastname = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phone').value.trim();
  const location = document.getElementById('locationSearch').value.trim(); // Or use 'location' hidden input if needed
  const hearAbout = document.getElementById('hearAbout').value;

  // Optionally validate required fields manually here too

  try {
    await addDoc(collection(db, 'bookings'), {
      firstname,
      lastname,
      email,
      phoneNumber,
      location,
      hearAbout,
      timestamp: Timestamp.now()
    });

    alert('✅ Booking saved successfully!');
    document.getElementById("contactForm").reset(); // Clear form after successful submit
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    alert("❌ Failed to save booking. Please try again.");
  }
};




      
      
      
      
      
      //Main JS for the whole website
       // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if(navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

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

        // Scroll behavior for navigation
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                body.classList.add('nav-scrolled');
            } else {
                body.classList.remove('nav-scrolled');
            }
        });

        // Initialize scroll state
        window.dispatchEvent(new Event('scroll'));

        //about
          // Mobile Menu Toggle
        // Add scroll animations
        document.addEventListener('DOMContentLoaded', () => {
            const serviceCards = document.querySelectorAll('.service-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            serviceCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(card);
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Initialize EmailJS (replace with your actual User ID)
            emailjs.init('user_your_emailjs_userid_here');

            // Ghanaian locations list (alphabetical order)
            const ghanaLocations = [
                "Abeka", "Abosseyokai", "Accra", "Accra New Town", "Achimota", 
                "Ada Foah", "Ada Kasseh", "Adabraka", "Adenta East", "Adenta Municipality", 
                "Aflao", "Agona Swedru", "Airport Residential Area", "Akweteyman", "Akim Oda", 
                "Ashiaman", "Awoshie", "Axim", "Bolgatanga", "Cape Coast", 
                "Dodowa", "Effia Kuma", "Gbawe", "Gbegbe", "Goaso", 
                "Ho", "Hohoe", "Kade", "Kasoa", "Kintampo", 
                "Koforidua", "Kumasi", "Lashibi", "Madina", "Ngleshi Amanfro", 
                "Nkawkaw", "Nungua", "Obuasi", "Posters and Flyers", "Sunyani", 
                "Suhum", "Takoradi", "Tamale", "Tarkwa", "Techiman", 
                "Tema", "Tema New Town", "Teshie", "Wa", "Winneba"
            ];

            // DOM Elements
            const contactForm = document.getElementById('contactForm');
            const locationSearch = document.getElementById('locationSearch');
            const locationDropdown = document.getElementById('locationDropdown');
            const locationInput = document.getElementById('location');
            const successOverlay = document.getElementById('successOverlay');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const submitBtn = document.querySelector('.submit-btn');
            const btnText = document.querySelector('.btn-text');

            // Variables
            let selectedLocation = null;

            // Initialize Location Dropdown
            function initLocationDropdown() {
                ghanaLocations.sort();
                renderLocationDropdown(ghanaLocations);
                
                locationSearch.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    const filteredLocations = ghanaLocations.filter(location => 
                        location.toLowerCase().includes(searchTerm)
                    );
                    renderLocationDropdown(filteredLocations);
                });
                
                locationSearch.addEventListener('focus', function() {
                    locationDropdown.classList.add('active');
                });
                
                document.addEventListener('click', function(e) {
                    if (!locationSearch.contains(e.target) && !locationDropdown.contains(e.target)) {
                        locationDropdown.classList.remove('active');
                    }
                });
            }

            // Render Location Dropdown
            function renderLocationDropdown(locations) {
                locationDropdown.innerHTML = '';
                
                if (locations.length === 0) {
                    const noResults = document.createElement('div');
                    noResults.className = 'location-item';
                    noResults.textContent = 'No locations found';
                    locationDropdown.appendChild(noResults);
                    return;
                }
                
                locations.forEach(location => {
                    const locationItem = document.createElement('div');
                    locationItem.className = 'location-item';
                    locationItem.textContent = location;
                    
                    locationItem.addEventListener('click', function() {
                        selectedLocation = location;
                        locationInput.value = location;
                        locationSearch.value = location;
                        locationDropdown.classList.remove('active');
                        clearError('locationError');
                    });
                    
                    // Highlight matching text
                    if (locationSearch.value) {
                        const regex = new RegExp(locationSearch.value, 'gi');
                        locationItem.innerHTML = location.replace(regex, match => 
                            `<span style="color: var(--text-accent); font-weight: 500;">${match}</span>`
                        );
                    }
                    
                    locationDropdown.appendChild(locationItem);
                });
                
                // Show dropdown if it's not empty and input is focused
                if (locations.length > 0 && document.activeElement === locationSearch) {
                    locationDropdown.classList.add('active');
                }
            }

            // Form Validation
            function validateForm() {
                let isValid = true;
                
                // First Name
                const firstName = document.getElementById('firstName').value.trim();
                if (!firstName) {
                    showError('firstNameError', 'Please enter your first name');
                    isValid = false;
                }
                
                // Last Name
                const lastName = document.getElementById('lastName').value.trim();
                if (!lastName) {
                    showError('lastNameError', 'Please enter your last name');
                    isValid = false;
                }
                
                // Email
                const email = document.getElementById('email').value.trim();
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    showError('emailError', 'Please enter a valid email address');
                    isValid = false;
                }
                
                // Phone (Ghanaian format)
                const phone = document.getElementById('phone').value.trim();
                const ghanaPhoneRegex = /^(?:233|0)?(?:24|54|55|59|20|50|26|27|28|23|57|56)\d{7}$/;
                if (!phone || !ghanaPhoneRegex.test(phone)) {
                    showError('phoneError', 'Please enter a valid Ghanaian phone number');
                    isValid = false;
                }
                
                // Location
                if (!selectedLocation) {
                    showError('locationError', 'Please select your location');
                    isValid = false;
                }
                
                // How Did You Hear About Us
                const hearAbout = document.getElementById('hearAbout').value;
                if (!hearAbout) {
                    showError('hearAboutError', 'Please select how you heard about us');
                    isValid = false;
                }
                
                return isValid;
            }

            function showError(elementId, message) {
                const errorElement = document.getElementById(elementId);
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                
                const inputField = errorElement.previousElementSibling.querySelector('input, select');
                inputField.classList.add('error');
                
                // Scroll to the first error
                if (!document.querySelector('.error')) {
                    inputField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }

            function clearError(elementId) {
                const errorElement = document.getElementById(elementId);
                errorElement.style.display = 'none';
                
                const inputField = errorElement.previousElementSibling.querySelector('input, select');
                inputField.classList.remove('error');
            }

            // Clear errors on input
            document.querySelectorAll('input, select').forEach(input => {
                input.addEventListener('input', function() {
                    const errorId = this.id + 'Error';
                    if (document.getElementById(errorId)) {
                        clearError(errorId);
                    }
                });
            });

            // Form Submission
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    submitBtn.classList.add('loading');
                    
                    // Prepare form data
                    const formData = {
                        firstName: document.getElementById('firstName').value.trim(),
                        lastName: document.getElementById('lastName').value.trim(),
                        email: document.getElementById('email').value.trim(),
                        phone: document.getElementById('phone').value.trim(),
                        company: document.getElementById('company').value.trim(),
                        location: selectedLocation,
                        hearAbout: document.getElementById('hearAbout').value,
                        timestamp: new Date().toLocaleString()
                    };
                    
                    // Send email using EmailJS
                    emailjs.send('service_your_service_id', 'template_your_template_id', formData)
                        .then(function(response) {
                            console.log('SUCCESS!', response.status, response.text);
                            
                            // Show success modal
                            successOverlay.classList.add('active');
                            
                            // Reset form
                            contactForm.reset();
                            selectedLocation = null;
                            submitBtn.classList.remove('loading');
                            
                            // Auto-close modal after 5 seconds
                            setTimeout(() => {
                                if (successOverlay.classList.contains('active')) {
                                    successOverlay.classList.remove('active');
                                }
                            }, 5000);
                        }, function(error) {
                            console.log('FAILED...', error);
                            alert('There was an error submitting your form. Please try again later.');
                            submitBtn.classList.remove('loading');
                        });
                } else {
                    // Scroll to the first error
                    const firstError = document.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });

            // Close Modal
            closeModalBtn.addEventListener('click', function() {
                successOverlay.classList.remove('active');
            });

            // Initialize
            initLocationDropdown();
        });




