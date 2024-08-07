var app = (function() {
    let pages = [];
    let links = [];

    document.addEventListener("DOMContentLoaded", function() {
        pages = document.querySelectorAll('[data-page]');
        links = document.querySelectorAll('[data-role="link"]');
        [].forEach.call(links, function(link) {
            link.addEventListener("click", navigate);
        });

        // Initialize sliding cards
        initializeSliders();

        // Initialize bouncing element in Experience section
        moveBounceElement();
    });

    function navigate(ev) {
        ev.preventDefault();
        let id = ev.currentTarget.href.split("#")[1];
        [].forEach.call(pages, function(page) {
            if (page.id === id) {
                page.classList.add('active');
                // Check if the active page is the Resume section
                if (page.id === 'Resume') {
                    activateIframe(true);
                } else {
                    activateIframe(false);
                }
            } else {
                page.classList.remove('active');
            }
        });
        return false;
    }

    function initializeSliders() {
        const sliders = document.querySelectorAll('.slider-container');

        sliders.forEach(slider => {
            let currentSlide = 0;
            const slides = slider.querySelectorAll('.slide');
            const leftArrow = slider.querySelector('.left-arrow');
            const rightArrow = slider.querySelector('.right-arrow');

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === index) {
                        slide.classList.add('active');
                    }
                });
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }

            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            }

            showSlide(currentSlide);

            if (leftArrow && rightArrow) {
                leftArrow.addEventListener('click', prevSlide);
                rightArrow.addEventListener('click', nextSlide);
            }
        });
    }

    function activateIframe(isActive) {
        const iframeContainer = document.querySelector('#Resume .iframe-container iframe');
        if (iframeContainer) {
            iframeContainer.style.display = isActive ? 'block' : 'none';
        }
    }

    return {
        pages,
        links,
        xhr: ajax
    };
})();

function flipCard(card) {
    card.classList.toggle('flipped');
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function handleClick(event) {
    const url = event.currentTarget.getAttribute('href'); // Get the URL from the href attribute
    if (url) {
        window.location.href = url; // Navigate to the specified URL
    }
}

function moveBounceElement() {
    const elements = document.querySelectorAll('#Projects .randomBounce'); // Use querySelectorAll for multiple elements
    if (elements.length === 0) {
        console.error('Elements with class "randomBounce" not found');
        return;
    }

    elements.forEach(element => {
        var x = getRandomArbitrary(4, 10);
        var y = getRandomArbitrary(4, 10);
        var vx = getRandomArbitrary(2, 4);
        var vy = getRandomArbitrary(2, 4);

        function animate() {
            if (x > window.innerWidth - element.offsetWidth || x < 0) {
                vx = -vx;
            }

            if (y > window.innerHeight - element.offsetHeight || y < 0) {
                vy = -vy;
            }

            x = x + vx;
            y = y + vy;

            element.style.transform = `translate(${x}px, ${y}px)`;

            requestAnimationFrame(animate);
        }
        element.addEventListener('click', handleClick); // Add click event listener
        animate();
    });
}
