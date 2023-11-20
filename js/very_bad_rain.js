class Drop {
    // background drop, doesn't have a highlight
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
    // foreground drop, has a highlight
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


class ReflectedDrop{
    // flies back
    constructor(top_x, top_y, length, thickness, textbox_x, textbox_y, color) {
        this.top_x = top_x;
        this.top_y = top_y;
        this.length = length;
        this.thickness = thickness;
        this.thexbox_x = textbox_x;
        this.textbox_y = textbox_y;
        this.wind = Math.tan(Math.random() * Math.PI / 4) * this.length;
        this.wind_dir = Math.random() > 0.5 ? 1 : -1;
        this.color = color;
        this.countdown = 5;
    }
    draw(p) {
        if (this.countdown > 0) {
            p.stroke(this.color);
            p.strokeWeight(this.thickness);
            p.line(this.top_x, this.top_y, this.top_x + this.wind * this.wind_dir, this.top_y - this.length);
            this.countdown -= 1;
        }
    }
}


class Rain extends Array {
    // collection of drops
    constructor(p, drops, is_reflected = false, textbox_x = 0, textbox_y = 0, textbox_width = 0) {
        super(...drops);
        this.is_reflected = is_reflected;
        this.reflections = [];
        this.draw = (p) => {
            for (let i = 0; i < this.length; i++) {
                this[i].draw(p);
                this[i].top_y += this[i].speed;
                if (this[i].top_y >= p.height) {
                    this[i].top_y = 0 - 2 * this[i].length * p.random();
                    this[i].top_x = p.random() * p.width;
                }
                let bottom_y = this[i].top_y + this[i].length;
                let at_textbox_y = bottom_y >= textbox_y && bottom_y <= textbox_y + this[i].length;
                let at_textbox_x = this[i].top_x >= textbox_x && this[i].top_x <= textbox_x + textbox_width;
                if (is_reflected && at_textbox_y && at_textbox_x) {

                    this.reflections.push(
                        new ReflectedDrop(
                            this[i].top_x, // x
                            textbox_y, // y
                            gauss(7,3), // length
                            1.5, // width
                            textbox_x, // textbox_x
                            textbox_y, // textbox_y
                            this[i].color));
                }
            }
            for (let i = 0; i < this.reflections.length; i++) {
                this.reflections[i].draw(p);
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
let bright_drop_count = 400;
let bck_drop_count = 200;
let bright_drops = [];
let bck_drops = [];
for (let i = 0; i < bright_drop_count; i++) {
    let color_gauss = gauss(10, 5);
    bright_drops.push(
        new BrightDrop(
            Math.random() * window.innerWidth, // x
            Math.random() * window.innerHeight, // y
            Math.max(30,gauss(30, 50)), // length
            Math.max(1, gauss(2, 1)), // width
            50, // speed
            0, // wind
            [120 + color_gauss, 120 + color_gauss, 120 + color_gauss, 85 + gauss(5, 1)]
            ));
}

var sketch = (p) => {
    let textbox_x = p.windowWidth/2 - 250;
    let textbox_y = p.windowHeight/2 - 300;
    let textbox_width = 500;
    let textbox_height = 600;
    // screen width not using p
    console.log(p.windowWidth, p.windowHeight);
    console.log(textbox_x, textbox_y, textbox_width, textbox_height);

    let rain = new Rain(p, bright_drops, is_reflected = false, textbox_x, textbox_y, textbox_width);
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(background_color);
    };
    p.draw = () => {
        p.background(background_color);
        rain.draw(p);
    };
};
new p5(sketch);
//# sourceMappingURL=bad_rain.js.map