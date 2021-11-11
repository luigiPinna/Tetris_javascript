import Matrix from './matrix.js';
import Board from './board.js';
import Tetromino from './tetromino.js';

console.log('TETRIS.JS LOADER');

const screen = document.getElementById("screen");
const ctx = screen.getContext("2d");

const COLOR1 = "#26224b";   //definizione colori
const COLOR2 = "#1e1a3f";
const SCALE_F = 20; //fattore di scala costante

let board = new Board(screen.width/SCALE_F, screen.height/SCALE_F);

let t = new Tetromino();


ctx.scale(SCALE_F,SCALE_F); //fattore di scala

//Disegna colore sfondo a righe attraverso 2 colori definiti
function drawGameBackground(){  
    for(let i=0; i < screen.width / SCALE_F; i++){
        ctx.fillStyle = i % 2 === 0 ?  COLOR1: COLOR2;  
        ctx.fillRect(i,0, SCALE_F, screen.height/SCALE_F);       
    }
}

window.addEventListener("keyup", (event) => {   //alla pressione del tasto
    console.log("UP", event.key);
});

window.addEventListener("keydown", (event) => {
    const {key} = event;
    let direction =0;
    if(key === "ArrowLeft"){
        direction = -1;
 
    }else if(key === "ArrowRight") {
        direction = 1;
    }
    t.pos.x += direction; 

    if(t.collideBorders(screen.width / SCALE_F) && direction !==0){
     console.log("COLLIDE!");
     t.pos.x -= direction;
    }   
   
    console.table(t.pos);
});

let lastTime=0;
let dropInterval = 500;
let lastDropDelta = 0;

function dropUpdate(delta){
    if(lastDropDelta > dropInterval){
        t.pos.y++;
        lastDropDelta =0;
    }
    if(t.collideBottom(screen.height / SCALE_F)){
        console.log("COLLIDE!");
        t.pos.y = 0;
    }
}
//aggiorna costantemente la pagina
function update(time=0){        //ricorsiva, loop per aggiornare la finestra 
    let delta = time - lastTime;
    lastDropDelta +=delta;
    dropUpdate();
    drawGameBackground();
    t.draw(ctx);
    lastTime = time;
    requestAnimationFrame(update);
}

update();//aggiorna la finestra

