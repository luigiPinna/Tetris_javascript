import Matrix from './matrix.js'
console.log('TETRIS.JS LOADER');

const screen = document.getElementById("screen");
const ctx = screen.getContext("2d");

const COLOR1 = "#0f9389";   //definizione colori
const COLOR2 = "#11a59a";
const SCALE_F = 20; //fattore di scala costante

class Tetromino{
    constructor(){
        this.elements = new Matrix(4,4);        //matrice 4x4 
        this.elements.set(1,0,1);
        this.elements.set(1,1,0);
        this.elements.set(1,1,1);
        this.elements.set(1,2,1);

        this.pos = {
            x:10,
            y:2
        };        //spostamento pos:position

        this.color= "red";
    }

    draw(ctx){  //disegno il tetromino
        
        ctx.fillStyle = this.color;  //creazione poligono rosso
        this.elements.forEach((v, x, y) => {
            if(v !== 0){
                ctx.fillRect(x+this.pos.x, y+this.pos.y, 1, 1); //spostamento
            } 
        });
    }     
}

let t = new Tetromino();
t.draw(ctx);

ctx.scale(SCALE_F,SCALE_F); //fattore di scala

function drawGameBackground(){
    for(let i=0; i < screen.width / SCALE_F; i++){
        ctx.fillStyle = i % 2 === 0 ?  COLOR1: COLOR2;  //colore sfondo a righe
        ctx.fillRect(i,0, SCALE_F, screen.height/SCALE_F);
        console.log(i);
    }
}

window.addEventListener("keyup", (event) => {   //alla pressione del tasto
    console.log("UP", event.key);
});
window.addEventListener("keydown", (event) => {
    console.log("DOWN", event.key);
    const {key} = event;
    if(key=== "ArrowLeft"){
        t.pos.x--; 
    }else if(key === "ArrowRight") {
        t.pos.x++;
    }
    console.table(t.pos);
});


function update( time=0){//ricorsiva, loop per aggiornare la finestra 
    drawGameBackground();
    t.draw(ctx);
    requestAnimationFrame(update);
}

update();//aggiorna la finestra

