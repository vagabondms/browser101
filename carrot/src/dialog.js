"use strict";

export default class Dialog {
  constructor() {
    this.dialog = document.querySelector(".dialog");
    this.dialogMsg = document.querySelector(".dialog__message");
    this.refreshBtn = document.querySelector(".dialog__refresh");

    this.refreshBtn.addEventListener("click", () => {
      this.hideDialog();
      this.listener && this.listener();
    });
  }

  showDialog() {
    this.dialog.classList.remove("hidden");
  }
  hideDialog() {
    this.dialog.classList.add("hidden");
  }
  showWithText(text) {
    this.dialogMsg.textContent = text;
    this.showDialog();
  }

  setEventListener(listener) {
    this.listener = listener;
  }
}
