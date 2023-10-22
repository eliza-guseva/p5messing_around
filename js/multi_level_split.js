class MySquare {
    constructor(x, y, size, colorScheme = null) {
        this.x = x;
        this.y = y;
        this.size = size;
        if (this.colorScheme == null) {
            this.colorScheme = [
                Math.random() * 360,
                100,
                80
            ];
        }
        else {
            this.colorScheme = colorScheme;
        }
    }
    draw(p) {
        p.rect(this.x, this.y, this.size, this.size);
        p.fill(this.colorScheme);
        p.noStroke();
    }
    drawSadCell(p) {
        let hue_ = p.dist(p.width / 2, p.height / 2, this.x + this.size / 2, this.y + this.size / 2) / 3 + (p.frameCount * 10);
        hue_ = hue_ % 360;
        p.fill([hue_, this.colorScheme[1], this.colorScheme[2]]);
        p.noStroke();
        p.rect(this.x, this.y, this.size, this.size);
        p.noStroke();
        p.fill([hue_, this.colorScheme[1], this.colorScheme[2] - 20]);
        p.beginShape();
        p.vertex(this.x, this.y);
        p.vertex(this.x, this.y + this.size);
        p.vertex(this.x + this.size / 3, this.y + this.size / 3);
        p.endShape();
        p.noStroke();
        p.fill([hue_, this.colorScheme[1], this.colorScheme[2] + 20]);
        p.beginShape();
        p.vertex(this.x + this.size, this.y);
        p.vertex(this.x + this.size * 2 / 3, this.y + this.size / 3);
        p.vertex(this.x + this.size, this.y + this.size);
        p.endShape();
        p.noStroke();
        p.noStroke();
        p.fill([hue_, this.colorScheme[1] - 40, this.colorScheme[2]]);
        p.beginShape();
        p.vertex(this.x, this.y);
        p.vertex(this.x + this.size, this.y);
        p.vertex(this.x + this.size * 2 / 3, this.y + this.size / 3);
        p.vertex(this.x + this.size / 3, this.y + this.size / 3);
        p.endShape();
    }
    split(p, squares) {
        var newSquares = [];
        var newSize = this.size / 2;
        newSquares.push(new MySquare(this.x, this.y, newSize));
        newSquares.push(new MySquare(this.x + newSize, this.y, newSize));
        newSquares.push(new MySquare(this.x, this.y + newSize, newSize));
        newSquares.push(new MySquare(this.x + newSize, this.y + newSize, newSize));
        squares.splice(squares.indexOf(this), 1, ...newSquares);
    }
}
class Squares extends Array {
    addSquare(square) {
        this.push(square);
    }
    splitRandomSquare(p) {
        var index = Math.floor(Math.random() * this.length);
        this[index].split(p, this);
    }
}
var squares = new Squares();
squares.addSquare(new MySquare(0, 0, 600));
var stopCondition = 30;
var sketch = (p) => {
    p.setup = () => {
        var cnv = p.createCanvas(600, 600);
        cnv.center('horizontal');
        p.background(0);
        p.frameRate(5);
        p.colorMode(p.HSB);
        squares.splitRandomSquare(p);
        for (let i = 0; i < squares.length; i++) {
            squares[i].drawSadCell(p);
        }
    };
    p.draw = () => {
        let t = p.frameCount;
        if (t < stopCondition) {
            squares.splitRandomSquare(p);
            for (let i = 0; i < squares.length; i++) {
                squares[i].drawSadCell(p);
            }
        }
        else {
            p.noLoop();
        }
        p.loop();
        for (let i = 0; i < squares.length; i++) {
            squares[i].drawSadCell(p);
        }
    };
};
new p5(sketch);
//# sourceMappingURL=multi_level_split.js.map