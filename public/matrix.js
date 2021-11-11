export default class Matrix{

    constructor(width, height){
        this.elements = [];
        while(height-- > 0){
            this.elements.push(new Array(width).fill(0));            
        }
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

    print(){
        console.table(this.elements);       
    }
}