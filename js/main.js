const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

const playerOne = Player('jeff', 'x');
const playerTwo = Player('jeff', 'o');

const gameboard = (() => {
  'use strict';

  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;
  const cells = document.querySelectorAll('[data-index]');

  let currentPlayer = playerOne.getMark();

  function changePlayer() {
    if (currentPlayer === 'x') currentPlayer = 'o';
    else currentPlayer = 'x';
  }

  const addMark = (e) => {
    let index = e.target.getAttribute('data-index');
    e.target.classList.add(currentPlayer);
    board[index] = currentPlayer;
    let gameState = gameController.checkGame(currentPlayer);
    if (gameState === true) {
      console.log(`The winner is ${currentPlayer}`);
    }
    changePlayer();
  };

  [...cells].forEach((cell) => {
    cell.addEventListener('click', addMark, { once: true });
  });

  return { getBoard };
})();

const gameController = (() => {
  'use strict';

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

  const checkGame = (currentPlayer) => {
    let currentBoard = gameboard.getBoard();

    return winningPosition.some((arr) => {
      return arr.every((item) => {
        return currentBoard[item] === currentPlayer;
      });
    });
  };

  const checkBoard = () => {};
  const resetBoard = () => {};

  return { checkGame, checkBoard, resetBoard };
})();
