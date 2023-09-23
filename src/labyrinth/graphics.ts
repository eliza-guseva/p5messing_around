
import {SquareGrid} from './graph';


const nHNodes = 7;


var sketch = (p: p5) => {
    let graph = new SquareGrid(nHNodes, Math.ceil(nHNodes * p.windowHeight / p.windowWidth), p);
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        p.noLoop();
    };
    p.draw = () => {
        for (let [key, value] of graph.vertCoordinates) {
            p.ellipse(value[0], value[1], 5, 5);
            p.fill(100); 
        }
        graph.drawPrimsLabyrinth(p);
    }
}
new p5(sketch);