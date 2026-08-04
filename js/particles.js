/* ==========================================================
   CINEMATIC CHERRY BLOSSOM ENGINE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const front = document.getElementById("petals-front");
    const back = document.getElementById("petals-back");

    const petals = [
        "assets/images/petals/petal1.webp",
        "assets/images/petals/petal2.webp",
        "assets/images/petals/petal3.webp",
        "assets/images/petals/petal4.webp",
        "assets/images/petals/petal5.webp"
    ];

    function createPetal(layer){

        const petal = document.createElement("div");

        petal.className = "petal";

        petal.style.backgroundImage =
            `url(${petals[Math.floor(Math.random()*petals.length)]})`;

        const size = Math.random()*22 + 12;

        petal.style.width = size+"px";
        petal.style.height = size+"px";

        petal.style.left = Math.random()*100+"vw";

        petal.style.opacity = Math.random()*0.5 + 0.4;

        petal.style.animationDuration =
            (Math.random()*8+10)+"s";

        petal.style.animationDelay =
            Math.random()*3+"s";

        petal.style.setProperty("--rotate",
            Math.random()*720+"deg");

        petal.style.setProperty("--drift",
            (Math.random()*250-125)+"px");

        layer.appendChild(petal);

        petal.addEventListener("animationend",()=>{

            petal.remove();

            createPetal(layer);

        });

    }

    for(let i=0;i<45;i++){

        createPetal(back);

    }

    for(let i=0;i<22;i++){

        createPetal(front);

    }

});