/* ==========================================
   STARS.JS
   Twinkling Stars & Shooting Stars
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const starsContainer = document.querySelector(".stars");

    if (!starsContainer) return;

    /* ===========================
       Create Twinkling Stars
    =========================== */

    function createStar() {

        const star = document.createElement("div");

        star.classList.add("star");

        star.style.position = "absolute";

        star.style.width = (2 + Math.random() * 3) + "px";

        star.style.height = star.style.width;

        star.style.background = "#ffffff";

        star.style.borderRadius = "50%";

        star.style.left = Math.random() * 100 + "%";

        star.style.top = Math.random() * 100 + "%";

        star.style.opacity = Math.random();

        star.style.animation =
            "twinkle " +
            (2 + Math.random() * 4) +
            "s infinite";

        starsContainer.appendChild(star);

    }

    /* Create 150 Stars */

    for (let i = 0; i < 150; i++) {

        createStar();

    }

    /* ===========================
       Shooting Star
    =========================== */

    function shootingStar() {

        const star = document.createElement("div");

        star.style.position = "absolute";

        star.style.left = "-250px";

        star.style.top = Math.random() * 35 + "%";

        star.style.width = "180px";

        star.style.height = "2px";

        star.style.background =
            "linear-gradient(to right, white, transparent)";

        star.style.opacity = ".9";

        star.style.pointerEvents = "none";

        star.style.animation =
            "shootingStar 2s linear forwards";

        starsContainer.appendChild(star);

        setTimeout(() => {

            star.remove();

        },2000);

    }

    /* Random Shooting Stars */

    setInterval(() => {

        shootingStar();

    },10000);

});