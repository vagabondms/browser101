"use strict";
import Dialog from "./dialog.js";
import GameBuilder, { REASON } from "./game.js";
import { gameWinSound, alertSound } from "./sound.js";
const gameFinishDialog = new Dialog();

const game = new GameBuilder()
  .setGameDuration(5)
  .setBugCount(5)
  .setCarrotCount(5)
  .build();

gameFinishDialog.setEventListener(() => {
  game.refresh();
});

game.setFinishHandler((reason) => {
  let message;
  switch (reason) {
    case REASON.WIN:
      message = "you win";
      gameWinSound.play();
      break;
    case REASON.LOSE:
      message = "you lose";
      break;
    case REASON.CANCEL:
      message = "you retry";
      alertSound.play();
      break;
    default:
      throw new Error("hmmmmmm");
  }
  gameFinishDialog.showWithText(message);
});
