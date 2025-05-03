export class Menu {
    constructor(scene) {
        this.scene = scene;
        this.isVisible = false;

        this.ui = this.createUI();
    }

    toggleMenu() {
        
    }

    createUI() {
        if (this.ui) {
            this.ui.destroy();
            this.ui = null;

            return;
        }

        this.ui = this.scene.add.container(400, 300 , []);
        this.ui.setDepth(1000);
        this.ui.setScrollFactor(0);
        this.ui.setVisible(this.isVisible);
    }
}