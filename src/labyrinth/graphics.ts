
import {Graph} from './graph';


let graph = new Graph();


var sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
    };
    p.draw = () => {};
}

new p5(sketch);