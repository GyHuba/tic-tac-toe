const gameBoard = document.querySelector('#gameboard');
const textDiv = document.querySelector('#game-text');
const restartBtn = document.querySelector('.restart');
let startCells = ["", "", "", "", "", "", "", "", ""];
let sign = "circle";

function fillSquare(e) {
    let signDiv = document.createElement('div');
    signDiv.classList.add('child', sign);
    sign = sign === "circle" ? "cross" : "circle";

    e.target.append(signDiv)
    e.target.removeEventListener('click', fillSquare);
    checkWinner();
}

function checkWinner() {
    const allSquares = document.querySelectorAll('.square');

    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    winConditions.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));

        if (circleWins) {
            textDiv.innerText = "Circle win!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            restartBtn.classList.add('active');
            return
        }
    });

    winConditions.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));

        if (crossWins) {
            textDiv.innerText = "Cross win!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            restartBtn.classList.add('active');
            return
        }
    });
}

function createBoard() {
    startCells.forEach((element, idx) => {
        let square = document.createElement('div');
        square.classList.add("square");
        square.id = idx;
        square.addEventListener('click', fillSquare)

        gameBoard.append(square)
    });
};

function restartGame() {
    gameBoard.innerHTML = "";
    sign = "circle";
    createBoard();
    restartBtn.classList.remove('active')
}

restartBtn.addEventListener('click', restartGame);

createBoard();

