export class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, itemName, value) {
        super(scene, x, y, key);
        this.scene = scene;
        this.itemName = itemName;
        this.value = value;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setDepth (7);
        this.setScale(16 / this.width, 16 / this.height);
        this.body.setSize(16, 16);

        if (itemName === "coin-item") {
            this.setScale(4 / this.width, 4 / this.height);
        }

        this.scene.droppedItems.add(this);

        this.shadow = this.scene.add.image(x, y + 6, "item-shadow");

        this.shadow.setDepth(6); 
        this.shadow.setAlpha(0.5); 
        this.shadow.setScale(0.5, 0.3);


        this.spawnEffect(x, y);
        this.startShadowEffect();
    }

    spawnEffect(objectX, objectY) {
        this.setPosition(objectX, objectY);

        let positionChangeX = Phaser.Math.Between(-12, 12);
        let positionChangeY = Phaser.Math.Between(-12, 12);

        let finalPositionX = objectX + positionChangeX;
        let finalPositionY = objectY + positionChangeY;

        this.scene.tweens.add({
            targets: this,
            x: finalPositionX,
            y: finalPositionY,
            duration: 200,
            ease: "Back.easeOut",
            onComplete: () => {
                this.startHover();
            }
        });

        this.scene.tweens.add({
            targets: this.shadow,
            x: finalPositionX,
            y: finalPositionY + 6,
            duration: 200,
            ease: "Back.easeOut"
        });
    }

    startHover() {
        if (this.scene) {
            this.scene.tweens.add({
                targets: this,
                y: this.y - 2,
                duration: 800,
                yoyo: true,
                repeat: -1,
                ease: "Sine.easeInOut"
            })
        }
    }

    startShadowEffect() {
        this.scene.tweens.add({
            targets: this.shadow,
            scaleX: { from: 0.7, to: 0.9 },
            scaleY: { from: 0.4, to: 0.45 },
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });
    }

    destroyItem() {
        if (this.shadow) {
            this.shadow.destroy();
            this.shadow = null;
        }

        this.destroy();
    }
}