

function distributeOnBorders(p: p5, particles: [number, number][], i: number) {
    if (p.random() < 0.25) {
        particles[i][0] = 0;
        particles[i][1] = p.random() * p.height;
    }
    else if (p.random() < 0.5) {
        particles[i][0] = p.random() * p.width;
        particles[i][1] = 0;
    }
    else if (p.random() < 0.75) {
        particles[i][0] = p.width;
        particles[i][1] = p.random() * p.height;
    }
    else {
        particles[i][0] = p.random() * p.width;
        particles[i][1] = p.height;}
    }

function distributeOnLowerBorder(p: p5, particles: [number, number][], i: number) {
    particles[i][0] = p.random() * p.width;
    particles[i][1] = p.height + 5;
}


var sketch = (p: p5) => {
    let particles: [number, number][] = [];
    let prev_positions: [number, number][] = [];
    let particleNum = 1000;
    let hues: number[] = [];
    p.colorMode(p.HSB)
    p.setup = () => { 
        p.createCanvas(400, 400);
        p.background(0, 0.05);
        for (let i=0; i<particleNum; i++){
            let x = p.random() * (p.width+10)-5;
            let y = p.random() * (p.height+10)-5;
            particles.push([x, y]);
            let windX = p.noise(
                x * 0.005, y * 0.005, 0
                ) * 2 - 1;
            let windY = p.noise(
                x * 0.005, y * 0.005,  1000
                ) * 2 - 1;

            //distributeOnBorders(p, particles, i);
        }
        for (let i=0; i<particleNum; i++){
            let x = particles[i][0];
            let y = particles[i][1];
            prev_positions.push([x, y]);
        }


        

    };

    p.draw  = () => {
        p.background(0, 0.05);
        for (let i=0; i<particles.length; i++){
            let x = particles[i][0];
            let y = particles[i][1];
            let windX = p.noise(
                x * 0.02, y * 0.02, 0
                ) * 2 -1;
            let windY = p.noise(
                x * 0.02, y * 0.02,  1000
                ) * 2 - 2;
            //bright circle
            let bright_hue = p.map(windX, -1, 1, 0, 50);
            p.fill(bright_hue, 100, 100);
            p.strokeWeight(1);
            p.stroke(bright_hue, 100, 100);
            p.circle(x, y, 5);

            particles[i][0] += windX;
            particles[i][1] += windY;
            if (particles[i][0] < -7) particles[i][0] += p.width + 6;
            if (particles[i][1] < -7) particles[i][1] += p.height  + 6;
            if (particles[i][0] > p.width+7) particles[i][0] -= p.width + 6;
            if (particles[i][1] > p.height+7) particles[i][1] -= p.height + 6;

            if (p.random() < 0.1 && Math.abs(windX) < 0.01 && Math.abs(windY) < 0.01) {
                distributeOnLowerBorder(p, particles, i);
            }
            else if (Math.abs(windX) < 0.01 || Math.abs(windY) < 0.01){
                particles[i][0] += p.random() * 3 - 1.5;
                particles[i][1] += p.random() * 3 - 1.5;
            };
            prev_positions[i][0] = x;
            prev_positions[i][1] = y;
        };
        };
        // if (p.frameCount > 500 && p.frameCount < 1000) {
        //     p.save(`frame_${p.frameCount}.png`);
        // }
        
        
    };

new p5(sketch);