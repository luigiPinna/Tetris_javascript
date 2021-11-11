import Matrix from './matrix.js';
import Board from './board.js';

export default class Tetromino{
    constructor(){

        this.elements = new Matrix(4,4);        //matrice 4x4 
        this.elements.set(1,0,1);
        this.elements.set(1,1,0);
        this.elements.set(1,1,1);
        this.elements.set(1,2,1);

        this.pos = {  //posizione degli assi -> pos:position
            x:10,
            y:2
        };
        this.color= "yellow";   //colore del poligono
    }
//gestione collisione bordi
    collideBorders(cols){
       let collide = false;
        this.elements.forEach((v, x, y) => {    //per tutti gli elementi
            if((v !== 0) && (x + this.pos.x < 0 || x + this.pos.x >= cols)){
                collide = true;
                return;
            }
        });
        return collide;
    }
//gestione collisione pavimento basso
    collideBottom(rows){
        let collide = false;
        this.elements.forEach((v, x, y) => {    //per tutti gli elementi
            if((v!==0) && (y + this.pos.y >= rows)){
                collide = true;
                return;
            }
        });
        return collide;
    }
    
//disegno il tetromino  
    draw(ctx){        
        ctx.fillStyle = this.color;  //creazione poligono rosso
        this.elements.forEach((v, x, y) => {    //per tutti gli elementi
            if(v !== 0){
                ctx.fillRect(x+this.pos.x, y+this.pos.y, 1, 1); //spostamento
            } 
        });
    }     
}