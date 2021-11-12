import Matrix from './matrix.js';

export default class Tetramino{
    constructor(config,v){
        this.elements = new Matrix(4,4);        //matrice 4x4 
      
        config.forEach(({x,y}) =>{
            this.elements.set(v,x,y);
        });
        this.pos = {  //posizione degli assi -> pos:position
            x:5,
            y:2
        };
        this.color= "yellow";   //colore del poligono
    }

    adjustAfterRotate(cols){
        let collide = false;

        this.elements.forEach((v, x, y) => {    //per tutti gli elementi
                if(v !== 0) {
                    if(x + this.pos.x < 0){
                        this.pos.x++;   //spostamento destra
                    }else if(x + this.pos.x >= cols) {
                        this.pos.x--;       //sposto di un blocco a sinistra                       
                    }
                    collide = true;
                }
        });
        return collide;
    }

    rotate(){
        this.elements.transpose();
        console.table(this.elements);
    }
    //prende tutti gli elementi delle celle se il valore non è 0 e li inserisce in cells
    getElements(){
        let cells= [];
        this.elements.forEach((v, x, y) => {    //per tutti gli elementi
            if(v !== 0){
                cells.push({ v, x: x+ this.pos.x, y: y + this.pos.y });
            }
            });

        return cells;
    }

    hasSet(x, y){
        let ex = x - this.pos.x;
        let ey = y - this.pos.y;

        if(ex > 0 && ey >= 0 && ex <4 && ey < 4 )
            return this.elements.get(ex,ey) !==0;
        else return 0;
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