import 'phaser';


class UIScene extends Phaser.Scene {
    constructor() {
        super('UI'); //allows you to pass the properties to the constructor of the parent class
        console.log('UI');
    }

    create() {
        this.scene.start('Preloader');
    }
}

export default UIScene;