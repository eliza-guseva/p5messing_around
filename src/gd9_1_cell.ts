

function make2DArray(cols: number, rows: number) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;

}

function fillCell(cells: any[][], a_col: number, a_row: number) {
    // draw a square for a given cell
    cells[a_col][a_row] = 1;
}

function flipCell(cells: any[][], a_col: number, a_row: number) {
    // draw a square for a given cell
    cells[a_col][a_row] = 1 - cells[a_col][a_row];
}

function drawCells(p: p5, cells: any[][]) {
    // draw all the cells
    let w = p.width / cells.length;
    let h = p.height / cells[0].length;
    p.noStroke();
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            if (cells[i][j] === 1) {
                let hue = p.map(
                    p.noise(i * 0.1, j * 0.1, p.frameCount * 0.01), 
                    0, 1, 180, 360);
                p.fill(hue, 100, 100, 1);
                p.circle(i * w, j * h, 2 * w);
            }
            else if (cells[i][j] > 0.1) {
                let hue = 0;
                let noise = p.noise(i * 0.1, j * 0.1, p.frameCount * 0.01)
                hue = p.map(cells[i][j] * noise, 0.0, 1, 90, 360);
                let saturation = 100
                let brightness = 100 * cells[i][j]
                p.fill(hue, saturation, brightness, 1);
                p.circle(i * w, j * h, 2 * w*cells[i][j]);
            }
            else {
                p.fill(0, 0, 0, 1);
                p.circle(i * w, j * h, w);
            }

    }}}

function countNeighbors(cells: any[][], a_col: number, a_row: number) {
    let numN = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++){
            let col = (a_col + i + cells.length) % cells.length;
            let row = (a_row + j + cells[0].length) % cells[0].length;
            if (cells[col][row] === 1 && !(i === 0 && j === 0)) {
                numN += 1;
        }}}
    return numN;}

function updateCells(p: p5, cells: any[][]) {
    // update the cells
    let new_cells = make2DArray(cells.length, cells[0].length);
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            let neighbors = countNeighbors(cells, i, j);
            if (cells[i][j] == 1) {
                if (neighbors === 2 || neighbors === 3) {
                    new_cells[i][j] = 1;}
                else {
                    new_cells[i][j] = 0.9;
                }}
            else {
                if (neighbors == 3) {
                    new_cells[i][j] = 1;}
                else {
                    new_cells[i][j] = cells[i][j] * 0.9;
            
            }}
            if (p.random() < 0.01) {
                new_cells[i][j] = 1;
            }
    
}}
    return new_cells
}


var sketch = (p: p5) => {
    let cells: any[][];
    let cols = 50;
    let rows = Math.floor(cols * p.windowHeight / p.windowWidth);

    p.setup = () => {
        p.colorMode(p.HSB)
        p.frameRate(30)
        p.fill(0);
        p.noStroke();
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(200);
        cells = make2DArray(cols, rows);
        fillCell(cells, 20, 22);
        fillCell(cells, 19, 22);
        fillCell(cells, 20, 23);
        fillCell(cells, 21, 23);
        fillCell(cells, 20, 24);
        fillCell(cells, 19, 24);
  
    };

    p.draw = () => {
        p.blendMode(p.BLEND);
        p.background(0, 0.3);
        p.blendMode(p.SCREEN);
        drawCells(p, cells);
        cells = updateCells(p, cells);

        // if (p.frameCount > 1) {
        //     p.noLoop();
        // }
    };

}

new p5(sketch);