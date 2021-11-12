export default class Matrix{
    constructor(width, height){
        this.elements = [];
        while(height-- > 0){
            this.elements.push(new Array(width).fill(0));            
        }
    }

    transpose() {    //ruotare il tetromino, ruota la matrice
        for(let i=0; i<4; i++){
            for(let j=0; j<i; j++){
                let tmp = this.get(i, j);
                this.set(this.get(j, i), i, j);
                this.set(tmp, j, i);
            }
        }
        for(let i=0; i<4; i++)this.elements[i].reverse();        
    }

    set(v, x, y){
        this.elements[y][x] = v;
    }
    get(x, y){       
        return this.elements[y][x];
    }

    forEach(cb){     //call Back        
        this.elements.forEach((row, y) => {
            row.forEach((v, x) => {
                cb(v, x, y);
             });
        });        
    }
//aggiorna la riga in basso se viene riempita e la elimina
    updateRows(){
        let toDelete = [];
        const len = this.elements.length;
        this.elements.forEach((row, i) => {
            if(row.every((v) => v !==0)){
                toDelete.push(i);
            }            
        });
        toDelete.forEach(idx => {
            this.elements.splice(idx,1);
        });
        for(let k = 0; k < toDelete.length; k++){
            this.elements.unshift(new Array(this.elements[0].length).fill(0));
        }
        return toDelete.length;
    }

    print(){
        console.table(this.elements);       
    }
}