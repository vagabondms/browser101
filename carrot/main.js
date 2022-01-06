const playBtn = document.querySelector(".button.play");
const stopBtn = document.querySelector(".button.stop");
const timer = document.querySelector(".info__timer");
const result = document.querySelector(".result");
const retry = document.querySelector(".result__retry-button");
const leftOvers = document.querySelector(".info__left-overs");
const resultText = document.querySelector(".result__text");
const app = document.querySelector("#app");

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

const createTargets = (target) => {
  const element = document.createElement("img");
  element.setAttribute("class", `${target} target`);
  element.setAttribute("src", `img/${target}.png`);
  element.setAttribute("data-type", `${target}`);
  element.style.top = (Math.random() + 1) * 310 + "px";
  element.style.left = Math.random() * 1120 + "px";
  element.style.zIndex = Math.random() > 0.5 ? 0 : 1;
  app.appendChild(element);
};

const removeTargets = () => {
  const targets = document.querySelectorAll(".target");
  targets.forEach((el) => el.remove());
};

const generateBugsAndCarrots = () => {
  for (let i = 10; i--; ) {
    createTargets("bug");
    createTargets("carrot");
  }
};

let isPlaying = false;

const finish = () => {
  isPlaying = false;
  result.classList.remove("hidden");
  stopAudio();
  stopCounter();
  generateMessage(leftNum);
  stopBtn.classList.add("finished");
};

const start = () => {
  isPlaying = true;
  playAudio();
  startCounter();
  playBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  generateBugsAndCarrots();
  leftOvers.textContent = 10;
  leftNum = 10;
  stopBtn.classList.remove("finished");
};

const reset = () => {
  stopAudio();
  resetCounter();
  stopBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
  result.classList.add("hidden");
  removeTargets();
};

playBtn.addEventListener("click", start);
stopBtn.addEventListener("click", reset);
retry.addEventListener("click", reset);
app.addEventListener("click", (e) => {
  if (!isPlaying) {
    return;
  }
  const target = e.target;
  const type = e.target.dataset.type;
  if (!type) {
    return;
  }
  if (type === "carrot") {
    new Audio("sound/carrot_pull.mp3").play();
    finish();
    return;
  } else if (type === "bug") {
    target.remove();
    leftOvers.textContent = --leftNum;
    new Audio("sound/bug_pull.mp3").play();
    if (leftNum === 0) {
      finish();
    }
    return;
  }
});
