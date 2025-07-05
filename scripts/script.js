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


        // Form Submission
        const quoteForm = document.getElementById('quoteForm');
        
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would typically send the form data to your server
            // For demonstration, we'll just show an alert
            alert('Thank you for your request! We will contact you shortly with your quote.');
            quoteForm.reset();
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