import splashImage from '../assets/loadingSplashPage_med.jpg'

class SplashScene extends Phaser.Scene {
    constructor() {
        super({key: 'SplashScene'});
    }

    preload () {
        this.load.image('splash_image', splashImage);
    }

    create () {
        let splashImg = this.add.sprite(0, 0, 'splash_image');
        splashImg.setOrigin(0, 0);
    }
}

export default SplashScene;