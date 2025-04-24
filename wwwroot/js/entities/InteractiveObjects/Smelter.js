export class Smelter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "smelter");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); 
        this.body.setImmovable(true);
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