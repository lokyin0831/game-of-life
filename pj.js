const unitLength = 20;
const boxColor = 150;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let slider;
let isGameContinue = true
let defaultNeighborsOfReproduction = 3
let defaultNeighborsOfLifeless = 2
let fr = 1
let noColor = true
let isRandomInitialState = false

function setup() {
    slider = createSlider(1, 50, 10);
    slider.style('width', `300px`);

    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 220);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}

/**
* Initialize/reset the board state
*/
function init() {
    if (!isRandomInitialState) {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                currentBoard[i][j] = 0;
                nextBoard[i][j] = 0;
            }
        }
    } else {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                currentBoard[i][j] = Math.floor(Math.random() * 2);
                nextBoard[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }
}

function draw() {
    fr = slider.value()
    frameRate(fr)
    document.querySelector('.fps')
        .innerHTML = (`fps: ${fr}`)

    background(200);


    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1 && nextBoard[i][j] == 1) {
                fill(80);
            } else if (currentBoard[i][j] == 1 && noColor) {
                fill(boxColor);
            } else if (currentBoard[i][j] == 1 && !noColor) {
                fill(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
            } else {
                fill(200);  //can change background boxes color here original:255
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

function generate() {
    if (isGameContinue) {
        //Loop over every single box on the board
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                // Count all living members in the Moore neighborhood(8 boxes surrounding)
                let neighbors = 0;
                for (let i of [-1, 0, 1]) {
                    for (let j of [-1, 0, 1]) {
                        if (i == 0 && j == 0) {
                            // the cell itself is not its own neighbor
                            continue;
                        }
                        // The modulo operator is crucial for wrapping on the edge
                        neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                    }
                }

                // Rules of Life
                if (currentBoard[x][y] == 1 && neighbors < defaultNeighborsOfLifeless) {
                    // Die of Loneliness
                    nextBoard[x][y] = 0;
                } else if (currentBoard[x][y] == 1 && neighbors > 3) {
                    // Die of Overpopulation
                    nextBoard[x][y] = 0;
                } else if (currentBoard[x][y] == 0 && neighbors == defaultNeighborsOfReproduction) {
                    // New life due to Reproduction
                    nextBoard[x][y] = 1;
                } else {
                    // Stasis
                    nextBoard[x][y] = currentBoard[x][y];
                }
            }
        }

        // Swap the nextBoard to be the current Board
        [currentBoard, nextBoard] = [nextBoard, currentBoard];
    }

}

/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    noLoop()
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}

document.querySelector('.reset-game')
    .addEventListener('click', function () {
        init();
        defaultNeighborsOfReproduction = 3
        document.querySelector('.reproductionNeighbors')
            .innerHTML = (`If a box has no life and it has ${defaultNeighborsOfReproduction} neighbors, the box in next generation fills with life because of reproduction.`)
        defaultNeighborsOfLifeless = 2
        document.querySelector('.showLonelinessSentence')
            .innerHTML = (`If a box has life and it has less than ${defaultNeighborsOfLifeless} neighbors. It dies of loneliness. The box becomes lifeless next generation.`)
    });

// stop or play switch
document.querySelector('.stop')
    .addEventListener('click', function () {
        if (isGameContinue) {
            isGameContinue = false
        }
    });

document.querySelector('.play')
    .addEventListener('click', function () {
        isGameContinue = true
    });

// random color
document.querySelector('.color')
    .addEventListener('click', function () {
        if (noColor) {
            noColor = false;
        } else {
            noColor = true;
        }
    });

// random initial state
document.querySelector('.random-initial-states')
    .addEventListener('click', function () {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                currentBoard[i][j] = Math.floor(Math.random() * 2);
                nextBoard[i][j] = Math.floor(Math.random() * 2);
            }
        }
    });

// make a glider
document.querySelector('.glider')
    .addEventListener('click', function () {
        let x = Math.floor(Math.random() * 64) + 1;
        let y = Math.floor(Math.random() * 34) + 1;
        currentBoard[x][y] = 1;
        currentBoard[x][y + 1] = 1;
        currentBoard[x][y + 2] = 1;
        currentBoard[x - 1][y + 2] = 1;
        currentBoard[x - 2][y + 1] = 1;
    });

