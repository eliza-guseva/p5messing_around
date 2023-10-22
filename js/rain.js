class Drop {
    constructor(top_x, top_y, length, thickness, speed, rotation = 0, color) {
        this.top_x = top_x;
        this.top_y = top_y;
        this.length = length;
        this.thickness = thickness;
        this.speed = speed;
        this.rotation = rotation;
        this.color = color;
    }
    draw(p) {
        p.beginShape();
        p.noStroke();
        p.fill(this.color);
        p.vertex(this.top_x, this.top_y);
        p.quadraticVertex(this.top_x + this.thickness / 2, this.top_y + this.length, this.top_x, this.top_y + this.length);
        p.quadraticVertex(this.top_x - this.thickness / 2, this.top_y + this.length, this.top_x, this.top_y);
        p.endShape(p.CLOSE);
    }
    drawSimple(p) {
        p.stroke(this.color);
        p.line(this.top_x, this.top_y, this.top_x, this.top_y + this.length);
        p.strokeWeight(this.thickness / 2);
    }
}
let background_color = [110, 115, 120];
let drop_count = 1000;
let drop_length = 30;
let drop_thickness = 10;
let drop_speed = 15;
let drop_rotation = 0;
let drop_color = [125, 135, 138];
let drops = Array();
let cloud;
function preload(p) {
    cloud = p.loadImage("public/cloud3.png");
}
var sketch = (p) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        preload(p);
        p.background(background_color);
        p.frameRate(30);
        for (let i = 0; i < drop_count; i++) {
            drops.push(new Drop(p.random(p.width) - p.width / 2, p.random(p.height) - p.height / 2, drop_length, drop_thickness, drop_speed, drop_rotation, drop_color));
        }
    };
    p.draw = () => {
        p.background(110, 115, 120);
        for (let i = 0; i < drop_count; i++) {
            drops[i].draw(p);
            drops[i].top_y += drops[i].speed;
            if (drops[i].top_y > p.height / 2) {
                drops.splice(i, 1);
                drops.push(new Drop(p.random(p.width) - p.width / 2, -p.height / 2, drop_length, drop_thickness, drop_speed, drop_rotation, drop_color));
            }
        }
    };
};
new p5(sketch);
//# sourceMappingURL=rain.js.map