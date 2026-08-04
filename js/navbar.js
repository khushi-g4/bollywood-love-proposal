/* ==========================================
   NAVBAR
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

const header=document.querySelector("header");

const hamburger=document.querySelector(".hamburger");

const menu=document.querySelector("nav ul");

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

header.classList.add("scrolled");

}

else{

header.classList.remove("scrolled");

}

});

hamburger.addEventListener("click",()=>{

menu.classList.toggle("active");

});

});