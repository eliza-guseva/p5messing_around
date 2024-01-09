function sizeCanvas(img, p) {
    let imgRatio = img.width / img.height;
    let canvasRatio = p.width / p.height;
    if (imgRatio > canvasRatio) {
        p.resizeCanvas(p.width, p.width / imgRatio);
    }
    else {
        p.resizeCanvas(p.height * imgRatio, p.height);
    }
}
;
function respawnParticle(p, img, memo) {
    let x = p.random() * p.width;
    let y = p.random() * p.height;
    let to_draw;
    if (memo.has([x, y])) {
        to_draw = memo.get([x, y]);
    }
    else {
        let colors = img.get(x, y);
        if (colors[0] < 10 && colors[1] < 10 && colors[2] < 10) {
            memo.set([x, y], true);
            to_draw = true;
        }
        else {
            memo.set([x, y], false);
            to_draw = false;
        }
    }
    if (to_draw) {
        return [x, y];
    }
    else {
        return respawnParticle(p, img, memo);
    }
}
var sketch = (p) => {
    let img;
    p.preload = () => img = p.loadImage('public/bare_tree2.jpg');
    let particleNum = 800;
    let particles = [];
    let memo = new Map();
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        sizeCanvas(img, p);
        for (let i = 0; i < particleNum; i++) {
            let x = -999;
            let y = -999;
            particles.push([x, y]);
        }
        p.background(255);
        p.image(img, 0, 0);
        p.colorMode(p.HSB);
        p.noStroke();
    };
    p.draw = () => {
        p.background(100, 0.01);
        for (let i = 0; i < particles.length; i++) {
            let x = particles[i][0];
            let y = particles[i][1];
            let noise = p.noise(y * 0.01);
            let color = p.map(noise, 0, 1, 0, 180);
            p.fill(0, 1);
            p.circle(x, y, 5);
            p.fill(color, 100, 100, 0.1);
            p.circle(x, y, 3);
            p.fill(color, 100, 100, 0.5);
            p.circle(x, y, 1);
            let windX = p.noise(x * 0.1, y * 0.1, 1000 + 0.01 * p.cos(p.frameCount)) * 2 - 1.0 - 0.2 * (x > p.width / 2 ? -1 : 1);
            let windY = p.noise(x * 0.001, y * 0.001, 0.01 * p.sin(p.frameCount)) * 2 - 1.7;
            particles[i][0] += windX;
            particles[i][1] += windY;
            if (particles[i][0] < 0
                || particles[i][0] > p.width
                || particles[i][1] < 0
                || particles[i][1] > p.height
                || p.random() < 0.3) {
                [particles[i][0], particles[i][1]] = respawnParticle(p, img, memo);
            }
        }
        ;
    };
};
new p5(sketch);
//# sourceMappingURL=gd8_yo.js.map