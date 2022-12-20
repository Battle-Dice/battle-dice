'use strict';

// DOM ELEMENTS

const rollDiceButton = document.getElementById('rollDice');
const playerDiceDiv = document.getElementById('playerDice');
const botDiceDiv = document.getElementById('botDice');
const batttleOutcomeDiv = document.getElementById('battleOutcome');

// DEFAULT GAME OBJECT

const gameObject = {
  name: 'Player 1',
  bloodType: 'unknown',
  diceOption: 6,
};

const resultsObject = {
  win: 0,
  loss: 0,
  tie: 0,
  history: []
};

// LOCAL STORAGE LOAD

if (localStorage.getItem('gameObject')) {
  const stringyGameObject = localStorage.getItem('gameObject');
  const parsedGameObject = JSON.parse(stringyGameObject);

  gameObject.name = parsedGameObject.name;
  gameObject.bloodType = parsedGameObject.bloodType;
  gameObject.diceOption = parsedGameObject.diceOption;
}

// CONSTRUCTORS

function Dice(diceOption) {
  this.diceArray = [];

  for (let i = 1; i < diceOption + 1; i++) {
    this.diceArray.push(i);
  }
}

// PROTOTYPE METHODS

Dice.prototype.rollDice = function() {
  const diceRoll = Math.floor(Math.random() * this.diceArray.length);
  return diceRoll;
};

// EVENT LISTENERS
rollDiceButton.addEventListener('click', function() {
  const currentDice = new Dice(gameObject.diceOption);
  const playerRollResult = currentDice.rollDice();
  const botRollResult = currentDice.rollDice();
  playerDiceDiv.innerText = playerRollResult;
  botDiceDiv.innerText = botRollResult;

  const gameResult = {
    player: playerRollResult,
    bot: botRollResult,
    result: null,
  };

  if (playerRollResult > botRollResult) {
    resultsObject.win++;
    gameResult.result = 'Win';
    batttleOutcomeDiv.innerText = 'WIN!';
  } else if (playerRollResult < botRollResult) {
    resultsObject.loss++;
    gameResult.result = 'Loss';
    batttleOutcomeDiv.innerText = 'LOSS!';
    // `You have lost the battle, but we'll send some ${gameObject.bloodType} blood your way.`;
  } else if (playerRollResult === botRollResult) {
    gameResult.result = 'Tie';
    resultsObject.tie++;
    batttleOutcomeDiv.innerText = 'DRAW';
  }

  resultsObject.history.push(gameResult);
});
