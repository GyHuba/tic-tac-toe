const gameBoard = () => {
    this.board = document.querySelector('#gameboard');
    this.textDiv = document.querySelector('#game-text');
    this.restartBtn = document.querySelector('.restart-btn');
    this.startCells = ["", "", "", "", "", "", "", "", ""];

    return { board, textDiv, restartBtn, startCells }
}

const startScreen = () => {
    this.screen = document.querySelector('.start-screen');
    this.startBtn = document.querySelector('.start-btn');
    this.playerOneDOM = document.querySelector('#player-one');
    this.playerTwoDOM = document.querySelector('#player-two');

    return { screen, startBtn, playerOneDOM, playerTwoDOM }
}


const playerFactory = (name, sign) => {
    return { name, sign }
}

const createPlayers = () => {
    const playerOne = playerFactory(startScreen().playerOneDOM.value, 'circle');
    const playerTwo = playerFactory(startScreen().playerTwoDOM.value, 'cross');

    return { playerOne, playerTwo }
}

const gameFunctions = () => {
    let sign = "circle";

    const fillSquare = (e) => {
        let signDiv = document.createElement('div');
        signDiv.classList.add('child', sign);
        sign = sign === "circle" ? "cross" : "circle";
        textDiv.innerText = `${sign}'s turn!`
        e.target.append(signDiv)
        e.target.removeEventListener('click', fillSquare);
        checkWinner();
    }

    const checkWinner = () => {
        const allSquares = document.querySelectorAll('.square');
        const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        let squares = [];
        allSquares.forEach(square => {
            if (square.hasChildNodes()) squares.push(square)
        })

        winConditions.forEach(array => {
            const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));

            if (circleWins) {
                gameBoard().textDiv.innerText = `${createPlayers().playerOne.name} win!`;
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
                gameBoard().restartBtn.classList.add('active');
                squares = [];
                return
            }
            else if (squares.length === 9) {
                gameBoard().textDiv.innerText = `Draw!`;
                gameBoard().restartBtn.classList.add('active');
                return
            }
        });
        winConditions.forEach(array => {
            const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));

            if (crossWins) {
                gameBoard().textDiv.innerText = `${createPlayers().playerTwo.name} win!`;
                allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
                gameBoard().restartBtn.classList.add('active');
                squares = [];
                return
            }
            else if (squares.length === 9) {
                gameBoard().textDiv.innerText = `Draw!`;
                gameBoard().restartBtn.classList.add('active');
                return
            }
        });

    }

    const restartGame = () => {
        gameBoard().board.innerHTML = "";
        gameBoard().textDiv.innerText = "";
        gameFunctions().sign = "circle";

        startScreen().screen.classList.add('active');
        gameBoard().textDiv.classList.remove('active')
        gameBoard().board.classList.add('none');
        gameBoard().restartBtn.classList.remove('active')
    }

    const createBoard = (event) => {
        event.preventDefault();
        createPlayers();
        sign = sign;
        textDiv.innerText = `${sign}'s turn!`;
        startScreen().screen.classList.remove('active');
        gameBoard().textDiv.classList.add('active')
        gameBoard().board.classList.remove('none');
        gameBoard().startCells.forEach((element, idx) => {
            let square = document.createElement('div');
            square.classList.add("square");
            square.id = idx;
            square.addEventListener('click', fillSquare)

            gameBoard().board.append(square)
        });
    };
    return { fillSquare, checkWinner, restartGame, createBoard };
}

gameBoard().restartBtn.addEventListener('click', gameFunctions().restartGame);
startScreen().startBtn.addEventListener('click', gameFunctions().createBoard)



