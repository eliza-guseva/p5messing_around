
import {SquareGrid} from './graph';





var sketch = (p: p5) => {
    let graph = new SquareGrid(29, Math.ceil(29 * p.windowHeight / p.windowWidth), p);
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        p.noLoop();
    };
    p.draw = () => {
        // for every coorinate pair in verticies_coords, draw a point
        for (let [key, value] of graph.vertCoordinates) {
            p.ellipse(value[0], value[1], 5, 5);
            p.fill(100);
            graph.drawPrimsLabyrinth(p);
        }
    }
}
new p5(sketch);