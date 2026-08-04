/* ==========================================
   INTRO SCREEN
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");

    const enterBtn = document.getElementById("enterBtn");

    const bgMusic = document.getElementById("bgMusic");

    if (!intro || !enterBtn) return;

    enterBtn.addEventListener("click", () => {

        // Play music after user interaction
        if (bgMusic) {

            bgMusic.volume = 0.35;

            bgMusic.play().catch(() => {});

        }

        // Intro animation
        intro.style.transition = "opacity 1.2s ease";

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.style.display = "none";

        },1200);

    });

});