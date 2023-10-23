"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
//buttons
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const holdScore = document.querySelector(".btn--hold");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const diceImg = document.querySelector(".dice");
const currentScores = document.querySelectorAll(".current-score");
const currentLabels = document.querySelectorAll(".current-label");

const switchPlayerFunc = (playerNum) => {
    player1.classList.toggle("player--active");
    player0.classList.toggle("player--active");
    playerNum === 0 ? (activePlayer = 1) : (activePlayer = 0);
    for (let i = 0; i < currentLabels.length; i++) {
        currentLabels[i].classList.toggle("hidden");
    }
};
const winnerFunc = (playerNum) => {
    setTimeout(function () {
        alert(`Player ${playerNum} wins!`);
    }, 700);
    switchPlayerFunc(activePlayer);
    playerNum === 1
        ? player0.classList.add("player--winner")
        : player1.classList.add("player--winner");
    diceImg.classList.add("hidden");
};
const buttonDisable = () => {
    rollDice.disabled = true;
    holdScore.disabled = true;
};
const diceShow = (diceNumber) => {
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${diceNumber}.png`;
};

const newGameFunc = () => {
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
    currentLabels[0].classList.remove("hidden");
    currentLabels[1].classList.add("hidden");
    activePlayer = 0;
    currentScore = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    rollDice.disabled = false;
    holdScore.disabled = false;
    diceImg.classList.add("hidden");
    for (let i = 0; i < currentScores.length; i++) {
        currentScores[i].textContent = 0;
    }
    for (let i = 0; i < scores.length; i++) {
        scores[i] = 0;
    }
};
newGame.addEventListener("click", newGameFunc);
//rolling the dice functionality
const rollDiceFunc = () => {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    if (diceNumber !== 1) {
        diceShow(diceNumber);
        currentScore += diceNumber;
        document.querySelector(`#current--${activePlayer}`).textContent =
            currentScore;
    } else {
        diceShow(diceNumber);
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        switchPlayerFunc(activePlayer);
    }
};
rollDice.addEventListener("click", rollDiceFunc);
//hold button functionality and win condition
const holdScoreFunc = () => {
    if (activePlayer === 0) {
        scores[0] += currentScore;
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        score0.textContent = scores[0];
        switchPlayerFunc(activePlayer);
        currentScore = 0;
        if (scores[0] >= 100) {
            winnerFunc(1);
            buttonDisable();
        }
    } else {
        scores[1] += currentScore;
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        score1.textContent = scores[1];
        switchPlayerFunc(activePlayer);
        currentScore = 0;
        if (scores[1] >= 100) {
            winnerFunc(2);
            buttonDisable();
        }
    }
};
holdScore.addEventListener("click", holdScoreFunc);
