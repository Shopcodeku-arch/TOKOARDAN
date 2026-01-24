// --- LOGIKA ONLOAD (Discord + Iklan) ---
window.onload = function() {
    const discordPopup = document.getElementById('discordPopup');
    const discordBtn = document.getElementById('discordBtnNav');
    const promoPopup = document.getElementById('promoPopup');

    // 1. Animasi Discord Tooltip
    setTimeout(() => { discordPopup.classList.add('show'); }, 1500);
    setTimeout(() => { 
        discordPopup.classList.remove('show'); 
        discordPopup.classList.add('fly-in'); 
    }, 5500);
    setTimeout(() => { 
        discordBtn.classList.add('bounce-active');
        setTimeout(() => { discordBtn.classList.remove('bounce-active'); }, 1000);
    }, 6300);

    // 2. Munculkan Popup Iklan (Delay 2 detik agar loading selesai dulu)
    setTimeout(() => {
        promoPopup.style.display = 'flex';
    }, 2000);
};

function closePromo() {
    document.getElementById('promoPopup').style.display = 'none';
}

// --- DATA HARGA APLIKASI ---
const appPrices = {
    'Alight Motion': [{ label: '1 Tahun (Email Admin)', price: 'Rp 5.000' }, { label: '1 Tahun (Email Private)', price: 'Rp 10.000' }],
    'CapCut': [{ label: '7 Hari (Sharing)', price: 'Rp 10.000' }, { label: '1 Bulan (Sharing)', price: 'Rp 18.000' }, { label: '1 Bulan (Private)', price: 'Rp 30.000' }],
    'Canva': [{ label: '1 Bulan (Team)', price: 'Rp 1.500' }, { label: '1 Bulan (Owner)', price: 'Rp 10.000' }, { label: '1 Tahun (Owner)', price: 'Rp 15.000' }],
    'Netflix': [{ label: '1 Bulan (2 User)', price: 'Rp 20.000' }, { label: '1 Bulan (1 User)', price: 'Rp 30.000' }, { label: '1 Bulan (Private)', price: 'Rp 120.000' },]
};
let currentAppName = "";

// --- FUNGSI UMUM ---
function openGameLink(url) { window.location.href = url; }

function openAppPopup(name) {
    currentAppName = name;
    const selectEl = document.getElementById('variantSelect');
    document.getElementById('popupTitle').innerText = name;
    selectEl.innerHTML = ""; 
    const variants = appPrices[name] || [{ label: 'Paket Default', price: 'Hubungi Admin' }];
    variants.forEach(v => {
        let option = document.createElement("option");
        option.text = `${v.label} - ${v.price}`; option.value = v.price;
        selectEl.appendChild(option);
    });
    document.getElementById('appPopup').style.display = 'flex';
}

function processOrder() {
    const selectEl = document.getElementById('variantSelect');
    const selectedText = selectEl.options[selectEl.selectedIndex].text;
    const text = `Halo Admin TOKOARDAN, saya mau beli Aplikasi:\n\n📱 *App:* ${currentAppName}\n📦 *Paket:* ${selectedText}\n\nMohon diproses.`;
    window.open(`https://wa.me/6285783123060?text=${encodeURIComponent(text)}`, '_blank');
    document.getElementById('appPopup').style.display = 'none';
}

function switchTab(tab, btnElement) {
    document.querySelectorAll('.pill-btn').forEach(btn => {
        btn.classList.remove('pill-active'); btn.classList.add('pill-inactive');
    });
    btnElement.classList.remove('pill-inactive'); btnElement.classList.add('pill-active');
    document.getElementById('grid-games').classList.remove('active');
    document.getElementById('grid-apps').classList.remove('active');
    if (tab === 'games') document.getElementById('grid-games').classList.add('active');
    else document.getElementById('grid-apps').classList.add('active');
}

// --- LOGIKA SLIDER (SWIPE + BUTTONS + AUTO) ---
let currentSlide = 0;
const slides = document.querySelectorAll('.promo-slide');
const dots = document.querySelectorAll('.dot');
const wrapper = document.getElementById('promoWrapper');
const totalSlides = slides.length;
let slideInterval = setInterval(nextSlide, 3000); // Auto slide

function showSlide(index) {
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;

    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
    resetInterval();
}

function prevSlide() {
    showSlide(currentSlide - 1);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

// --- FITUR SWIPE (GESER) UNTUK HP ---
let touchStartX = 0;
let touchEndX = 0;

wrapper.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

wrapper.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    checkSwipe();
});

function checkSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide(); // Swipe Kiri (Next)
    if (touchEndX > touchStartX + 50) prevSlide(); // Swipe Kanan (Prev)
}