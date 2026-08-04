/* ==========================================
   NAVBAR
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector("nav");

    const links = document.querySelectorAll("nav ul li a");

    const hamburger = document.querySelector(".hamburger");

    const navMenu = document.querySelector("nav ul");

    /* ==========================
       Scroll Effect
    ========================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

    /* ==========================
       Mobile Menu
    ========================== */

    if (hamburger) {

        hamburger.addEventListener("click", () => {

            hamburger.classList.toggle("active");

            navMenu.classList.toggle("active");

        });

    }

    /* ==========================
       Close Mobile Menu
    ========================== */

    links.forEach(link => {

        link.addEventListener("click", () => {

            if (hamburger) {

                hamburger.classList.remove("active");

            }

            if (navMenu) {

                navMenu.classList.remove("active");

            }

        });

    });

    /* ==========================
       Active Link on Scroll
    ========================== */

    const sections = document.querySelectorAll("section[id]");

    function activateNav() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {

                current = section.getAttribute("id");

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activateNav);

    activateNav();

});