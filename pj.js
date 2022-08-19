let unitLength = 18;
const boxColor = 125;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
// let slider;
let isGameContinue = true
let defaultNeighborsOfReproduction = 3
let defaultNeighborsOfLifeless = 2
let fr = 1
let noColor = true
let isRandomInitialState = false
let isKeyBoardMode = false
let nightMode = false
const pattern = [`....OO
...O..O
...OOOO
.O.O..O.O
O........O
O........O
.O.O..O.O
...OOOO
...O..O
....OO
`
    ,
    `..OO
O..O
OO.O.OO
.O.O..O
.O....O.OO
..OOO.O.OO
.....O
....O
....OO
`
    ,
    `
..........................................O
..........................................O
............................................O.....O
...........................................O......O.O
..........................................O...O..O
...........................................O..O.O.OO
................................................O.OO
..............................................................OO
..............................................................OO






......................................................................OO
..........................OO..O.......................................OO
.............................O.O
............................O

..............................OO

...............................OO
..............................O...............................................OO
............................OO.OO.............................................OO
...............................OO
................O............O
................O......................OOO
..................O.....O.............O
.................O......O.O..........O....OO
................O...O..O............O...O
.................O..O.O.OO..........O..O....O.........................................OO
......................O.OO..........O...O...O................................O........OO
.....................................OO.O.OOO...............................O.O
........................................O
.........................................OOOO...............................O..O
..............................OOO..........OO.................................OO
.............................O...O.............................................O
............................O....O
...........................O...O
...........................O..O.OOO
...........................O.......O
OO..O........................O...O.O........................................OO
...O.O.......................O...O.OO.........................................O
..O............................OOO.OO.......................................OO

....OO

.....OO
....O
..OO.OO....................................................O.O......O.O
.....OO...................................................O.........O.O
...O.......................................................O..O......O
.............................................................OOO




...................................................O
..................................................O.O

..................................................O..O
.......OO...........................................OO
.......OO............................................O




..................................................OO
....................................................O
...............OO.................................OO
...............OO




.................................O.O......O.O
................................O.........O.O
.......................OO........O..O......O
.......................OO..........OOO
`
    ,
    `
....OO......OO....
...O.O......O.O...
...O..........O...
OO.O..........O.OO
OO.O.O..OO..O.O.OO
...O.O.O..O.O.O...
...O.O.O..O.O.O...
OO.O.O..OO..O.O.OO
OO.O..........O.OO
...O..........O...
...O.O......O.O...
....OO......OO....
`
    ,
    `
........OO........
......O....O......
..OO..........OO..
..O..O......O..O..
...OOO.OOOO.OOO...
......O....O......
...OOO......OOO...
..O............O..
...OOOOO..OOOOO...
........OO........
.....OO....OO.....
....O.O....O.O....
....OO......OO....
..................
..................
......OO..OO......
.....O..OO..O.....
...O.O.OOOO.O.O...
.OOO.O.O..O.O.OOO.
O...OO.OOOO.OO...O
.OO...O....O...OO.
...OO..O..O..OO...
...O.OO....OO.O...
`
    ,
    `
..........................OO..........................
..........................OO..........................
......O....O..............................O....O......
....OO.OOOO.OO..........................OO.OOOO.OO....
......O....O..............................O....O......
......................................................
......................................................
......................................................
......................................................
.........................O..O.........................
.......................O.O..O.O.......................
........................OO..OO........................
..O..O....O..O..........................O..O....O..O..
OOO..OOOOOO..OOO......................OOO..OOOOOO..OOO
..O..O....O..O............OO............O..O....O..O..
..........................OO..........................
......................................................
......................................................
......................................................
.....................O..........O.....................
.....................O..........O.....................
....................O.O........O.O....................
.....................O..........O.....................
.....................O..........O.....................
.....................O..........O.....................
.....................O..........O.....................
....................O.O........O.O....................
.....................O..........O.....................
.....................O..........O.....................
`
    ,
    `
............................OO.......OO..
............................OO.......OO..
..OO.......OO............................
..OO.......OO............................
.........................................
.........................................
...........................OO.........OO.
.............................O.......O...
.O...........O..............OO.......OO..
.OO.........OO............O.OO.......OO.O
O.OO.......OO.O.....O.....O.............O
....................O....................
OO...........OO.....O....................
.O...........O............O.............O
.O...........O......O.....O.OO.......OO.O
OO...........OO.....O.......OO.......OO..
....................O........O.......O...
O.OO.......OO.O............OO.........OO.
.OO.........OO...........................
.O...........O...........................
.........................................
.........................................
............................OO.......OO..
............................OO.......OO..
..OO.......OO............................
..OO.......OO............................
`
    ,
    `
......O...........O......
.......OO.......OO.......
...O.O.OO.......OO.O.O...
..O.O...............O.O..
...O.................O...
..O...................O..
O.........OO.OO.........O
.OO........O.O........OO.
.OO......O.O.O.O......OO.
........O.O...O.O........
......O..O.....O..O......
......OOO.......OOO......
.........................
......OOO.......OOO......
......O..O.....O..O......
........O.O...O.O........
.OO......O.O.O.O......OO.
.OO........O.O........OO.
O.........OO.OO.........O
..O...................O..
...O.................O...
..O.O...............O.O..
...O.O.OO.......OO.O.O...
.......OO.......OO.......
......O...........O......
`
    ,
    `
....O......O
...O.O.OO.O.O
...OO..OO..OO
.......OO

.....OO..OO
.....OO..OO
......OOOO
......O..O
.....O....O
.....O....O
.....O.OO.O
......O..O
......O..O

O..............O
OO....O..O....OO
O.....OOOO.....O
.OO....OO....OO
..O..........O
O.O..........O.O
.OOOOO....OOOOO
...O..OOOO..O
..O....OO....O
......O..O
.......OO
....OO.OO.OO

...O........O
..OOO......OOO
..O..O....O..O
.OO..........OO
`
    ,
    `
.....................................OO
........OO...........................O
.........O.........................O.O
.........O.O.......................OO
..........OO.............O.O..O.O
..............O.O..O.O..O..O..O..O
.............O..O..O..O..O.O..O.O
..............O.O..O.O.............OO
..........OO.......................O.O
.........O.O.........................O
.........O...........................OO
........OO
.......................OO
...................OO..OO
..................OO
...................O
..............OO
..............OO
.............................OO
OO...........................O
.O.........................O.O
.O.O.......................OO
..OO.............O.O..O.O
......O.O..O.O..O..O..O..O
.....O..O..O..O..O.O..O.O
......O.O..O.O.............OO
..OO.......................O.O
.O.O.........................O
.O...........................OO
OO
`
    ,
    `
........O
.......O.O
......O...O
.......OOO

.....OO...OO
..OO...O.O...OO
..OO...O.O...OO
OO.....O.O.....OO
....OO.O.O.OO
O......O.O......O
...OO..O.O..OO
.O..O.O...O.O..O
.OO...........OO
.OO...........OO
....O.......O
....OOO...OOO
......O...O
...OO.O...O.OO
.....OO...OO
.....O.O.O.O

.....O..O..O
......OO.OO
.....OO...OO

....O..OOO..O
...OOOOOOOOOOO
...OO.O...O.OO
`
    ,
    `
.................................O
................O...............O.O
......O.O......O.....OO........O
......O....O....O.OOOOOO....OO
......O.OOOOOOOO..........O..O.OOO
.........O.....O.......OOOO....OOO
....OO.................OOO.O
.O..OO.......OO........OO
.O..O
O
.O..O
.O..OO.......OO........OO
....OO.................OOO.O
.........O.....O.......OOOO....OOO
......O.OOOOOOOO..........O..O.OOO
......O....O....O.OOOOOO....OO
......O.O......O.....OO........O
................O...............O.O
.................................O
`
    ,
    `
.OO.OO
..O.O.O.OO
.O..O.O.O
O.OO..O.O.O
O.........OOO.O
.OOO.........OO
...O.O.O..OO...OO
.....O.O.O..OO...O
....OO.O..OO..OO.O
...O...O.O..O.O.O
....OOO..O..O......O
.......OO...O..OOOOO
......O..OOOO.O
.....O.OO...O.O..OOO
......O..OOO..O....O
.......OO.....O.OO
.........OOO..O.O
.........O..O.O.O
..........OOOOO.OO
...............O..O
.........O.OOOO..OO
.........OO.O
`
    ,
    `
...........OO.........O
............O.........O
...........O..........O
...........OOOO......OO
.........OO....O...O
.....OO.O.O.OOO...O....O
.....OO.O...O.....O
........OO..........OOO
.....OOO
....O..O.......................O
....OO..............O.........O.O
O.OO..........OOO..O.O........O.O
OO.O.OO......................OO.O.OO
...O.O........O.O..OOO..........OO.O
...O.O.........O..............OO
....O.......................O..O
............................OOO
.............OOO..........OO
.................O.....O...O.OO
............O....O...OOO.O.O.OO
................O...O....OO
.............OO......OOOO
.............O..........O
.............O.........O
.............O.........OO
`
    ,
    `
.............OO.....OO.............
.............OO.....OO.............
...................................
...................................
...................................
..............OO...OO..............
.............O..O.O..O.............
............O...O.O...O............
................O.O................
.............OOO...OOO.............
...................................
...................................
.......O....OO.......OO....O.......
OO....O..O..OO.......OO..O..O....OO
OO...O...O...............O...O...OO
.....O...O...............O...O.....
......OOO.................OOO......
...................................
......OOO.................OOO......
.....O...O...............O...O.....
OO...O...O...............O...O...OO
OO....O..O..OO.......OO..O..O....OO
.......O....OO.......OO....O.......
...................................
...................................
.............OOO...OOO.............
................O.O................
............O...O.O...O............
.............O..O.O..O.............
..............OO...OO..............
...................................
...................................
...................................
.............OO.....OO.............
.............OO.....OO.............
`
    ,
    `
....O...OO...O....
...O.O.O..O.O.O...
...O.O......O.O...
.OOO.O......O.OOO.
O....O.OOOO.O....O
.OOO.O.OOOO.O.OOO.
...O..OO..OO..O...
......O....O......
.......O..O.......
........OO........
...O..........O...
.OOO..........OOO.
O.....OOOOOO.....O
.OOO..........OOO.
...O..........O...
........OO........
.......O..O.......
......O....O......
...O..OO..OO..O...
.OOO.O.OOOO.O.OOO.
O....O.OOOO.O....O
.OOO.O......O.OOO.
...O.O......O.O...
...O.O.O..O.O.O...
....O...OO...O....
`
    ,
    `
.....................O
...................OOO
..................O........O..OO
.........OO.......OO......O.O..O
..........O...............O.O.O
..........O.O............OO.O.OO
...........OO...........O...O...O
...................O....O....O.O.O
......OO.........OO.OO..O...OO...O
.....O..O..........O....O....O.OO
O..O..O.O...............O...O
OOOOO.O.OO...............OO.O.OOOOO
......O...O...............O.O..O..O
..OO.O....O....O..........O..O
.O...OO...O..OO.OO.........OO
.O.O.O....O....O
..O...O...O...........OO
...OO.O.OO............O.O
....O.O.O...............O
...O..O.O......OO.......OO
...OO..O........O
.............OOO
.............O
`
    ,
    `
..............OO
..............OO

............OOOO
...........O....O....OO
............O.OOO.....O
.........OOO.OO.....O
........O....OO....O.OOOO
........OOO.O......O.O..O
............O.OO..OO
........OO.O..O..O..O.O
........OO.O.O..O..O...O
..OO........O.OOO....O..O
..O.O........O.....OO.OOO
...O..........OOO..O
.....O.O........OOO..OO
.OOOOOO............O.O
O...............OO.O.O
.OOOOOO.........OO.OO
.....O.O
...O
..O.O
..OO
........OO.O
........OO.OOO
..............O
........OO.OOO
......O..O.O
......OO
`
    ,
    `
....OO....O....OO
...O..O.O...O.O..O
...OOO.........OOO
.OO...OO.....OO
O.O..O..OOOOO..O....OO
O.O.O.O.......OO...O..O
.O.O.O.............O.O..O..O
...O..............OO.O.OOOOO
..O..O...........O...O
..O.........O....O....O.OO
..O...O...OO.OO..O...OO...O
..O.........O....O....O.O.O
..O..O...........O...O...O
...O..............OO.O.OO
.O.O.O.............O.O.O
O.O.O.O.......OO...O.O..O
O.O..O..OOOOO..O....O..OO
.OO...OO.....OO
...OOO.........OOO
...O..O.O...O.O..O
....OO....O....OO
`
    ,
    `
.......O.O.O
......OOOOOOO
.....O.......O
.OOO.OOO...OOO.OOO
O.................O
.O.......O.......O
.O.OO.........OO.O

..OOO.........OOO
..OOO.........OOO
.....O.......O
.O....O.....O....O
.O.O...........O.O
.......O...O
.......O...O
.....O..O.O..O
.....O.......O
....O.........O
....O.O.....O.O
....OO.O...O.OO
.....O.OO.OO.O
.......O.O.O
........O.O
......O.O.O.O
.....OO.O.O.OO
........O.O
.......OO.OO
....OOO.O.O.OOO
....O.O.O.O.O.O
....O...O.O...O
........O.O
....O..OOOOO..O
...OOOO.....OOOO
.OO.............OO
.OO.O.........O.OO
..O.O....O....O.O
....OO.......OO
`
    ,
    `
............OO.....OO
.......OO...O.......O...OO
........O....O.....O....O
.....OO.O.OOO.O...O.OOO.O.OO
........O.O...O...O...O.O
......O.O.....O.O.O.....O.O
.......O.O..OO.O.O.OO..O.O
........O...O..O.O..O...O
....OO........OO.OO........OO
OO..O.......................O..OO
O.O.O....O.............O....O.O.O
..O.OO...OO...........OO...OO.O
O.O.O....O.............O....O.O.O
OO..O.......................O..OO
....OO........OO.OO........OO
........O...O..O.O..O...O
.......O.O..OO.O.O.OO..O.O
......O.O.....O.O.O.....O.O
........O.O...O...O...O.O
.....OO.O.OOO.O...O.OOO.O.OO
........O....O.....O....O
.......OO...O.......O...OO
............OO.....OO
`
    ,
    `
.................OO................
......O..O..O...O..O.OO............
......OOOOOOO..O.OOO.O.............
OO.............O......OOO..........
.O..OOOOOOOOOOO.OOOOOO..O..........
.O.O....O.....O.O.O....O...........
OO.O.O....OO...O...OO..............
O.....O..O..O....OO........OOOOO.O.
.OO.OO......O.....OO...O.OO........
..O.O.......O........O..O.........O
..O.O.......O........O..O.........O
.OO.OO......O.....OO...O.OO........
O.....O..O..O....OO........OOOOO.O.
OO.O.O....OO...O...OO..............
.O.O....O.....O.O.O....O...........
.O..OOOOOOOOOOO.OOOOOO..O..........
OO.............O......OOO..........
......OOOOOOO..O.OOO.O.............
......O..O..O...O..O.OO............
.................OO................
`
    ,
    `
......................O..........O
.....................O.O........O.O
......................O..........O

OOO.OOO............O.....O....O.....O............OOO.OOO
...O......O...O....O.....O....O.....O....O...O......O
OO...OO...O.OOO...O.......O..O.......O...OOO.O...OO...OO
...O......O...O....O.....O....O.....O....O...O......O
OOO.OOO............O.....O....O.....O............OOO.OOO

......................O
....................OOO.........OOO
...................O.......OOO.......OO
...................OO.......OOO.......O
.......................OOO.........OOO
...................................O

..OOO.OOO............O.....O....O.....O............OOO.OOO
.....O......O...O....O.....O....O.....O....O...O......O
..OO...OO...O.OOO...O.......O..O.......O...OOO.O...OO...OO
.....O......O...O....O.....O....O.....O....O...O......O
..OOO.OOO............O.....O....O.....O............OOO.OOO

........................O..........O
.......................O.O........O.O
........................O..........O`
    ,
    `
...................OO....................
...................OOOO..................
...................O.OO..................
.........................................
....................O....................
...................OO....................
...................OOO...................
.....................O...................
.................................OO......
.................................OO......
.........................................
.........................................
.........................................
.........................................
.........................................
.........................................
....................................O....
...................................OO....
..................................O...O..
...................................OO..O.
........................................O
.....................................O.O.
......................................O..
......................................O..
......................................OO.
......................................OO.
.........................................
.........................................
.............O..........O................
............OOOOO.....O.OO...........O...
...........O..........O...O.........O....
............OO........OOO.O.........OO...
.............OO.........OO............O..
OO.............O.....................OOO.
OO...................................OOO.
.........................................
.........................................
.........................................
.........................................
.........................................
.........................................
........OO...............................
........OO...........OO..................
...................OO..O.................
........................O...O............
..................O.....O...O............
...................O..OO...O.O...........
....................OOO.....O............
............................O............
`
    ,
    `
..............O.OO................
..............OO.O................
OO...............O.OO........O....
OO.O......OO.....O..O...OO..O.O...
....O.....O.O.OO.OO.....O...O.O...
.O..........O.O.O..OOOO.O..OO..OO.
..O.OO.....OO...O.O...O.O.O..O.O..
....OO...OO.O.....O.OO..O.OO.O.O..
.........O.O...OO.O..OO.O.O..O.OO.
..........O..O......O.O..OOO.....O
...........OOOOOOOOO....O...OO...O
.................................O
...........OOOOOOOOO....O...OO...O
..........O..O......O.O..OOO.....O
.........O.O...OO.O..OO.O.O..O.OO.
....OO...OO.O.....O.OO..O.OO.O.O..
..O.OO.....OO...O.O...O.O.O..O.O..
.O..........O.O.O..OOOO.O..OO..OO.
....O.....O.O.OO.OO.....O...O.O...
OO.O......OO.....O..O...OO..O.O...
OO...............O.OO........O....
..............OO.O................
..............O.OO................
`
    ,
    `
...............OO
...............OO




.............OO
..............OO
..........O....O
..........O...O
..........OO.......OOO
...................O

OO.....................O
OO.....OO...........O.OO
......OO.O...........OO.....OO
......O.....................OO

..........O
........OOO.......OO
...............O...O
..............O....O
..............OO
...............OO




.............OO
.............OO
`
    ,
    `
...................OO.............
...................OO.............
..OO..............................
..O.O.............................
......OO.........O................
...O..O........O.OO...............
......OO......O..O................
.O.O.O..O........O................
...OO..OO.....OOO.................
O.OO..............................
.O.......................O.O......
.........................O..O.....
.........................O........
....OO....................OOOO....
....OO......................O.....
.........O......................OO
........OOOO....................OO
............O.....................
.........O..O.....................
..........O.O.....................
..................................
.....................OOO..........
....................O.............
....................O..O..........
...................OO.O...........
....................O.............
..................................
..................................
.................OO...............
.................OO...............
`
    ,
    `
.................OOO.........OOO.................
................O...O.......O...O................
...............O.O...O.....O...O.O...............
...............O...OO.......OO...O...............
...............OOO...O.....O...OOO...............
..............O...OO.OOO.OOO.OO...O..............
..............OO..O...OO.OO...O..OO..............
.............OOO...OOOOO.OOOOO...OOO.............
.....................O.....O.....................
..................O...........O..................
.............O....O...........O....O.............
.............O....OOOO.....OOOO....O.............
.................O....O...O....O.................
................OO.OOO.....OOO.OO................
................OO.O...O.O...O.OO................
............OOO.......OO.OO.......OOO............
...........O...OO....O.O.O.O....OO...O...........
..........O...O...................O...O..........
..........O.........OOO...OOO.........O..........
..............O......OO...OO......O..............
.........O............O...O............O.........
.........O..OO.....O.........O.....OO..O.........
..........OO........O.......O........OO..........
........O............O.....O............O........
.......OOO.............................OOO.......
......OO..O...........................O..OO......
.........OO...........................OO.........
.........O.............................O.........
.................................................
......O...................................O......
.......OO...............................OO.......
.....O..O...............................O..O.....
....O.......................................O....
...OO.......................................OO...
..OOOO.....................................OOOO..
.O.............................................O.
.OOO.........................................OOO.
O...............................................O
..OO.........................................OO..
....O.......................................O....
..OO.........................................OO..
...O.........................................O...
..O...........................................O..
..O...........................................O..
`
    ,
    `
........OOOOO.OOO.OOOOO
.......OOO..O.O.O.O..OOO
......O....OO.O.O.OO....O
..........O..OO.OO..O
.....O......O.O.O.O......O
.....OO....O.O...O.O....OO
.....OO.OO...........OO.OO
.........O..O.....O..O
...OO....O.O.......O.O....OO
.....O....O.........O....O

....OO...................OO
.OO.........................OO
.OO..OO.................OO..OO
O....OOOOO...........OOOOO....O
......O.O.OO.......OO.O.O
.......OO......O......OO
.........O....OOO....O
.........O.O.......O.O
..........OO..O.O..OO
............O.....O
.........O...........O
......OO.OOOO.....OOOO.OO
......OO.O.O.O...O.O.O.OO
......O.O..O.OO.OO.O..O.O
...........O.OO.OO.O
..........OOO.....OOO
.........O...O...O...O
.........O.OO.....OO.O
........OO..OO...OO..OO
.......OO..O.......O..OO
.....OO.O.............O.OO
....O.O.................O.O
.OO.O...OO...........OO...O.OO
.OO.O.....................O.OO
.O.O.......................O.O
`
    ,
    `
...O...O.O.OOOOOO.O.O...O
..O.OO.O..O.O..O.O..O.OO.O
..O.......OO....OO.......O
.OO..O...O..OOOO..O...O..OO
O..OOOOOO.OO....OO.OOOOOO..O
OO......OO.OOOOOO.OO......OO
..OO.O................O.OO
OO..O........OO........O..OO
.O.O..OOO...O..O...OOO..O.O
O..OOO.....OO..OO.....OOO..O
.OO...O.OO.O....O.OO.O...OO
..O.O..O.OOO....OOO.O..O.O
..O.OO.O...OOOOOO...O.OO.O
.OO..O.O.O.O....O.O.O.O..OO
O..O.......OOOOOO.......O..O
.OO...O..............O...OO
.....O...OOOO..OOOO...O
....O.OO.O..O..O..O.OO.O
....O..OOO........OOO..O
.OO.O..OOO..O..O..OOO..O.OO
.OO.O.OO....OOOO....OO.O.OO
.....O...O........O...O
......O.O..........O.O
....O.O.O.O......O.O.O.O
....OO...OO......OO...OO
`
]


