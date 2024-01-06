function drawInitImage(p, img) {
    p.background(0);
    let destX = 0;
    let destY = 0;
    let destW = p.width;
    let destH = p.height;
    let srcX = 0;
    let srcY = 0;
    p.image(img, destX, destY, destW, destH, srcX, srcY, img.width, img.height);
}
var sketch = (p) => {
    let img;
    let colCount = 200;
    let rowCount = 200;
    let amp = 14;
    p.preload = () => img = p.loadImage('public/munch.jpg');
    p.setup = () => {
        p.createCanvas(p.windowHeight * img.width / img.height, p.windowHeight);
        p.background(0);
        drawInitImage(p, img);
    };
    p.draw = () => {
        for (let i = 0; i < colCount; i++) {
            for (let j = 0; j < rowCount; j++) {
                let nx = p.noise(i * 0.1, j * 0.1, p.frameCount * 0.02 + 500) * 2 - 1;
                let ny = p.noise(i * 0.1, j * 0.1, p.frameCount * 0.02) * 2 - 1;
                let destW = p.width / colCount;
                let destH = p.height / rowCount;
                let destX = i * destW;
                let destY = j * destH;
                let srcW = img.width / colCount;
                let srcH = img.height / rowCount;
                let srcX = i * srcW + nx * Math.min(20, amp * p.frameCount * 0.01);
                let srcY = j * srcH + ny * Math.min(20, amp * p.frameCount * 0.01);
                p.image(img, destX, destY, destW, destH, srcX, srcY, srcW, srcH);
            }
            ;
        }
        ;
    };
};
new p5(sketch);
//# sourceMappingURL=gd7.js.map