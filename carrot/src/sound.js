class Sound {
  static playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
  };
  static stopSound = (sound) => {
    sound.pause();
  };
  constructor(soundPath) {
    this.sound = new Audio(soundPath);
  }
  play() {
    Sound.playSound(this.sound);
  }
  stop() {
    Sound.stopSound(this.sound);
  }
}

const carrotSound = new Sound("sound/carrot_pull.mp3");
const bugSound = new Sound("sound/bug_pull.mp3");
const gameWinSound = new Sound("sound/game_win.mp3");
const alertSound = new Sound("sound/alert.wav");
const bgm = new Sound("sound/bg.mp3");

export { carrotSound, bugSound, gameWinSound, alertSound, bgm };
