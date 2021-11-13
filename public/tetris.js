import Board from './board.js';
import Tetramino from './tetramino.js';
import TetrisGame from './game.js';

console.log('TETRIS.JS LOADER');

const screen = document.getElementById("screen");
const ctx = screen.getContext("2d");

const COLOR1 = "#26224b";   //definizione colori
const COLOR2 = "#26224b";

const SCALE_F = 20; //fattore di scala costante
let game = new TetrisGame();
let board = new Board(game, screen.width/SCALE_F, screen.height/SCALE_F);

let t = game.getNextTetramino();

ctx.scale(SCALE_F,SCALE_F); //fattore di scala

//Disegna colore sfondo a righe attraverso 2 colori definiti
function drawGameBackground(){  
    for(let i=0; i < screen.width / SCALE_F; i++){
        ctx.fillStyle = i % 2 === 0 ?  COLOR1: COLOR2;  
        ctx.fillRect(i,0, SCALE_F, screen.height/SCALE_F);       
    }
}
function resetTetramino(){
    t = game.getNextTetramino();
    t.pos.y = 0;
    board.deleteRows();
     //METTERE QUI L'AGGIORNAMENTO DEL PUNTEGGIO
     /*
            game.points++;
            console.log("STAMPA SCORE");
            document.getElementById("score").innerHTML = game.points;                      
      */
              
}

window.addEventListener("keyup", (event) => {   //alla pressione del tasto
    console.log("UP", event.key);
});

//Tutti gli eventi mandati dall'utente alla pressione dei tasti
window.addEventListener("keydown", (event) => {
    const {key, keyCode} = event;    
 
    let direction = 0;
    if(key === "ArrowLeft"){            //al premere del tasto sinistra
        direction = -1;
 
    }else if(key === "ArrowRight") {    //al premere del tasto destra
        direction = 1;
    }
    t.pos.x += direction; 

    if(t.collideBorders(screen.width / SCALE_F) && direction !==0){
        t.pos.x -= direction;
    } else if (board.elementCollide(t) && direction !==0){//t= tetromino
        t.pos.x -= direction;
    }   
    if(key === "ArrowDown"){    //al premere del tasto giu'
        dropTetromino();
    }  

    if(keyCode === 32){ //al premere dello 'spazio'
        t.rotate();     //comando per ruotare
        if (t.collideBorders(screen.width / SCALE_F)) t.adjustAfterRotate(screen.width / SCALE_F); //cicllo infinito        
        if(board.collide(t)){
            t.pos.y--;
            board.merge(t);
           resetTetramino();    //ritorno sopra e aggiorna il tetramino casuale
        }
    }
});

let lastTime=0;
let dropInterval = 500;
let lastDropDelta = 0;

function dropTetromino(){       
    t.pos.y++;
    if(board.collide(t)){
        t.pos.y--;
        board.merge(t);       
        resetTetramino();
    }
    lastDropDelta=0;
}

//aggiorna costantemente la pagina
function update(time=0){        //ricorsiva, loop per aggiornare la finestra 
    let delta = time - lastTime;
    lastDropDelta +=delta;    
    if(lastDropDelta > dropInterval){       
        dropTetromino();
    }   
    drawGameBackground();
    board.draw(ctx);        //disegna lo sfondo
    t.draw(ctx);            //disegna il poligono
    lastTime = time;
    requestAnimationFrame(update);
}

update();//aggiorna la finestra

