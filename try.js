// gallery.js - Portfolio Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery Data, for when you click on the image to view in modal
    //It shoud correspond to the images in the gallery in html
    const galleryData = [
        {
            src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "MTN Billboard Campaign",
            description: "Outdoor advertising campaign spanning major highways in Accra. This campaign reached over 2 million people and increased brand awareness by 45%.",
            category: "advertising",
            date: "March 2023"
        },
        {
            src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Cocoa Processing Company",
            description: "Print and digital advertising campaign promoting Ghanaian cocoa products to international markets. Featured in 15+ publications.",
            category: "advertising",
            date: "January 2023"
        },
        {
            src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
            title: "Bank of Ghana Animation",
            description: "2D animated explainer video for financial literacy. The animation simplified complex banking concepts for general audiences.",
            category: "animation",
            date: "February 2023"
        },
        {
            src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
            title: "Character Animation Series",
            description: "Educational animation series for children, teaching Ghanaian history and culture through engaging character stories.",
            category: "animation",
            date: "December 2022"
        },
        {
            src: "pics/a-professional-overhead-photograph-of-a-_HrgL1InfRrugOpsXSHjcwA_cfuXb4snS16J3Evev9djqw.jpeg",
            title: "Kumasi Central Market",
            description: "Brand photography capturing the vibrant energy of Kumasi's largest market. Used for tourism promotion campaigns.",
            category: "photography",
            date: "November 2022"
        },
        {
            src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
            title: "Corporate Headshots",
            description: "Executive photography for leading Ghanaian companies. Professional portraits for websites, annual reports, and marketing materials.",
            category: "photography",
            date: "October 2022"
        },
        {
            src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Coastal Documentary",
            description: "Documentary film exploring Ghana's coastline conservation efforts. Screened at 5 international film festivals.",
            category: "videography",
            date: "September 2022"
        },
        {
            src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            title: "Telecom Commercial",
            description: "30-second TV commercial featuring Ghanaian celebrities. Aired nationwide during prime time slots.",
            category: "videography",
            date: "August 2022"
        },
        {
            src: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            title: "#VisitGhana Campaign",
            description: "Social media tourism campaign that generated 5 million impressions and 500,000 engagements across platforms.",
            category: "social",
            date: "July 2022"
        },
        {
            src: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            title: "Influencer Collaboration",
            description: "Brand partnership with 10 top Ghanaian influencers. Campaign reached 3 million unique users across social platforms.",
            category: "social",
            date: "June 2022"
        }
    ];

    // DOM Elements
    const gallerySlider = document.querySelector('.gallery-slider');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const modal = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalCategory = document.querySelector('.modal-category');
    const modalDate = document.querySelector('.modal-date');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');

    // Gallery State
    let currentIndex = 0;
    let currentFilter = 'all';
    let visibleItems = 3;
    let currentPosition = 0;
    const itemWidth = galleryItems[0].offsetWidth + 32; // width + gap

    // Calculate visible items based on screen size
    function updateVisibleItems() {
        if (window.innerWidth <= 768) {
            visibleItems = 1;
        } else if (window.innerWidth <= 1024) {
            visibleItems = 2;
        } else {
            visibleItems = 3;
        }
        updateSliderPosition();
    }

    // Update slider position
    function updateSliderPosition() {
        gallerySlider.style.transform = `translateX(-${currentPosition}px)`;
    }

    // Filter gallery items
    function filterGallery(category) {
        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Reset position when filtering
        currentPosition = 0;
        updateSliderPosition();
    }

    // Open modal with specific image
    function openModal(index) {
        const data = galleryData[index];
        currentIndex = index;
        
        modalImage.src = data.src;
        modalImage.alt = data.title;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalCategory.textContent = data.category.charAt(0).toUpperCase() + data.category.slice(1);
        modalDate.textContent = data.date;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigation functions
    function goToNext() {
        const totalItems = galleryItems.length;
        const maxPosition = (totalItems - visibleItems) * itemWidth;
        
        if (currentPosition < maxPosition) {
            currentPosition += itemWidth;
            updateSliderPosition();
        }
    }

    function goToPrev() {
        if (currentPosition > 0) {
            currentPosition -= itemWidth;
            updateSliderPosition();
        }
    }

    function goToNextImage() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        openModal(currentIndex);
    }

    function goToPrevImage() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        openModal(currentIndex);
    }

    // Event Listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery
            currentFilter = this.dataset.filter;
            filterGallery(currentFilter);
        });
    });

    viewButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal(index);
        });
    });

    // Click on image card
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-btn')) {
                openModal(index);
            }
        });
    });

    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', goToPrevImage);
    modalNext.addEventListener('click', goToNextImage);

    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    goToPrevImage();
                    break;
                case 'ArrowRight':
                    goToNextImage();
                    break;
            }
        }
    });

    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    gallerySlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    gallerySlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            goToNext();
        }
        
        if (touchEndX - touchStartX > swipeThreshold) {
            goToPrev();
        }
    }

    // Initialize
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
});