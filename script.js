'use strict';
// Selecting element
const playerEl1 = document.querySelector('.player--0');
const playerEl2 = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

score1El.textContent = '0';
score2El.textContent = '0';

const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');
const newDice = document.querySelector('.btn--new');

let currentScore = 0;
let activePlayer = 0;
let playing = true;
let scores = [0, 0];

rollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      playerEl1.classList.toggle('player--active');
      playerEl2.classList.toggle('player--active');
    }
  }
});

holdDice.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      playerEl1.classList.toggle('player--active');
      playerEl2.classList.toggle('player--active');
    }
  }
});
newDice.addEventListener('click', function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  for (let i = 0; i < 2; i++) {
    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = 0;
    document.querySelector(`.player--${i}`).classList.remove('player--winner');
  }
  playerEl1.classList.add('player--active');
  playerEl2.classList.remove('player--active');
});
