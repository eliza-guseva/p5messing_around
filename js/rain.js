class Drop {
    constructor(top_x, top_y, length, thickness, speed, wind, color) {
        this.top_x = top_x;
        this.top_y = top_y;
        this.length = length;
        this.thickness = thickness;
        this.speed = 1 + speed * Math.pow(Math.random(), 1 / 3);
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
        this.p = p;
    }
}
let background_color = [90, 95, 92];
let bright_drop_count = 1000;
let bck_drop_count = bright_drop_count * 5;
let bright_drops = [];
for (let i = 0; i < bright_drop_count; i++) {
    bright_drops.push(new BrightDrop(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 50, 2.5, 10, 0, [125, 135, 138, 50]));
}
let bck_drops = [];
for (let i = 0; i < bck_drop_count; i++) {
    bck_drops.push(new Drop(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 200, 2, 3, 0, [125, 135, 138, 20]));
}
var sketch = (p) => {
    let rain = new Rain(p, bright_drops);
    let bck_rain = new Rain(p, bck_drops);
    p.setup = () => {
        console.log(rain);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(background_color);
    };
    p.draw = () => {
        p.background(90, 95, 92);
        bck_rain.draw(p);
        rain.draw(p);
    };
};
new p5(sketch);
//# sourceMappingURL=rain.js.map