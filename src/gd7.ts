
var sketch = (p: p5) => {
    let img: p5.Image;
    function preload() {
        // preload image
        img = p.loadImage('public/bull_head.png');
    }


    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.image(img, 0, 0, p.width, p.height);
    };
  
    p.draw = () => {
    };
  };
  
  new p5(sketch);