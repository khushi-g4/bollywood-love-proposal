/* ==========================================================
   CINEMATIC SAKURA ENGINE
   PART 1
========================================================== */

const canvas=document.getElementById("sakura-canvas");

const ctx=canvas.getContext("2d");

function resizeCanvas(){

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

const petals=[];

class Petal{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=Math.random()*canvas.width;

        this.y=Math.random()*-canvas.height;

        this.size=Math.random()*18+8;

        this.speed=Math.random()*1.5+.5;

        this.angle=Math.random()*360;

        this.rotation=Math.random()*2-1;

        this.opacity=Math.random()*.6+.3;

    }

    update(){

        this.y+=this.speed;

        this.angle+=this.rotation;

        if(this.y>canvas.height+50){

            this.reset();

            this.y=-50;

        }

    }

    draw(){

        ctx.save();

        ctx.translate(this.x,this.y);

        ctx.rotate(this.angle*Math.PI/180);

        ctx.globalAlpha=this.opacity;

        ctx.fillStyle="#ffc6d9";

        ctx.beginPath();

        ctx.ellipse(

            0,

            0,

            this.size*.4,

            this.size,

            Math.PI/4,

            0,

            Math.PI*2

        );

        ctx.fill();

        ctx.restore();

    }

}
for(let i=0;i<60;i++){

    petals.push(new Petal());

}

function animate(){

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    petals.forEach(p=>{

        p.update();

        p.draw();

    });

    requestAnimationFrame(animate);

}

animate();