function distributeOnBorders(p, particles, i) {
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
        particles[i][1] = p.height;
    }
}
var sketch = (p) => {
    let particles = [];
    let prev_positions = [];
    let particleNum = 1000;
    p.setup = () => {
        p.createCanvas(400, 400);
        let bck_color = p.color(10, 0, 30);
        p.background(bck_color);
        for (let i = 0; i < particleNum; i++) {
            let x = p.random() * (p.width + 10) - 5;
            let y = p.random() * (p.height + 10) - 5;
            particles.push([x, y]);
        }
        for (let i = 0; i < particleNum; i++) {
            let x = particles[i][0];
            let y = particles[i][1];
            prev_positions.push([x, y]);
        }
    };
    p.draw = () => {
        p.background(5, 0, 15, 5);
        for (let i = 0; i < particles.length; i++) {
            let x = particles[i][0];
            let y = particles[i][1];
            p.fill(255, 255, 180, 3);
            p.strokeWeight(1);
            p.stroke(150, 150, 110, 1);
            p.circle(x, y, 4);
            p.fill(255, 255, 180, 250);
            p.strokeWeight(1);
            p.stroke(250, 250, 180, 250);
            p.circle(particles[i][0], particles[i][1], 1);
            p.circle(prev_positions[i][0], prev_positions[i][1], 1);
            let windX = p.noise(x * 0.005, y * 0.005, 0) * 2 - 1;
            let windY = p.noise(x * 0.005, y * 0.005, 1000) * 2 - 1;
            particles[i][0] += windX;
            particles[i][1] += windY;
            if (particles[i][0] < -3)
                particles[i][0] += p.width + 3;
            if (particles[i][1] < -3)
                particles[i][1] += p.height + 3;
            if (particles[i][0] > p.width + 3)
                particles[i][0] -= p.width + 3;
            if (particles[i][1] > p.height + 3)
                particles[i][1] -= p.height + 3;
            if (p.random() < 0.1 && Math.abs(windX) < 0.01 && Math.abs(windY) < 0.01) {
                p.strokeWeight(1);
                p.stroke(0, 0, 5, 250);
                p.fill(0, 0, 5, 250);
                p.circle(x, y, 3);
                distributeOnBorders(p, particles, i);
            }
            ;
            prev_positions[i][0] = x;
            prev_positions[i][1] = y;
        }
        ;
    };
};
new p5(sketch);
//# sourceMappingURL=gd8.js.map