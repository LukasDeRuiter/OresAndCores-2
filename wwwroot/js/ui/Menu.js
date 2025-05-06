export class Menu {
    constructor(scene) {
        this.scene = scene;
        this.isVisible = false;

        this.createUI();
    }

    toggleMenu() {
        this.isVisible = !this.isVisible;

        this.updateUI();

        if (this.isVisible) {
            this.scene.physics.world.pause();
            this.scene.anims.pauseAll();
        } else {
            this.scene.physics.world.resume();
            this.scene.anims.resumeAll();
        }
    }

    createUI() {
        if (this.ui) {
            this.ui.destroy();
            this.ui = null;

            return;
        }

        const background = this.scene.add.rectangle(0, 0, 150, 250, 0X000000, 0.3);
        const resumeButton = this.createButton("Resume");

        resumeButton.on('pointerdown', () => {
            this.toggleMenu();
        });

        this.ui = this.scene.add.container(400, 300 , [background, resumeButton]);
        this.ui.setDepth(1000);
        this.ui.setScrollFactor(0);
        this.ui.setVisible(this.isVisible);
    }

    createButton(buttonText) {
        let text = this.scene.add.text(Math.round(10), Math.round(-10), buttonText, {
            fontSize: "10px",
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 5,
        });

       let buttonBackground = this.scene.add.rectangle(100, 100, 30, 20, '0xaaaaaa').setDepth(1010).setScrollFactor(0).setInteractive().setAlpha(0.6).setScale(1);
       let button = this.scene.add.container(0, 0, [buttonBackground, text]).setDepth(1010).setScrollFactor(0);
       
       buttonBackground.on('pointerover', () => {
            buttonBackground.setAlpha(1).setScale(1.2);
        });

        buttonBackground.on('pointerout', () => {
            buttonBackground.setAlpha(0.6).setScale(1);
        });

        return button;
    }

    updateUI(){
        this.ui.setVisible(this.isVisible);
    }
}