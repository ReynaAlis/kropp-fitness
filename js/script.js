document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.banner__body');
    const paginationButtons = document.querySelectorAll('.banner__pagination-button');
    let currentIndex = 0;
    let startX = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        paginationButtons.forEach((button, i) => {
            button.classList.toggle('is-current', i === index);
        });
    }

    function changeSlide(direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    function handleSwipe(start, end) {
        const deltaX = start - end;
        if (Math.abs(deltaX) > 50) {
            changeSlide(deltaX > 0 ? 1 : -1);
        }
    }

    slides.forEach(slide => {
        slide.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
        slide.addEventListener('touchend', (e) => handleSwipe(startX, e.changedTouches[0].clientX));
        slide.addEventListener('mousedown', (e) => startX = e.clientX);
        slide.addEventListener('mouseup', (e) => handleSwipe(startX, e.clientX));
    });

    showSlide(currentIndex);
});


document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map', {
        center: [0, 0],
        zoom: 2,
        maxBounds: [[-90, -180], [90, 180]], 
        maxBoundsViscosity: 1.0, 
        scrollWheelZoom: false, 
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://carto.com/">CartoDB</a>'
    }).addTo(map);

    L.marker([20, 78]).addTo(map)
        .bindPopup('Метка в центре мира')
        .openPopup();
});


