let gridWidth = 3
let gridHeight = 3
let grid = generateSampleGrid()

// Make Canvas FullScreen
const canvas = document.getElementById("gameGrid")

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

window.addEventListener("resize", resizeCanvas)


window.addEventListener("resize", drawGrid)



// Interaction with HTML
const ctx = canvas.getContext("2d");
let viewportTransform = { x: 0, y: 0, scale: 1 }

const tickButton = document.getElementById("tickButton")
const autoTickButton = document.getElementById("autoTickButton")
let autoTicking = false

const aliveCellLabel = document.getElementById("aliveCellsLabel")
const gridSizeSlider = document.getElementById("gridSizeSlider")

// let squareSize = canvas.width / grid_size
let squareSize = 10

resizeCanvas(canvas)
drawGrid()

function drawGrid() {
    for (i = 0; i < gridHeight; i++) {
        for (j = 0; j < gridWidth; j++) {
            square = grid[i][j]
            ctx.fillStyle = (square.value === "alive") ? "black" : "white" // set colour of square
            ctx.strokeStyle = "black"
            ctx.fillRect(square.x, square.y, squareSize, squareSize)
            ctx.strokeRect(square.x, square.y, squareSize, squareSize)
        }
    }
}

// function toggleCell(cell) {
//     cell.value = cell.value === "alive" ? "dead" : "alive"
// }

// function tickForward() {
//     generateNewGrid()
//     updateAliveCellLabel()
//     needsRedraw = true
// }

// function autoTick() {
//     if (autoTicking) {
//         tickForward()
//         setTimeout(autoTick, 1000)
//     }
// }

// function updateAliveCellLabel() {
//     let aliveCells = calculateAliveCellCount()
//     aliveCellLabel.innerHTML = "Alive Cells: " + aliveCells
// }

// function updateSquareSize() {
//     squareSize = canvas.width / grid_size
// }

// function getCellByCoordinates(mouseX, mouseY) {
//     let clickedSquare = grid.flat().find( // adapted to include find()
//         (square) =>
//             mouseX >= square.x &&
//             mouseX <= square.x + squareSize &&
//             mouseY >= square.y &&
//             mouseY <= square.y + squareSize
//     )

//     return clickedSquare
// }

// function updateClickedCell(cell, modifyingType) {
//     if (cell.value === modifyingType) {
//         // eg if initial cell mouse clicked was a value, 
//         // only toggle other cells of this value
//         toggleCell(cell)
//     }
//     updateAliveCellLabel()
// }

// variables for panning and zooming 
// let dragging = false
// let previousX = 0
// let previousY = 0


// Code for panning and zooming adapted from:
//   https://harrisonmilbradt.com/blog/canvas-panning-and-zooming
// @ 21/02/26
// function updatePanning(event) {
//     let localX = event.clientX
//     let localY = event.clientY

//     viewportTransform.x += (localX - previousX)
//     viewportTransform.y += (localY - previousY)

    

//     previousX = localX
//     previousY = localY
//     needsRedraw = true
// }

// function updateZooming(event) {
//     let screenX = event.clientX - canvas.getBoundingClientRect().left
//     let screenY = event.clientY - canvas.getBoundingClientRect().top

//     let zoomFactor = event.deltaY < 0 ? 1.1 : 0.9

//     let worldX = (screenX - viewportTransform.x) / viewportTransform.scale
//     let worldY = (screenY - viewportTransform.y) / viewportTransform.scale

//     let newScale = viewportTransform.scale * zoomFactor
//     newScale = Math.max(1, Math.min(20, newScale))
//     viewportTransform.scale = newScale

//     viewportTransform.x = screenX - worldX * viewportTransform.scale
//     viewportTransform.y = screenY - worldY * viewportTransform.scale

//     needsRedraw = true
// }

// needsRedraw = true
// function updateViewport() {
//     if (needsRedraw) {
//         ctx.setTransform(1, 0, 0, 1, 0, 0)
//         ctx.clearRect(0, 0, canvas.width, canvas.height)
//         ctx.setTransform(
//             viewportTransform.scale,
//             0, 0,
//             viewportTransform.scale,
//             viewportTransform.x,
//             viewportTransform.y)
//         drawGrid()
//         needsRedraw = false
//     }
//     requestAnimationFrame(updateViewport)
// }


// variables for changing the cell between alive and dead
let changingState = false
let modifyingType = "none" // what cell value the mouse is changing e.g. alive cells only 

// canvas.addEventListener("mousedown", function (event) {
//     if (event.button === 0) {
//         let screenX = event.clientX - canvas.getBoundingClientRect().left
//         let screenY = event.clientY - canvas.getBoundingClientRect().top

//         let actualX = (screenX - viewportTransform.x) / viewportTransform.scale
//         let actualY = (screenY - viewportTransform.y) / viewportTransform.scale

//         let clickedSquare = getCellByCoordinates(actualX, actualY)

