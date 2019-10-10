import 'phaser';
import loadingImg from "../assets/texturepacker/loadingSplashPage_med.jpg";


class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot'); //allows you to pass the properties to the constructor of the parent class
    }

    preload() {
        this.load.image('loading', loadingImg)
    }

    create() {
        this.scene.start('Preloader');
    }
}

export default BootScene;