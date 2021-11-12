import Matrix from './matrix.js';

export default class Board{
    constructor(game,w, h){
        
        this.w = w;
        this.h = h;
        this.game=game;
        this.elements = new Matrix(w, h);
    }

    //verifica la collisione sia in basso che con altro elemento
    collide(element){
        if(element.collideBottom(this.h)){
            console.log("Collide bottom");  //collisione inferiore
            return true;
        }
        if(this.elementCollide(element)){//collisione con altro elemento
            console.log("Element collide", element);
            return true;
        }
        return false;
    }

    //collisione con altri componenti, controlla le celle e se diversa da 0 collide
    elementCollide(element){
        let collide = false;
        let cells = element.getElements();  //prende le celle dell'elemento
        cells.forEach(({v, x, y}) => {      //recupera l'elemento      
            if(this.elements.get(x, y) !== 0){
                collide = true; //se diversa da zero collide
            }
        });
        return collide;
    }

    merge(element){
        let cells = element.getElements();  //recupero gli elementi non nulli del tetromino che scende

        cells.forEach((pos) => {    
            const {v, x, y} = pos;  
            this.elements.set(v, x, y);    //copiamo nella board
        });
       
    }

    deleteRows(){
        this.game.lines += this.elements.updateRows();
    }
    
    draw(ctx){            
        this.elements.forEach((v, x, y) => {    //per tutti gli elementi
            if(v !== 0){
                ctx.fillStyle = this.game.colors[v];  //creazione poligono rosso
                ctx.fillRect(x, y, 1, 1); //spostamento
            } 
        });
    }   
}