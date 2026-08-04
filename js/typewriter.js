/* ==========================================
   TYPEWRITER.JS
   Bollywood Cinematic Typewriter
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll("[data-type]");

    if (!elements.length) return;

    function typeWriter(element) {

        const text = element.getAttribute("data-type");

        let index = 0;

        element.innerHTML = "";

        function type() {

            if (index < text.length) {

                element.innerHTML += text.charAt(index);

                index++;

                setTimeout(type, 55);

            } else {

                element.classList.add("typing-complete");

            }

        }

        type();

    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting &&
                !entry.target.dataset.done) {

                entry.target.dataset.done = "true";

                typeWriter(entry.target);

            }

        });

    }, {

        threshold: 0.45

    });

    elements.forEach(element => {

        observer.observe(element);

    });

});