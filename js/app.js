/* ==========================================
   APP.JS
   Main Controller
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("❤️ Bollywood Love Proposal Loaded");

    /* ======================================
       Smooth Fade-in
    ====================================== */

    document.body.classList.add("loaded");

    /* ======================================
       Navbar Shadow
    ====================================== */

    const nav = document.querySelector("nav");

    function navbarEffect(){

        if(!nav) return;

        if(window.scrollY > 80){

            nav.classList.add("scrolled");

        }else{

            nav.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", navbarEffect);

    navbarEffect();

    /* ======================================
       Hero Button Ripple
    ====================================== */

    document.querySelectorAll("button").forEach(button=>{

        button.addEventListener("click",(e)=>{

            const ripple=document.createElement("span");

            ripple.className="ripple";

            const rect=button.getBoundingClientRect();

            ripple.style.left=(e.clientX-rect.left)+"px";

            ripple.style.top=(e.clientY-rect.top)+"px";

            button.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

    /* ======================================
       Lazy Image Fade
    ====================================== */

    const images=document.querySelectorAll("img");

    images.forEach(img=>{

        img.onload=()=>{

            img.style.opacity="1";

            img.style.transform="scale(1)";

        };

    });

    /* ======================================
       Scroll To Top Button
    ====================================== */

    const topBtn=document.createElement("button");

    topBtn.id="topBtn";

    topBtn.innerHTML="↑";

    document.body.appendChild(topBtn);

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    window.addEventListener("scroll",()=>{

        if(window.scrollY>700){

            topBtn.classList.add("show");

        }else{

            topBtn.classList.remove("show");

        }

    });

    /* ======================================
       Console Message ❤️
    ====================================== */

    console.log(

`❤️
----------------------------------
Made with Love by Khushi
For Vishal ❤️
----------------------------------
`);

});