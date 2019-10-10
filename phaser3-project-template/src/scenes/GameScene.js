import 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('Game'); 
        this.graphics = null;
        this.background = null;
        this.deer = null;
        this.gun = null;
        this.destX = null;
        this.deerHop = this.deerHop.bind(this);
        this.bulletsUI = this.bulletsUI.bind(this);
        this.gunUI = this.gunUI.bind(this);
        this.removeBullet = this.removeBullet.bind(this);
        this.decrementDeerCount = this.decrementDeerCount.bind(this);
        this.bullets = [];
        this.i = 0;
        this.addGun = false;
        this.addBullet = false;
        this.cd = 25;
        this.canShoot = true;

        this.deerCount = 3;
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

    }

    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;



        this.background = this.add.sprite(0, 0, 'background');
        this.background.setScale(0.8, 0.85);
        this.centerObject(this.background);

        this.deer = this.add.sprite(width - 300,
            height * 0.8,
            'forestscene',
            'deerAnimation_seq/Deer_01_seq/deer_01_seq/deer_01_00000.png');

        this.deer.setInteractive();
        this.background.setInteractive();

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


        this.gunUI();
        this.bulletsUI();
        
    }

    update() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        if (this.bullets.length > 5) {
            this.bullets.pop().destroy();
        }

        if (this.cd === 0) {
            this.deer.on('pointerup', function (pointer) {
                if (this.bullets.length > 0) {
                    let hopTweenConfig = {
                        targets: this.deer,
                        x: this.deer.x - 100,
                        duration: 100,
                        ease: "Power1",
                        loop: 0
                    };
                    // this.timeEvent = this.time.delayedCall(1, this.deerHop(hotTweenConfig), [], this)
                    this.removeBullet().then(this.decrementDeerCount()).then(this.deerHop(hopTweenConfig));
                }
            }, this);
        }
        
            if (this.cd === 0) {
                this.background.on('pointerup', function (pointer) {
                    if (this.bullets.length > 0) {
                        let hopTweenConfig = {
                            targets: this.deer,
                            x: this.deer.x - 100,
                            duration: 100,
                            ease: "Power1",
                            loop: 0
                        };
                        // this.timeEvent = this.time.delayedCall(1, this.deerHop(hotTweenConfig), [], this)
                        this.removeBullet().then(this.deerHop(hopTweenConfig));
                    }
                }, this);
            }
        

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
        if (this.cd > 0) {
            this.cd -= 1;
        }
        if (this.cd > 20) {
            this.canShoot = true;
        }
        if (this.deerCount < 1) {
            this.scene.start('Buck');
        } else if (this.gun != null) {
            if (this.bullets.length === 0) {
                this.scene.start('CTA');
            }
        }
    }

    decrementDeerCount() {
        if (!this.canShoot) {
            if(this.cd < 1) { // lol
                return new Promise( (resolve ) => {
                    this.deerCount -= 1;
                });
            }
        }
    }
    

    removeBullet() {
        return new Promise((resolve) => {
            if (this.canShoot === true){
                this.canShoot = false;
                let popped = this.bullets.pop()
                popped.destroy();
            }
        });
    }

    centerObject(gameObject, offset = 0) {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        gameObject.x = width / 2;
        gameObject.y = height / 2 - offset * 100;
    }

    deerHop(tween) {
        return new Promise(() => {
            this.deer.anims.play('hop');
            this.deer.anims.chain('idle');
    
            this.cd = 25;
    
            this.tweens.add(tween);
        })
    }

    bulletsUI() {
        if (this.addBullet === false) {
            this.addBullet = true;
            const width = this.cameras.main.width;
            const height = this.cameras.main.height;
    
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.bullets.push(this.add.image(
                        100, height - 50,
                        'forestscene',
                        'bullet_large.png'
                    ).setScale(0.5, 0.5))
                    this.bullets.push(this.add.image(
                        125, height - 50,
                        'forestscene',
                        'bullet_large.png'
                    ).setScale(0.5, 0.5))
                    this.bullets.push(this.add.image(
                        150, height - 50,
                        'forestscene',
                        'bullet_large.png'
                    ).setScale(0.5, 0.5))
                    this.bullets.push(this.add.image(
                        175, height - 50,
                        'forestscene',
                        'bullet_large.png'
                    ).setScale(0.5, 0.5))
                    this.bullets.push(this.add.image(
                        200, height - 50,
                        'forestscene',
                        'bullet_large.png'
                    ).setScale(0.5, 0.5))
                }, 1000)
                resolve('test');
            })
        }
    }

    gunUI() {
        if (this.addGun === false) {
            this.addGun = true;
            const width = this.cameras.main.width;
            const height = this.cameras.main.height;
            this.i += 1;
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.gun = this.add.sprite(
                        width / 2, height * 0.9,
                        'forestscene',
                        'rifle_aim.png').setOrigin(-0.10, 0.5);
                }, 1000)
                resolve('end of create');
            });
        }

    }

}

export default GameScene;