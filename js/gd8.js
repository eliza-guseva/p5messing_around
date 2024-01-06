var sketch = (p) => {
    let particles = [];
    let particleNum = 1000;
    p.setup = () => {
        p.createCanvas(p.windowHeight, p.windowHeight);
        p.background(0);
        for (let i = 0; i < particleNum; i++) {
            let x = p.random() * p.width;
            let y = p.random() * p.height;
            particles.push([x, y]);
        }
    };
    p.draw = () => {
        for (let i = 0; i < particles.length; i++) {
            let x = particles[i][0];
            let y = particles[i][1];
            p.circle(x, y, 3);
            let windX = p.noise(x * 0.005, y * 0.005, 0) * 2 - 1;
            let windY = p.noise(x * 0.005, y * 0.005, 1000) * 2 - 1;
            p.line(x, y, x - 20 * windX, y - 20 * windY);
            particles[i][0] += windX % p.width;
            particles[i][1] += windY % p.height;
            if (particles[i][0] < 0)
                particles[i][0] += p.width;
            if (particles[i][1] < 0)
                particles[i][1] += p.height;
            if (p.random() < 0.5 && Math.abs(windX) < 0.01 && Math.abs(windY) < 0.01) {
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
        }
    };
};
new p5(sketch);
//# sourceMappingURL=gd8.js.map