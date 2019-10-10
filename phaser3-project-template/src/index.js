import Phaser from "phaser";
import config from "./config/config";
import GameScene from "./scenes/GameScene";
import TutorialScene from "./scenes/TutorialScene";
import PreloaderScene from "./scenes/PreloaderScene";
import BootScene from "./scenes/BootScene";
import BuckScene from "./scenes/BuckScene";
import TitleScene from "./scenes/TitleScene";
import TransitionScene from "./scenes/TransitionScene";
import UIScene from "./scenes/UIScene";
import CTAScene from "./scenes/CTAScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Tutorial', TutorialScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Buck', BuckScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Transistion', TransitionScene);
    this.scene.add('UI', UIScene);
    this.scene.add('CTA', CTAScene);
    this.scene.start('Boot');
  }
}

window.onload = function () {
  window.game = new Game();
}
