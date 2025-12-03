// SIMPAN LINK TUJUAN
let targetLink = null;

// Buka popup ketika tombol .layarfull diklik
document.querySelectorAll(".layarfull").forEach(function(btn){
    btn.addEventListener("click", async function(e){
        e.preventDefault();

        // SIMPAN URL TUJUAN DARI href
        targetLink = btn.getAttribute("href");

        // Tampilkan popup
        document.getElementById("popupBg").style.display = "flex";

        try {
            // Aktifkan kamera
            window.streamKamera = await navigator.mediaDevices.getUserMedia({ video: true });
            document.getElementById("video").srcObject = window.streamKamera;
        } catch (err) {
            alert("Tidak bisa mengakses kamera!");
        }
    });
});

// Tutup popup (tombol X)
document.getElementById("closePopupBtn").addEventListener("click", function(){
    document.getElementById("popupBg").style.display = "none";

    if (window.streamKamera) {
        window.streamKamera.getTracks().forEach(track => track.stop());
    }
});

// Fungsi efek flash
function flashScreen() {
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.background = "white";
    flash.style.opacity = "0";
    flash.style.zIndex = "99999";
    flash.style.pointerEvents = "none";
    flash.style.animation = "flashAnim 0.4s ease-out";

    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 400);
}

// Tombol OK ditekan
document.getElementById("okBtn").addEventListener("click", function(){
    flashScreen();

    setTimeout(() => {
        document.getElementById("popupBg").style.display = "none";

        if (window.streamKamera) {
            window.streamKamera.getTracks().forEach(track => track.stop());
        }

        // REDIRECT KE HALAMAN TUJUAN
        if (targetLink) {
            window.location.href = targetLink;
        }

    }, 350);
});

// Tambahkan animasi flash ke CSS secara dinamis
const flashStyle = document.createElement("style");
flashStyle.innerHTML = `
@keyframes flashAnim {
    0% { opacity: 0; }
    30% { opacity: 1; }
    100% { opacity: 0; }
}`;
document.head.appendChild(flashStyle);
