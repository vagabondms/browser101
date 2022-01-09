"use strict";

const gameButton = document.querySelector(".game__button");
const gameButtonIcon = document.querySelector(".game__button > i");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const dialog = document.querySelector(".dialog");
const dialogMsg = document.querySelector(".dialog__message");
const field = document.querySelector(".game__field");
const refresh = document.querySelector(".dialog__refresh");

const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE = 80;
const COUNT = 5;
const GAME_DURATION = 5;

const carrotSound = new Audio("sound/carrot_pull.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const gameWinSound = new Audio("sound/game_win.mp3");
const alertSound = new Audio("sound/alert.wav");
const bgm = new Audio("sound/bg.mp3");

let timer;
let score = 0;
let started = false;

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};
const stopSound = (sound) => {
  sound.pause();
};

const createTarget = (className, imgPath) => {
  const element = document.createElement("img");
  element.setAttribute("class", `${className} target`);
  element.setAttribute("src", imgPath);

  element.style.top = randomNumber(0, fieldRect.height - CARROT_SIZE) + "px";
  element.style.left = randomNumber(0, fieldRect.width - CARROT_SIZE) + "px";

  return element;
};
const generateTarget = (targetNumber) => {
  addItem("carrot", targetNumber, "img/carrot.png");
  addItem("bug", targetNumber, "img/bug.png");
  gameScore.textContent = targetNumber;
};

const addItem = (className, count, imgPath) => {
  for (let i = count; i--; ) {
    const element = createTarget(className, imgPath);
    field.appendChild(element);
  }
};

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const eraseTargets = () => {
  field.innerHTML = "";
};

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
      finishGame(COUNT <= score);
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

const initGame = (targetNumber, time) => {
  generateTarget(targetNumber);
  showInfos();
  showStopBtn();
  startTimer(time);
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

const showDialogWithText = (text) => {
  dialogMsg.textContent = text;
  dialog.classList.remove("hidden");
};
const hideDialog = (text) => {
  dialog.classList.add("hidden");
};

const stopGame = () => {
  stopTimer();
  showDialogWithText("Retry?");
  hideBtn();
  started = false;
  stopSound(bgm);
};

const startGame = () => {
  eraseTargets();
  initGame(COUNT, GAME_DURATION);
  playSound(bgm);
  started = true;
  score = 0;
};

const finishGame = (status) => {
  stopTimer();
  hideBtn();
  started = false;
  stopSound(bgm);
  switch (status) {
    case true:
      showDialogWithText("you win");
      playSound(gameWinSound);
      return;
    case false:
      showDialogWithText("you lose");
      playSound(alertSound);
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

const onFieldClick = (e) => {
  if (!started) {
    return;
  }
  const target = e.target;

  if (target.matches(".carrot")) {
    playSound(carrotSound);
    finishGame(false);
    return;
  }
  if (target.matches(".bug")) {
    playSound(bugSound);
    ++score;
    target.remove();
    updateScoreBoard(COUNT - score);

    if (score >= COUNT) {
      finishGame(true);
    }
    return;
  }
};

const updateScoreBoard = (score) => {
  gameScore.textContent = score;
};

field.addEventListener("click", onFieldClick);

refresh.addEventListener("click", () => {
  hideDialog();
  showBtn();
  hideInfos();
  showPlayBtn();
  eraseTargets();
  started = false;
});
