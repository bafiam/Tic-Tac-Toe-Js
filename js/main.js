var gameboard = (function() {
  'use strict';
  const board = () => [ "","","","","","","","",""];
  return{
    board
  };

})();

const Player = (name, mark) => {

  const getName  = () => name;
  const getMark  = () => mark;

  return {getName, getMark};

}

const playerOne = Player('jim', "O");
const playerTwo = Player('jeff', "X");

// console.log(playerOne.getName());
// console.log(playerOne.getMark());
// console.log(playerTwo.getName());
// console.log(playerTwo.getMark());