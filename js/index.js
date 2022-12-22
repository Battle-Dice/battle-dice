'use strict';

const diceOptionsArray = [ 6, 12, 20 ];
const gameObject = {
  name: 'Player 1',
  bloodType: 'unknown',
  diceOption: 6,
};

// DOM ELEMENTS

const diceOptionsDiv = document.getElementById('diceOptions');
const nameInput = document.getElementById('nameInput');
const bloodTypeInput = document.getElementById('bloodTypeInput');
const readyToRollButton = document.getElementById('readyToRollButton');

// EVENT LISTENERS

diceOptionsDiv.addEventListener('click', function(event) {
  if (event.target.tagName === 'DIV') {
    gameObject.diceOption = event.target.innerText;
  }
});

nameInput.addEventListener('input', function(event){
  gameObject.name = event.target.value;
});

bloodTypeInput.addEventListener('input', function(event) {
  gameObject.bloodType = event.target.value;
});

readyToRollButton.addEventListener('click', function() {
  const stringyGameObject = JSON.stringify(gameObject);
  localStorage.setItem('gameObject', stringyGameObject);
  window.location.href = './play.html';
});

// RUNTIME FUNCTIONS

const buildDiceOptions = function() {
  for (let i = 0; i < diceOptionsArray.length; i++) {
    const newDiceDiv = document.createElement('div');
    newDiceDiv.innerText = diceOptionsArray[i];
    diceOptionsDiv.appendChild(newDiceDiv);
  }
};

buildDiceOptions();
