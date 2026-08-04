/* ==========================================================
   CHERRY BLOSSOM ENGINE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

const front=document.getElementById("petals-front");
const back=document.getElementById("petals-back");

function createPetal(layer){

const petal=document.createElement("div");

petal.className="petal";

const size=Math.random()*18+12;

const duration=Math.random()*8+10;

const delay=Math.random()*3;

const left=Math.random()*100;

const rotate=Math.random()*360;

petal.style.width=size+"px";
petal.style.height=size+"px";

petal.style.left=left+"vw";

petal.style.animationDuration=duration+"s";

petal.style.animationDelay=delay+"s";

petal.style.transform=`rotate(${rotate}deg)`;

layer.appendChild(petal);

petal.addEventListener("animationend",()=>{

petal.remove();

createPetal(layer);

});

}

/* Back Layer */

for(let i=0;i<35;i++){

createPetal(back);

}

/* Front Layer */

for(let i=0;i<18;i++){

createPetal(front);

}

});