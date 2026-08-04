/* ==========================================
   FIREWORKS.JS
   Bollywood Night Fireworks
========================================== */

function launchFireworks() {

    const container = document.getElementById("fireworks-container");

    if (!container) return;

    function createFirework() {

        const firework = document.createElement("div");

        firework.className = "firework";

        firework.style.position = "fixed";

        firework.style.left = Math.random() * 90 + "vw";

        firework.style.top = Math.random() * 45 + "vh";

        firework.style.width = "12px";

        firework.style.height = "12px";

        firework.style.borderRadius = "50%";

        firework.style.pointerEvents = "none";

        firework.style.zIndex = "999999";

        firework.style.background =
            randomColor();

        firework.style.boxShadow =
            `0 0 25px ${randomColor()}`;

        firework.style.animation =
            "firework 1.2s ease-out forwards";

        container.appendChild(firework);

        for(let i = 0; i < 24; i++){

            const particle = document.createElement("span");

            particle.style.position = "absolute";

            particle.style.left = "50%";

            particle.style.top = "50%";

            particle.style.width = "5px";

            particle.style.height = "5px";

            particle.style.borderRadius = "50%";

            particle.style.background = randomColor();

            const angle = (360 / 24) * i;

            const distance = 90 + Math.random() * 40;

            particle.animate(

                [

                    {

                        transform:

                        `translate(-50%,-50%) rotate(${angle}deg) translateX(0px)`,

                        opacity:1

                    },

                    {

                        transform:

                        `translate(-50%,-50%) rotate(${angle}deg) translateX(${distance}px)`,

                        opacity:0

                    }

                ],

                {

                    duration:1200,

                    easing:"ease-out"

                }

            );

            firework.appendChild(particle);

        }

        setTimeout(()=>{

            firework.remove();

        },1400);

    }

    function randomColor(){

        const colors=[

            "#ff4f8b",

            "#ffd166",

            "#ffffff",

            "#ff6ec7",

            "#ff9f1c",

            "#ffe66d"

        ];

        return colors[Math.floor(Math.random()*colors.length)];

    }

    let count=0;

    const interval=setInterval(()=>{

        createFirework();

        count++;

        if(count>=18){

            clearInterval(interval);

        }

    },280);

}