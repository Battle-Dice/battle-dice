'use strict';

// DOM ELEMENTS

const rollDiceButton = document.getElementById('rollDice');
const playerDiceDiv = document.getElementById('playerDice');
const botDiceDiv = document.getElementById('botDice');
const batttleOutcomeDiv = document.getElementById('battleOutcome');
const winColumn = document.getElementById('winColumn');
const lossColumn = document.getElementById('lossColumn');
const drawColumn = document.getElementById('drawColumn');
const tableFootHeaders = document.getElementById('footHeaders');
const playerNameElement = document.getElementById('playerName');
const botNameElement = document.getElementById('botName');

// DEFAULT GAME OBJECT

const gameObject = {
  name: 'Player 1',
  bloodType: 'unknown',
  diceOption: 6,
};

const resultsObject = {
  win: 0,
  loss: 0,
  draw: 0,
  history: []
};

// CONSTRUCTORS

function Dice(diceOption) {
  this.diceArray = [];

  for (let i = 1; i < (parseInt(diceOption) + 1); i++) {
    this.diceArray.push(i);
  }
}

// PROTOTYPE METHODS

Dice.prototype.rollDice = function() {
  const diceArrayIndex = Math.floor(Math.random() * this.diceArray.length);
  const diceRoll = this.diceArray[diceArrayIndex];
  return diceRoll;
};

// EVENT LISTENERS
rollDiceButton.addEventListener('click', function() {
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
    batttleOutcomeDiv.innerText = 'WIN';
    winColumn.innerText = resultsObject.win;
  } else if (playerRollResult < botRollResult) {
    resultsObject.loss++;
    gameResult.result = 'Loss';
    batttleOutcomeDiv.innerText = 'LOSS';
    lossColumn.innerText = resultsObject.loss;
  } else if (playerRollResult === botRollResult) {
    resultsObject.draw++;
    gameResult.result = 'Draw';
    batttleOutcomeDiv.innerText = 'DRAW';
    drawColumn.innerText = resultsObject.draw;
  }

  resultsObject.history.push(gameResult);

  const rollHistoryTr = document.createElement('tr');
  rollHistoryTr.classList.add('rollHistoryTr');
  for (let property in gameResult) {
    console.log(gameResult[property]);
    const rollHistoryTd = document.createElement('td');
    rollHistoryTd.innerText = gameResult[property];
    rollHistoryTr.appendChild(rollHistoryTd);
  }
  tableFootHeaders.after(rollHistoryTr);
});

// LOCAL STORAGE LOAD

if (localStorage.getItem('gameObject')) {
  const stringyGameObject = localStorage.getItem('gameObject');
  const parsedGameObject = JSON.parse(stringyGameObject);

  gameObject.name = parsedGameObject.name;
  gameObject.bloodType = parsedGameObject.bloodType;
  gameObject.diceOption = parsedGameObject.diceOption;
}

const currentDice = new Dice(gameObject.diceOption);
playerNameElement.innerText = gameObject.name;
botNameElement.innerText = 'Bot';

