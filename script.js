const doorSection = document.getElementById("door-section");

const doorImage = document.getElementById("door-image");

const doorSound = document.getElementById("door-sfx");

const weddingMusic = document.getElementById("wedding-music");

let alreadyOpened = false;

/* ======================================
   KLIK PINTU
====================================== */

doorImage.addEventListener("click", function () {
  // Mencegah klik berkali-kali
  if (alreadyOpened) {
    return;
  }

  alreadyOpened = true;

  /* ==================================
     1. SUARA PINTU
  ================================== */

  doorSound.currentTime = 0;

  doorSound.play().catch(function (error) {
    console.log("Sound pintu tidak dapat diputar:", error);
  });

  /* ==================================
     2. MULAI ZOOM
  ================================== */

  doorSection.classList.add("opening");

  /* ==================================
     3. CLOSED → OPEN
  ================================== */

  setTimeout(function () {
    doorImage.src = "assets/door_open.png";
  }, 250);

  /* ==================================
     4. MULAI TRANSISI KELUAR
  ================================== */

  setTimeout(function () {
    doorSection.classList.add("hide");
  }, 1600);

  /* ==================================
     5. MUSIK
     Setelah transisi selesai
  ================================== */

  setTimeout(function () {
    weddingMusic.currentTime = 0;

    weddingMusic.play().catch(function (error) {
      console.log("Musik tidak dapat diputar:", error);
    });
  }, 2900);

  /* ==================================
     6. HILANGKAN OPENING
  ================================== */

  setTimeout(function () {
    doorSection.style.display = "none";

    document.body.style.overflow = "auto";
  }, 3000);
});

/* ======================================
   NAVBAR
====================================== */

const navbar = document.getElementById("main-navbar");

/* ======================================
   COUNTDOWN
====================================== */

const weddingDate = new Date("September 27, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");

  document.getElementById("hours").textContent = String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* ======================================
   REVEAL SCROLL
====================================== */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

reveals.forEach((element) => {
  revealObserver.observe(element);
});
function copyAccount(number, button) {
  navigator.clipboard.writeText(number);

  const originalText = button.innerText;

  button.innerText = "✓ Berhasil Disalin";

  setTimeout(() => {
    button.innerText = originalText;
  }, 2000);
}
/* =========================================
   RSVP GOOGLE SHEETS
========================================= */

const rsvpForm = document.getElementById("rsvp-form");
const rsvpSubmit = document.getElementById("rsvp-submit");
const rsvpStatus = document.getElementById("rsvp-status");

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw1tXWnCudlUULwHGFJYfMwr-yMahOlVKo0q7R6N07EQhfmvCvbE8FBfPawa8f8Zbk/exec";

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ubah tombol
    rsvpSubmit.disabled = true;
    rsvpSubmit.textContent = "Mengirim...";

    rsvpStatus.textContent = "";

    // Ambil data form
    const formData = new FormData(rsvpForm);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",

        body: formData,

        mode: "no-cors",
      });

      // Karena Google Apps Script dengan no-cors
      // tidak memberikan response yang bisa dibaca browser,
      // kita anggap request sudah terkirim.

      rsvpStatus.textContent =
        "Terima kasih 🤍 Konfirmasi kamu berhasil dikirim.";

      // Kosongkan form
      rsvpForm.reset();
    } catch (error) {
      console.error("RSVP Error:", error);

      rsvpStatus.textContent =
        "Maaf, konfirmasi gagal dikirim. Silakan coba lagi.";
    }

    // Aktifkan tombol kembali
    rsvpSubmit.disabled = false;

    rsvpSubmit.textContent = "Kirim Konfirmasi";
  });
}
