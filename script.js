document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const slideElements = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const indicators = document.querySelectorAll('.indicator');

    let index = 0;
    let interval;

    const updateIndicators = () => {
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[index].classList.add('active');
    };

    const showSlide = (newIndex, direction) => {
        slideElements.forEach(slide => slide.classList.remove('active', 'rotate-in', 'rotate-out'));

        if (direction === 'next') {
            slideElements[newIndex].classList.add('rotate-in');
            slideElements[index].classList.add('rotate-out');
        } else {
            slideElements[newIndex].classList.add('rotate-in');
            slideElements[index].classList.add('rotate-out');
        }

        setTimeout(() => {
            slideElements[newIndex].classList.add('active');
            slideElements[index].classList.remove('rotate-out');
        }, 500);

        const width = slideElements[0].clientWidth;
        slides.style.transform = `translateX(${-newIndex * width}px)`;
        index = newIndex;
        updateIndicators();
    };

    const nextSlide = () => {
        const newIndex = (index + 1) % slideElements.length;
        showSlide(newIndex, 'next');
    };

    const prevSlide = () => {
        const newIndex = (index - 1 + slideElements.length) % slideElements.length;
        showSlide(newIndex, 'prev');
    };

    const goToSlide = (n) => {
        const direction = n > index ? 'next' : 'prev';
        showSlide(n, direction);
    };

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => goToSlide(i));
    });

    const startAutoplay = () => {
        interval = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
        clearInterval(interval);
    };

    slides.addEventListener('mouseenter', stopAutoplay);
    slides.addEventListener('mouseleave', startAutoplay);

    // Initialize
     showSlide(index, 'next');
    startAutoplay();
});
