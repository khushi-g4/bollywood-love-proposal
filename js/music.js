/* ==========================================
   MUSIC.JS
   Bollywood Love Proposal
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");

    const musicBtn = document.getElementById("musicBtn");

    if (!music || !musicBtn) return;

    let isPlaying = false;

    /* ======================================
       INITIAL SETTINGS
    ====================================== */

    music.loop = true;

    music.volume = 0.35;

    /* ======================================
       PLAY MUSIC
    ====================================== */

    async function playMusic() {

        try {

            await music.play();

            isPlaying = true;

            musicBtn.classList.add("playing");

            musicBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        } catch (err) {

            console.log("Music autoplay blocked.");

        }

    }

    /* ======================================
       PAUSE MUSIC
    ====================================== */

    function pauseMusic() {

        music.pause();

        isPlaying = false;

        musicBtn.classList.remove("playing");

        musicBtn.innerHTML =
            '<i class="fa-solid fa-music"></i>';

    }

    /* ======================================
       TOGGLE MUSIC
    ====================================== */

    musicBtn.addEventListener("click", () => {

        if (isPlaying) {

            pauseMusic();

        } else {

            playMusic();

        }

    });

    /* ======================================
       START MUSIC AFTER ENTER BUTTON
    ====================================== */

    const enterBtn = document.getElementById("enterBtn");

    if (enterBtn) {

        enterBtn.addEventListener("click", () => {

            playMusic();

        });

    }

});