// make a Gosper glider gun
document.querySelector('.gosper-glider-gun')
    .addEventListener('click', function () {

        currentBoard[1][5] = 1;
        currentBoard[2][5] = 1;
        currentBoard[1][6] = 1;
        currentBoard[2][6] = 1;
        currentBoard[11][5] = 1;
        currentBoard[11][6] = 1;
        currentBoard[11][7] = 1;
        currentBoard[12][4] = 1;
        currentBoard[12][8] = 1;
        currentBoard[13][3] = 1;
        currentBoard[13][9] = 1;
        currentBoard[14][3] = 1;
        currentBoard[14][9] = 1;
        currentBoard[15][6] = 1;
        currentBoard[16][4] = 1;
        currentBoard[16][8] = 1;
        currentBoard[17][5] = 1;
        currentBoard[17][6] = 1;
        currentBoard[17][7] = 1;
        currentBoard[18][6] = 1;
        currentBoard[21][3] = 1;
        currentBoard[21][4] = 1;
        currentBoard[21][5] = 1;
        currentBoard[22][3] = 1;
        currentBoard[22][4] = 1;
        currentBoard[22][5] = 1;
        currentBoard[23][2] = 1;
        currentBoard[23][6] = 1;
        currentBoard[25][1] = 1;
        currentBoard[25][2] = 1;
        currentBoard[25][6] = 1;
        currentBoard[25][7] = 1;
        currentBoard[35][3] = 1;
        currentBoard[35][4] = 1;
        currentBoard[36][3] = 1;
        currentBoard[36][4] = 1;

    });

// make a Lightweight spaceship
document.querySelector('.lightweight-spaceship')
    .addEventListener('click', function () {
        y = 5
        currentBoard[0][4 + y] = 1;
        currentBoard[0][5 + y] = 1;
        currentBoard[0][6 + y] = 1;
        currentBoard[0][12 + y] = 1;
        currentBoard[0][13 + y] = 1;
        currentBoard[0][14 + y] = 1;
        currentBoard[1][4 + y] = 1;
        currentBoard[1][7 + y] = 1;
        currentBoard[1][11 + y] = 1;
        currentBoard[1][14 + y] = 1;
        currentBoard[2][4 + y] = 1;
        currentBoard[2][14 + y] = 1;
        currentBoard[3][4 + y] = 1;
        currentBoard[3][14 + y] = 1;
        currentBoard[4][5 + y] = 1;
        currentBoard[4][7 + y] = 1;
        currentBoard[4][11 + y] = 1;
        currentBoard[4][13 + y] = 1;
        currentBoard[6][8 + y] = 1;
        currentBoard[6][9 + y] = 1;
        currentBoard[6][10 + y] = 1;
        currentBoard[7][7 + y] = 1;
        currentBoard[7][11 + y] = 1;
        currentBoard[8][7 + y] = 1;
        currentBoard[8][11 + y] = 1;
        currentBoard[9][8 + y] = 1;
        currentBoard[9][10 + y] = 1;
        currentBoard[10][5 + y] = 1;
        currentBoard[10][6 + y] = 1;
        currentBoard[10][12 + y] = 1;
        currentBoard[10][13 + y] = 1;
        currentBoard[11][5 + y] = 1;
        currentBoard[11][6 + y] = 1;
        currentBoard[11][7 + y] = 1;
        currentBoard[11][8 + y] = 1;
        currentBoard[11][9 + y] = 1;
        currentBoard[11][10 + y] = 1;
        currentBoard[11][11 + y] = 1;
        currentBoard[11][12 + y] = 1;
        currentBoard[11][13 + y] = 1;
        currentBoard[12][4 + y] = 1;
        currentBoard[12][8 + y] = 1;
        currentBoard[12][9 + y] = 1;
        currentBoard[12][10 + y] = 1;
        currentBoard[12][14 + y] = 1;
        currentBoard[13][2 + y] = 1;
        currentBoard[13][3 + y] = 1;
        currentBoard[13][5 + y] = 1;
        currentBoard[13][6 + y] = 1;
        currentBoard[13][12 + y] = 1;
        currentBoard[13][13 + y] = 1;
        currentBoard[13][15 + y] = 1;
        currentBoard[13][16 + y] = 1;
        currentBoard[14][5 + y] = 1;
        currentBoard[14][13 + y] = 1;
        currentBoard[15][6 + y] = 1;
        currentBoard[15][7 + y] = 1;
        currentBoard[15][11 + y] = 1;
        currentBoard[15][12 + y] = 1;
        currentBoard[16][2 + y] = 1;
        currentBoard[16][4 + y] = 1;
        currentBoard[16][5 + y] = 1;
        currentBoard[16][7 + y] = 1;
        currentBoard[16][11 + y] = 1;
        currentBoard[16][13 + y] = 1;
        currentBoard[16][14 + y] = 1;
        currentBoard[16][16 + y] = 1;
        currentBoard[17][6 + y] = 1;
        currentBoard[17][7 + y] = 1;
        currentBoard[17][11 + y] = 1;
        currentBoard[17][12 + y] = 1;
        currentBoard[18][1 + y] = 1;
        currentBoard[18][2 + y] = 1;
        currentBoard[18][4 + y] = 1;
        currentBoard[18][5 + y] = 1;
        currentBoard[18][13 + y] = 1;
        currentBoard[18][14 + y] = 1;
        currentBoard[18][16 + y] = 1;
        currentBoard[18][17 + y] = 1;
        currentBoard[19][1 + y] = 1;
        currentBoard[19][2 + y] = 1;
        currentBoard[19][4 + y] = 1;
        currentBoard[19][14 + y] = 1;
        currentBoard[19][16 + y] = 1;
        currentBoard[19][17 + y] = 1;
        currentBoard[20][1 + y] = 1;
        currentBoard[20][5 + y] = 1;
        currentBoard[20][6 + y] = 1;
        currentBoard[20][7 + y] = 1;
        currentBoard[20][11 + y] = 1;
        currentBoard[20][12 + y] = 1;
        currentBoard[20][13 + y] = 1;
        currentBoard[20][17 + y] = 1;
        currentBoard[21][0 + y] = 1;
        currentBoard[21][1 + y] = 1;
        currentBoard[21][5 + y] = 1;
        currentBoard[21][6 + y] = 1;
        currentBoard[21][12 + y] = 1;
        currentBoard[21][13 + y] = 1;
        currentBoard[21][17 + y] = 1;
        currentBoard[21][18 + y] = 1;
        currentBoard[22][5 + y] = 1;
        currentBoard[22][6 + y] = 1;
        currentBoard[22][7 + y] = 1;
        currentBoard[22][11 + y] = 1;
        currentBoard[22][12 + y] = 1;
        currentBoard[22][13 + y] = 1;
        currentBoard[23][5 + y] = 1;
        currentBoard[23][6 + y] = 1;
        currentBoard[23][7 + y] = 1;
        currentBoard[23][11 + y] = 1;
        currentBoard[23][12 + y] = 1;
        currentBoard[23][13 + y] = 1;
        currentBoard[24][5 + y] = 1;
        currentBoard[24][6 + y] = 1;
        currentBoard[24][12 + y] = 1;
        currentBoard[24][13 + y] = 1;
    });


