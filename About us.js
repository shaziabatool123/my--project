// Simple animations for the About page
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .focus-content, .promise-card, .journey-stat');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const isVisible = elementTop < window.innerHeight - 100;
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.feature-card, .focus-content, .promise-card, .journey-stat');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Initialize and add scroll listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('CraftHub About Page - Ready for a new beginning!');
});