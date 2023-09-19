

var sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(p.random(255));
    }
    p.rect(p.mouseX, p.mouseY, 150, 150);

  };
};

new p5(sketch);



