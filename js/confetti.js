/* ==========================================
   CONFETTI.JS
   Bollywood Celebration
========================================== */

function launchConfetti() {

    if (typeof confetti !== "function") {

        console.warn("Canvas Confetti library not loaded.");

        return;

    }

    const duration = 5000;

    const animationEnd = Date.now() + duration;

    const defaults = {

        startVelocity: 35,

        spread: 360,

        ticks: 120,

        gravity: 0.9,

        scalar: 1.1,

        zIndex: 999999

    };

    function randomInRange(min, max) {

        return Math.random() * (max - min) + min;

    }

    const interval = setInterval(() => {

        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {

            clearInterval(interval);

            return;

        }

        const particleCount = 40;

        /* Left Side */

        confetti({

            ...defaults,

            particleCount,

            origin: {

                x: randomInRange(0.1, 0.3),

                y: Math.random() * 0.3

            }

        });

        /* Right Side */

        confetti({

            ...defaults,

            particleCount,

            origin: {

                x: randomInRange(0.7, 0.9),

                y: Math.random() * 0.3

            }

        });

    }, 300);

}