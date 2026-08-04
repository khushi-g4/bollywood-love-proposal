/* ==========================================
   TIMELINE.JS
   Cinematic Timeline Animation
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const timelineItems = document.querySelectorAll(".timeline-item");

    const timeline = document.querySelector(".timeline");

    if (!timelineItems.length) return;

    /* ======================================
       Hide Initially
    ====================================== */

    timelineItems.forEach((item) => {

        item.style.opacity = "0";

        item.style.transition =
            "all .9s ease";

        if (item.classList.contains("left")) {

            item.style.transform =
                "translateX(-100px)";

        } else {

            item.style.transform =
                "translateX(100px)";

        }

    });

    /* ======================================
       Reveal on Scroll
    ====================================== */

    function revealTimeline() {

        const trigger =
            window.innerHeight * 0.82;

        timelineItems.forEach((item) => {

            const top =
                item.getBoundingClientRect().top;

            if (top < trigger) {

                item.style.opacity = "1";

                item.style.transform =
                    "translateX(0)";

            }

        });

    }

    window.addEventListener("scroll", revealTimeline);

    revealTimeline();

    /* ======================================
       Timeline Progress Line
    ====================================== */

    const progress = document.createElement("div");

    progress.className = "timeline-progress";

    timeline.appendChild(progress);

    function updateProgress() {

        const rect =
            timeline.getBoundingClientRect();

        const windowHeight =
            window.innerHeight;

        let percentage =
            ((windowHeight - rect.top) /
            (rect.height + windowHeight)) * 100;

        percentage =
            Math.max(0, Math.min(100, percentage));

        progress.style.height =
            percentage + "%";

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();

});