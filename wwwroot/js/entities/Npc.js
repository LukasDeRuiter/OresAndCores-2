export class Npc extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, spritesheet) {
        super(scene, x, y, spritesheet);

        this.scene = scene;
        this.name = name;
        this.spritesheet = spritesheet;
        this.idleAnimation = `${name}-idle`;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        this.setOrigin(0.5);
        this.setDepth(30);
        this.setScale(1);
        this.setCollideWorldBounds(true);

        this.createAnimations(scene, name);

        this.play(this.idleAnimation);
    }

    createAnimations(scene) {
        if (!scene.anims.exists(this.idleAnimation)) {
            scene.anims.create({
                key: this.idleAnimation,
                frames: scene.anims.generateFrameNumbers(this.name, {
                    frames: [0, 1, 2, ]
                }),
                frameRate: 6,
                repeat: -1
            });
        }
    }
}