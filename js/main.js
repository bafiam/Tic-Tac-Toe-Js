const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

const gameboard = (() => {
  'use strict';

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
  'use strict';

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

    if (checkGame(currentPlayer) === true) {
      endGame(`The winner is ${currentPlayer.getName()}!`);
    } else if (boardIsFull()) {
      endGame("Game Over, It's a tie!");
    } else changePlayer();

    onGoingMsg.innerHTML = `It's ${currentPlayer.getName()}'s turn!`;
  };

  const checkGame = (currentPlayer) => {
    let currentBoard = gameboard.getBoard();
    return winningPosition.some((arr) => {
      return arr.every((item) => {
        return currentBoard[item] === currentPlayer;
      });
    });
  };

  const boardIsFull = () => {
    let getCurrentBoard = gameboard.getBoard();
    return !getCurrentBoard.includes('');
  };

  const resetBoard = () => {
    currentPlayer = playerOne;
    for (let index = 0; index < cells.length; index++) {
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
    startGame();
  });

  addPlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let player1 = e.target.elements[0].value;
    let player2 = e.target.elements[1].value;

    playerOne = Player(player1, 'x');
    playerTwo = Player(player2, 'o');

    onGoingMsg.innerHTML = `It's ${playerOne.getName()}'s turn!`;

    startGame();
  });

  const startGame = () => {
    addPlayerForm.style.display = 'none';
    response.style.display = 'none';
    boardTable.classList.remove('end-game');
    boardreply.innerHTML = '';
    resetBoard();
    resetClick();
  };

  return { startGame };
})();
