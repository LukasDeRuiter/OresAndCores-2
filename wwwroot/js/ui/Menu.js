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

        this.ui = this.scene.add.container(400, 300 , [background]);
        this.ui.setDepth(1000);
        this.ui.setScrollFactor(0);
        this.ui.setVisible(this.isVisible);
    }

    updateUI(){
        console.log(this);
        this.ui.setVisible(this.isVisible);
    }
}