//         if (clickedSquare) {
//             modifyingType = clickedSquare.value
//             changingState = true
//             toggleCell(clickedSquare)
//         }
//     } else if (event.button === 1 || event.button === 2) {
//         // moving around canvas
//         dragging = true
//         previousX = event.clientX
//         previousY = event.clientY
//     }

//     needsRedraw = true
// })

// canvas.addEventListener("mousemove", function (event) {
//     if (changingState) {
//         // Some code taken and adapted from https://www.youtube.com/watch?v=qQO-9WppZ1w 21/02/26
//         let screenX = event.clientX - canvas.getBoundingClientRect().left
//         let screenY = event.clientY - canvas.getBoundingClientRect().top

//         let actualX = (screenX - viewportTransform.x) / viewportTransform.scale
//         let actualY = (screenY - viewportTransform.y) / viewportTransform.scale

//         let clickedSquare = getCellByCoordinates(actualX, actualY)

//         if (clickedSquare) {
//             updateClickedCell(clickedSquare, modifyingType)
//         }
//         needsRedraw = true
//     }
//     if (dragging) {
//         updatePanning(event)
//     }
// })

// window.addEventListener("mouseup", function (event) {
//     if (event.button === 0) {
//         changingState = false
//     } else if (event.button === 1 || event.button === 2) {
//         dragging = false
//     }

// })

// canvas.addEventListener("wheel", updateZooming)

// tickButton.addEventListener("click", function (event) {
//     tickForward()
// })

// autoTickButton.addEventListener("click", function (event) {
//     if (autoTicking) {
//         autoTickButton.innerHTML = "Start Auto Tick"
//         autoTicking = false;
//         return
//     }
//     autoTickButton.innerHTML = "Stop Auto Tick"
//     autoTicking = true
//     setTimeout(autoTick, 1000)
// })

// gridSizeSlider.addEventListener("change", (event) => {
//     grid_size = gridSizeSlider.value
//     updateSquareSize()
//     grid = generateBlankGrid()
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     needsRedraw = true
// })

// ------------------------------------------------------------ //
// ------------------------------------------------------------ //
// ------------------- BACKEND GAME LOGIC --------------------- //
// ------------------------------------------------------------ //
// ------------------------------------------------------------ //

// Pre set sample grid, example taken from https://pi.math.cornell.edu/~lipa/mec/lesson6.html 21/02/26
// 2nd iteration should return [0,0,0],[0,1,1],[0,0,0] 
// where 0 and 1 represent "dead" and "alive" respectively
function generateSampleGrid() {
    grid_size = 3
    // squareSize = canvas.width / grid_size
    let squareSize = 10
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
function calculateAliveCellCount(grid) {
    return grid.flat().reduce(
        (accumulator, currentCell) => accumulator + (currentCell.value === "alive" ? 1 : 0),
        0
    )
}

function generateBlankGrid() {
    initial_grid = []
    for (i = 0; i < gridHeight; i++) {
        initial_grid.push([])
        for (j = 0; j < gridWidth; j++) {
            initial_grid[i][j] = newCellObject(i, j, "dead")
        }
    }
    return initial_grid
}

function generateNewGrid(grid) {
    new_grid = generateBlankGrid()
    for (i = 0; i < gridHeight; i++) {
        for (j = 0; j < gridWidth; j++) {
            let value = calculateNewCellValue(grid[i][j].value, i, j, grid)
            new_grid[i][j] = newCellObject(i, j, value)
        }
    }
    return new_grid
}

function newCellObject(i, j, val) {
    return { x: j * squareSize, y: i * squareSize, value: val }
}

function calculateNewCellValue(value, i, j, grid) {
    let neighbours = getNeighbours(i, j, grid)
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

function getNeighbours(i, j, grid) {
    let ret = []
    if (i > 0) {
        // there are neighbours above
        ret.push(grid[i - 1][j].value) // directly north
        if (j > 0) {
            ret.push(grid[i - 1][j - 1].value) // north west
        }
        if (j < gridWidth - 1) {
            ret.push(grid[i - 1][j + 1].value) // north east
        }
    }
    if (i < gridHeight - 1) {
        ret.push(grid[i + 1][j].value) // directly south
        if (j > 0) {
            ret.push(grid[i + 1][j - 1].value) // south west
        }
        if (j < gridWidth - 1) {
            ret.push(grid[i + 1][j + 1].value) // south east
        }
    }

    if (j > 0) {
        ret.push(grid[i][j - 1].value) // directly east
    }
    if (j < gridWidth - 1) {
        ret.push(grid[i][j + 1].value) // directly west
    }
    return ret
}

// Useful for testing game logic
function printGridToConsole(grid) {
    console.log("-" + "------".repeat(gridWidth))
    for (i = 0; i < gridHeight; i++) {
        out = "|"
        for (j = 0; j < gridWidth; j++) {
            let val = grid[i][j].value
            if (val === "dead") {
                val = "dead " // make value be 5 characters instead so grid is alligned
            }
            out += (val + "|")
        }
        out += ("    " + (i + 1))
        console.log(out)
    }
    console.log("-" + "------".repeat(gridWidth))
}