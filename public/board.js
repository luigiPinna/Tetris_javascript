import Matrix from './matrix.js';

export default class Board{
    constructor(w,h){
        this.w=w;
        this.h=h;
        const elements = new Matrix(w,h);
    }

    collide(element){
        if(element.collideBottom(h)){
            return true;
        }
    }
    merge(element){
        
    }
}