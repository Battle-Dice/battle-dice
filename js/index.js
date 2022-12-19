'use strict';

const diceOptionsArray = [ 6, 12, 20 ];

const diceOptionsDiv = document.getElementById('diceOptions');

// diceOptionsDiv.addEventListener('click', function(event) {
//   if (event.target.tagName === 'DIV') {
//     console.log(event.target.innerText);
//   }
// });

const buildDiceOptions = function() {
  for (let i = 0; i < diceOptionsArray.length; i++) {
    const newDiceDiv = document.createElement('div');
    newDiceDiv.innerText = diceOptionsArray[i];
    diceOptionsDiv.appendChild(newDiceDiv);
  }
};

buildDiceOptions();
