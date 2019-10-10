import 'phaser';


class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title'); //allows you to pass the properties to the constructor of the parent class
        this.centerObject = this.centerObject.bind(this);
    }

    preload() {
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        //title image
        this.titleImage = this.add.image(0, 0, 'title');
        this.titleImage.setScale(width / this.titleImage.width, height / this.titleImage.height);
        this.centerObject(this.titleImage);

        //play button
        // I am probably going to need to screen shot a button and use as a image/sprite 
        // so I can replicate the tutorial
        let buttonShape = new Phaser.Geom.Rectangle(width / 3.1, height - height / 4.5, 350, 90)
        this.gameButton = this.add.renderTexture(width / 3.1, height - height / 4.5, 350, 90);
        // this.gameButton.fillStyle(0x000000, 0.2);
        // this.gameButton.fillRect(width / 3.1, height - height / 4.5, 350, 90);
        this.gameButton.setInteractive();


        this.gameButton.on('pointerdown', function (pointer) {
            this.scene.start('Tutorial');
        }, this);
        this.gameButton.on('pointerover', function (pointer, shape) {
        }, this);
        this.gameButton.on('pointerout', function (pointer, shape) {
        }, this);
    }

    createTitleImage() {
        
    }

    centerObject(gameObject, offset = 0) {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        gameObject.x = width / 2;
        gameObject.y = height / 2 - offset * 100;
    }
}

export default TitleScene;