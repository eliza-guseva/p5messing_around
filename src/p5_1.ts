
const body = document.querySelector('body')

var sketch = (p: p5) => {
  const x: number = p.windowWidth / 2;
  const y: number = p.windowHeight / 2;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

new p5(sketch);



