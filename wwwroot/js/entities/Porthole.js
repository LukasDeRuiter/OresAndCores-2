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

    calculateDistanceWithPlayer() {
        return Phaser.Math.Distance.Between(
            this.scene.player.x, 
            this.scene.player.y,
            this.x,
            this.y
        );
    }

    calculatePriceToNextLevel(level) {
        return level * 100;
    }

    highLight(isHoverOn) {
        if (isHoverOn) {
            if (this.calculateDistanceWithPlayer() <= 32) {
                this.setTint(0x00ff00);
            }   
        } else {
            this.clearTint();
        }
    }
}