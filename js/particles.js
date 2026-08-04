/* ==========================================
   PARTICLES.JS
   Floating Hearts & Rose Petals
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const heartContainer =
        document.querySelector(".floating-hearts") ||
        document.querySelector(".floating-heart-container");

    const petalContainer =
        document.querySelector(".rose-petals") ||
        document.querySelector(".petal-container");

    /* ===========================
       FLOATING HEARTS
    =========================== */

    function createHeart(){

        if(!heartContainer) return;

        const heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "absolute";

        heart.style.left = Math.random() * 100 + "%";

        heart.style.bottom = "-40px";

        heart.style.fontSize =
            (16 + Math.random() * 20) + "px";

        heart.style.opacity = Math.random() * .6 + .3;

        heart.style.pointerEvents = "none";

        heart.style.animation =
            "floatingHeart " +
            (8 + Math.random() * 6) +
            "s linear forwards";

        heartContainer.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        },15000);

    }

    /* ===========================
       ROSE PETALS
    =========================== */

    function createPetal(){

        if(!petalContainer) return;

        const petal = document.createElement("div");

        petal.innerHTML = "🌹";

        petal.style.position = "absolute";

        petal.style.left =
            Math.random() * 100 + "%";

        petal.style.top = "-50px";

        petal.style.fontSize =
            (18 + Math.random()*14) + "px";

        petal.style.pointerEvents = "none";

        petal.style.animation =
            "fallingPetal " +
            (10 + Math.random()*8) +
            "s linear forwards";

        petalContainer.appendChild(petal);

        setTimeout(()=>{

            petal.remove();

        },18000);

    }

    /* ===========================
       CREATE CONTINUOUSLY
    =========================== */

    setInterval(createHeart,900);

    setInterval(createPetal,1600);

});