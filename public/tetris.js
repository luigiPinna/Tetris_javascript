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
    }

    draw(ctx){  //disegno il tetromino
        this.elements.forEach((v, x, y) => {
            if(v !== 0){
                ctx.fillRect(x, y, 1, 1);
            } 
        });
    }     
}

let t = new Tetromino();
t.draw(ctx);

ctx.scale(SCALE_F,SCALE_F); //fattore di scala

for(let i=0; i < screen.width / SCALE_F; i++){
    ctx.fillStyle = i % 2 === 0 ?  COLOR1: COLOR2;  //colore sfondo a righe
    ctx.fillRect(i,0, SCALE_F, screen.height/SCALE_F);
    console.log(i);
}

ctx.fillStyle = "green";    //crazione quadrato verde
ctx.fillRect(5,5,1,1);

/*
function forEachElement(el, cb){    //call Back
        el.forEach((row,y)=>{
            row.forEach((v,x)=>{
                cb(v,x,y);
            });
        });
    }


function drawElement2(el){  //funzione che itera gli elementi
    forEachElement(el,
        (v,x,y)=>{
            if(v !== 0){
           ctx.fillRect(x,y, 1, 1);
            }
        });
};

drawElement2(elements);  

*/

ctx.fillStyle = "red";  //creazione poligono rosso
t.draw(ctx);
