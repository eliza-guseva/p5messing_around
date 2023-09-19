
const body = document.querySelector('body')

class PolygonHelper {
  public static draw(x: number, y: number, npoints: number, radius: number) {
    let angle: number = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx: number = x + cos(a) * radius;
      let sy: number = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}


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
      p.fill(255);
    }
    p.rect(p.mouseX, p.mouseY, 50, 50);

  };
};

new p5(sketch);