function setup() {

    // slider = createSlider(1, 50, 2);
    // slider.style('width', `300px`);

    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 80);
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

    // FrameRate refresh
    frameRate(parseInt(output.innerHTML))


    if (nightMode == false) {
        background("white")
    } else {
        background("black")
    }


    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 2) {
                fill('red')
            } else if (currentBoard[i][j] == 1 && nextBoard[i][j] == 1) {
                if (nightMode == false) {
                    fill("black")
                } else {
                    fill(150)
                }
            } else if (currentBoard[i][j] == 1 && noColor) {
                if (nightMode == false) {
                    fill("grey")
                } else {
                    fill("white")
                }
            } else if (currentBoard[i][j] == 1 && !noColor) {
                fill(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
            } else {
                if (nightMode == false) {
                    fill("white")
                } else {
                    fill("black")
                }
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

function generate() {
    if (isGameContinue) {
        console.log("the game is runnung")
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
        isKeyBoardMode = false;
        init();
        defaultNeighborsOfReproduction = 3
        document.querySelector('.reproductionNeighbors')
            .innerHTML = (`Reproduction rule: No life but have ${defaultNeighborsOfReproduction} neighbors.`)
        defaultNeighborsOfLifeless = 2
        document.querySelector('.showLonelinessSentence')
            .innerHTML = (`Dead rule: Has life but less than ${defaultNeighborsOfLifeless} neighbors.`)
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

// Night Mode
document.querySelector('.night-mode')
    .addEventListener('click', function () {
        if (nightMode == false) {
            resizeSetup()
            console.log("nightMode")
            nightMode = true;

        } else {
            nightMode = false;
            resizeSetup()
            console.log("NOT nightMode")
        }
    });

function nightModeSetup() {
    const canvas = createCanvas(windowWidth, windowHeight - 220);
    canvas.parent(document.querySelector('#canvas'));

    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    init();
}

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

const eventMakeAGlider = function () {
    if (event.keyCode == 71) {
        let x = Math.floor(Math.random() * 64) + 1;
        let y = Math.floor(Math.random() * 34) + 1;
        currentBoard[x][y] = 1;
        currentBoard[x][y + 1] = 1;
        currentBoard[x][y + 2] = 1;
        currentBoard[x - 1][y + 2] = 1;
        currentBoard[x - 2][y + 1] = 1;
    }
}
addEventListener("keydown", eventMakeAGlider)



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

// random pattern generator
document.querySelector('.random-pattern-generator')
    .addEventListener('click', function () {

        //reset first
        init();
        defaultNeighborsOfReproduction = 3
        document.querySelector('.reproductionNeighbors')
            .innerHTML = (`Reproduction rule: No life but have ${defaultNeighborsOfReproduction} neighbors.`)
        defaultNeighborsOfLifeless = 2
        document.querySelector('.showLonelinessSentence')
            .innerHTML = (`Dead rule: Has life but less than ${defaultNeighborsOfLifeless} neighbors.`)

        //generate a pattern
        let chooseOnePattern = pattern[Math.floor(Math.random() * pattern.length)]
        let arrayOfStrings = chooseOnePattern.split('\n').filter(e => e !== '')
        let new01Array = []
        for (arrayOfString of arrayOfStrings) {
            x = arrayOfString.replace(/O/g, "1").replaceAll(".", "0")
            new01Array.push(x)
        }
        for (i = 5; i < new01Array.length + 5; i++) {
            z = new01Array[i - 5]
            for (ii = 5; ii < z.length + 5; ii++) {
                if (z[ii - 5] == 1) {
                    currentBoard[ii][i] = 1;
                }
            }
        }
    })

const eventRandomGenerator = function () {
    if (event.keyCode == 82) {
        //reset first
        init();
        defaultNeighborsOfReproduction = 3
        document.querySelector('.reproductionNeighbors')
            .innerHTML = (`Reproduction rule: No life but have ${defaultNeighborsOfReproduction} neighbors.`)
        defaultNeighborsOfLifeless = 2
        document.querySelector('.showLonelinessSentence')
            .innerHTML = (`Dead rule: Has life but less than ${defaultNeighborsOfLifeless} neighbors.`)

        //generate a pattern
        let chooseOnePattern = pattern[Math.floor(Math.random() * pattern.length)]
        let arrayOfStrings = chooseOnePattern.split('\n').filter(e => e !== '')
        let new01Array = []
        for (arrayOfString of arrayOfStrings) {
            x = arrayOfString.replace(/O/g, "1").replaceAll(".", "0")
            new01Array.push(x)
        }
        for (i = 5; i < new01Array.length + 5; i++) {
            z = new01Array[i - 5]
            for (ii = 5; ii < z.length + 5; ii++) {
                if (z[ii - 5] == 1) {
                    currentBoard[ii][i] = 1;
                }
            }
        }
    }
}

addEventListener('keydown', eventRandomGenerator)




// change rules for reproductionNeighbors
document.querySelector('.reproductionNeighbors')
    .innerHTML = (`Reproduction rule: No life but have ${defaultNeighborsOfReproduction} neighbors.`)

document.querySelector('.addReproductionNeighbors')
    .addEventListener('click', function () {
        defaultNeighborsOfReproduction = defaultNeighborsOfReproduction + 1
        document.querySelector('.reproductionNeighbors')
            .innerHTML = (`Reproduction rule: No life but have ${defaultNeighborsOfReproduction} neighbors.`)
    });

document.querySelector('.removeReproductionNeighbors')
    .addEventListener('click', function () {
        defaultNeighborsOfReproduction = defaultNeighborsOfReproduction - 1
        if (defaultNeighborsOfReproduction < 0) {
            defaultNeighborsOfReproduction = 0
        }
        document.querySelector('.reproductionNeighbors')
            .innerHTML = (`Reproduction rule: No life but have ${defaultNeighborsOfReproduction} neighbors.`)
    });
/////

// change rules for lifeless
document.querySelector('.showLonelinessSentence')
    .innerHTML = (`Dead rule: Has life but less than ${defaultNeighborsOfLifeless} neighbors.
    `)

document.querySelector('.addLonelinessNeighbors')
    .addEventListener('click', function () {
        defaultNeighborsOfLifeless = defaultNeighborsOfLifeless + 1
        document.querySelector('.showLonelinessSentence')
            .innerHTML = (`Dead rule: Has life but less than ${defaultNeighborsOfLifeless} neighbors.
            `)
    });

document.querySelector('.removeLonelinessNeighbors')
    .addEventListener('click', function () {
        defaultNeighborsOfLifeless = defaultNeighborsOfLifeless - 1
        if (defaultNeighborsOfLifeless < 0) {
            defaultNeighborsOfLifeless = 0
        }
        document.querySelector('.showLonelinessSentence')
            .innerHTML = (`Dead rule: Has life but less than ${defaultNeighborsOfLifeless} neighbors.`)
    });

//Window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    resizeSetup();
}

function resizeSetup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 80);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    // copy old cells after resize
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = nextBoard[i][j];
        }
    }
}

