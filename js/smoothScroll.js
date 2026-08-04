/* ==========================================
   SMOOTH SCROLL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {

        link.addEventListener("click", function(e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const nav = document.querySelector("nav");

            const navHeight = nav ? nav.offsetHeight : 0;

            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

});