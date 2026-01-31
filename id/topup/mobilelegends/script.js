// --- PROTEKSI ---
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('dragstart', event => event.preventDefault());

// --- ANIMASI POPUP EVENT MLBB (BARU) ---
window.addEventListener('load', function() {
    setTimeout(function() {
        const eventPopup = document.getElementById('mlEventPopup');
        if (eventPopup) {
            eventPopup.classList.add('show');
        }
    }, 2000); // Popup muncul setelah 2 detik
});

function closeEventPopup() {
    const eventPopup = document.getElementById('mlEventPopup');
    eventPopup.classList.remove('show');
}

// --- 1. PENGATURAN FLASH SALE ---
const targetDate = new Date("2026-01-30 00:00:00").getTime(); 

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
            timerText.innerHTML = 
            (hours < 10 ? "0" + hours : hours) + "j " + 
            (minutes < 10 ? "0" + minutes : minutes) + "m " + 
            (seconds < 10 ? "0" + seconds : seconds) + "d";
        }
    }, 1000);
}
startCountdown();

// --- 2. DATA PRODUK ---
const products = [
    // FLASH SALE
    { id: 1, type: 'flash', name: "Super Value Pass", price: 15000, oldPrice: 30000, stock: 100, icon: "https://iili.io/fUzFpjf.th.png" },
    // FIRST TOP UP
    { id: 3, type: 'first', name: '100 (<span style="color: #90EE90;">50+50</span>) Diamonds', price: 15000, icon: "https://iili.io/f8ZJnjt.png" },
    { id: 4, type: 'first', name: '300 (<span style="color: #90EE90;">150+150</span>) Diamonds', price: 42500, icon: "https://iili.io/f8ZJnjt.png" },
    { id: 13, type: 'first', name: '500 (<span style="color: #90EE90;">250+250</span>) Diamonds', price: 70500, icon: "https://iili.io/f8ZJnjt.png" },
    { id: 14, type: 'first', name: '1000 (<span style="color: #90EE90;">500+500</span>) Diamonds', price: 141500, icon: "https://iili.io/f8ZJnjt.png" },
    // SPECIAL
    { id: 5, type: 'special', name: "Twilight Pass", price: 151000, icon: "https://iili.io/f8ZaZpp.th.png" },
    { id: 6, type: 'special', name: "Weekly Diamond Pass x1", price: 27500, icon: "https://iili.io/f8udNZN.png" },
    { id: 17, type: 'special', name: "Weekly Diamond Pass x2", price: 55000, icon: "https://iili.io/f8udNZN.png" },
    { id: 18, type: 'special', name: "Weekly Diamond Pass x3", price: 82500, icon: "https://iili.io/f8udNZN.png" },
    { id: 19, type: 'special', name: "Weekly Diamond Pass x4", price: 112000, icon: "https://iili.io/f8udNZN.png" },
    { id: 20, type: 'special', name: "Weekly Diamond Pass x5", price: 138500, icon: "https://iili.io/f8udNZN.png" },
    // REGULAR
    { id: 7, type: 'regular', name: "5 Diamonds", price: 1500, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 8, type: 'regular', name: "12 Diamonds", price: 3500, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 9, type: 'regular', name: "17 Diamonds", price: 5500, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 10, type: 'regular', name: "40 Diamonds", price: 11500, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 11, type: 'regular', name: "53 Diamonds", price: 15500, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 12, type: 'regular', name: "77 Diamonds", price: 21800, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 15, type: 'regular', name: "154 Diamonds", price: 43500, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 16, type: 'regular', name: "217 Diamonds", price: 61500, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 21, type: 'regular', name: "256 Diamonds", price: 75500, icon: "https://iili.io/f8ZKqhB.webp" },
    { id: 22, type: 'regular', name: "367 Diamonds", price: 103800, icon: "https://iili.io/f4sn6lI.th.webp" },
    { id: 23, type: 'regular', name: "503 Diamonds", price: 141500, icon: "https://iili.io/f4sn6lI.th.webp" },
    { id: 24, type: 'regular', name: "774 Diamonds", price: 216500, icon: "https://iili.io/f4sn6lI.th.webp" },
    { id: 25, type: 'regular', name: "1708 Diamonds", price: 470500, icon: "https://iili.io/f4sn6lI.th.webp" },
    { id: 26, type: 'regular', name: "4003 Diamonds", price: 1128500, icon: "https://iili.io/f4sn6lI.th.webp" },
];

let selectedItem = null;

