"use strict";
import Field, { ITEM_TYPE } from "./field.js";
import { bgm } from "./sound.js";

export const REASON = Object.freeze({
  WIN: "win",
  LOSE: "lose",
  CANCEL: "cancel",
});

export default class GameBuilder {
  constructor() {
    this.gameDuration;
    this.bugCount;
    this.carrotCount;
  }
  setGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  setBugCount(count) {
    this.bugCount = count;
    return this;
  }

  setCarrotCount(count) {
    this.carrotCount = count;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.bugCount, this.carrotCount);
  }
}
class Game {
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
        this.stop(REASON.CANCEL);
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
      case ITEM_TYPE.CARROT:
        this.stop(REASON.LOSE);
        return;
      case ITEM_TYPE.BUG:
        ++this.score;
        this.updateScoreBoard(this.bugCount - this.score);
        if (this.bugCount <= this.score) {
          this.stop(REASON.WIN);
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
        this.stop(this.bugCount <= this.score ? REASON.WIN : REASON.LOSE);
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
