
import {SquareGrid} from './graph';


const nHNodes = 49;


var sketch = (p: p5) => {
    let graph = new SquareGrid(nHNodes, Math.ceil(nHNodes * p.windowHeight / p.windowWidth), p);
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        p.stroke(100);
        p.fill(100);
        p.circle(
            graph.center[0] * graph.x_step,// + 25, 
            graph.center[1] * graph.y_step,// + 25, 
            50);
        
        for (let [key, value] of graph.vertCoordinates) {
            p.ellipse(value[0], value[1], 5, 5);
        }
        graph.drawPrimsLabyrinth(p);
    };
    p.draw = () => {
        
    }
}
new p5(sketch);