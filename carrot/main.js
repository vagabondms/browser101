const playBtn = document.querySelector(".button.play");
const stopBtn = document.querySelector(".button.stop");
const timer = document.querySelector(".info__timer");
const result = document.querySelector(".result");
const retry = document.querySelector(".result__retry-button");
const leftOvers = document.querySelector(".info__left-overs");
const resultText = document.querySelector(".result__text");

let audio;

const playAudio = () => {
  if (audio) {
    stopAudio();
  }
  audio = new Audio("sound/bg.mp3");
  audio.play();
};

const stopAudio = () => {
  audio.pause();
};

let interval;

const startCounter = () => {
  let counter = 10;
  interval = setInterval(() => {
    counter = counter - 1;
    timer.textContent = counter + "s";

    if (counter === 0) {
      finish();
    }
  }, 1000);
};

let leftNum = 10;

const resetCounter = () => {
  timer.textContent = "10s";
  clearInterval(interval);
};

const stopCounter = () => {
  clearInterval(interval);
};

const generateMessage = (leftNum) => {
  if (leftNum === 0) {
    resultText.textContent = "You Win 😀";
  } else {
    resultText.textContent = "You Loose 😅";
  }
};

const finish = () => {
  result.classList.remove("hidden");
  stopAudio();
  stopCounter();
  generateMessage(leftNum);
};

const start = () => {
  playAudio();
  startCounter();
  playBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
};

const reset = () => {
  stopAudio();
  resetCounter();
  stopBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
  result.classList.add("hidden");
};

playBtn.addEventListener("click", start);
stopBtn.addEventListener("click", reset);
retry.addEventListener("click", reset);
