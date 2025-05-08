import { InteractiveObject } from "./InteractiveObject.js";

export class UpgradeBoard extends InteractiveObject {

    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.isVisible = false;

        this.bindInput();
        this.createUI();
    }

    interact() {
        this.isVisible = !this.isVisible;

        this.updateUI();

        if (this.isVisible) {
            this.scene.physics.world.pause();
        } else {
            this.scene.physics.world.resume();
        }
    }

    createUI() {
        if (this.ui) {
            this.ui.destroy();
            this.ui = null;

            return;
        }

        const background = this.scene.add.rectangle(0, 0, 350, 250, 0X000000, 0.3);

        const exitButton = this.scene.add.rectangle(0, 0, 20, 20, 0xFF0000).setDepth(1010).setScrollFactor(0).setAlpha(0.6);
        exitButton.setInteractive();

        exitButton.on('pointerdown', (pointer) => {
            if (pointer.button === 0) {
                this.interact();
            }
        })

        exitButton.on('pointerover', () => {
            exitButton.setAlpha(1).setScale(1.2);

        });

        exitButton.on('pointerout', () => {
            exitButton.setAlpha(0.6).setScale(1);

        });

        const exitButtonIcon = this.scene.add.image(0, 0, "cancel-button-icon").setDepth(52).setScrollFactor(0);

        const exitButtonContainer = this.scene.add.container(165, -115, [exitButton, exitButtonIcon]).setDepth(1010);

        this.ui = this.scene.add.container(400, 300 , [background, exitButtonContainer]);
        this.ui.setDepth(1000);
        this.ui.setScrollFactor(0);
        this.ui.setVisible(this.isVisible);
    }

    createButton(buttonText, y = 0, callback) {
        let text = this.scene.add.text(-20, -10, buttonText, {
            fontSize: "10px",
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 5,
        });

       let buttonBackground = this.scene.add.rectangle(0, 0, 130, 20, '0xaaaaaa').setDepth(1010).setScrollFactor(0).setInteractive().setAlpha(0.6).setScale(1);
       let button = this.scene.add.container(0, y - 100, [buttonBackground, text]).setDepth(1010).setScrollFactor(0);
       
       buttonBackground.on('pointerover', () => {
            buttonBackground.setAlpha(1).setScale(1.2);
        });

        buttonBackground.on('pointerout', () => {
            buttonBackground.setAlpha(0.6).setScale(1);
        });

        buttonBackground.on('pointerdown',
            callback
        );

        return button;
    }

    updateUI(){
        this.ui.setVisible(this.isVisible);
    }

    bindInput() {
        this.on('pointerdown', (pointer) => {

            if (pointer.button === 0) {
                this.interact();
        }}
    );
    }
}