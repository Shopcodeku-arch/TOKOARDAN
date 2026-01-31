document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // 0. POPUP IKLAN LOGIC
    // ============================================
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

    // ============================================
    // 1. LOADING SKELETON EFFECT (5 DETIK) - BARU
    // ============================================
    const allGameCards = document.querySelectorAll('.game-card');
    
    // Pastikan class is-loading ada (sudah ada di HTML, tapi ini untuk safety)
    allGameCards.forEach(card => card.classList.add('is-loading'));

    // Hilangkan loading setelah 5 detik
    setTimeout(() => {
        allGameCards.forEach(card => {
            card.classList.remove('is-loading');
        });
    }, 5000); // 5000 milidetik = 5 detik


    // ============================================
    // 2. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // 3. PROTEKSI GAMBAR
    // ============================================
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


    // ============================================
    // 4. FITUR PENCARIAN
    // ============================================
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    const gameCards = document.querySelectorAll('.game-card');
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

        const matchedGames = gamesData.filter(game => 
            game.name.toLowerCase().includes(query)
        );

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


    // ============================================
    // 5. BANNER SLIDER OTOMATIS
    // ============================================
    const slider = document.getElementById('bannerSlider');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = indicators.length;
    let currentSlide = 0;
    let slideInterval;

    function updateIndicators(index) {
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');
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

    startAutoSlide();

    indicators.forEach((ind, index) => {
        ind.addEventListener('click', () => {
            stopAutoSlide();
            scrollToSlide(index);
            startAutoSlide();
        });
    });

    slider.addEventListener('scroll', () => {
        const slideWidth = slider.offsetWidth;
        const index = Math.round(slider.scrollLeft / slideWidth);
        if (index !== currentSlide && index < totalSlides) {
            currentSlide = index;
            updateIndicators(currentSlide);
        }
    });

    // --- DRAG LOGIC UNTUK BANNER ---
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

    // ============================================
    // 6. NEWS SLIDER DRAG LOGIC (MANUAL)
    // ============================================
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

});