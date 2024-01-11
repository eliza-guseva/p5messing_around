class Hexagon {
    constructor(xc, yc, radius, n_particles, speed = 0.1) {
        this.xc = xc;
        this.yc = yc;
        this.radius = radius;
        this.n_particles = n_particles;
        this.particles = this.getParticles();
        this.speed = speed;
    }
    getParticles() {
        let tempArray = [];
        for (let i = 0; i < this.n_particles; i++) {
            tempArray.push([this.xc, this.yc]);
        }
        return tempArray;
    }
    draw(p) {
        p.beginShape();
        for (let i = 0; i < 6; i++) {
            let angle = p.TWO_PI / 6 * i;
            let vx = this.xc + p.cos(angle) * this.radius;
            let vy = this.yc + p.sin(angle) * this.radius;
            p.vertex(vx, vy);
        }
        p.endShape(p.CLOSE);
    }
    screen2local(p, x, y) {
        let localY = this.yc - y;
        let localX = x - this.xc;
        let rad = p.sqrt(localX * localX + localY * localY);
        if (rad == 0) {
            return [0, 0];
        }
        if (localX > 0 && localY >= 0) {
            var phi = p.asin(localY / rad);
        }
        else if (localX < 0) {
            var phi = p.PI - p.asin(localY / rad);
        }
        else {
            var phi = 2 * p.PI + p.asin(localY / rad);
        }
        return [rad, phi];
    }
    local2screen(p, rad, phi) {
        let xl = rad * p.cos(phi);
        let yl = rad * p.sin(phi);
        return [xl + this.xc, yl - this.yc];
    }
    getLocalDirection(p, rad, phi) {
        if (rad <= 0.01) {
            return [0, 0];
        }
        else if (phi >= 0 && phi < p.PI / 3) {
            return [1, p.PI / 6];
        }
        else if (phi >= p.PI / 3 && phi < 2 * p.PI / 3) {
            return [1, p.PI / 2];
        }
        else if (phi >= 2 * p.PI / 3 && phi < p.PI) {
            return [1, 5 * p.PI / 6];
        }
        else if (phi >= p.PI && phi < 4 * p.PI / 3) {
            return [1, 7 * p.PI / 6];
        }
        else if (phi >= 4 * p.PI / 3 && phi < 5 * p.PI / 3) {
            return [1, 3 * p.PI / 2];
        }
        else if (phi >= 5 * p.PI / 3 && phi < 2 * p.PI) {
            return [1, 11 * p.PI / 6];
        }
        else {
            return [0, 0];
        }
    }
    getWind(p, x, y) {
        let [rad, phi] = this.screen2local(p, x, y);
        let [direction, angle] = this.getLocalDirection(p, rad, phi);
        let windR;
        let windPhi;
        if (direction == 0) {
            windR = this.speed * (p.random());
            let possiblePhis = [
                p.PI / 6,
                p.PI / 2,
                5 * p.PI / 6,
                7 * p.PI / 6,
                3 * p.PI / 2,
                11 * p.PI / 6
            ];
            windPhi = possiblePhis[Math.floor(p.random() * possiblePhis.length)];
        }
        else {
            windR = 0.1 * (p.noise(0.01 * rad, 0.01 * phi, 0));
            let PhiDelta = 2 * (p.noise(0.01 * rad, 0.01 * phi, 100 + p.frameCount * 0.01) * p.TWO_PI) * Math.sqrt(rad / Math.max(p.width, p.height));
            windPhi = angle + PhiDelta;
        }
        let windX = windR * p.cos(windPhi);
        let windY = -windR * p.sin(windPhi);
        return [windX, windY];
    }
}
function drawHexagon(p, xc, yc, radius) {
    p.beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = p.TWO_PI / 6 * i;
        let vx = xc + p.cos(angle) * radius;
        let vy = yc + p.sin(angle) * radius;
        p.vertex(vx, vy);
    }
    p.endShape(p.CLOSE);
}
var sketch = (p) => {
    let hexWidth;
    let hexHeight;
    let hexRadius;
    let allHexagons = [];
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0, 0, 255);
        p.colorMode(p.HSB);
        hexWidth = p.width / 7;
        hexHeight = hexWidth * p.sqrt(3) / 2;
        hexRadius = hexWidth / 2;
        let nPartPerHex = 30;
        let hexCenters = [];
        for (let x = hexWidth / 2; x < p.width; x += 1.5 * hexWidth) {
            for (let y = hexHeight / 2; y < p.height + hexHeight; y += hexHeight) {
                hexCenters.push([x, y]);
                hexCenters.push([x + hexWidth * 0.75, y + hexHeight / 2]);
            }
        }
        for (let hexCenter of hexCenters) {
            let x = hexCenter[0];
            let y = hexCenter[1];
            let hex = new Hexagon(x, y, hexRadius, nPartPerHex);
            allHexagons.push(hex);
            p.noFill();
            p.noStroke();
        }
    };
    p.draw = () => {
        p.background(200, 100, 10, 5);
        for (let hex of allHexagons) {
            let xc = hex.xc;
            let yc = hex.yc;
            let color = p.map(p.noise(xc, yc, p.frameCount / 100), 0, 1, 1, 460);
            for (let i = 0; i < hex.n_particles; i++) {
                let xp = hex.particles[i][0];
                let yp = hex.particles[i][1];
                let [windX, windY] = hex.getWind(p, xp, yp);
                p.fill(color, 100, 100, 100);
                drawHexagon(p, xp, yp, 20);
                xp += windX * hexRadius;
                yp += windY * hexRadius;
                hex.particles[i][0] = xp;
                hex.particles[i][1] = yp;
            }
        }
    };
};
new p5(sketch);
//# sourceMappingURL=hex_grid.js.map