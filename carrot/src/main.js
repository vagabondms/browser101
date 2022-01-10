"use strict";
import Dialog from "./dialog.js";
import Field from "./field.js";
import { gameWinSound, alertSound, bgm } from "./sound.js";

const gameButton = document.querySelector(".game__button");
const gameButtonIcon = document.querySelector(".game__button > i");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const BUG_COUNT = 5;
const CARROT_COUNT = 5;
const GAME_DURATION = 5;

const gameFinishDialog = new Dialog();
const field = new Field(BUG_COUNT, CARROT_COUNT);

let timer;
let score = 0;
let started = false;

const showInfos = () => {
  gameTimer.classList.remove("hidden");
  gameScore.classList.remove("hidden");
};
const hideInfos = () => {
  gameTimer.classList.add("hidden");
  gameScore.classList.add("hidden");
};

const startTimer = (time) => {
  updateTimerText(time);
  timer = setInterval(() => {
    if (time <= 0) {
      finishGame(BUG_COUNT <= score);
      return;
    }
    updateTimerText(--time);
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
};

const updateTimerText = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.textContent = `${minutes}:${seconds}`;
};

const initGame = () => {
  field.generateTarget();
  gameScore.textContent = BUG_COUNT;
  showInfos();
  showStopBtn();
  startTimer(GAME_DURATION);
};

const showStopBtn = () => {
  gameButtonIcon.classList.replace("fa-play", "fa-stop");
};
const showPlayBtn = () => {
  gameButtonIcon.classList.replace("fa-stop", "fa-play");
};

const showBtn = () => {
  gameButton.classList.remove("hidden");
};

const hideBtn = () => {
  gameButton.classList.add("hidden");
};

const refreshGame = () => {
  showBtn();
  hideInfos();
  showPlayBtn();
  field.resetField();
  started = false;
};

const stopGame = () => {
  stopTimer();
  gameFinishDialog.showWithText("Retry?");
  hideBtn();
  started = false;
  bgm.stop();
};

const startGame = () => {
  field.resetField();
  initGame();
  bgm.play();
  started = true;
  score = 0;
};

const finishGame = (status) => {
  stopTimer();
  hideBtn();
  started = false;
  bgm.stop();
  switch (status) {
    case true:
      gameFinishDialog.showWithText("you win");
      gameWinSound.play();
      return;
    case false:
      gameFinishDialog.showWithText("you lose");
      alertSound.play();
      return;
  }
};

gameButton.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

const updateScoreBoard = (score) => {
  gameScore.textContent = score;
};

const onItemClick = (type) => {
  switch (type) {
    case "carrot":
      finishGame(false);
      return;
    case "bug":
      ++score;
      const leftBugs = BUG_COUNT - score;
      updateScoreBoard(leftBugs);

      if (leftBugs <= 0) {
        finishGame(true);
      }
      return;
    default:
      return;
  }
};

field.setEventListener(onItemClick);

gameFinishDialog.setEventListener(() => {
  refreshGame();
});