// --- 3. LOGIC UTAMA ---
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
            cFlash.innerHTML += `
            <div class="fs-item" onclick="selectItem(this, ${index})">
                <img src="${item.icon}" class="fs-img">
                <div class="fs-content">
                    <div class="fs-name">${item.name}</div>
                    <div class="fs-price">${fmtPrice} <span class="fs-old-price">${fmtOld}</span></div>
                    <div class="fs-stock-bar"><div class="fs-stock-fill" style="width:${item.stock}%"></div></div>
                    <div class="fs-stock-text"><span>Tersedia</span><span>${item.stock}x</span></div>
                </div>
                <div class="check-mark"><i class="fa-solid fa-check"></i></div>
            </div>`;
        } else {
            let target = cRegular;
            if(item.type === 'first') target = cFirst;
            if(item.type === 'special') target = cSpecial;

            target.innerHTML += `
            <div class="card-item" onclick="selectItem(this, ${index})">
                <div class="check-mark"><i class="fa-solid fa-check"></i></div>
                <img src="${item.icon}" class="card-img">
                <div>
                    <div class="card-name">${item.name}</div>
                    <div class="card-price">${fmtPrice}</div>
                </div>
            </div>`;
        }
    });
}

// --- 4. LOGIC VALIDASI USER (MOBILE LEGENDS) ---
let timeout = null;
let isUserVerified = false; 
let verifiedUsername = ""; 
let isLoading = false; 

// Fungsi Update Tombol Abu-abu
function updateButtonState() {
    const btn = document.getElementById('btnBuy');
    
    // Aktif hanya jika: User Valid DAN Item dipilih
    if (isUserVerified && selectedItem) {
        btn.disabled = false;
        btn.innerText = "Pesan Sekarang";
    } else {
        btn.disabled = true;
        if (!selectedItem) btn.innerText = "Pilih Item";
        else if (!isUserVerified) btn.innerText = "Cek ID...";
        else btn.innerText = "Pesan Sekarang";
    }
}

function debounceSearch() {
    const uid = document.getElementById('userid').value;
    const zid = document.getElementById('zoneid').value;
    const loader = document.getElementById('loadingIcon');
    const resultBox = document.getElementById('userCheckResult');

    isUserVerified = false;
    verifiedUsername = "";
    resultBox.style.display = 'none';
    updateButtonState(); 

    if (uid.length < 5 || zid.length < 3) {
        loader.style.display = 'none';
        return;
    }

    loader.style.display = 'block';

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        checkMLBBUser(uid, zid);
    }, 1000); 
}

async function checkMLBBUser(uid, zid) {
    const loader = document.getElementById('loadingIcon');
    const resultBox = document.getElementById('userCheckResult');
    const nameEl = document.getElementById('mlbbName');
    const idEl = document.getElementById('mlbbIdDisplay');

    try {
        const response = await fetch(`https://api.isan.eu.org/nickname/ml?id=${uid}&zone=${zid}`);
        const result = await response.json();

        if (result.success === true) {
            verifiedUsername = result.name;
            isUserVerified = true;
            nameEl.innerText = result.name;
            idEl.innerText = `ID: ${uid} (${zid})`;
            loader.style.display = 'none';
            resultBox.style.display = 'flex';
        } else {
            isUserVerified = false;
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error("Error Checking User:", error);
        loader.style.display = 'none';
    }
    updateButtonState();
}

function selectItem(element, index) {
    document.querySelectorAll('.fs-item, .card-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedItem = products[index];
    document.getElementById('totalPrice').innerText = "Rp " + selectedItem.price.toLocaleString('id-ID');
    document.getElementById('footerBar').classList.add('show');
    updateButtonState(); 
}

function showConfirm() {
    if(!isUserVerified || !selectedItem) return;
    const uid = document.getElementById('userid').value;
    const zid = document.getElementById('zoneid').value;
    document.getElementById('confName').innerText = `MLBB: ${selectedItem.name} (${verifiedUsername})`;
    document.getElementById('confPrice').innerText = "Rp " + selectedItem.price.toLocaleString('id-ID');
    document.getElementById('confirmPopup').style.display = 'flex';
}

function closePopup() { document.getElementById('confirmPopup').style.display = 'none'; }

function processOrder() {
    const uid = document.getElementById('userid').value;
    const zid = document.getElementById('zoneid').value;
    const phone = "6285783123060"; 
    const message = `Halo Admin,\nSaya mau order:\n\n*Game:* Mobile Legends\n*Item:* ${selectedItem.name}\n*Harga:* Rp ${selectedItem.price.toLocaleString('id-ID')}\n*Nick:* ${verifiedUsername} (Valid)\n*ID:* ${uid} (${zid})\n\nMohon diproses.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    closePopup();
}

render();