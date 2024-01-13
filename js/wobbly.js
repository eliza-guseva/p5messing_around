function wobble1(x, t) {
    return (t + 30 * Math.sin(0.02 * x + 30 + t / 100)
        + 25 * Math.sin(0.03 * x + 2 + t / 130));
}
function genCurve(p, wobbleFunction, t = 0) {
    p.beginShape();
    for (let x = 0; x < p.windowWidth; x++) {
        let y = wobbleFunction(x, t);
        p.vertex(x, y);
    }
    p.vertex(p.windowWidth, p.windowHeight);
    p.vertex(0, p.windowHeight);
    p.endShape();
}
function frameCount2Y(p, t, how_far) {
    return (p.windowHeight * 0.8
        + how_far * p.windowHeight * (Math.sin(t / 100)
            + Math.cos(2 + t / 130)));
}
var sketch = (p) => {
    let scrW = p.windowWidth;
    let scrH = p.windowHeight;
    let sand = [194, 178, 128];
    let wetSand = [194, 143, 96];
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(sand);
    };
    p.draw = () => {
        p.background(sand);
        p.noStroke();
        p.fill(wetSand);
        genCurve(p, wobble1, frameCount2Y(p, p.frameCount - 100, 0.25));
        p.fill(0, 105, 148);
        genCurve(p, wobble1, frameCount2Y(p, p.frameCount, 0.25));
    };
};
new p5(sketch);
//# sourceMappingURL=wobbly.js.map