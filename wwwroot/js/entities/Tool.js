export class Tool extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, toolType = 'pickaxe', key = "pickaxe") {
        super(scene, x, y, key);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setDepth(3);
        this.setScale(16 / this.width, 16 / this.height);
    }
}
