document.addEventListener('DOMContentLoaded', () => {
    // Popup Logic
    const promoPopup = document.getElementById('promoPopup');
    const closePopup = document.getElementById('closePopup');

    setTimeout(() => {
        promoPopup.classList.add('show');
    }, 1000);

    closePopup.addEventListener('click', () => {
        promoPopup.classList.remove('show');
    });

    promoPopup.addEventListener('click', (e) => {
        if (e.target === promoPopup) {
            promoPopup.classList.remove('show');
        }
    });

    // Loading Animation for All Game Cards (Horizontal and Normal)
    const allGameCards = document.querySelectorAll('.game-card, .game-card-horizontal');
    allGameCards.forEach(card => card.classList.add('is-loading'));
    setTimeout(() => {
        allGameCards.forEach(card => {
            card.classList.remove('is-loading');
        });
    }, 1500);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Prevent Context Menu on Images
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    // Select both types of cards
    const gameCards = document.querySelectorAll('.game-card, .game-card-horizontal');
    let gamesData = [];

    gameCards.forEach(card => {
        gamesData.push({
            name: card.getAttribute('data-name'),
            image: card.querySelector('img').src,
            link: card.getAttribute('href')
        });
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');

        if (query.length === 0) return;

        const matchedGames = gamesData.filter(game => game.name.toLowerCase().includes(query));

        if (matchedGames.length > 0) {
            searchResults.classList.add('active');
            matchedGames.forEach((game, index) => {
                const item = document.createElement('a');
                item.href = game.link;
                item.className = 'search-item';
                item.style.animationDelay = `${index * 0.05}s`;
                item.innerHTML = `
                    <img src="${game.image}" alt="${game.name}">
                    <span>${game.name}</span>
                `;
                searchResults.appendChild(item);
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Banner Slider Logic
    const slider = document.getElementById('bannerSlider');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = indicators.length;
    let currentSlide = 0;
    let slideInterval;

    function updateIndicators(index) {
        indicators.forEach(ind => ind.classList.remove('active'));
        if(indicators[index]) indicators[index].classList.add('active');
    }

    function scrollToSlide(index) {
        const slideWidth = slider.offsetWidth;
        slider.scrollLeft = slideWidth * index;
        currentSlide = index;
        updateIndicators(currentSlide);
    }

    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentSlide++;
            if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }
            scrollToSlide(currentSlide);
        }, 4000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Initialize Slider
    if(indicators.length > 0) {
        startAutoSlide();
        
        indicators.forEach((ind, index) => {
            ind.addEventListener('click', () => {
                stopAutoSlide();
                scrollToSlide(index);
                startAutoSlide();
            });
        });
    }

    slider.addEventListener('scroll', () => {
        const slideWidth = slider.offsetWidth;
        const index = Math.round(slider.scrollLeft / slideWidth);
        if (index !== currentSlide && index < totalSlides) {
            currentSlide = index;
            updateIndicators(currentSlide);
        }
    });

    // Drag Scrolling for Banner
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        stopAutoSlide();
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.scrollSnapType = 'none';
        e.preventDefault();
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
        slider.style.scrollSnapType = 'x mandatory';
        startAutoSlide();
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
        slider.style.scrollSnapType = 'x mandatory';
        startAutoSlide();
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // News Slider Drag Logic
    const newsSlider = document.getElementById('newsSlider');
    let isNewsDown = false;
    let startNewsX;
    let scrollNewsLeft;

    newsSlider.addEventListener('mousedown', (e) => {
        isNewsDown = true;
        newsSlider.style.cursor = 'grabbing';
        startNewsX = e.pageX - newsSlider.offsetLeft;
        scrollNewsLeft = newsSlider.scrollLeft;
        newsSlider.style.scrollSnapType = 'none';
        e.preventDefault();
    });

    newsSlider.addEventListener('mouseleave', () => {
        isNewsDown = false;
        newsSlider.style.cursor = 'grab';
        newsSlider.style.scrollSnapType = 'x mandatory';
    });

    newsSlider.addEventListener('mouseup', () => {
        isNewsDown = false;
        newsSlider.style.cursor = 'grab';
        newsSlider.style.scrollSnapType = 'x mandatory';
    });

    newsSlider.addEventListener('mousemove', (e) => {
        if (!isNewsDown) return;
        e.preventDefault();
        const x = e.pageX - newsSlider.offsetLeft;
        const walk = (x - startNewsX) * 2;
        newsSlider.scrollLeft = scrollNewsLeft - walk;
    });

    // Logic Read More
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const p = e.target.previousElementSibling;
            p.classList.toggle('expanded');
            
            if (p.classList.contains('expanded')) {
                e.target.textContent = 'Tutup';
            } else {
                e.target.textContent = 'Baca Selengkapnya';
            }
        });
    });

    // Sidebar Logic
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function toggleSidebar() {
        sidebarMenu.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleSidebar);
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }
});