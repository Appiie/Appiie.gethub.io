document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for .animated-section
    const animatedSections = document.querySelectorAll('.animated-section');
    if (animatedSections.length > 0) {
        const observerOptions = {
            root: null, // relative to document viewport
            rootMargin: '0px',
            threshold: 0.1 // trigger when 10% of the item is visible
        };
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        };
        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        animatedSections.forEach(section => {
            intersectionObserver.observe(section);
        });
    }

    // Hero headline animation
    function animateHeroHeadline() {
        const heroHeadline = document.querySelector('#hero h2');
        if (heroHeadline) {
            const words = heroHeadline.querySelectorAll('.h-word');
            words.forEach((word, index) => {
                word.style.animationDelay = `${index * 0.12 + 0.2}s`; // Stagger delay
            });
        }
    }
    animateHeroHeadline();

    // Polaroid random rotations
    function applyRandomRotationsToPolaroids() {
        const items = document.querySelectorAll('.polaroid-style .meme-item');
        items.forEach(item => {
            if (!item.matches(':hover')) { 
                const randomRotation = Math.random() * 6 - 3; // -3deg to 3deg
                item.style.transform = `rotate(${randomRotation}deg)`;
            }
        });
    }
    applyRandomRotationsToPolaroids();
    
    // Optional: Event listener for Polaroid mouseout (simplified)
    const gallery = document.querySelector('.polaroid-style');
    if (gallery) {
        gallery.addEventListener('mouseout', (event) => {
            if (event.target.classList.contains('meme-item') && !event.target.matches(':hover')) {
                 const randomRotation = Math.random() * 6 - 3; // Re-apply a random rotation
                 event.target.style.transform = `rotate(${randomRotation}deg)`;
            }
        }, true);
    }

    // Page transitions
    function initPageTransitions() {
        const internalLinks = document.querySelectorAll(
            'a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])'
        );
        internalLinks.forEach(link => {
            const isDifferentPage = link.hostname === window.location.hostname && 
                                   (link.pathname !== window.location.pathname || link.search !== window.location.search);
            const isHtmlFileLink = link.href.endsWith('.html');

            if (isDifferentPage || isHtmlFileLink) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const destination = this.href;
                    document.body.classList.add('body-fade-out');
                    setTimeout(() => {
                        window.location.href = destination;
                    }, 350); 
                });
            }
        });

        window.addEventListener('pageshow', function(event) {
            document.body.classList.remove('body-fade-out');
            // Attempt to re-trigger fadeInPage animation
            if (document.body.style.opacity === '0' || !parseFloat(getComputedStyle(document.body).opacity)) {
               document.body.style.opacity = '0'; // Reset for animation
               void document.body.offsetWidth; // Force reflow
               document.body.style.animation = 'none'; // Remove previous animation instance
               setTimeout(() => { // Add it back to replay
                   document.body.style.animation = ''; 
               }, 10); // Small delay to ensure it works
            }
        });
    }
    initPageTransitions();
});
