var body = document.querySelector('body');
var sketch = function (p) {
    var x = p.windowWidth / 2;
    var y = p.windowHeight / 2;
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(0);
        p.fill(255);
        p.rect(x, y, 50, 50);
    };
};
new p5(sketch);
//# sourceMappingURL=build.js.map