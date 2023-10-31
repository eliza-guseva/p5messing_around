
 
 class Drop {
    top_x: number;
    top_y: number;
    length: number;
    thickness: number;
    speed: number;
    wind: number;
    color: number[];
    constructor(
        top_x: number, 
        top_y: number, 
        length: number, 
        thickness: number, 
        speed: number, 
        wind: number, 
        color: number[]
    ) {
            this.top_x = top_x;
            this.top_y = top_y;
            this.length = length;
            this.thickness = thickness;
            this.speed = Math.max(speed/2, speed * Math.pow(Math.random(), 1/3));
            this.wind = wind;
            this.color = color;
    }

    draw(p: p5) {
        p.stroke(this.color);
        p.strokeWeight(this.thickness);
        p.line(this.top_x, this.top_y, this.top_x, this.top_y + this.length);
        
    }

    static getRandDrop(p: p5) {
        return new Drop(
            this.setRandTopX(p), 
            this.setRandTopY(p), 
            this.setRandLength(p), 
            this.setRandThickness(p), 
            this.setRandSpeed(p), 
            this.setRandWind(p), 
            this.setRandColor(p)
        );
    }

    static setRandTopX(p: p5) {
        return p.random() * p.width;
    }

    static setRandTopY(p: p5) {
        return p.random() * p.height;
    }

    static setRandLength(p: p5) {
        return gauss(175, 30);
    }
    static setRandThickness(p: p5) {
        return Math.max(1, gauss(2, 2));
    }

    static setRandSpeed(p: p5) {
        return Math.max(100, 150 + gauss(100, 50));
    }

    static setRandWind(p: p5) {
        return 0;
    }

    static setRandColor(p: p5) {
        let color_gauss = gauss(10, 5)
        return [120 + color_gauss, 120 + color_gauss, 120 + color_gauss, 45 + gauss(5,5)];
    }
}

// creat class BrightDrop extends Drop
class BrightDrop extends Drop {
    random: number;
    constructor(
        top_x: number, 
        top_y: number, 
        length: number, 
        thickness: number, 
        speed: number, 
        wind: number, 
        color: number[]
    ) {
        super(top_x, top_y, length, thickness, speed, wind, color);
        this.random = Math.random()**2;
    }

    draw(p: p5) {
        super.draw(p);
        // we are trying to create a glitter feeling below
        let bright_len = this.length * this.random;
        let wiggle_room = this.length - bright_len;
        let bright_init_y = this.top_y + this.length - bright_len - wiggle_room * this.random**2;
        p.strokeWeight(this.thickness / 2);
        p.stroke(this.color.map((x) => {return x + 30}))
        p.line(this.top_x, bright_init_y, this.top_x, bright_init_y + bright_len);
    }
}

class Reflection {
    p: p5;
    refl_y: number;
    start_frame: number;
    constructor (
        p: p5,
        refl_y: number
    ) {
        this.p = p;
        this.refl_y = refl_y;
        this.start_frame = p.frameCount;
    }

    draw = (p: p5) => {
        p.stroke(255, 255, 255, 255);
        p.strokeWeight(1);
       
    }

}


class Rain extends Array<Drop> {
    p: p5;
    // is created from an Array of Drops
    constructor(
        p: p5, 
        drops: Array<Drop>
    ) {
        super(...drops);
        this.p = p;
    }

    draw = (p: p5) => {
        for (let i = 0; i < this.length; i++) {
            this[i].draw(p);
            this[i].top_y += this[i].speed;
            if (this[i].top_y >= p.height) {
                this[i].top_y = 0 - 2 * this[i].length * p.random();
                this[i].top_x = p.random() * p.width;
                this[i].length = Drop.setRandLength(p);
                this[i].thickness = Drop.setRandThickness(p);
                this[i].speed = Drop.setRandSpeed(p);
                this[i].wind = Drop.setRandWind(p);
                this[i].color = Drop.setRandColor(p);
            }
        }   
    }
}

function gauss(mean: number, std: number) {
    // box muller transform
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
    return mean + z0 * std;
}



// let background_color = [7, 5, 28]; //night
let background_color = [57, 65, 85]; //late evening
let drop_count = 100;

let drops: Array<Drop> = [];


var sketch = (p: p5) => {

    for (let i = 0; i < drop_count; i++) {
        drops.push(Drop.getRandDrop(p));
    }

    let rain = new Rain(
            p, 
            drops
        );


    p.setup = () => {
        console.log(rain)
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(background_color);
        //p.frameRate(30);
    }


    p.draw = () => {
        p.background(background_color);
        //bck_rain.draw(p);
        rain.draw(p);
        p.fill(95, 100, 115, 255);
        p.rect(p.width/2 - 500, p.height/2 - 300, 1000, 800);
    }
    }



new p5(sketch);
