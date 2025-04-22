export class Tool extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, toolType, key, level, materialType = null) {
        super(scene, x, y, key);

        this.level = level;
        this.scene = scene;
        this.toolType = toolType;
        this.materialType = materialType;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setDepth(3);
        this.setScale(16 / this.width, 16 / this.height);
    }

    isValidHit(object) {
        if(!this.materialType) {
            return false;
        }

        if (this.materialType === object.materialType) {
            return true;
        }
        
        return false;
    }
 }
