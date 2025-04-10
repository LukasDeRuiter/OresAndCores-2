export class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, isWalkable) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0);
        
        if (!isWalkable) {
            this.scene.physics.world.enable(this);
            this.body.setImmovable(true);
            this.scene.staticGroup.add(this); 
        }
    }
}