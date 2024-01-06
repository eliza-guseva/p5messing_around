
function drawInitImage(p, img) {
    p.background(0);
    destX = 0;
    destY = 0;
    destW = p.width;
    destH = p.height;
    srcX = 0;
    srcY = 0;
    p.image(img, destX, destY, destW, destH, srcX, srcY, img.width, img.height);
}

var sketch = (p) => {
    let img;
    let colCount = 200;
    let rowCount = 200;
    let amp = 14;
    p.preload = () =>
        img = p.loadImage('public/munch.jpg'
        );

    p.setup = () => {
        p.createCanvas(p.windowHeight * img.width / img.height, p.windowHeight);
        p.background(0);
        drawInitImage(p, img);
    };
    p.draw = () => {
        //p.background(0);
        for (let i=0; i<colCount; i++){
            for (let j=0; j<rowCount; j++){
                let nx = p.noise(
                    i * 0.1, 
                    j * 0.1, 
                    p.frameCount * 0.02 + 500
                ) * 2 - 1;
                let ny = p.noise(
                    i * 0.1, 
                    j * 0.1, 
                    p.frameCount * 0.02
                    ) * 2 - 1;
                destW = p.width / colCount;
                destH = p.height / rowCount;
                destX = i * destW;
                destY = j * destH;
                srcW = img.width / colCount;
                srcH = img.height / rowCount;
                srcX = i * srcW + nx * Math.min(20, amp * p.frameCount * 0.01);
                srcY = j * srcH + ny * Math.min(20, amp * p.frameCount * 0.01);
                //srcX = i * srcW + 30 * p.noise(p.frameCount * 0.01);
                //srcY = j * srcH + 30 * p.noise(p.frameCount * 0.01);
                // srcX = i * srcW + 10 * p.sin(p.frameCount * 0.01);
                // srcY = j * srcH + 10 * p.cos(p.frameCount * 0.01);
                // srcX = i * srcW + 10 * p.random() * p.sin(p.frameCount * 0.01);
                // srcY = j * srcH + 10 * p.random() * p.cos(p.frameCount * 0.01);
                p.image(img, 
                    destX, destY, destW, destH, 
                    srcX, srcY, srcW, srcH);
            };
        };
    };
};
new p5(sketch);
//# sourceMappingURL=gd7.js.map