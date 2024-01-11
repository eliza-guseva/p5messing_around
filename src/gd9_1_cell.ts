

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
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            if (cells[i][j] == 1) {
                p.fill(0);
                p.rect(i * w + 1, j * h + 1, w - 2, h - 2);
            }
            else {
                p.fill(255);
                p.rect(i * w + 1, j * h + 1, w - 2, h - 2);
    }}}}

function countNeighbors(cells: any[][], a_col: number, a_row: number) {
    let numN = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++){
            let col = (a_col + i + cells.length) % cells.length;
            let row = (a_row + j + cells[0].length) % cells[0].length;
            if (cells[col][row] == 1 && !(i == 0 && j == 0)) {
                numN += 1;
        }}}
    return numN;}

function updateCells(cells: any[][]) {
    // update the cells
    let new_cells = make2DArray(cells.length, cells[0].length);
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            let neighbors = countNeighbors(cells, i, j);
            if (i < 24 && i > 18 && j < 24 && j > 18) {
                console.log(i, j);
                console.log(neighbors);
            }
            if (cells[i][j] == 1) {
                if (neighbors < 2 || neighbors > 3) {
                    new_cells[i][j] = 0;}
                else {
                    new_cells[i][j] = 1;}}
            else {
                if (neighbors == 3) {
                    new_cells[i][j] = 1;}
                else {
                    new_cells[i][j] = 0;
    }}}}
    return new_cells
}


var sketch = (p: p5) => {
    let cells: any[][];
    let cols = 100;
    let rows = Math.floor(cols * p.windowHeight / p.windowWidth);

    p.setup = () => {
        p.frameRate(1)
        p.fill(0);
        p.noStroke();
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(200);
        cells = make2DArray(cols, rows);
        fillCell(cells, 20, 21);
        fillCell(cells, 19, 21);
        fillCell(cells, 20, 22);
        fillCell(cells, 21, 22);
        fillCell(cells, 20, 23);
        fillCell(cells, 19, 23 );
  
    };

    p.draw = () => {
        drawCells(p, cells);
        cells = updateCells(cells);

        if (p.frameCount > 1) {
            p.noLoop();
        }
    };

}

new p5(sketch);