// Draw with keyboard
let q = 0
let w = 0
const keyboardModeListenerFunction = function () {
    if (event.keyCode == 87) {
        w--
        if (currentBoard[q][w + 1] != 1)
            currentBoard[q][w + 1] = 0
        currentBoard[q][w] = 2

    } else if (event.keyCode == 83) {
        w++
        if (currentBoard[q][w - 1] != 1)
            currentBoard[q][w - 1] = 0
        currentBoard[q][w] = 2

    } else if (event.keyCode == 65) {
        q--
        if (currentBoard[q + 1][w] != 1)
            currentBoard[q + 1][w] = 0
        currentBoard[q][w] = 2

    } else if (event.keyCode == 68) {
        q++
        if (currentBoard[q - 1][w] != 1)
            currentBoard[q - 1][w] = 0
        currentBoard[q][w] = 2
    }
}
const pressEntertoMakeBlack = function () {
    if (event.keyCode == 220) {
        if (currentBoard[q][w] = 2) {
            currentBoard[q][w] = 1
            console.log(currentBoard[q][w])
        }
    }
}

document.querySelector('.draw-with-keyboard')
    .addEventListener('click', function () {
        if (isKeyBoardMode == false) {
            // switch keyboard mode on
            isKeyBoardMode = true;
            isGameContinue = false;

            //reset the board
            init();
            defaultNeighborsOfReproduction = 3
            document.querySelector('.reproductionNeighbors')
                .innerHTML = (`Reproduction rule: No life but have ${defaultNeighborsOfReproduction} neighbors.`)
            defaultNeighborsOfLifeless = 2
            document.querySelector('.showLonelinessSentence')
                .innerHTML = (`Dead rule: Has life but less than ${defaultNeighborsOfLifeless} neighbors.`)



            addEventListener('keydown', keyboardModeListenerFunction)
            addEventListener('keydown', pressEntertoMakeBlack)


            currentBoard[q][w] = 2
        } else {
            // switch keyboard mode off
            isKeyBoardMode = false
            isGameContinue = true;

            removeEventListener('keydown', keyboardModeListenerFunction)
            removeEventListener('keydown', pressEntertoMakeBlack)

            //reset the board
            init();
            defaultNeighborsOfReproduction = 3
            document.querySelector('.reproductionNeighbors')
                .innerHTML = (`Reproduction rule: No life but have ${defaultNeighborsOfReproduction} neighbors.`)
            defaultNeighborsOfLifeless = 2
            document.querySelector('.showLonelinessSentence')
                .innerHTML = (`Dead rule: Has life but less than ${defaultNeighborsOfLifeless} neighbors.`)
        }
    });

// zoom box to big and small
document.querySelector('.zoomBig')
    .addEventListener('click', function () {
        unitLength = unitLength + 10
        zoomBigOrSmallSetup()
    });


document.querySelector('.zoomSmall')
    .addEventListener('click', function () {
        if (unitLength > 18) {
            unitLength = unitLength - 10
        }
        zoomBigOrSmallSetup()
    });


const zoomInOrOut = function () {
    if (event.keyCode == 187) {
        unitLength = unitLength + 10
        zoomBigOrSmallSetup()
    } else if (event.keyCode == 189) {
        if (unitLength > 18) {
            unitLength = unitLength - 10
        }
        zoomBigOrSmallSetup()
    }
}
addEventListener('keydown', zoomInOrOut)


function zoomBigOrSmallSetup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 80);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    // copy old cells after resize
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = nextBoard[i][j];
        }
    }
}

// new frameRate

let slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}