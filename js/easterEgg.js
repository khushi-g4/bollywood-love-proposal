/* ==========================================
   EASTEREGG.JS
   Hidden Romantic Surprises
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       SECRET MESSAGE (Press V)
    ====================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key.toLowerCase() === "v") {

            showMessage(
                "❤️ I Love You Vishal ❤️"
            );

        }

    });

    /* ======================================
       SECRET MESSAGE (Press K)
    ====================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key.toLowerCase() === "k") {

            showMessage(
                "💖 Made with Love by Khushi 💖"
            );

        }

    });

    /* ======================================
       DOUBLE CLICK MOON
    ====================================== */

    const moon = document.querySelector(".moon");

    if (moon) {

        moon.addEventListener("dblclick", () => {

            showerHearts();

        });

    }

    /* ======================================
       SHOW POPUP MESSAGE
    ====================================== */

    function showMessage(text) {

        const msg = document.createElement("div");

        msg.className = "secret-message";

        msg.innerHTML = text;

        msg.style.position = "fixed";

        msg.style.left = "50%";

        msg.style.top = "50%";

        msg.style.transform =
            "translate(-50%,-50%)";

        msg.style.padding = "22px 40px";

        msg.style.background =
            "rgba(20,10,35,.95)";

        msg.style.color = "#fff";

        msg.style.borderRadius = "20px";

        msg.style.fontSize = "24px";

        msg.style.zIndex = "999999";

        msg.style.boxShadow =
            "0 0 30px rgba(255,79,139,.4)";

        document.body.appendChild(msg);

        msg.animate(

            [

                {

                    opacity:0,

                    transform:
                    "translate(-50%,-40%) scale(.8)"

                },

                {

                    opacity:1,

                    transform:
                    "translate(-50%,-50%) scale(1)"

                }

            ],

            {

                duration:500,

                fill:"forwards"

            }

        );

        setTimeout(() => {

            msg.remove();

        },2500);

    }

    /* ======================================
       HEART SHOWER
    ====================================== */

    function showerHearts() {

        const container =
            document.querySelector(
                ".floating-heart-container"
            );

        if (!container) return;

        for (let i = 0; i < 50; i++) {

            setTimeout(() => {

                const heart =
                    document.createElement("div");

                heart.innerHTML = "❤️";

                heart.style.position = "fixed";

                heart.style.left =
                    Math.random() * 100 + "vw";

                heart.style.top = "-40px";

                heart.style.fontSize =
                    (18 + Math.random() * 18) + "px";

                heart.style.pointerEvents = "none";

                heart.style.animation =
                    "fallingPetal 8s linear forwards";

                container.appendChild(heart);

                setTimeout(() => {

                    heart.remove();

                },8000);

            },i * 80);

        }

    }

});