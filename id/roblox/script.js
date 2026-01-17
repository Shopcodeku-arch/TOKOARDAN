// --- PROTEKSI ---
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('dragstart', event => event.preventDefault());

// --- 1. PENGATURAN FLASH SALE ---
const targetDate = new Date("2025-01-30 23:59:00").getTime(); 

function startCountdown() {
    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        const flashSection = document.getElementById("flashSection");
        const timerText = document.getElementById("timer-text");

        if (distance < 0) {
            clearInterval(timerInterval);
            if(flashSection) flashSection.style.display = "none"; 
            return; 
        }
        if(flashSection) flashSection.style.display = "block";

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(timerText) {
            timerText.innerHTML = (hours < 10 ? "0" + hours : hours) + "j " + (minutes < 10 ? "0" + minutes : minutes) + "m " + (seconds < 10 ? "0" + seconds : seconds) + "d";
        }
    }, 1000);
}
startCountdown();

// --- 2. DATA PRODUK ROBLOX ---
const products = [
    // FLASH SALE
    { id: 1, type: 'flash', name: "400 Robux", price: 65000, oldPrice: 75000, stock: 5, icon: "https://iili.io/fSNTPup.th.png" },
    // PAKET HEMAT
    { id: 3, type: 'first', name: "80 Robux", price: 20000, icon: "https://iili.io/fSNTPup.th.png" },
    { id: 4, type: 'first', name: "800 Robux", price: 190000, icon: "https://iili.io/fSNTPup.th.png" },
    { id: 13, type: 'first', name: "1700 Robux", price: 362000, icon: "https://iili.io/fSNTPup.th.png" },
    { id: 31, type: 'first', name: "4500 Robux", price: 905000, icon: "https://iili.io/fSNTPup.th.png" },
    { id: 32, type: 'first', name: "10000 Robux", price: 1802000, icon: "https://iili.io/fSNTPup.th.png" },
    { id: 33, type: 'first', name: "22500 Robux", price: 3602000, icon: "https://iili.io/fSNTPup.th.png" },
    // PREMIUM
    { id: 5, type: 'special', name: "Roblox Premium 450", price: 75000, icon: "https://iili.io/fSNVzns.th.png" },
    { id: 6, type: 'special', name: "Roblox Premium 1000", price: 147000, icon: "https://iili.io/fSNVzns.th.png" },
    { id: 6, type: 'special', name: "Roblox Premium 2200", price: 292000, icon: "https://iili.io/fSNVzns.th.png" },
    { id: 36, type: 'special', name: "Roblox Gift Card 50K",  price: 50000,  icon: "https://iili.io/fSeHWWQ.th.png" },
    { id: 37, type: 'special', name: "Roblox Gift Card 65K",  price: 65000,  icon: "https://iili.io/fSeHWWQ.th.png" },
    { id: 38, type: 'special', name: "Roblox Gift Card 100K", price: 100000, icon: "https://iili.io/fSeHWWQ.th.png" },
    { id: 39, type: 'special', name: "Roblox Gift Card 100K (x2)", price: 200000, icon: "https://iili.io/fSeHWWQ.th.png" },
    { id: 40, type: 'special', name: "Roblox Gift Card 300K", price: 300000, icon: "https://iili.io/fSeHWWQ.th.png" },
    { id: 41, type: 'special', name: "Roblox Gift Card 380K", price: 380000, icon: "https://iili.io/fSeHWWQ.th.png" },
    { id: 42, type: 'special', name: "Roblox Gift Card 500K", price: 500000, icon: "https://iili.io/fSeHWWQ.th.png" },
    { id: 43, type: 'special', name: "Roblox Gift Card 950K", price: 950000, icon: "https://iili.io/fSeHWWQ.th.png" },
    { id: 44, type: 'special', name: "Red Fox - (GaG)", price: 20000, icon: "https://iili.io/fSOshI1.th.png" },
    { id: 45, type: 'special', name: "Moon Cat - (GaG)", price: 20000, icon: "https://iili.io/fSOLZoF.th.png" },
    { id: 46, type: 'special', name: "Chiken Zombie - (GaG)", price: 30000, icon: "https://iili.io/fSOtw9R.th.png" },
    { id: 47, type: 'special', name: "Dragon Fly - (GaG)", price: 100000, icon: "https://iili.io/fSODXs9.th.png" },
    // PASS
    { id: 7, type: 'regular', name: "80 Robux", price: 12000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 8, type: 'regular', name: "100 Robux", price: 14000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 10, type: 'regular', name: "150 Robux", price: 20000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 11, type: 'regular', name: "250 Robux", price: 33000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 12, type: 'regular', name: "350 Robux", price: 44000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 24, type: 'regular', name: "450 Robux", price: 58000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 25, type: 'regular', name: "500 Robux", price: 64000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 26, type: 'regular', name: "700 Robux", price: 90000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 27, type: 'regular', name: "850 Robux", price: 108000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 28, type: 'regular', name: "950 Robux", price: 121000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 29, type: 'regular', name: "1000 Robux", price: 130000, icon: "https://iili.io/fSNhm0J.png" },
    { id: 30, type: 'regular', name: "2500 Robux", price: 315000, icon: "https://iili.io/fSNhm0J.png" },
];

