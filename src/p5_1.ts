

var sketch = (p: p5) => {
  const x: number = p.windowWidth / 2;
  const y: number = p.windowHeight / 2;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(p.random(255));
    }
    p.rect(p.mouseX, p.mouseY, 50, 50);

  };
};

new p5(sketch);



