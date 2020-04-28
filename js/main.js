const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

const gameboard = (() => {
  

  const cells = document.querySelectorAll('[data-index]');
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;
  const getCells = () => cells;
  const setBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    return board;
  };

  return { getBoard, setBoard, getCells };
})();

const gameController = (() => {

  let playerOne;
  let playerTwo;

  const boardreply = document.querySelector('.message');
  let currentPlayer;
  const cells = gameboard.getCells();
  const addPlayerForm = document.querySelector('#user-input');
  const restartBtn = document.querySelector('#restart');
  const boardTable = document.querySelector('.board');
  const response = document.querySelector('.response');
  const onGoingMsg = document.querySelector('.onGoingMsg');

  const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const changePlayer = () => {
    currentPlayer.getMark() === 'x'
      ? (currentPlayer = playerTwo)
      : (currentPlayer = playerOne);
  };

  const endGame = (message) => {
    boardreply.innerHTML = message;
    boardTable.classList.add('end-game');
    response.style.display = 'flex';
  };

  const addMark = (e) => {
    const index = e.target.getAttribute('data-index');
    e.target.classList.add(currentPlayer.getMark());

    const board = gameboard.getBoard();
    board[index] = currentPlayer;

    // eslint-disable-next-line no-use-before-define
    if (checkGame(currentPlayer) === true) {
      endGame(`The winner is ${currentPlayer.getName()}!`);
    // eslint-disable-next-line no-use-before-define
    } else if (boardIsFull()) {
      endGame("Game Over, It's a tie!");
    } else changePlayer();

    onGoingMsg.innerHTML = `It's ${currentPlayer.getName()}'s turn!`;
  };

  const checkGame = (currentPlayer) => {
    const currentBoard = gameboard.getBoard();
    return winningPosition.some((arr) => {
      return arr.every((item) => {
        return currentBoard[item] === currentPlayer;
      });
    });
  };

  const boardIsFull = () => {
    const getCurrentBoard = gameboard.getBoard();
    return !getCurrentBoard.includes('');
  };

  const resetBoard = () => {
    currentPlayer = playerOne;
    for (let index = 0; index < cells.length; index+= 1) {
      cells[index].classList.remove('x');
      cells[index].classList.remove('o');
    }
    gameboard.setBoard();
  };

  const resetClick = () => {
    [...cells].forEach((cell) => {
      cell.removeEventListener('click', addMark);
      cell.addEventListener('click', addMark, { once: true });
    });
  };

  restartBtn.addEventListener('click', () => {
    onGoingMsg.innerHTML = `It's ${playerOne.getName()}'s turn!`;
    // eslint-disable-next-line no-use-before-define
    startGame();
  });

  addPlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const player1 = e.target.elements[0].value;
    const player2 = e.target.elements[1].value;

    playerOne = Player(player1, 'x');
    playerTwo = Player(player2, 'o');

    onGoingMsg.innerHTML = `It's ${playerOne.getName()}'s turn!`;
    addPlayerForm.style.display = 'none';

    // eslint-disable-next-line no-use-before-define
    startGame();
  });

  const startGame = () => {
    response.style.display = 'none';
    boardTable.classList.remove('end-game');
    boardreply.innerHTML = '';
    resetBoard();
    resetClick();
  };

  return { startGame };
})();

gameController.startGame();
