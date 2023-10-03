"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_1 = require("./graph");
const nHNodes = 49;
var sketch = (p) => {
    let graph = new graph_1.SquareGrid(nHNodes, Math.ceil(nHNodes * p.windowHeight / p.windowWidth), p);
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        p.stroke(100);
        p.fill(100);
        p.circle(graph.center[0] * graph.x_step, graph.center[1] * graph.y_step, 50);
        for (let [key, value] of graph.vertCoordinates) {
            p.ellipse(value[0], value[1], 5, 5);
        }
        graph.drawPrimsLabyrinth(p);
    };
    p.draw = () => {
    };
};
new p5(sketch);
//# sourceMappingURL=graphics.js.map