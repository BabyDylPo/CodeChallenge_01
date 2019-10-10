import 'phaser';
import loadingImg from "../assets/texturepacker/loadingSplashPage_med.jpg";
import titleImg from "../assets/Layouts/CTA_Layout_Landscape.png";
import flashImg from "../assets/texturepacker/muzzleFlashes.png";
import backgroundImg from "../assets/background.png";


class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader'); //allows you to pass the properties to the constructor of the parent class
        this.displayProgressBar = this.displayProgressBar.bind(this);
        this.ready = this.ready.bind(this)
    }

    init() {
        this.readyCount = 0;
    }
    
    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        //load assets needed in our game
        ////////////////////////////////

        for (let i = 0; i < 333; i++) {
            this.load.image('loading' + i, loadingImg)

        }


        this.load.multiatlas('forestscene', 'src/assets/deer-hunting-atlas.json', 'src/assets/');
        this.bullets = [];

        this.load.image('title', titleImg);
        this.load.image('flash', flashImg);
        this.load.image('background', backgroundImg);

        //add assets to the view
        ////////////////////////
        this.add.image(width/2, height/2, 'loading').setScale(2, 2);

        //loading bar
        //////////////////////////
        this.displayProgressBar(width, height);

        // this.ready();

        this.timeEvent = this.time.delayedCall(1, this.ready, [], this)

    }

    create() { 
    }


    ready() {
        this.readyCount++;
        if (this.readyCount === 2) {
            this.scene.start('Title');
        }
    }


    displayProgressBar(width, height) {
        //displayProgessBar
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();

        progressBox.fillStyle(0x000000, 0.8);
        progressBox.fillRect(width / 4.6, height - height/9, 540, 45);

        //loading text
        let loadingText = this.make.text({
            x: width/2,
            y: height/2 + 220,
            text: 'LOADING...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        
        //percent text
        let percentText = this.make.text({
            x: width/2-5,
            y: height/2 + 255,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        
        //asset text
        let assetText = this.make.text({
            x: width/2,
            y: height/2 + 220 + 70,
            text: '',
            style: {
                font: '14px monospace',
                fill: '#ffffff'
            }
        });

        loadingText.setOrigin(0.5, 0.5);
        percentText.setOrigin(0.5, 0.5);
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', value => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 4.6 + 4, height - height / 9 + 5, 535 * value, 35);
        });

        //update file progress text
        this.load.on('fileprogress', file => {
            assetText.setText('Loading asset: ' + file.key);
        })

        //remove progress bar
        this.load.on('complete', () => {
            progressBox.destroy();
            progressBar.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
        })

    }
}

export default PreloaderScene;