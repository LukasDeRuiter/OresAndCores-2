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

    quitGame() {
        this.scene.transitionSaver.transition("SceneEnd",  "Leaving the mine...", this.scene.player.inventory, this.scene.player.level);
    }

    createUI() {
        if (this.ui) {
            this.ui.destroy();
            this.ui = null;

            return;
        }

        const background = this.scene.add.rectangle(0, 0, 150, 250, 0X000000, 0.3);
        const resumeButton = this.createButton("Resume", 0, this.toggleMenu.bind(this));
        const controlsButton = this.createButton("Controls", 30, this.showControls.bind(this));
        const quitButton = this.createButton("Quit", 60, this.quitGame.bind(this));

        this.ui = this.scene.add.container(400, 300 , [background, resumeButton, controlsButton, quitButton]);
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
        }).setResolution(2);

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
        if (this.controlsUI && this.isVisible === false) {
            this.controlsUI.setVisible(this.isVisible);
        }
    }

    showControls() {
        this.ui.setVisible(false);

        if (this.controlsUI) {
            this.controlsUI.setVisible(true);
            return;
        }

        const background = this.scene.add.rectangle(0, 0, 200, 200, 0X000000, 0.3);
        const controlsText = this.scene.add.text(-90, -80, 
        "Controls:\n\n" +
        "ESC - Main menu\n" +
        "WASD - Move\n" +
        "R - Use tool\n" +
        "E - Open Inventory\n" +
        "Left mouse - Interact with objects\n" +
        "1, 2, 3 - Select tool\n", 
            { fontSize: "12px", fill: "#fff", wordWrap: { width: 180 } }
        ).setResolution(2);

        const backButton = this.createButton("Back", 180, () => {
            this.controlsUI.setVisible(false);
            this.ui.setVisible(true);
        });

        this.controlsUI = this.scene.add.container(400, 300, [background, controlsText, backButton]);
        this.controlsUI.setDepth(1001);
        this.controlsUI.setScrollFactor(0);
    }
}