let selectedItem = null;

// --- 3. LOGIC TABS & RENDER ---
function switchTab(tabName) {
    document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
    document.getElementById('view-transaksi').style.display = 'none';
    document.getElementById('view-keterangan').style.display = 'none';

    if(tabName === 'transaksi') {
        document.querySelectorAll('.tab-item')[0].classList.add('active');
        document.getElementById('view-transaksi').style.display = 'block';
        if(selectedItem) document.getElementById('footerBar').classList.add('show');
    } else {
        document.querySelectorAll('.tab-item')[1].classList.add('active');
        document.getElementById('view-keterangan').style.display = 'block';
        document.getElementById('footerBar').classList.remove('show');
    }
}

function render() {
    const cFlash = document.getElementById('flash-list');
    const cFirst = document.getElementById('first-list');
    const cSpecial = document.getElementById('special-list');
    const cRegular = document.getElementById('regular-list');

    products.forEach((item, index) => {
        const fmtPrice = "Rp " + item.price.toLocaleString('id-ID');
        
        if (item.type === 'flash') {
            const fmtOld = "Rp " + item.oldPrice.toLocaleString('id-ID');
            cFlash.innerHTML += `<div class="fs-item" onclick="selectItem(this, ${index})"><img src="${item.icon}" class="fs-img"><div class="fs-content"><div class="fs-name">${item.name}</div><div class="fs-price">${fmtPrice} <span class="fs-old-price">${fmtOld}</span></div><div class="fs-stock-bar"><div class="fs-stock-fill" style="width:${item.stock}%"></div></div><div class="fs-stock-text"><span>Tersedia</span><span>${item.stock}x</span></div></div><div class="check-mark"><i class="fa-solid fa-check"></i></div></div>`;
        } else {
            let target = cRegular;
            if(item.type === 'first') target = cFirst;
            if(item.type === 'special') target = cSpecial;
            
            if(target) {
                 target.innerHTML += `<div class="card-item" onclick="selectItem(this, ${index})"><div class="check-mark"><i class="fa-solid fa-check"></i></div><img src="${item.icon}" class="card-img"><div><div class="card-name">${item.name}</div><div class="card-price">${fmtPrice}</div></div></div>`;
            }
        }
    });
}

// --- UPDATE TOMBOL ---
function updateButtonState() {
    const btn = document.getElementById('btnBuy');
    
    // Aktif hanya jika: User Valid DAN Item dipilih
    if (isUserVerified && selectedItem) {
        btn.disabled = false;
        btn.innerText = "Pesan Sekarang";
    } else {
        btn.disabled = true;
        // Ubah teks agar informatif
        if (!selectedItem) btn.innerText = "Pilih Item";
        else if (!isUserVerified) btn.innerText = "Cek Username...";
        else btn.innerText = "Pesan Sekarang";
    }
}

