 // Mobile menu toggle (existing functionality kept)
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenu && navLinks) {
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
                if (mobileMenu.querySelector('i')) {
                    mobileMenu.querySelector('i').classList.remove('fa-times');
                    mobileMenu.querySelector('i').classList.add('fa-bars');
                }
                body.style.overflow = 'auto';
            });
        });
    }

    // WHATSAPP INTEGRATION - Replaces Formspree
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('quoteForm');
        const submitBtn = document.getElementById('submitBtn');
        let isSubmitting = false;

        // Helper function to show toast message
        function showToast(message, type) {
            // Remove existing toast if any
            const existingToast = document.querySelector('.form-toast');
            if (existingToast) existingToast.remove();
            
            // Create toast element
            const toast = document.createElement('div');
            toast.className = `form-toast ${type}`;
            toast.textContent = message;
            
            // Basic inline styles for visibility (no external styling)
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = type === 'success' ? '#10b981' : '#ef4444';
            toast.style.color = 'white';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '50px';
            toast.style.fontWeight = '500';
            toast.style.zIndex = '9999';
            toast.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.2)';
            toast.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            toast.style.fontSize = '0.9rem';
            toast.style.maxWidth = '90%';
            toast.style.textAlign = 'center';
            toast.style.backdropFilter = 'blur(8px)';
            
            document.body.appendChild(toast);
            
            // Animate in
            setTimeout(() => {
                toast.style.opacity = '1';
            }, 10);
            
            // Auto-hide after 4 seconds
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }

        // Build structured WhatsApp message from form data
        function buildWhatsAppMessage(formData) {
            const firstName = formData.get('firstName') || '';
            const lastName = formData.get('lastName') || '';
            const phone = formData.get('phone') || '';
            const email = formData.get('email') || '';
            const deliveryDate = formData.get('deliveryDate') || '';
            const pickupLocation = formData.get('pickupLocation') || '';
            const deliveryDestination = formData.get('deliveryDestination') || '';
            const items = formData.get('items') || '';
            
            // Create a nicely structured message
            let message = `*📦 NEW QUOTE REQUEST - Powa Logistics*%0A%0A`;
            message += `*👤 CLIENT INFORMATION*%0A`;
            message += `────────────────%0A`;
            message += `*First Name:* ${firstName}%0A`;
            message += `*Last Name:* ${lastName}%0A`;
            message += `*Phone:* ${phone}%0A`;
            message += `*Email:* ${email}%0A%0A`;
            
            message += `*📍 DELIVERY DETAILS*%0A`;
            message += `────────────────%0A`;
            message += `*Preferred Date:* ${deliveryDate}%0A`;
            message += `*Pickup Location:* ${pickupLocation}%0A`;
            message += `*Delivery Destination:* ${deliveryDestination}%0A%0A`;
            
            message += `*📦 ITEMS TO DELIVER*%0A`;
            message += `────────────────%0A`;
            message += `${items}%0A%0A`;
            
            message += `*⏱️ Sent via website quote form*`;
            
            return message;
        }

        // WhatsApp redirect function
        function sendToWhatsApp(messageText) {
            const phoneNumber = '27747854197'; // without '+' for wa.me format
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${messageText}`;
            window.open(whatsappUrl, '_blank');
        }

        // Handle form submission
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Prevent multiple submissions
            if (isSubmitting) return;
            
            // Basic client-side validation
            const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'deliveryDate', 'pickupLocation', 'deliveryDestination', 'items'];
            let isValid = true;
            let errorMessage = '';
            
            for (let field of requiredFields) {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    errorMessage = `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
                    input.style.border = '1px solid #ef4444';
                    setTimeout(() => {
                        input.style.border = '';
                    }, 2000);
                    break;
                }
            }
            
            // Email validation
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            if (isValid && emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
                emailInput.style.border = '1px solid #ef4444';
                setTimeout(() => {
                    emailInput.style.border = '';
                }, 2000);
            }
            
            // Phone validation (basic - at least 9 digits)
            const phoneInput = document.getElementById('phone');
            const phoneDigits = phoneInput.value.trim().replace(/\D/g, '');
            if (isValid && phoneDigits.length < 9) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
                phoneInput.style.border = '1px solid #ef4444';
                setTimeout(() => {
                    phoneInput.style.border = '';
                }, 2000);
            }
            
            if (!isValid) {
                showToast(errorMessage, 'error');
                return;
            }
            
            isSubmitting = true;
            
            // Update button state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Redirecting to WhatsApp...';
            }
            
            try {
                // Collect form data
                const formData = new FormData(form);
                const whatsappMessage = buildWhatsAppMessage(formData);
                
                // Send to WhatsApp
                sendToWhatsApp(whatsappMessage);
                
                // Show success message
                showToast('Opening WhatsApp! Send the pre-filled message to request your quote.', 'success');
                
                // Optional: reset form after successful redirect
                setTimeout(() => {
                    form.reset();
                }, 1000);
                
            } catch (error) {
                console.error('WhatsApp error:', error);
                showToast('Unable to open WhatsApp. Please check your connection.', 'error');
            } finally {
                // Reset button state after delay
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Request Free Quote';
                    }
                    isSubmitting = false;
                }, 2000);
            }
        });
        
        // Reset border styles on input focus
        const allInputs = form.querySelectorAll('input, textarea');
        allInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.border = '';
            });
        });
    });

    // Smooth scrolling for anchor links (existing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll (existing)
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .feature, .testimonial, .gallery-item');
        
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