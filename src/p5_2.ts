// defined function that return gauss distribution
function gauss  (p: p5, mean: number, std: number) {
    // box muller transform
    let u1 = p.random();
    let u2 = p.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
    return mean + z0 * std;
}


var sketch = function (p: p5) {
    p.setup = () => {
        let myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(100);
        myCanvas.parent('myContainer');
        p.noLoop();
    }

    p.draw = () => {
        let x = gauss(p, p.width / 2, p.height / 10);
        let y = gauss(p, p.height/ 2, p.height / 10);
        p.ellipse(x, y, 5, 5);
    }

    p.mousePressed = () => {
        p.loop();
      }
    p.mouseReleased = () => {
        p.noLoop();
    }
};

new p5(sketch);