/* ==========================================
   PROPOSAL.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const yesBtn = document.getElementById("yesBtn");

    const proposal = document.getElementById("proposal");

    const title = proposal.querySelector("h1");

    const question = proposal.querySelector("h2");

    const paragraph = proposal.querySelector("p");

    const buttons = document.querySelector(".proposal-buttons");

    if (!yesBtn) return;

    yesBtn.addEventListener("click", celebrate);

    function celebrate(){

        /* ==========================
           Change Text
        ========================== */

        title.innerHTML =
        "❤️ She Said YES! ❤️";

        question.innerHTML =
        "Forever Starts Today";

        paragraph.innerHTML =
        "Thank you for being my safest place, my happiness, and my forever person. I love you more than words can ever describe.";

        /* ==========================
           Disable Buttons
        ========================== */

        buttons.innerHTML = `
            <button class="hero-btn">
                ❤️ Forever Together ❤️
            </button>
        `;

        /* ==========================
           Zoom Animation
        ========================== */

        proposal.style.transition =
        "all 1s ease";

        proposal.style.transform =
        "scale(1.02)";

        /* ==========================
           Launch Celebration
        ========================== */

        if(typeof launchConfetti==="function"){

            launchConfetti();

        }

        if(typeof launchFireworks==="function"){

            launchFireworks();

        }

        floatingHearts();

    }

    /* ==========================
       Floating Hearts
    ========================== */

    function floatingHearts(){

        const container =
        document.querySelector(".floating-heart-container");

        if(!container) return;

        for(let i=0;i<40;i++){

            setTimeout(()=>{

                const heart =
                document.createElement("div");

                heart.innerHTML="❤️";

                heart.style.position="fixed";

                heart.style.left=
                Math.random()*100+"vw";

                heart.style.bottom="-40px";

                heart.style.fontSize=
                (18+Math.random()*18)+"px";

                heart.style.pointerEvents="none";

                heart.style.animation=
                "floatingHeart 8s linear forwards";

                container.appendChild(heart);

                setTimeout(()=>{

                    heart.remove();

                },8000);

            },i*120);

        }

    }

});