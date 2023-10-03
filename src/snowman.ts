

function drawSnowman(p: p5, r0: number, r1: number, r2: number, fatness: number = 1): void  {
    p.noStroke();
    p.fill(205);
    let c1 = p.windowHeight - r0 / 2;
    let c2 = c1 - r0 / 2 - r1 / 2 + r1 / 10;
    let c3 = c2 - r1 / 2 - r2 / 2 + r2 / 10;
    let eyes_hight = c3 - r2 / 10;
    p.ellipse(p.windowWidth / 2, c1, r0 * fatness, r0);
    p.ellipse(p.windowWidth / 2, c2, r1 * fatness, r1);
    p.ellipse(p.windowWidth / 2, c3, r2 * fatness, r2);
    p.fill(0);
    p.ellipse(p.windowWidth / 2 - r2 / 5 * fatness , eyes_hight, 20);
    p.ellipse(p.windowWidth / 2 + r2 / 5 * fatness , eyes_hight, 20);
}

function genGround(p: p5): Array<Snowflake> {
    let groundSnowFlakes: Array<Snowflake> = [];
    for (let i = 0; i < 1000; i++) {
        groundSnowFlakes.push(gen1Snowflake(p, p.windowHeight - p.random(10)));
    }
    return groundSnowFlakes;
}


class Snowflake {
    p: p5;
    x: number;
    y: number;
    size: number;
    depth: number;
    shade: number;
    base_speed: number = 4;
    speed_bias: number = 0;
    constructor(p: p5, x: number, y: number, size: number, depth: number) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.size = size / p.sqrt(depth);
        this.shade = 255 / p.sqrt(depth -1);
        this.speed_bias = 0.5 * p.random(-1, 1);
    }
    update(t: number, wind: number = 0) {
        this.y = (this.y + this.base_speed + this.speed_bias);
        this.x = (this.x + this.base_speed * wind);
        this.draw();
    }
    draw() {
        this.p.fill(this.shade);
        this.p.ellipse(this.x, this.y, this.size);
    }
}

function gen1Snowflake(
    p: p5, 
    y: number = NaN, 
    size: number=NaN,
    extraDepth: number = 0
    ): Snowflake {
    let x = p.random(-100, p.windowWidth + 100);
    if (isNaN(y)) y = p.random(p.windowHeight);
    if (isNaN(size)) size = 10;
    let depth = 1 + 2 * p.random(1) + extraDepth;
    return new Snowflake(p, x, y, size, depth);
}

var sketch = (p: p5) => {
    let fr = 30;
    let deepSnoflakes: Array<Snowflake> = [];
        // generate randomly distributed snowflakes
        for (let i = 0; i < 800; i++) {
            deepSnoflakes.push(gen1Snowflake(p, NaN, NaN, 5));
        }
    let backSnoflakes: Array<Snowflake> = [];
        // generate randomly distributed snowflakes
        for (let i = 0; i < 400; i++) {
            backSnoflakes.push(gen1Snowflake(p, NaN, NaN, 3));
        }
    let frontSnoflakes: Array<Snowflake> = [];
        // generate randomly distributed snowflakes
        for (let i = 0; i < 250; i++) {
            frontSnoflakes.push(gen1Snowflake(p));
        }

    let groundSnowFlakes: Array<Snowflake> = genGround(p);


    p.setup = () => {
        let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(fr);  
    };
    p.draw = () => {
        p.background(10, 10, 30);
        let t = p.frameCount / fr;
        let num = 10 * p.sin(t);
        let fatness = 1.1 - p.sin(t) / 10;
        p.fill(255);
        let wind = 0.2 * p.sin(t / 10);

        // mean y of groundSnowlakes
        let meanY = groundSnowFlakes.reduce((acc, snowflake) => acc + snowflake.y, 0) / groundSnowFlakes.length;
        
        // draw every snowflake in array snowflakes
        for (let i = 0; i < deepSnoflakes.length; i++) {
            deepSnoflakes[i].update(t, 0.1 * p.cos(t / 10) + p.random(-0.01, 0.01));
            if (deepSnoflakes[i].y > p.windowHeight) {
                deepSnoflakes[i] = gen1Snowflake(p, 0, NaN, 5);
            }
        }

        for (let i = 0; i < backSnoflakes.length; i++) {
            backSnoflakes[i].update(t, wind);
            if (backSnoflakes[i].y > meanY) {
                // groundSnowFlakes.push(backSnoflakes[i]);
                backSnoflakes[i] = gen1Snowflake(p, 0, NaN, 2);
            }
        }
        drawSnowman(p, 400 + num, 200 + num, 150 + num, fatness);
        for (let i = 0; i < frontSnoflakes.length; i++) {
            frontSnoflakes[i].update(t, wind);
            if (frontSnoflakes[i].y >= meanY) {
                groundSnowFlakes.push(frontSnoflakes[i]);
                frontSnoflakes[i] = gen1Snowflake(p, p.random(0,3));
            }
        }
        for (let i = 0; i < groundSnowFlakes.length; i++) {
            groundSnowFlakes[i].draw();
        }
        console.log(groundSnowFlakes.length, meanY);
        
    }
}

new p5(sketch);

