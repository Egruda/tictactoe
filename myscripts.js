const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = [];
        }
    }

    function display() { 
        let div = [];
        let wholeContainer = document.querySelector('.wholeContainer');
        let container = document.createElement('div');
        container.classList.add('container');

        for(let i = 0; i < rows; i++) {
            div[i] = [];
            for (let j = 0; j < columns; j++) {
                div[i][j] = document.createElement('div');
                div[i][j].textContent = board[i][j];
                div[i][j].setAttribute('data-rows', i);
                div[i][j].setAttribute('data-columns', j);
                div[i][j].classList.add('cell');
                container.appendChild((div[i][j]));
            }
        }
        wholeContainer.appendChild(container);
    }
    
    function resetData() {
        let container = document.querySelector('.container');
        container.remove();
        for(let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = [];
            }
        }
        const result = document.querySelector('.result');
        if (result !== null) {
            result.remove();
        }
        gameController.startRound();

    }

    function addMarker(i, j) {
        board[i][j] = gameController.currentPlayer().marker;
        let chosenCell = document.querySelector(`[data-rows="${i}"][data-columns="${j}"]`);
        chosenCell.textContent = gameController.currentPlayer().marker;
        
    }

    function checkGameOver() {
        if ((board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] != null) ||
            (board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] != null) ||
            (board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] != null) ||
            (board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] != null) ||
            (board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] != null) ||
            (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] != null) ||
            (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] != null) ||
            (board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[2][0] != null)) {
            let gameResult = document.createElement('div');
            gameResult.classList.add('result');
            gameResult.textContent = `${gameController.currentPlayer().name} win!`
            let wholeContainer = document.querySelector('.wholeContainer');
            wholeContainer.appendChild(gameResult);
            cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
                cell.removeEventListener('click', gameController.playRound)
            });
        }
        else if(!board[0][0] && !board[0][1] && !board[0][2] && !board[1][0] && !board[1][1] && !board[1][2]
                && !board[2][0] && !board[2][1] && !board[2][2]) {
                    let gameResult = document.createElement('div');
                    gameResult.textContent = 'Tie!'
                    let body = document.querySelector('body');
                    body.appendChild(gameResult);
                }
    }
    


    return {
        display, addMarker, resetData, checkGameOver, board
    };
})();
    

const gameController = (() => {
    
    let turn = 1;
    
    function startRound() {
        const startButton = document.querySelector('.startButton');
        startButton.remove();
        const newStartButton = document.createElement('button');
        newStartButton.classList.add('startButton');
        newStartButton.setAttribute('type', 'button');
        newStartButton.textContent = 'Start';
        const divStartButton = document.querySelector('.divStartButton');
        divStartButton.prepend(newStartButton);

        turn = 1;
        gameBoard.display();
        cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', gameController.playRound)
        });
    }
        

    function currentPlayer() {
        if (turn % 2 !== 0) {
            return playerOne;
        }
        else if (turn % 2 === 0) {
            return playerTwo;
        }
    }


            
    function playRound(e) {
        row = e.target.dataset.rows;
        console.log(row);
        column = e.target.dataset.columns;
        console.log(column);
        gameBoard.addMarker(row, column);
        console.log(turn);
        e.target.removeEventListener('click', playRound);
        gameBoard.checkGameOver();
        turn++;
        };
    

    return { startRound, playRound, currentPlayer, turn

    }; 
})();

const Player = (name, marker) => {

    return {name, marker};
};


const createName = (() => {

    buttonPlayerOne = document.querySelector('.buttonPlayerOne');
    buttonPlayerOne.addEventListener('click', storeNamePlayerOne);

    buttonPlayerTwo = document.querySelector('.buttonPlayerTwo');
    buttonPlayerTwo.addEventListener('click', storeNamePlayerTwo);

    function createStart() {
        if((document.querySelector('.buttonPlayerOne') === null) && (document.querySelector('.buttonPlayerTwo') === null)) {
            const wholeContainer = document.querySelector('.wholeContainer');
            const divStartButton = document.createElement('div');
            divStartButton.classList.add('divStartButton')
            const startButton = document.createElement('button');
            startButton.classList.add('startButton');
            startButton.setAttribute('type', 'button');
            startButton.textContent = 'Start'
            const restartButton = document.createElement('button');
            restartButton.classList.add('restartButton');
            restartButton.setAttribute('type','button');
            restartButton.textContent = 'Restart';
            divStartButton.appendChild(startButton);
            divStartButton.appendChild(restartButton);
            wholeContainer.appendChild(divStartButton);
            startButton.addEventListener('click', gameController.startRound);
            restartButton.addEventListener('click', gameBoard.resetData);
        }
    }
    
    function storeNamePlayerOne() {
        let playerOneName = document.querySelector('#playerOneName').value;
        playerOne = Player(playerOneName, 'X');
        let deleteOne = document.querySelectorAll('.deleteOne');
        deleteOne.forEach((item) => item.remove());
        let pOne = document.createElement('p');
        pOne.textContent = playerOne.name;
        pOne.classList.add('name');
        let fieldsetOne = document.querySelector('.fieldsetOne');
        fieldsetOne.appendChild(pOne);
        createName.createStart();

    }

    function storeNamePlayerTwo() {
        let playerTwoName = document.querySelector('#playerTwoName').value;
        playerTwo = Player(playerTwoName, 'O');
        let deleteTwo = document.querySelectorAll('.deleteTwo');
        deleteTwo.forEach((item) => item.remove());
        let pTwo = document.createElement('p');
        pTwo.textContent = playerTwo.name;
        pTwo.classList.add('name');
        let fieldsetTwo = document.querySelector('.fieldsetTwo');
        fieldsetTwo.appendChild(pTwo);
        createName.createStart();
    }



    return {createStart}
})();


