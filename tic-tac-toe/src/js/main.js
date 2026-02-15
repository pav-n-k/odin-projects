import '@styles/style.css';

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const setToken = (coordinate, player) => {
        const [x, y] = coordinate;
        const currentCell = board[x][y];
        currentCell.setValue(player.getToken());
    };

    const isValidCell = (coordinate) => {
        const [x, y] = coordinate;
        if (x >= columns || x < 0 || y >= rows || y < 0) return false;
        return board[x][y].getValue() !== 'X' && board[x][y].getValue() !== 'O';
    };

    return { getBoard, setToken, isValidCell };
}

function Cell() {
    let value = '';

    function setValue(newValue) {
        value = newValue;
    }

    function getValue() {
        return value;
    }

    return {
        setValue,
        getValue
    };
}

function GameController() {
    const board = Gameboard();

    const players = [
        {
            name: 'Player X',
            token: 'X',
            getToken() {
                return this.token;
            },
            isWin: false
        },
        {
            name: 'Player O',
            token: 'O',
            getToken() {
                return this.token;
            },
            isWin: false
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const isGameOver = () => {
        const grid = board
            .getBoard()
            .map((row) => row.map((data) => data.getValue()));
        const activeToken = getActivePlayer().getToken();
        switch (activeToken.repeat(grid.length)) {
            case `${grid[0][0]}${grid[0][1]}${grid[0][2]}`:
            case `${grid[1][0]}${grid[1][1]}${grid[1][2]}`:
            case `${grid[2][0]}${grid[2][1]}${grid[2][2]}`:
            case `${grid[0][0]}${grid[1][0]}${grid[2][0]}`:
            case `${grid[0][1]}${grid[1][1]}${grid[2][1]}`:
            case `${grid[0][2]}${grid[1][2]}${grid[2][2]}`:
            case `${grid[0][0]}${grid[1][1]}${grid[2][2]}`:
            case `${grid[2][0]}${grid[1][1]}${grid[0][2]}`:
                getActivePlayer().isWin = true;
                return true;
        }
        const emptyCells = grid.flat().filter((value) => value === '').length;
        if (emptyCells === 0) return true;
        return false;
    };

    const playRound = (x, y, printMessage) => {
        printMessage(
            `Set ${getActivePlayer().name}'s token into x: ${x} and y: ${y}...`
        );
        if (board.isValidCell([x, y])) {
            board.setToken([x, y], getActivePlayer());
            if (isGameOver()) {
                if (getActivePlayer().isWin) {
                    printMessage(
                        `${getActivePlayer().name} is win. Game is over!`,
                        true
                    );
                } else {
                    printMessage('Nobody won the game. Game is over!', true);
                }
                return;
            }
            switchPlayerTurn();
        } else {
            printMessage('Enter valid coordinate!');
            return;
        }
    };

    return {
        playRound,
        getActivePlayer,
        isGameOver,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    document.getElementById('current-year').textContent =
        new Date().getFullYear();
    let game = GameController();
    const gameResult = document.getElementById('game-result');
    const playerTurnMessage = document.getElementById('player-turn');
    const gridContainer = document.getElementById('grid');
    const resetBtn = document.getElementById('reset-btn');

    const resetGame = () => {
        gridContainer.innerHTML = '';
        gameResult.textContent = 'Set player [?] token into x: ... and y: ...';
        playerTurnMessage.textContent = '[?]';
        game = GameController();
        renderGrid();
    };

    const renderGrid = () => {
        if (gridContainer.classList.contains('disabled'))
            gridContainer.classList.remove('disabled');
        const board = game.getBoard();
        const newCells = board.flatMap((row, indexRow) => {
            return row.map((data, indexCell) => {
                const value = data.getValue();
                const cell = document.createElement('button');
                cell.classList.add('cell');
                cell.dataset.x = indexCell;
                cell.dataset.y = indexRow;
                cell.textContent = value;
                return cell;
            });
        });
        gridContainer.append(...newCells);
        bindEvents();
    };

    const bindEvents = () => {
        gridContainer.addEventListener('click', clickHandlerGrid);
        resetBtn.addEventListener('click', resetGame);
    };

    const removeEvents = () => {
        gridContainer.removeEventListener('click', clickHandlerGrid);
    };

    const printMessage = (message, isGameOver = false) => {
        gameResult.textContent = message;
        if (isGameOver) {
            playerTurnMessage.textContent = '[-]';
            removeEvents();
            gridContainer.classList.add('disabled');
        }
    };

    const clickHandlerGrid = (evt) => {
        const cell = evt.target;
        const activePlayer = game.getActivePlayer();
        if (!cell || !cell.classList.contains('cell')) return;
        if (cell.textContent === 'X' || cell.textContent === 'O') return;
        playerTurnMessage.textContent = `${activePlayer.name}'s turn...`;
        const [x, y] = [cell.dataset.x, cell.dataset.y];
        cell.textContent = activePlayer.getToken();
        if (cell.textContent === 'X') cell.classList.add('cell--x');
        if (cell.textContent === 'O') cell.classList.add('cell--o');
        game.playRound(x, y, printMessage);
    };

    renderGrid();
}

ScreenController();
