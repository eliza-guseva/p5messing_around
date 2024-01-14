

function wobble1(p: p5, x: number, t: number) {
    return (
        t + 30* Math.sin(0.02 * x + 30 + t/100) 
        + 25 * Math.sin( 0.03 * x + 2 + t/130)
        - 3 * Math.sin( 0.04 * x  + 60 + t/80)
        + 2 * Math.sin( 0.03 * x + 31 + t/130)
        + 30 * p.noise(x/100, t/100 + p.frameCount/100 + 300) 
    )
}

function wobble2(p: p5, x: number, t: number) {
    return (
        t - 0.9 * Math.sin(0.09 * x + 30 + t/30) 
         + 0.7 * Math.cos( 0.085 * x + 9 + t/20)
         + 4 * Math.sin( 0.043 * x + 2 + t/80)
        - 3 * Math.sin( 0.04 * x  + 60 + t/80)
        + 2 * Math.sin( 0.03 * x + 31 + t/130)
        - 20 * Math.cos( 0.005 * x  + 48 + t/150)
        + 30 * Math.sin( 0.007 * x + 67 + t/130)
        - 9 * Math.sin( 0.015 * x + 56 + t/130)
        + 7 * Math.cos( 0.01 * x + 99 + t/10)
        + 50 * p.noise(x/100, t/100 + p.frameCount/100) 
    )
}



function genCurve(p: p5, wobbleFunction: (p: p5, x: number, t: number) => number, t: number = 0) {
    p.beginShape();
    let minY: number = p.windowHeight;
    for (let x = 0; x < p.windowWidth; x++) {
        let y = wobbleFunction(p, x, t);
        p.vertex(x, y);
        if (y < minY) {
            minY = y;
        }
    }
    p.vertex(p.windowWidth, p.windowHeight);
    p.vertex(0, p.windowHeight);
    p.endShape();
    return minY;
}


function moveAloungY(t: number) {
    return Math.sin(t / 100)
    + Math.cos(2 + t / 130)
}

function moveAlongYDerivative(t: number) {
    return Math.cos(t / 100) / 100
    - Math.sin(2 + t / 130) / 130
}


function wobbleAround(p: p5, t: number, where: number, amplitude: number) {
    return (
        p.windowHeight * where
        + p.windowHeight * amplitude * moveAloungY(t)
    );
}

function frameCount2Y(p: p5, t: number, how_far: number) {
    return (
        p.windowHeight * 0.8
        + how_far * p.windowHeight * moveAloungY(t)
    );
}


function genPoints(p: p5, xmax: number, ymax: number, n: number) {
    let points = [];
    for (let i = 0; i < n; i++) {
        let x = p.random(xmax);
        let y = p.random(ymax);
        points.push([x, y]);
    }
    return points;
}


var sketch = (p: p5) => {
    let sand = [214, 198, 158, 50]
    let nearWater = [0, 125, 158, 90]
    let furtherWater = [0, 130, 152, 90]
    let wetSand = [184, 178, 138, 100]
    // let nearWater = [200, 100, 100, 0.5]
    // let furtherWater = [200, 100, 100, 0.5]
    let points = genPoints(p, p.windowWidth, p.windowHeight, 3000);

    p.setup = () => {
        //p.colorMode(p.HSB)
        p.blendMode(p.MULTIPLY);
        p.createCanvas(p.windowWidth, p.windowHeight);
        // fill with color of a dry sand
        p.background(sand);
        //p.frameRate(10);
        p.strokeWeight(5.5);
        p.noStroke();
    };
  
    p.draw = () => {
        let derivative = moveAlongYDerivative(p.frameCount);
        // move points down
        for (let i = 0; i < points.length; i++) {
            p.fill(wetSand)
            p.circle(points[i][0], points[i][1], 2);
        }
        p.background(sand);
        p.fill(furtherWater);
        genCurve(p, wobble2, wobbleAround(p, p.frameCount + 30, 0.6, 0.05));
        p.fill(furtherWater);
        genCurve(p, wobble1, frameCount2Y(p, p.frameCount, 0.25));
    }
  };
  
  new p5(sketch);
  
  
  
  