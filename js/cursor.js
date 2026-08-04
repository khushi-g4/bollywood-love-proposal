/* ==========================================
   CUSTOM CURSOR
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cursor = document.querySelector(".cursor");

    const ring = document.querySelector(".cursor-ring");

    if (!cursor || !ring) return;

    let mouseX = window.innerWidth / 2;

    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;

    let ringY = mouseY;

    /* ==========================
       Mouse Move
    ========================== */

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;

        mouseY = e.clientY;

        cursor.style.left = mouseX + "px";

        cursor.style.top = mouseY + "px";

        createSparkle(mouseX, mouseY);

    });

    /* ==========================
       Ring Animation
    ========================== */

    function animateRing(){

        ringX += (mouseX - ringX) * 0.15;

        ringY += (mouseY - ringY) * 0.15;

        ring.style.left = ringX + "px";

        ring.style.top = ringY + "px";

        requestAnimationFrame(animateRing);

    }

    animateRing();

    /* ==========================
       Hover Effect
    ========================== */

    const hoverItems = document.querySelectorAll(

        "button,a,.gallery-card,.reason-card,.future-card"

    );

    hoverItems.forEach(item=>{

        item.addEventListener("mouseenter",()=>{

            cursor.classList.add("hover");

            ring.classList.add("hover");

        });

        item.addEventListener("mouseleave",()=>{

            cursor.classList.remove("hover");

            ring.classList.remove("hover");

        });

    });

    /* ==========================
       Sparkles
    ========================== */

    function createSparkle(x,y){

        if(Math.random()>0.35) return;

        const sparkle = document.createElement("div");

        sparkle.className="sparkle";

        sparkle.style.left=x+"px";

        sparkle.style.top=y+"px";

        document.body.appendChild(sparkle);

        setTimeout(()=>{

            sparkle.remove();

        },700);

    }

    /* ==========================
       Floating Hearts
    ========================== */

    document.addEventListener("click",(e)=>{

        for(let i=0;i<8;i++){

            const heart=document.createElement("div");

            heart.className="cursor-heart";

            heart.innerHTML="❤️";

            heart.style.left=e.clientX+"px";

            heart.style.top=e.clientY+"px";

            heart.style.fontSize=(10+Math.random()*10)+"px";

            heart.style.transform=

            `translate(${Math.random()*80-40}px,
            ${Math.random()*80-40}px)`;

            document.body.appendChild(heart);

            setTimeout(()=>{

                heart.remove();

            },1200);

        }

    });

});