'use strict';

let winScore = 30;

class Player {
    constructor(playerDiv, textHolder, globalScore, localScore) {
        this.playerDiv = playerDiv;
        this.textHolder = textHolder;
        this.globalScore = globalScore;
        this.localScore = localScore;
        this.lastValue = -1;
    }

    setActive() {
        if (!this.playerDiv.classList.contains('player--active')) {
            this.playerDiv.classList.add('player--active');
        }
    }

    removeActive() {
        if (this.playerDiv.classList.contains('player--active')) {
            this.playerDiv.classList.remove('player--active');
        }
    }

    setWinner() {
        if (!this.playerDiv.classList.contains('player--winner')) {
            this.playerDiv.classList.add('player--winner');
        }
    }

    removeWinner() {
        if (this.playerDiv.classList.contains('player--winner')) {
            this.playerDiv.classList.remove('player--winner');
        }
    }

    setText(text) {
        this.textHolder.innerHTML = text;
    }

    setLocalScore(newScore) {
        this.localScore.innerHTML = newScore.toString();
    }

    setGlobalScore(newScore) {
        this.globalScore.innerHTML = newScore.toString();
    }

    getLocalScore() {
        return Number(this.localScore.innerHTML);
    }

    getGlobalScore() {
        return Number(this.globalScore.innerHTML);
    }

    isActive() {
        return this.playerDiv.classList.contains('player--active');
    }

    incLocalScoreBy(value) {
        let newScore = this.getLocalScore() + value;
        this.setLocalScore(newScore);
    }

    incGlobalScoreBy(value) {
        this.setGlobalScore(this.getGlobalScore() + value);
    }

    setLastValue(value) {
        this.lastValue = value;
    }

    gotLastSix() {
        return this.lastValue === 6;
    }
}

class Dice {
    constructor(image, value) {
        this.image = image;
        this.value = value;
    }

    hide() {
        this.image.style.display = 'none';
    }

    unHide() {
        this.image.style.display = 'block';
    }

    setValue(value) {
        this.value = value;
        this.image.src = 'dice-' + (value) + '.png'
    }

    getValue() {
        return this.value;
    }

}

let playerOneDiv = document.querySelector('.player--0');
let playerOneText = document.getElementById('name--0');
let playerOneScore = document.getElementById('score--0');
let playerOneCurScore = document.getElementById('current--0');
let playerOne = new Player(playerOneDiv, playerOneText, playerOneScore, playerOneCurScore);

let playerTwoDiv = document.querySelector('.player--1');
let playerTwoText = document.getElementById('name--1');
let playerTwoScore = document.getElementById('score--1')
let playerTwoCurScore = document.getElementById('current--1')
let playerTwo = new Player(playerTwoDiv, playerTwoText, playerTwoScore, playerTwoCurScore);

let diceOne = new Dice(document.querySelector('.dice-1'), null);
let diceTwo = new Dice(document.querySelector('.dice-2'), null);

function rollAndSetDice(dice) {
    let value = Math.round(Math.random() * 5) + 1;
    dice.setValue(value);
}

let rollButton = document.querySelector('.btn--roll')
rollButton.addEventListener('click', () => {
    rollAndSetDice(diceOne);
    diceOne.unHide();

    rollAndSetDice(diceTwo);
    diceTwo.unHide();

    let curPlayer = playerOne.isActive() ? playerOne : playerTwo;

    let firstDiceValue = diceOne.getValue();
    let secondDiceValue = diceTwo.getValue();
    if (firstDiceValue === 1 || secondDiceValue === 1) {
        // Change the player
        switchPlayer();
    } else {
        // Add value to the player's current score
        curPlayer.incLocalScoreBy(firstDiceValue + secondDiceValue);
    }
});

let holdButton = document.querySelector('.btn--hold');
holdButton.addEventListener('click', () => {
    let curPlayer = playerOne.isActive() ? playerOne : playerTwo;
    curPlayer.incGlobalScoreBy(curPlayer.getLocalScore());

    if (curPlayer.getGlobalScore() >= winScore) {
        curPlayer.setWinner();
        rollButton.style.display = 'none';
        holdButton.style.display = 'none';
    }

    curPlayer.setLocalScore(0);
    curPlayer.setLastValue(-1);
    switchPlayer();
})

function initialize() {
    playerOne.setText('Player 1');
    playerTwo.setText('Player 2');

    playerOne.setGlobalScore(0);
    playerTwo.setGlobalScore(0);

    playerOne.setLocalScore(0);
    playerTwo.setLocalScore(0);

    playerOne.setActive();
    playerTwo.removeActive();

    playerOne.removeWinner();
    playerTwo.removeWinner();

    rollButton.style.display = 'block';
    holdButton.style.display = 'block';

    diceOne.hide();
    diceTwo.hide();
}

initialize();


let newGameButton = document.querySelector('.btn--new')
newGameButton.addEventListener('click', () => {
    initialize();
})

function switchPlayer() {
    let curPlayer = playerOne.isActive() ? playerOne : playerTwo;
    curPlayer.setLocalScore(0);
    curPlayer.setLastValue(-1);

    playerOne.isActive() ? playerOne.removeActive() : playerOne.setActive();
    playerTwo.isActive() ? playerTwo.removeActive() : playerTwo.setActive();
}

document.querySelector('.newValueForm').addEventListener('submit', (event) => {
    event.preventDefault();
});

let updateButton = document.querySelector('.btn--updateValue')
updateButton.addEventListener('click', () => {
    let newWinValue = document.getElementById('newValue').value;
    winScore = newWinValue;
})


