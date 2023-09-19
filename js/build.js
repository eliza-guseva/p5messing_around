const body = document.querySelector('body');
class PolygonHelper {
    static draw(x, y, npoints, radius) {
        let angle = TWO_PI / npoints;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
}
var sketch = (p) => {
    const x = p.windowWidth / 2;
    const y = p.windowHeight / 2;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = () => {
        if (p.mouseIsPressed) {
            p.fill(0);
        }
        else {
            p.fill(p.random(255));
        }
        p.rect(p.mouseX, p.mouseY, 50, 50);
    };
};
new p5(sketch);
//# sourceMappingURL=build.js.map