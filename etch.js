let container = document.querySelector('.container');
let div;
let grid;
let maxSize = 550;
let nCells = 16;
let sizeOfCells;
let penColor = '#000';
let counter;

const blackPen = document.querySelector('#black-pen');
const rainbowPen = document.querySelector('#rainbow-pen');
const pencil = document.querySelector('#pencil');

function getSizeOfCells(maxSize, nCells) {
    let sizeOfCells;
    sizeOfCells = maxSize / nCells;
    sizeOfCells = sizeOfCells + 'px';
    return sizeOfCells;
}
// Size of the grid cells

function makeGrid(nCells) {
    sizeOfCells = getSizeOfCells(maxSize, nCells);

    container.style['grid-template'] = 
    `repeat(${nCells}, ${sizeOfCells}) / repeat(${nCells}, ${sizeOfCells})`;

    for (let i = 0; i < nCells; i++) {
        for (let j = 0; j < nCells; j++) {
            div = document.createElement('div');
            div.classList.add('cell');
            div.setAttribute('data-counter', 10);
            container.appendChild(div);
        }
    }
}
// Creates the drawing grid


function draw() {
    grid = document.querySelectorAll('.container > .cell');

    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('mouseover', function() {
            grid[i].style.backgroundColor = penColor;
        });
    }
}
// Changes the color of a cell on mouseover


function clearGrid() {
    for(let i = 0; i < grid.length; i++) {
        grid[i].style.backgroundColor = '#FFF';
    }
}
// Resets the color of the grid to white

function replaceGrid() {
    nCells = prompt('Enter a number between 1 and 50');
    if (nCells > 50 || nCells < 1) {
        if (typeof(nCells) != 'object') {
            alert("Not in range!");
        }
    } else {
        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
        // Remove old grid
        makeGrid(nCells);
        draw();
        // Establish new grid
    }
}
// Creates a new grid as per user prompted answer


function getRandomColor() {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);

    penColor = 'rgb('+r+','+g+','+b+')';
    
}
// Color randomizer function


blackPen.addEventListener('click', function() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].removeEventListener('mouseover', getRandomColor);
    }

    penColor = '#000';
    draw();
});
// Black pen selector

rainbowPen.addEventListener('click', function() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('mouseover', getRandomColor);
    }
    draw();
});
// Rainbow pen selector

makeGrid(nCells);
draw();