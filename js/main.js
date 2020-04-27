const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

const playerOne = Player('jeff', 'x');
const playerTwo = Player('stephen', 'o');

const gameboard = (() => {
  'use strict';

  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;
  const setBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    return board;
  }

  let boardreply = document.querySelector('.message')

  const cells = document.querySelectorAll('[data-index]');


  let currentPlayer = playerOne.getMark();

  

  function changePlayer() {
    if (currentPlayer === 'x') currentPlayer = playerTwo.getMark();
    else currentPlayer = 'x';
  }

  function playerName(mark) {
    if (mark === 'x') {
      return playerOne.getName();
      
    } else {
      return playerTwo.getName();
      
    }
    
  }

  const addMark = (e) => {
    let index = e.target.getAttribute('data-index');
    e.target.classList.add(currentPlayer);
    board[index] = currentPlayer;
    let gameState = gameController.checkGame(currentPlayer);
    if (gameState === true) {
      boardreply.innerHTML = `The winner is ${playerName(currentPlayer)}`
      gameController.resetBoard();
      setBoard();
      resetClick(cells);
    }else{
      let boardFull = gameController.checkBoard()
      if (!boardFull) {
        console.log(`Game end, draw!!`);
       
        gameController.resetBoard();
        setBoard();
        resetClick(cells);
      }

    }
    changePlayer();
  };
  
  
  function callFunc(cells){ 
    [...cells].forEach((cell) => {
    cell.addEventListener('click', addMark, { once: true });
  });}

  callFunc(cells);

  function resetClick(cells){ 
    [...cells].forEach((cell) => {
    cell.removeEventListener('click', addMark);
    cell.addEventListener('click', addMark)

  });}

  


  return { getBoard, callFunc };
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

  const checkBoard = () => {
    let getCurrentBoard = gameboard.getBoard();
    return getCurrentBoard.includes('')
  };
  const resetBoard = () => {
    gameboard.currentPlayer = playerOne.getMark();
    let allCells = document.querySelectorAll('[data-index]');
    for (let index = 0; index < allCells.length; index++) {
      allCells[index].classList.remove('x');
      allCells[index].classList.remove('o');
      
    }


  };

  return { checkGame, checkBoard, resetBoard };
})();
