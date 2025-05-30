document.addEventListener('DOMContentLoaded', () => {
    const animatedSections = document.querySelectorAll('.animated-section');

    if (!animatedSections.length) {
        return;
    }

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
});
