window.addEventListener('DOMContentLoaded', () => {     //the event listener makes sure that the DOM content from the html page is loaded first inside the web browser when it is run.
    
    const tiles = Array.from(document.querySelectorAll('.tile'));       //this constant will store the information inside the tiles as an array.
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', '',];  //9 empty values in the array
    let currentPlayer = 'X';        //the first player
    let isGameActive = true;        //boolean

    const PLAYERX_WON = 'PLAYERX_WON';      // first player wins
    const PLAYERO_WON = 'PLAYERO_WON';      //second player wins
    const TIE = 'TIE';      //game is tied

    const winningConditions = [     
        [0, 1, 2],      //horizontal
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],      //vertical
        [1, 4, 7],
        [2, 5, 8],      
        [0, 4, 8],      //diagonal
        [2, 4, 6]
    ];

    function handleResultValidation() {         //this function determines the winner
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {      //loop
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];       
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);        //Conditional operator will execute an expression if the condition is truthy. The expression after the colon will execute if the condition is falsy.
            isGameActive = false;
            return;
        }
        if (!board.includes(''))        //if the board includes blank then it is a tie.
            announce (TIE);
    }

    const announce = (type) => {
        switch(type) {      //depending on the type, the following announcement will be given.
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'This is a tie. Try Again!';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }

        return true;
    };

    const updateBoard = (index) => {        //updates the board will the game is being played.
        board[index] = currentPlayer;
    }

    const changePlayer = () => {        //This changes the player after another player's turn has ended.
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X'?'O':'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {      //this resets the board after clicking on the reset button.
        board = ['', '', '', '', '', '', '', '', '',];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach((tile, index) => {        //this registers the clicks on each box/tile
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);  //click resets the board.
});