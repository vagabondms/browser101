import { carrotSound, bugSound } from "./sound.js";

export const ITEM_TYPE = Object.freeze({
  CARROT: "carrot",
  BUG: "bug",
});

export default class Field {
  static randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  static CARROT_SIZE = 80;

  constructor(bugCount, carrotCount) {
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.bugCount = bugCount;
    this.carrotCount = carrotCount;

    this.field.addEventListener("click", this.onClick.bind(this));
  }

  _addItem(targetName, targetNumber, imgPath) {
    for (let i = targetNumber; i--; ) {
      const element = this._createTargetElement(targetName, imgPath);
      this.field.appendChild(element);
    }
  }

  _createTargetElement(targetName, imgPath) {
    const element = document.createElement("img");
    element.setAttribute("class", `${targetName} target`);
    element.setAttribute("src", imgPath);

    element.style.top =
      Field.randomNumber(0, this.fieldRect.height - Field.CARROT_SIZE) + "px";
    element.style.left =
      Field.randomNumber(0, this.fieldRect.width - Field.CARROT_SIZE) + "px";

    return element;
  }

  generateTarget() {
    this._addItem(ITEM_TYPE.CARROT, this.carrotCount, "img/carrot.png");
    this._addItem(ITEM_TYPE.BUG, this.bugCount, "img/bug.png");
  }

  resetField() {
    this.field.innerHTML = "";
  }

  setEventListener(listener) {
    this.onItemClick = listener;
  }

  onClick(e) {
    const target = e.target;

    if (target.matches(".carrot")) {
      carrotSound.play();
      this.onItemClick && this.onItemClick(ITEM_TYPE.CARROT);
      return;
    }
    if (target.matches(".bug")) {
      bugSound.play();
      target.remove();
      this.onItemClick && this.onItemClick(ITEM_TYPE.BUG);
      return;
    }
  }
}

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};
