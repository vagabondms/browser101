"use strict";
import Dialog from "./dialog.js";
import Game from "./game.js";

const BUG_COUNT = 5;
const CARROT_COUNT = 5;
const GAME_DURATION = 5;

const gameFinishDialog = new Dialog();

const game = new Game(GAME_DURATION, BUG_COUNT, CARROT_COUNT);

gameFinishDialog.setEventListener(() => {
  game.refresh();
});

game.setFinishHandler((reason) => {
  switch (reason) {
    case "win":
      gameFinishDialog.showWithText("you win");
      break;
    case "lose":
      gameFinishDialog.showWithText("you lose");
      break;
    case "cancel":
      gameFinishDialog.showWithText("retry");
      break;
    default:
      throw new Error("hmmmmmm");
  }
});
