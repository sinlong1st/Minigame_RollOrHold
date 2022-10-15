'use strict';
/// Select the elements
const score0El = document.querySelector('#score--0'); //total score p1
const score1El = document.getElementById('score--1'); //total score p2
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0'); //current score for p1
const current1El = document.getElementById('current--1'); //current score for p2
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');

let scoreBoard, currentScore, activePlayer;
let playing = false;
const initNewGame = () => {
  // The dice shouldn't appear at the beginning of the game
  // so we need to hide it at first, by add hidden to its class
  // (remember to set up hidden (display:none) in CSS file)
  diceEl.classList.add('hidden');
  // Beginning condition
  scoreBoard = [0, 0];
  currentScore = 0;
  playing = true; // To see if the game is playing or we had winner
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.querySelector('.resultBoard').classList.add('hidden'); // Hide the resultBoard if it's there
  activePlayer = 0; // Player 1 will play first
  player0El.classList.add('player--active'); // Make player 1 active (with css)
  player1El.classList.remove('player--active'); // Remove active of player 2 (if it has)
  // Remove winning effect (if have, if not JS won't do anything harmful)
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // Hide result board if it's there
  // document.querySelector('.resultBoard').classList.add('hidden');
  document.querySelector('.resultBoard').textContent = 'Winner: ???';
};

// Start a new game
initNewGame();

// Switch player function
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
};
// Rolling event
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice/die
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Show the die
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //diceEl.classList.add('rotate');

    // Check rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score of the active player
    scoreBoard[activePlayer] += currentScore;
    // Display the total score of active player
    // Instead of using if/else, we can still use the dynamic way with getElebyID
    document.getElementById(`score--${activePlayer}`).textContent =
      scoreBoard[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // Check if player goes over 100 points
    if (scoreBoard[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
      document.querySelector('.resultBoard').textContent = `Winner: Player ${
        activePlayer + 1
      }`;
      // document.querySelector('.resultBoard').classList.remove('hidden');
    } else {
      // If active player's point is not over 100, keep playing and switching player
      // Switch player
      // If this is not the beginning of the game, just switch player like normal.
      // This condition is to make sure at the beginning of the game, the Hold feature doesn't
      // working
      if (!diceEl.classList.contains('hidden')) {
        switchPlayer();
      }
    }
  }
});

btnNew.addEventListener('click', initNewGame);

// score0El.textContent = scoreBoard[0];
// score1El.textContent = scoreBoard[1];
