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

function setup() {
    slider = createSlider(2, 10, 2);

    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 100);
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
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
}

function draw() {
    let fr = slider.value()
    frameRate(fr)

    background(255);


    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                fill(boxColor);
            } else {
                fill(255);  //can change background boxes color here original:255
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