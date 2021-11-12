import Tetramino from './tetramino.js';

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
export default class tetrisGame{
    constructor(){
        //this.board=board;
        this.points = 0;
        this.nextTetramino =  null;      
        this.lines = 0;
        this.currentTetramino = null;
        this.board = null;
        this.configs = [
            [],
            [{x:0,y:1}, {x:1,y:0}, {x:1,y:1}, {x:2,y:1},],
            [{x:0,y:0}, {x:1,y:0}, {x:2,y:0}, {x:3,y:0},],
            [{x:0,y:0}, {x:0,y:1}, {x:1,y:1}, {x:1,y:2},],
            [{x:0,y:0}, {x:0,y:1}, {x:1,y:0}, {x:1,y:1},]
        ];
        this.colors = ["","#2f8ee0", "#1eaa2b", "#f71a20", "#c3bf27"];
        this.nextTetraminoConfig();
    }

    getNextTetramino(){
        this.nextTetraminoConfig();
        this.currentTetramino = new Tetramino(this.configs[this.nextTetramino],this.nextTetramino);      
        this.currentTetramino.color = this.colors[this.nextTetramino];  
        return this.currentTetramino;
    }

    nextTetraminoConfig(){
        this.nextTetramino =  randomIntFromInterval(1,this.configs.length-1);
    }
}