"use strict";
import Field from "./field.js";
import { gameWinSound, alertSound, bgm } from "./sound.js";
export default class Game {
  constructor(gameDuration, bugCount, carrotCount) {
    this.duration = gameDuration;
    this.bugCount = bugCount;
    this.carrotCount = carrotCount;
    //state
    this.timer;
    this.score = 0;
    this.isPlaying = false;

    this.button = document.querySelector(".game__button");
    this.timeBoard = document.querySelector(".game__timer");
    this.scoreBoard = document.querySelector(".game__score");
    this.field = new Field(this.bugCount, this.carrotCount);
    this.field.setEventListener(this.onItemClick.bind(this));
    this.finishHandler;
    this.button.addEventListener("click", () => {
      if (this.isPlaying) {
        this.stop("cancel");
      } else {
        this.start();
      }
    });
  }
  stop(reason) {
    this.isPlaying = false;
    this.stopTimer();
    this.hideBtn();

    bgm.stop();
    this.finishHandler && this.finishHandler(reason);
    switch (reason) {
      case "win":
        gameWinSound.play();
        return;
      case "lose":
        alertSound.play();
        return;
    }
  }
  start() {
    this.isPlaying = true;
    this.score = 0;
    this.changeBtn("stop");
    this.showInfos();
    this.startTimer(this.duration);
    this.scoreBoard.textContent = this.bugCount;
    bgm.play();
    this.field.generateTarget();
  }

  setFinishHandler(callback) {
    this.finishHandler = callback;
  }
  onItemClick(type) {
    switch (type) {
      case "carrot":
        this.stop("lose");
        return;
      case "bug":
        ++this.score;
        this.updateScoreBoard(this.bugCount - this.score);
        if (this.bugCount <= this.score) {
          this.stop("win");
        }
        return;
      default:
        return;
    }
  }

  refresh() {
    this.isPlaying = false;
    this.changeBtn("play");
    this.showBtn();
    this.hideInfos();
    this.field.resetField();
  }

  startTimer = (time) => {
    this.updateTimerText(time);
    this.timer = setInterval(() => {
      if (time <= 0) {
        this.stop(this.bugCount <= this.score ? "win" : "lose");
        return;
      }
      this.updateTimerText(--time);
    }, 1000);
  };

  updateTimerText(time) {
    this.timeBoard.textContent = `${time}s`;
  }
  stopTimer() {
    clearInterval(this.timer);
  }

  showInfos() {
    this.timeBoard.classList.remove("hidden");
    this.scoreBoard.classList.remove("hidden");
  }

  hideBtn() {
    this.button.classList.add("hidden");
  }

  hideInfos() {
    this.timeBoard.classList.add("hidden");
    this.scoreBoard.classList.add("hidden");
  }

  changeBtn(iconName) {
    this.button.firstElementChild.setAttribute("class", `fas fa-${iconName}`);
  }
  showBtn() {
    this.button.classList.remove("hidden");
  }
  updateScoreBoard(score) {
    this.scoreBoard.textContent = score;
  }
}
