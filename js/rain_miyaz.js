class RainLine {
    constructor(p) {
        this.getLine = () => {
            let nLines = Math.floor(Math.random() * 2) + 2;
            let lines = [];
            let xStart = this.xStart;
            let yStart = 0;
            for (let i = 0; i < nLines - 1; i++) {
                let yEnd = Math.max(70, Math.random() * this.p.windowHeight);
                let breakLen = boundGauss(30, 10, 10, 50);
                yEnd = yEnd - breakLen;
                let xEnd = xStart + Math.tan(this.angle) * (yEnd - yStart);
                lines.push([xStart, yStart, xEnd, yEnd]);
                yStart = yEnd + breakLen;
                xStart = xEnd + Math.tan(this.angle) * breakLen;
            }
            lines.push([xStart, yStart,
                xStart + Math.tan(this.angle) * (this.p.windowHeight - yStart), this.p.windowHeight]);
            console.log(this.p.windowHeight);
            console.log(nLines);
            console.log(lines);
            return lines;
        };
        this.draw = () => {
            this.p.stroke(255);
            this.p.strokeWeight(this.width);
            for (let i = 0; i < this.lines.length; i++) {
                this.p.line(this.lines[i][0], this.lines[i][1], this.lines[i][2], this.lines[i][3]);
            }
        };
        this.p = p;
        this.angle = 0.17;
        this.width = boundGauss(2, 2, 1, 3);
        let xShift = Math.tan(this.angle) * this.p.windowHeight;
        this.xStart = Math.random() * (this.p.windowWidth + xShift) - xShift;
        this.lines = this.getLine();
    }
}
function gauss(mean, std) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
    return mean + z0 * std;
}
function boundGauss(mean, std, min, max) {
    let x = gauss(mean, std);
    while (x < min || x > max) {
        x = gauss(mean, std);
    }
    return x;
}
var sketch = (p) => {
    let rainLines = [];
    for (let i = 0; i < 50; i++) {
        rainLines.push(new RainLine(p));
    }
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(57, 65, 85);
        p.frameRate(10);
    };
    p.draw = () => {
        p.background(57, 65, 85);
        for (let i = 0; i < rainLines.length; i++) {
            rainLines[i].lines = rainLines[i].getLine();
            rainLines[i].draw();
        }
    };
};
new p5(sketch);
//# sourceMappingURL=rain_miyaz.js.map