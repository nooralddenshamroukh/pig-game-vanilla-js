'use strict';

let score1 = document.getElementById('score--0');
let score2 = document.getElementById('score--1');
let current_score1 = document.getElementById('current--0');
let current_score2 = document.getElementById('current--1');
let dice = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');
let rules = document.querySelector('.rules');
let instructions = document.querySelector('.instructions');
let cross = document.querySelector('.cross');
let overlay = document.querySelector('.overlay');

function getRules() {
  instructions.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeRules() {
  instructions.classList.add('hidden');
  overlay.classList.add('hidden');
}

score1.textContent = 0;
score2.textContent = 0;
current_score1.textContent = 0;
current_score2.textContent = 0;
dice.style.display = 'none';

let activePlayer = 0; // player1 = 0 , player2 = 1
let current = 0; //variable to store the current score , since we can't store it directly to the HTML elemnts
let mainScore = [0, 0]; //array to store the main scores , since we can't store it directly to the HTML elemnts , here we used an array because each index represnts a player

//*since we will need to switch players more than once in our code its better to use a function for that
let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //reset the score on the UI/DOM
  current = 0; //restetting the score in our program
  activePlayer = activePlayer === 0 ? 1 : 0; //if player1 active then switch to p2 if its not return to p1
  player1.classList.toggle('player--active'); //if player 1 has this class remove it and if its not add it
  player2.classList.toggle('player--active'); //if player 2 has this class remove it and if its not add it
  //*by that we essures that will be only one player active at a time
};

//roll function :
let rollActive = true;
btnRoll.addEventListener('click', function onRoll() {
  if (!rollActive) return;

  let random = Math.trunc(Math.random() * 6) + 1;
  console.log(random);
  dice.src = `dice-${random}.png`;
  dice.style.display = 'block';

  if (random !== 1) {
    current += random;
    //at default the activePlayer will be player 1;
    document.getElementById(`current--${activePlayer}`).textContent = current;
    //if random === 1
  } else {
    //now we will call the switch player function that we made before to switch to the another player
    switchPlayer();
  }
});

//hold function :
let holdActive = true;
btnHold.addEventListener('click', function onHold() {
  if (!holdActive) return;

  //based on the active player the main score will increased
  mainScore[activePlayer] += current;
  document.getElementById(`score--${activePlayer}`).textContent =
    mainScore[activePlayer];

  if (mainScore[activePlayer] >= 100) {
    //adding the winner class to the winner player which is cuurently active
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    //removing the activity of the current player because he already won
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
    dice.style.display = 'none';
    rollActive = false; //stop roll function
    holdActive = false; // stop the hold function
  }
  //now we will switch to the another player
  switchPlayer();
});

//new game function
btnNew.addEventListener('click', function () {
  //clear all element values from the JS
  activePlayer = 0; // return the activity to player 1 in JS
  current = 0;
  mainScore = [0, 0];
  //clear all element values from the UI
  score1.textContent = 0;
  score2.textContent = 0;
  current_score1.textContent = 0;
  current_score2.textContent = 0;
  dice.style.display = 'none';
  //re-activate the functions
  rollActive = true;
  holdActive = true;
  //removing the winner class of the current active player
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  //return activity to player1
  player1.classList.add('player--active'); // return the activity to player 1 in UI
  player2.classList.remove('player--active');
});
