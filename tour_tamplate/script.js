// Main JavaScript file for Tour Sales Website
$(document).ready(function() {
    console.log('TourWorld website loaded successfully!');
    
    // Initialize all components
    initializeCarousel();
    initializeScrollEffects();
    initializeTourModals();
    initializeGallery();
    initializeNavigation();
    
    // Auto-slide carousel every 2 seconds
    function initializeCarousel() {
        // Bootstrap carousel is already initialized with data-bs-interval="2000"
        // Add custom controls if needed
        $('#heroCarousel').on('slide.bs.carousel', function (e) {
            console.log('Sliding to slide:', e.to);
        });
    }
    
    // Smooth scrolling for navigation links
    function initializeNavigation() {
        $('a[href^="#"]').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            if( target.length ) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
            }
        });
        
        // Update active nav item on scroll
        $(window).scroll(function() {
            var scrollDistance = $(window).scrollTop();
            
            $('section[id]').each(function(i) {
                if ($(this).position().top - 100 <= scrollDistance) {
                    $('.navbar-nav a.active').removeClass('active');
                    $('.navbar-nav a').eq(i).addClass('active');
                }
            });
        });
    }
    
    // Scroll effects and animations
    function initializeScrollEffects() {
        // Add fade-in class to elements
        $('.tour-card, .gallery-item').addClass('fade-in');
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Parallax effect for hero section
        $(window).scroll(function() {
            var scrolled = $(this).scrollTop();
            var parallax = $('.hero-slide');
            var speed = 0.5;
            
            parallax.each(function() {
                var yPos = -(scrolled * speed);
                $(this).css('transform', 'translateY(' + yPos + 'px)');
            });
        });
    }
    
    // Tour details modal functionality
    function initializeTourModals() {
        const tourDetails = {
            mumbai: {
                title: 'Mumbai Adventure - Complete Details',
                content: `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                                 class="img-fluid rounded mb-3" alt="Mumbai Tour">
                        </div>
                        <div class="col-md-6">
                            <h5 class="text-primary mb-3">Tour Highlights</h5>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Gateway of India visit</li>
                                <li><i class="fas fa-check text-success me-2"></i>Bollywood studio tour</li>
                                <li><i class="fas fa-check text-success me-2"></i>Street food exploration</li>
                                <li><i class="fas fa-check text-success me-2"></i>Marine Drive sunset</li>
                                <li><i class="fas fa-check text-success me-2"></i>Elephanta Caves excursion</li>
                                <li><i class="fas fa-check text-success me-2"></i>Local market shopping</li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-4">
                            <h6 class="text-primary">Duration</h6>
                            <p>7 Days / 6 Nights</p>
                        </div>
                        <div class="col-md-4">
                            <h6 class="text-primary">Group Size</h6>
                            <p>Max 15 people</p>
                        </div>
                        <div class="col-md-4">
                            <h6 class="text-primary">Best Time</h6>
                            <p>Oct - Mar</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <h6 class="text-primary">What's Included</h6>
                        <p class="text-muted">Accommodation, breakfast, guided tours, entrance fees, airport transfers, and local transportation.</p>
                    </div>
                `
            },
            spain: {
                title: 'Spanish Fiesta - Complete Details',
                content: `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                                 class="img-fluid rounded mb-3" alt="Spain Tour">
                        </div>
                        <div class="col-md-6">
                            <h5 class="text-primary mb-3">Tour Highlights</h5>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Sagrada Familia & Park Güell</li>
                                <li><i class="fas fa-check text-success me-2"></i>Flamenco show in Seville</li>
                                <li><i class="fas fa-check text-success me-2"></i>Prado Museum, Madrid</li>
                                <li><i class="fas fa-check text-success me-2"></i>Tapas & wine tasting</li>
                                <li><i class="fas fa-check text-success me-2"></i>Alhambra Palace, Granada</li>
                                <li><i class="fas fa-check text-success me-2"></i>Costa del Sol beaches</li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-4">
                            <h6 class="text-primary">Duration</h6>
                            <p>10 Days / 9 Nights</p>
                        </div>
                        <div class="col-md-4">
                            <h6 class="text-primary">Group Size</h6>
                            <p>Max 12 people</p>
                        </div>
                        <div class="col-md-4">
                            <h6 class="text-primary">Best Time</h6>
                            <p>Apr - Oct</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <h6 class="text-primary">What's Included</h6>
                        <p class="text-muted">4-star hotels, daily breakfast, high-speed train tickets, guided tours, flamenco show, and wine tasting sessions.</p>
                    </div>
                `
            },
            italy: {
                title: 'Italian Romance - Complete Details',
                content: `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                                 class="img-fluid rounded mb-3" alt="Italy Tour">
                        </div>
                        <div class="col-md-6">
                            <h5 class="text-primary mb-3">Tour Highlights</h5>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Colosseum & Roman Forum</li>
                                <li><i class="fas fa-check text-success me-2"></i>Vatican City & Sistine Chapel</li>
                                <li><i class="fas fa-check text-success me-2"></i>Gondola ride in Venice</li>
                                <li><i class="fas fa-check text-success me-2"></i>Uffizi Gallery, Florence</li>
                                <li><i class="fas fa-check text-success me-2"></i>Tuscany wine country</li>
                                <li><i class="fas fa-check text-success me-2"></i>Cooking class in Rome</li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-4">
                            <h6 class="text-primary">Duration</h6>
                            <p>12 Days / 11 Nights</p>
                        </div>
                        <div class="col-md-4">
                            <h6 class="text-primary">Group Size</h6>
                            <p>Max 10 people</p>
                        </div>
                        <div class="col-md-4">
                            <h6 class="text-primary">Best Time</h6>
                            <p>May - Sep</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <h6 class="text-primary">What's Included</h6>
                        <p class="text-muted">Luxury accommodations, all meals, private guides, skip-the-line tickets, cooking class, and wine tasting in Tuscany.</p>
                    </div>
                `
            }
        };
        
        // Handle tour details button clicks
        $('.tour-details-btn').on('click', function() {
            const tourType = $(this).data('tour');
            const tour = tourDetails[tourType];
            
            if (tour) {
                $('#modalTitle').text(tour.title);
                $('#modalBody').html(tour.content);
                
                // Show modal with animation
                $('#tourModal').modal('show');
                
                // Add loading effect
                $(this).html('<span class="loading"></span> Loading...');
                
                setTimeout(() => {
                    $(this).html('<i class="fas fa-info-circle me-2"></i>More Details');
                }, 1000);
            }
        });
    }
    
    // Gallery functionality
    function initializeGallery() {
        // Add click handlers for gallery items
        $('.gallery-item').on('click', function() {
            const imgSrc = $(this).find('.gallery-image').attr('src');
            const title = $(this).find('h5').text();
            const description = $(this).find('p').text();
            
            // Create and show image modal
            const imageModal = `
                <div class="modal fade" id="imageModal" tabindex="-1">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body text-center">
                                <img src="${imgSrc}" class="img-fluid rounded" alt="${title}">
                                <p class="mt-3 text-muted">${description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Remove existing modal and add new one
            $('#imageModal').remove();
            $('body').append(imageModal);
            $('#imageModal').modal('show');
            
            // Remove modal after hiding
            $('#imageModal').on('hidden.bs.modal', function() {
                $(this).remove();
            });
        });
        
        // Lazy loading for gallery images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('.gallery-image').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add some interactive features
    function addInteractiveFeatures() {
        // Typing effect for hero titles
        const heroTitles = document.querySelectorAll('.carousel-item h1');
        
        heroTitles.forEach((title, index) => {
            const text = title.textContent;
            title.textContent = '';
            
            setTimeout(() => {
                typeWriter(title, text, 0);
            }, index * 100);
        });
        
        function typeWriter(element, text, i) {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                setTimeout(() => typeWriter(element, text, i + 1), 100);
            }
        }
        
        // Add floating animation to tour cards
        $('.tour-card').each(function(index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
        });
        
        // Add pulse effect to CTA buttons
        $('.btn-primary').addClass('pulse');
        
        // Remove pulse on hover
        $('.btn-primary').hover(
            function() { $(this).removeClass('pulse'); },
            function() { $(this).addClass('pulse'); }
        );
    }
    
    // Initialize interactive features after a short delay
    setTimeout(addInteractiveFeatures, 1000);
    
    // Add scroll-to-top functionality
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            if (!$('#scrollToTop').length) {
                $('body').append(`
                    <button id="scrollToTop" class="btn btn-primary position-fixed" 
                            style="bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px;">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                `);
                
                $('#scrollToTop').on('click', function() {
                    $('html, body').animate({scrollTop: 0}, 800);
                });
            }
        } else {
            $('#scrollToTop').remove();
        }
    });
    
    // Add loading screen
    function showLoadingScreen() {
        $('body').prepend(`
            <div id="loadingScreen" class="position-fixed w-100 h-100 d-flex align-items-center justify-content-center bg-white" style="top: 0; left: 0; z-index: 9999;">
                <div class="text-center">
                    <div class="loading mb-3" style="width: 50px; height: 50px; border-width: 5px;"></div>
                    <h4 class="text-primary">Loading TourWorld...</h4>
                </div>
            </div>
        `);
        
        setTimeout(() => {
            $('#loadingScreen').fadeOut(500, function() {
                $(this).remove();
            });
        }, 2000);
    }
    
    // Show loading screen on page load
    showLoadingScreen();
    
    // Console welcome message
    console.log(`
    🌍 Welcome to TourWorld! 🌍
    ================================
    Thanks for visiting our website!
    Ready to explore amazing destinations?
    ================================
    `);
});

// Additional utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Export functions for global use
window.TourWorld = {
    formatPrice,
    validateEmail
};