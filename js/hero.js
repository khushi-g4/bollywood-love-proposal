/* ==========================================
   HERO.JS
   Hero V2 Controller
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initHero();

});

function initHero(){

    heroEntrance();

    updateGreeting();

}

/* ==========================================
   HERO ENTRANCE
========================================== */

function heroEntrance(){

    const subtitle =
        document.querySelector(".hero-subtitle");

    const title =
        document.querySelector(".hero-content h1");

    const description =
        document.querySelector(".hero-description");

    const button =
        document.querySelector(".hero-btn");

    if(!subtitle || !title || !description || !button){

        return;

    }

    const elements = [

        subtitle,

        title,

        description,

        button

    ];

    elements.forEach((element,index)=>{

        element.style.opacity = "0";

        element.style.transform =

        "translateY(40px)";

        element.style.transition =

        "all .9s ease";

        setTimeout(()=>{

            element.style.opacity = "1";

            element.style.transform =

            "translateY(0)";

        },500 + (index*250));

    });

}

/* ==========================================
   GREETING
========================================== */

function updateGreeting(){

    const subtitle =
        document.querySelector(".hero-subtitle");

    if(!subtitle) return;

    const hour =
        new Date().getHours();

    let greeting="";

    if(hour<12){

        greeting="Good Morning Vishal ❤️";

    }

    else if(hour<17){

        greeting="Good Afternoon Vishal ❤️";

    }

    else{

        greeting="Good Evening Vishal ❤️";

    }

    subtitle.innerHTML = greeting;

}
