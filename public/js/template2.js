
let intervalIds = {};

function autoSlide(carouselId) {
    intervalIds[carouselId] = setInterval(() => {
        scrollToRight(carouselId);
    }, 3000);
}

function stopAutoSlide(carouselId) {
    clearInterval(intervalIds[carouselId]);
}

function scrollToRight(carouselId) {
    const container = document.getElementById(carouselId);
    const scrollWidth = container.scrollWidth;
    const visibleWidth = container.clientWidth;
    const currentScrollLeft = container.scrollLeft;
    const scrollableDistance = scrollWidth - visibleWidth;

    let targetScrollLeft = currentScrollLeft + visibleWidth;
    if (targetScrollLeft > scrollableDistance) {
        targetScrollLeft = 0;
    }

    container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
}

function scrollToLeft(carouselId) {
    const container = document.getElementById(carouselId);
    const scrollWidth = container.scrollWidth;
    const visibleWidth = container.clientWidth;
    const currentScrollLeft = container.scrollLeft;
    const scrollableDistance = scrollWidth - visibleWidth;

    let targetScrollLeft = currentScrollLeft - visibleWidth;
    if (targetScrollLeft < 0) {
        targetScrollLeft = scrollableDistance;
    }

    container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    autoSlide('carousel1');
    autoSlide('carousel2');
});

document.querySelectorAll('.side-arrow img').forEach(arrow => {
    arrow.addEventListener('click', () => {
        stopAutoSlide();
        if (arrow.getAttribute('onclick') === 'scrollToRight1()') {
            scrollToRight1();
        } else {
            scrollToLeft1();
        }
    });
});
const container = document.querySelector('.flex-container');
let startX;

container.addEventListener('mousedown', (event) => {
    startX = event.clientX;
});

container.addEventListener('mouseup', (event) => {
    const endX = event.clientX;
    const diff = startX - endX;
    if (diff > 0) {
        scrollToRight(carouselId);
    } else {
        scrollToLeft(carouselId);
    }
});
