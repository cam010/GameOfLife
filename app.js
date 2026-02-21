const GRIDSIZE = 40


// Interaction with HTML
const canvas = document.getElementById("gameGrid")
const ctx = canvas.getContext("2d");

const tickButton = document.getElementById("tickButton")
const autoTickButton = document.getElementById("autoTickButton")
let autoTicking = false

const squareSize = canvas.width / GRIDSIZE

let grid = generateBlankGrid()

function drawGrid() {
    for (i = 0; i < GRIDSIZE; i++) {
        for (j = 0; j < GRIDSIZE; j++) {
            square = grid[i][j]
            ctx.fillStyle = (square.value === "alive") ? "black" : "white" // set colour of square
            ctx.strokeStyle = "black"
            ctx.fillRect(square.x, square.y, squareSize, squareSize)
            ctx.strokeRect(square.x, square.y, squareSize, squareSize)
        }
    }
}

function toggleCell(cell) {
    cell.value = cell.value === "alive" ? "dead" : "alive"
}

function tickForward() {
    generateNewGrid()
    drawGrid()
    console.log("tick")
}

function autoTick() {
    if (autoTicking) {
        tickForward()
        setTimeout(autoTick , 1000)
    }
}

// Event Listener taken and adapted from https://www.youtube.com/watch?v=qQO-9WppZ1w 21/02/26
canvas.addEventListener("click", function (event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left
    const mouseY = event.clientY - canvas.getBoundingClientRect().top

    const clickedSquare = grid.flat().find( // adapted to include find()
        (square) =>
            mouseX >= square.x &&
            mouseX <= square.x + squareSize &&
            mouseY >= square.y &&
            mouseY <= square.y + squareSize
    )

    if (clickedSquare) {
        toggleCell(clickedSquare)
    }
    printGridToConsole(grid)
    drawGrid()
})

tickButton.addEventListener("click", function (event) {
    tickForward()
})

autoTickButton.addEventListener("click", function (event) {
    if (autoTicking) {
        autoTicking = false;
        return
    }
    autoTicking = true
    setTimeout(autoTick, 1000)
})


drawGrid()

// Pre set sample grid, example taken from https://pi.math.cornell.edu/~lipa/mec/lesson6.html 21/02/26
// 2nd iteration should return [0,0,0],[0,1,1],[0,0,0] 
// where 0 and 1 represent "dead" and "alive" respectively
function generateSampleGrid() {
    GRIDSIZE = 3
    squareSize = canvas.width / GRIDSIZE
    return [
        [
            { x: 0 * squareSize, y: 0 * squareSize, value: "dead" },
            { x: 0 * squareSize, y: 1 * squareSize, value: "dead" },
            { x: 0 * squareSize, y: 2 * squareSize, value: "alive" }
        ],
        [
            { x: 1 * squareSize, y: 0 * squareSize, value: "dead" },
            { x: 1 * squareSize, y: 1 * squareSize, value: "alive" },
            { x: 1 * squareSize, y: 2 * squareSize, value: "dead" }
        ],
        [
            { x: 2 * squareSize, y: 0 * squareSize, value: "dead" },
            { x: 2 * squareSize, y: 1 * squareSize, value: "alive" },
            { x: 2 * squareSize, y: 2 * squareSize, value: "dead" }
        ]
    ];
}

// Functions below are to do with game logic
function newCellObject(i, j, val) {
    return { x: j * squareSize, y: i * squareSize, value: val }
}

function generateBlankGrid() {
    initial_grid = []
    for (i = 0; i < GRIDSIZE; i++) {
        initial_grid.push([])
        for (j = 0; j < GRIDSIZE; j++) {
            initial_grid[i][j] = newCellObject(i, j, "dead")
        }
    }
    return initial_grid
}

function generateNewGrid() {
    new_grid = generateBlankGrid()
    for (i = 0; i < GRIDSIZE; i++) {
        for (j = 0; j < GRIDSIZE; j++) {
            let value = calculateNewCellValue(grid[i][j].value, i, j)
            new_grid[i][j] = newCellObject(i, j, value)
        }
    }
    grid = new_grid
}


function calculateNewCellValue(value, i, j) {
    let neighbours = getNeighbours(i, j)
    let count = neighbours.reduce(
        (accumulator, currentValue) => accumulator + (currentValue === "alive" ? 1 : 0),
        0
    )
    if (value === "alive") {
        value = (count === 2 || count === 3) ? "alive" : "dead"
    } else if (value === "dead") {
        value = count === 3 ? "alive" : "dead"
    }
    return value
}

function getNeighbours(i, j) {
    let ret = []
    if (i > 0) {
        // there are neighbours above
        ret.push(grid[i - 1][j].value) // directly north
        if (j > 0) {
            ret.push(grid[i - 1][j - 1].value) // north west
        }
        if (j < GRIDSIZE - 1) {
            ret.push(grid[i - 1][j + 1].value) // north east
        }
    }
    if (i < GRIDSIZE - 1) {
        ret.push(grid[i + 1][j].value) // directly south
        if (j > 0) {
            ret.push(grid[i + 1][j - 1].value) // south west
        }
        if (j < GRIDSIZE - 1) {
            ret.push(grid[i + 1][j + 1].value) // south east
        }
    }

    if (j > 0) {
        ret.push(grid[i][j - 1].value) // directly east
    }
    if (j < GRIDSIZE - 1) {
        ret.push(grid[i][j + 1].value) // directly west
    }
    return ret
}

// Useful for testing game logic
function printGridToConsole(grid) {
    for (i = 0; i < GRIDSIZE; i++) {
        out = "|"
        for (j = 0; j < GRIDSIZE; j++) {
            let val = grid[i][j].value
            if (val === "dead") {
                val = "dead " // make value be 5 characters instead so grid is alligned
            }
            out += (val + "|")
        }
        out += ("    " + (i + 1))
        console.log(out)
    }
    console.log("-" + "------".repeat(GRIDSIZE))
}

// printGridToConsole(grid)
// generateNewGrid(grid)
// printGridToConsole(grid)
// generateNewGrid(grid)
// printGridToConsole(grid)