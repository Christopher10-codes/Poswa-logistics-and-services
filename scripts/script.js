const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Initialize menu icon
mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';

mobileMenu.addEventListener('click', () => {
    // Toggle menu visibility
    navLinks.classList.toggle('active');
    
    // Change menu icon
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.querySelector('i').classList.remove('fa-times');
        mobileMenu.querySelector('i').classList.add('fa-bars');
        body.style.overflow = 'auto';
    });
});


       document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quoteForm');
    const submitBtn = document.getElementById('submitBtn');
    let isSubmitting = false; // Track submission state

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'form-message';
    document.body.appendChild(messageElement);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Prevent multiple submissions
        if (isSubmitting) return;
        isSubmitting = true;
        
        // Update button state
        submitBtn.disabled = true;
        submitBtn.classList.add('submitting');
        submitBtn.textContent = 'Sending...';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showMessage('Your request was submitted successfully!', 'success');
                setTimeout(() => form.reset(), 5000);
            } else {
                const errorData = await response.json();
                const errorMsg = errorData.errors 
                    ? errorData.errors.map(error => error.message).join(', ')
                    : 'There was a problem submitting your form.';
                showMessage(errorMsg, 'error');
            }
        } catch (error) {
            showMessage('Network error. Please try again.', 'error');
            console.error('Error:', error);
        } finally {
            // Reset button state with delay to prevent rapid successive clicks
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.classList.remove('submitting');
                submitBtn.textContent = 'Request Free Quote';
                isSubmitting = false;
            }, 1000); // 1-second cooldown
        }
    });

    // Add this right after your existing form submission code
function showToast(message, type) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `form-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Make it visible
    setTimeout(() => toast.classList.add('visible'), 10);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('visible');
        // Remove element after fade out
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

// Modify your existing success/error handlers to use:
// On success:
showToast('Your request was submitted successfully!', 'success');

// On error:
showToast('Submission failed. Please try again.', 'error');

    // Improved click handling for mobile devices
    submitBtn.addEventListener('touchstart', function() {
        this.classList.add('active');
    });
    
    submitBtn.addEventListener('touchend', function() {
        this.classList.remove('active');
    });

    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = `form-message visible ${type}`;
        
        setTimeout(() => {
            messageElement.classList.add('hiding');
            setTimeout(() => {
                messageElement.className = 'form-message';
            }, 500);
        }, 5000);
    }
});
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Animation on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.service-card, .feature, .testimonial');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animate-slide-in');
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);