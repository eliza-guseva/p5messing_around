class Drop {
    constructor(top_x, top_y, length, thickness, speed, wind, color) {
        this.top_x = top_x;
        this.top_y = top_y;
        this.length = length;
        this.thickness = thickness;
        this.speed = Math.max(speed / 2, speed * Math.pow(Math.random(), 1 / 3));
        this.wind = wind;
        this.color = color;
    }
    draw(p) {
        p.stroke(this.color);
        p.strokeWeight(this.thickness);
        p.line(this.top_x, this.top_y, this.top_x, this.top_y + this.length);
    }
}
class BrightDrop extends Drop {
    constructor(top_x, top_y, length, thickness, speed, wind, color) {
        super(top_x, top_y, length, thickness, speed, wind, color);
        this.random = Math.pow(Math.random(), 2);
    }
    draw(p) {
        super.draw(p);
        let bright_len = this.length * this.random;
        let wiggle_room = this.length - bright_len;
        let bright_init_y = this.top_y + this.length - bright_len - wiggle_room * Math.pow(this.random, 2);
        p.strokeWeight(this.thickness / 2);
        p.stroke(this.color.map((x) => { return x + 30; }));
        p.line(this.top_x, bright_init_y, this.top_x, bright_init_y + bright_len);
    }
}
class Rain extends Array {
    constructor(p, drops) {
        super(...drops);
        this.draw = (p) => {
            for (let i = 0; i < this.length; i++) {
                this[i].draw(p);
                this[i].top_y += this[i].speed;
                if (this[i].top_y >= p.height) {
                    this[i].top_y = 0 - 2 * this[i].length * p.random();
                    this[i].top_x = p.random() * p.width;
                }
            }
        };
        this.createDrops = (p) => {
            for (let i = 0; i < this.length; i++) {
                this[i] = new Drop(p.random() * p.width, p.random() * p.height, 200, 2, 4, 0, [125, 135, 138, 20]);
            }
        };
        this.p = p;
    }
}
function gauss(mean, std) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
    return mean + z0 * std;
}
let background_color = [7, 5, 28];
let bright_drop_count = 100;
let bck_drop_count = bright_drop_count * 2;
let bright_drops = [];
for (let i = 0; i < bright_drop_count; i++) {
    let color_gauss = gauss(10, 5);
    bright_drops.push(new Drop(Math.random() * window.innerWidth, Math.random() * window.innerHeight, gauss(75, 30), Math.max(1, gauss(2, 2)), Math.max(30, 50 + gauss(100, 50)), 0, [120 + color_gauss, 120 + color_gauss, 120 + color_gauss, 25 + gauss(5, 1)]));
}
var sketch = (p) => {
    let rain = new Rain(p, bright_drops);
    p.setup = () => {
        console.log(rain);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(background_color);
    };
    p.draw = () => {
        p.background(background_color);
        rain.draw(p);
    };
};
new p5(sketch);
//# sourceMappingURL=rain.js.map