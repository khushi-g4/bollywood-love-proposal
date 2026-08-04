/* ==========================================
   GALLERY.JS
   Bollywood Pinterest Gallery
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".gallery-card img");

    const lightbox = document.getElementById("lightbox");

    const lightboxImg = document.getElementById("lightbox-img");

    const closeBtn = document.querySelector(".close-lightbox");

    if (!lightbox || !lightboxImg) return;

    let currentImage = 0;

    /* ==========================
       OPEN IMAGE
    ========================== */

    function openImage(index){

        currentImage = index;

        lightbox.style.display = "flex";

        lightbox.style.opacity = "0";

        lightboxImg.src = images[index].src;

        setTimeout(()=>{

            lightbox.style.opacity = "1";

        },20);

        document.body.style.overflow = "hidden";

    }

    /* ==========================
       CLOSE IMAGE
    ========================== */

    function closeImage(){

        lightbox.style.opacity = "0";

        setTimeout(()=>{

            lightbox.style.display = "none";

        },300);

        document.body.style.overflow = "auto";

    }

    /* ==========================
       IMAGE CLICK
    ========================== */

    images.forEach((img,index)=>{

        img.style.cursor = "pointer";

        img.addEventListener("click",()=>{

            openImage(index);

        });

    });

    /* ==========================
       CLOSE BUTTON
    ========================== */

    if(closeBtn){

        closeBtn.addEventListener("click",closeImage);

    }

    /* ==========================
       CLICK OUTSIDE
    ========================== */

    lightbox.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            closeImage();

        }

    });

    /* ==========================
       KEYBOARD
    ========================== */

    document.addEventListener("keydown",(e)=>{

        if(lightbox.style.display!=="flex") return;

        if(e.key==="Escape"){

            closeImage();

        }

        if(e.key==="ArrowRight"){

            currentImage++;

            if(currentImage>=images.length){

                currentImage=0;

            }

            lightboxImg.src=images[currentImage].src;

        }

        if(e.key==="ArrowLeft"){

            currentImage--;

            if(currentImage<0){

                currentImage=images.length-1;

            }

            lightboxImg.src=images[currentImage].src;

        }

    });

});