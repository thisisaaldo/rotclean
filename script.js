// RotClean Website JavaScript
// Simple landing page functionality

// Global variables
let currentPropertyType = 'residential';
let currentFrequency = 'one-time';
let extraServices = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    animateSpeechBubble();
    setMinDate();
});

// Initialize page functionality
function initializePage() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .stat-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('show')) {
        toggleMobileMenu();
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('show');
}

// Animate speech bubble
function animateSpeechBubble() {
    const speechBubble = document.getElementById('speechBubble');
    const speechText = document.getElementById('speechText');
    
    if (speechBubble && speechText) {
        // Add hover effect
        speechBubble.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.05) rotate(2deg)';
        });
        
        speechBubble.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) scale(1) rotate(0deg)';
        });
        
        // Animate text letter by letter
        const text = speechText.textContent;
        speechText.textContent = '';
        
        setTimeout(() => {
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    speechText.textContent += text[index];
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, 1000);
    }
}

// Quote Calculator Functions
function selectPropertyType(type) {
    currentPropertyType = type;
    
    // Update button states
    document.querySelectorAll('.property-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
}

function selectFrequency(frequency) {
    currentFrequency = frequency;
    
    // Update button states
    document.querySelectorAll('.frequency-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-frequency="${frequency}"]`).classList.add('active');
}

function toggleExtraService(serviceId) {
    const checkbox = document.getElementById(serviceId);
    if (checkbox.checked) {
        extraServices.push(serviceId);
    } else {
        extraServices = extraServices.filter(id => id !== serviceId);
    }
}

function calculateQuote() {
    // Get form data
    const windows = parseInt(document.getElementById('windowsInput').value) || 10;
    const floors = parseInt(document.getElementById('floorsInput').value) || 1;
    
    // Calculate quote based on property type
    let minPrice, maxPrice;
    
    switch (currentPropertyType) {
        case 'residential':
            minPrice = 89;
            maxPrice = 299;
            break;
        case 'commercial':
            minPrice = 149;
            maxPrice = 499;
            break;
        case 'post-construction':
            minPrice = 149;
            maxPrice = 499;
            break;
        default:
            minPrice = 89;
            maxPrice = 299;
    }
    
    // Apply frequency discount
    const frequencyDiscounts = {
        'one-time': 0,
        'monthly': 0.15,
        'bi-monthly': 0.10,
        'quarterly': 0.05
    };
    
    const discount = frequencyDiscounts[currentFrequency] || 0;
    minPrice = Math.round(minPrice * (1 - discount));
    maxPrice = Math.round(maxPrice * (1 - discount));
    
    // Add extra services
    const extraServicePrices = {
        'screens': { min: 20, max: 40 },
        'sills': { min: 15, max: 30 },
        'tracks': { min: 15, max: 30 }
    };
    
    extraServices.forEach(service => {
        const price = extraServicePrices[service];
        if (price) {
            minPrice += price.min;
            maxPrice += price.max;
        }
    });
    
    // Update price display
    document.getElementById('priceRange').textContent = `$${minPrice} - $${maxPrice}`;
    
    // Show step 2
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    
    // Scroll to quote result
    setTimeout(() => {
        scrollToSection('quote');
    }, 300);
}

function goBackToQuote() {
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
}

function bookService() {
    // Get form data
    const formData = {
        propertyType: currentPropertyType,
        frequency: currentFrequency,
        extraServices: extraServices,
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        preferredDate: document.getElementById('preferredDate').value,
        notes: document.getElementById('additionalNotes').value
    };
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        showToast('Please fill in all required fields', 'warning');
        return;
    }
    
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('windowCleaningBookings') || '[]');
    bookings.push({
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('windowCleaningBookings', JSON.stringify(bookings));
    
    // Show success message
    showToast('Service booked successfully! We will contact you soon.', 'success');
    
    // Reset form
    document.getElementById('customerName').value = '';
    document.getElementById('customerEmail').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('preferredDate').value = '';
    document.getElementById('additionalNotes').value = '';
    
    // Go back to step 1
    goBackToQuote();
}

// Contact Form Functions
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        service: document.getElementById('contactService').value,
        message: document.getElementById('contactMessage').value
    };
    
    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem('windowCleaningContacts') || '[]');
    contacts.push({
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('windowCleaningContacts', JSON.stringify(contacts));
    
    // Show success message
    showToast('Message sent successfully! We will reply within 24 hours.', 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
}

// Utility Functions
function setMinDate() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    const icons = {
        'success': '✅',
        'warning': '⚠️',
        'error': '❌',
        'info': 'ℹ️'
    };
    toastIcon.textContent = icons[type] || icons['info'];
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

function showNotImplemented() {
    showToast('🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀', 'info');
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('show')) {
            toggleMobileMenu();
        }
    }
});

// Add form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return re.test(phone);
}

// Add real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                showToast('Please enter a valid email address', 'warning');
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
    });
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#ef4444';
                showToast('Please enter a valid phone number', 'warning');
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
    });
});
