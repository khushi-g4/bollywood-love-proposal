/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    setTimeout(() => {

        loader.style.transition = "opacity .8s ease";

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

            document.body.style.overflow = "auto";

        }, 800);

    }, 2500);

});