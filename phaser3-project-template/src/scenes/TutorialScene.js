import 'phaser';


class TutorialScene extends Phaser.Scene {
    constructor() {
        super('Tutorial'); //allows you to pass the properties to the constructor of the parent class
        this.graphics;
        this.background;
        this.path; 
        this.deer;
        this.gun;
        this.destX;
        this.introTweenConfig;
        this.tapToShootLogo;
        this.light;
        this.deerHop = this.deerHop.bind(this);
        this.tapToShoot = this.tapToShoot.bind(this);
        this.spotLight = this.spotLight.bind(this);
        this.bulletsUI = this.bulletsUI.bind(this);
        this.gunUI = this.gunUI.bind(this);
        this.bullets = [];
        this.canShoot = false;
    }

    preload() {

    }

    create() {
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;



        this.background = this.add.sprite(0, 0, 'background');
        this.background.setScale(0.8, 0.85);
        this.centerObject(this.background);

        this.deer = this.add.sprite(width,
            height * 0.8,
            'forestscene',
            'deerAnimation_seq/Deer_01_seq/deer_01_seq/deer_01_00000.png');

        this.deer.setInteractive();

        this.deer.mask = this.graphics

        let hopTweenConfig = {
            targets: this.deer,
            x: this.deer.x - 100,
            duration: 100,
            ease: "Power1",
            loop: 0
        };
        this.introTweenConfig = {
            targets: this.deer,
            x: this.deer.x - 100,
            duration: 1000,
            ease: "Power1",
            loop: 0
        };

        this.destX = this.deer.x;

        let idleFrameNames = this.anims.generateFrameNames('forestscene', {
            start: 0, end: 44, zeroPad: 5,
            prefix: 'deerAnimation_seq/Deer_01_seq/deer_01_seq/deer_01_', 
            suffix: '.png'
        });

        let hopFrameNames = this.anims.generateFrameNames('forestscene', {
            start: 0, end: 18, zeroPad: 5,
            prefix: 'deerAnimation_seq/DeerHop_seq/deerHopSeq/deerHop_seq_',
            suffix: '.png'
        })

        

        this.anims.create({
            key: 'idle',
            frames: idleFrameNames,
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'hop',
            frames: hopFrameNames,
            frameRate: 15,
            repeat: 0
        })

        this.deerIntro(this.introTweenConfig)
        const first = () => {
            return new Promise( (resolve) => {
                setTimeout(() => {
                    this.deerIntro(this.introTweenConfig);
                    resolve("it worked 1");
                }, 2000);
            })
        };
        const second = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.deerIntro(this.introTweenConfig);
                    resolve("it worked 2")
                }, 2000);
            })
        };


        first().then(second).then(this.spotLight)
                            .then(this.gunUI)
                            .then(this.tapToShoot)
                            .then(this.bulletsUI);
        setTimeout(() => {
            this.canShoot = true;
        }, 7000)
        
    }
    
    update() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        if (this.bullets.length > 5) {
            this.bullets.pop().destroy();
        }


        if (this.canShoot) {
            this.deer.on('pointerup', function (pointer) {
                if(this.bullets.length > 0) {
                    this.bullets.pop().destroy();

                    let hopTweenConfig = {
                        targets: this.deer,
                        x: this.deer.x - 100,
                        duration: 100,
                        ease: "Power1",
                        loop: 0
                    };
                    // this.timeEvent = this.time.delayedCall(1, this.deerHop(hotTweenConfig), [], this)
                    this.deerHop(hopTweenConfig);
                } else {
                    // setTimeout(() => {
                    // }, 500)
                    this.scene.start('Transition');
                }

        }, this);}

        this.deer.on('pointerover', function (pointer, shape) {
        }, this);
        this.deer.on('pointerout', function (pointer, shape) {
        }, this);

        this.destX = this.deer.x;

        this.introTweenConfig = {
            targets: this.deer,
            x: this.deer.x - 100,
            duration: 1000,
            ease: "Power1",
            loop: 0
        };


        this.input.on('pointermove', function (pointer) {
            if (this.gun) {
                if (this.gun.x > width - 200) {

                    this.gun.x = width - 200;

                } else if (this.gun.x < 0) {

                    this.gun.x = 0;

                } else {

                    this.gun.x = pointer.x;

                };
            };

        }, this)
    }

    centerObject(gameObject, offset = 0) {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        gameObject.x = width / 2;
        gameObject.y = height / 2 - offset * 100;
    }

    deerHop(tween) {
        this.deer.anims.play('hop');
        this.deer.anims.chain('idle');

        this.tweens.add(tween);
    }

    deerIntro(tween) {
        this.deer.anims.play('hop');
        this.deer.anims.chain('idle');

        this.tweens.add(tween);
    }

    tapToShoot() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
            setTimeout(() => {
                this.tapToShootLogo = this.add.sprite(
                    width / 2.5, height / 5,
                    'forestscene',
                    'tapToShoot.psd');
            }, 1500);
    }

    bulletsUI() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        return new Promise( (resolve) => {
            setTimeout(() => {
                this.bullets.push(this.add.image(
                    100, height - 50,
                    'forestscene',
                    'bullet_large.png'
                ).setScale(0.5,0.5))
                // this.bullets.push(this.add.sprite(
                //     125, height - 50,
                //     'forestscene',
                //     'bullet_large.png'
                // ).setScale(0.5, 0.5))
                // this.bullets.push(this.add.sprite(
                //     150, height - 50,
                //     'forestscene',
                //     'bullet_large.png'
                // ).setScale(0.5, 0.5))
                // this.bullets.push(this.add.sprite(
                //     175, height - 50,
                //     'forestscene',
                //     'bullet_large.png'
                // ).setScale(0.5, 0.5))
                // this.bullets.push(this.add.sprite(
                //     200, height - 50,
                //     'forestscene',
                //     'bullet_large.png'
                // ).setScale(0.5, 0.5))
            }, 1000)
            resolve('test');
        })
    }

    gunUI() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        return new Promise( (resolve) => {
            setTimeout(() => {
                this.gun = this.add.image(
                    width / 2, height * 0.9,
                    'forestscene',
                    'rifle_aim.png').setOrigin(-0.10, 0.5);
            }, 1000)
            resolve('end of create');
        });

    }

    spotLight() {
            setTimeout(() => {
                this.background.alpha = 0.5;

            }, 1000)
    }
}

export default TutorialScene;