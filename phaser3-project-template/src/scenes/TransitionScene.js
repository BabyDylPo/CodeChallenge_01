class TransitionScene extends Phaser.Scene {
    constructor() {
        super('Transition');
        console.log('Transition');

    }
    create() {
        setTimeout(() => {this.scene.start('Game')}, 500);
    }

}

export default TransitionScene;