// change rules for reproductionNeighbors
document.querySelector('.reproductionNeighbors')
    .innerHTML = (`If a box has no life and it has ${defaultNeighborsOfReproduction} neighbors, the box in next generation fills with life because of reproduction.`)

document.querySelector('.addReproductionNeighbors')
    .addEventListener('click', function () {
        defaultNeighborsOfReproduction = defaultNeighborsOfReproduction + 1
        document.querySelector('.reproductionNeighbors')
            .innerHTML = (`If a box has no life and it has ${defaultNeighborsOfReproduction} neighbors, the box in next generation fills with life because of reproduction.`)
    });

document.querySelector('.removeReproductionNeighbors')
    .addEventListener('click', function () {
        defaultNeighborsOfReproduction = defaultNeighborsOfReproduction - 1
        if (defaultNeighborsOfReproduction < 0) {
            defaultNeighborsOfReproduction = 0
        }
        document.querySelector('.reproductionNeighbors')
            .innerHTML = (`If a box has no life and it has ${defaultNeighborsOfReproduction} neighbors, the box in next generation fills with life because of reproduction.`)
    });
/////

// change rules for lifeless
document.querySelector('.showLonelinessSentence')
    .innerHTML = (`If a box has life and it has less than ${defaultNeighborsOfLifeless} neighbors. It dies of loneliness. The box becomes lifeless next generation.`)

document.querySelector('.addLonelinessNeighbors')
    .addEventListener('click', function () {
        defaultNeighborsOfLifeless = defaultNeighborsOfLifeless + 1
        document.querySelector('.showLonelinessSentence')
            .innerHTML = (`If a box has life and it has less than ${defaultNeighborsOfLifeless} neighbors. It dies of loneliness. The box becomes lifeless next generation.`)
    });

document.querySelector('.removeLonelinessNeighbors')
    .addEventListener('click', function () {
        defaultNeighborsOfLifeless = defaultNeighborsOfLifeless - 1
        if (defaultNeighborsOfLifeless < 0) {
            defaultNeighborsOfLifeless = 0
        }
        document.querySelector('.showLonelinessSentence')
            .innerHTML = (`If a box has life and it has less than ${defaultNeighborsOfLifeless} neighbors. It dies of loneliness. The box becomes lifeless next generation.`)
    });
/////