function selectItem(element, index) {
    document.querySelectorAll('.fs-item, .card-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedItem = products[index];
    document.getElementById('totalPrice').innerText = "Rp " + selectedItem.price.toLocaleString('id-ID');
    document.getElementById('footerBar').classList.add('show');
    
    updateButtonState(); // Cek status tombol
}

// --- 4. LOGIC VALIDASI USER (API HYRA) ---
let timeout = null;
let isUserVerified = false; // Status User
let verifiedUsername = ""; 
let isLoading = false; 

function debounceSearch() {
    const inputVal = document.getElementById('userid').value;
    const loader = document.getElementById('loadingIcon');
    const resultBox = document.getElementById('userCheckResult');

    // Reset Status
    isUserVerified = false;
    verifiedUsername = "";
    resultBox.style.display = 'none';
    
    updateButtonState(); // Matikan tombol saat ngetik

    if (inputVal.length < 3) {
        loader.style.display = 'none';
        isLoading = false;
        return;
    }

    isLoading = true;
    loader.style.display = 'block';

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        searchRobloxUser(inputVal);
    }, 1000);
}

async function searchRobloxUser(username) {
    const loader = document.getElementById('loadingIcon');
    const resultBox = document.getElementById('userCheckResult');
    const imgEl = document.getElementById('robloxAvatar');
    const nameEl = document.getElementById('robloxName');
    const idEl = document.getElementById('robloxIdDisplay');

    try {
        // Menggunakan API Hyra
        const targetUrl = `https://api.hyra.io/users/roblox?username=${username}`;
        
        const response = await fetch(targetUrl);
        
        if (!response.ok) throw new Error("User not found or API error");
        
        const data = await response.json();
        
        if (data && data.id) {
            const userId = data.id;
            const realName = data.username;
            const displayName = data.display_name || data.username; 

            // FETCH AVATAR (Via Proxy + Roblox Thumbnails)
            const thumbUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`;
            const proxyThumb = `https://api.allorigins.win/get?url=${encodeURIComponent(thumbUrl)}`;
            
            const responseThumb = await fetch(proxyThumb);
            const resultThumb = await responseThumb.json();
            const dataThumb = JSON.parse(resultThumb.contents);

            if(dataThumb.data && dataThumb.data.length > 0) {
                imgEl.src = dataThumb.data[0].imageUrl;
                nameEl.innerText = displayName; 
                idEl.innerText = "@" + realName;
                
                isUserVerified = true;
                verifiedUsername = realName;
                isLoading = false;

                loader.style.display = 'none';
                resultBox.style.display = 'flex'; 
                
                updateButtonState(); 
            } else {
                 throw new Error("Avatar not found");
            }
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error:", error);
        isLoading = false;
        loader.style.display = 'none';
        updateButtonState();
    }
}

// --- 5. PROSES ORDER DENGAN PROTEKSI ---
function showConfirm() {
    // Proteksi ganda (meski tombol disabled, tetap dicek)
    if(!isUserVerified || !selectedItem) return;

    document.getElementById('confName').innerText = `Roblox: ${selectedItem.name}`;
    document.getElementById('confPrice').innerText = "Rp " + selectedItem.price.toLocaleString('id-ID');
    document.getElementById('confirmPopup').style.display = 'flex';
}

function closePopup() { document.getElementById('confirmPopup').style.display = 'none'; }

function processOrder() {
    const phone = "6285783123060"; 
    const finalUsername = verifiedUsername ? verifiedUsername : document.getElementById('userid').value;

    const message = `Halo Admin,\nSaya mau order:\n\n*Game:* Roblox\n*Item:* ${selectedItem.name}\n*Harga:* Rp ${selectedItem.price.toLocaleString('id-ID')}\n*Username:* ${finalUsername} (Valid)\n\nMohon diproses.`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    closePopup();
}

render();