export class Tooltip {
    constructor(scene) {
        this.scene = scene;

        this.text = this.scene.add.text(0, 0, '', {
            fontSize: '10px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: {
                x: 4,
                y: 2
            },
        }).setDepth(2000).setScrollFactor(0).setResolution(2).setVisible(false);

  
    }

    show(content, pointer) {
        const camera = this.scene.cameras.main;
        const zoom = camera.zoom;

        const adjustedX = pointer.worldX - camera.scrollX;
        const adjustedY = pointer.worldY - camera.scrollY;

        this.text.setText(content);
        this.text.setPosition(adjustedX - 25, adjustedY - 30);
        this.text.setVisible(true);
    }

    hide() {
        this.text.setVisible(false);
    }

    destroy() {
        this.text.destroy();
    }
}