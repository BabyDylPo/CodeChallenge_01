class CTAScene extends Phaser.Scene {
    constructor() {
        super('CTA');
        console.log('CTA');
        this.CTA;
    }
    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.CTA = this.add.image(
            width/2, height/2,
            'forestscene',
            'CTA_V02.png').setScale(1.55,1.62);
        this.CTA.setInteractive();
        // setTimeout(() => { this.scene.start() }, 500);
    }

    update() {

        this.CTA.on('pointerup', function (pointer) {
            // this.scene.start('Boot');
            window.location.reload(true);
        }, this);
    }

}

export default CTAScene;