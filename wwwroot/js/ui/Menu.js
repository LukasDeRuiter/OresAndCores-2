export class Menu {
    constructor(scene) {
        this.scene = scene;
        this.isVisible = false;

        this.ui = this.createUI();
    }

    toggleMenu() {
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

        this.ui = this.scene.add.container(400, 300 , [background]);
        this.ui.setDepth(1000);
        this.ui.setScrollFactor(0);
        this.ui.setVisible(this.isVisible);
    }

    updateUI(){
        this.ui.setVisible(this.isVisible);
    }
}