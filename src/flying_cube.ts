

function getRandInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupInitSquare(p: p5): Array<number> {
    let size: number = 50;
    let initX: number = getRandInt(size / 2, p.windowWidth - size / 2);
    let initY: number = getRandInt(size / 2, p.windowHeight - size / 2);
    let initSpeedX: number;
    let initSpeedY: number;
    if (initX < p.windowWidth / 2) {
        initSpeedX = getRandInt(1, 5);
    }
    else {
        initSpeedX = getRandInt(-5, -1);
    }
    if (initY < p.windowHeight / 2) {
        initSpeedY = getRandInt(1, 5);
    }
    else {
        initSpeedY = getRandInt(-5, -1);
    }
    return [size, initX, initY, initSpeedX, initSpeedY];
}


var sketch = (p: p5) => {
    let [size, initX, initY, initSpeedX, initSpeedY] = setupInitSquare(p);
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    
    p.draw = () => {
        if (initX <= 0 || initX >= p.windowWidth - size ) {
            initSpeedX *= -1;
        }
        if (initY <= 0 || initY >= p.windowHeight - size) {
            initSpeedY *= -1;
        }
        p.background(0);
        p.fill(255);
        p.rect(initX, initY, size);
        initX += initSpeedX;
        initY += initSpeedY;
    };
}

new p5(sketch);

