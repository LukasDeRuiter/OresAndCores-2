export class Porthole extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, level) {
        super(scene, x, y, "porthole");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); 
        this.body.setImmovable(true);
        this.price = this.calculatePriceToNextLevel(level);
        this.setDepth(100);
    }

    calculatePriceToNextLevel(level) {
        return level * 100;
    }
}