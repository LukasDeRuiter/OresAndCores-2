import { Item } from "../Item.js";
import { Enemy } from "./Enemy.js";

export class AmbushEnemy extends Enemy {
    constructor(scene, x, y, name, spritesheet, health, speed, items) {
        super(scene, x, y, name, spritesheet, health, speed, items);

        this.ambushAnimation = `${name}-ambush`;

        this.setAmbushAnimation();
    }

    setAmbushAnimation() {
        if (!this.scene.anims.exists(this.ambushAnimation)) {
            this.scene.anims.create({
                key: this.ambushAnimation,
                frames: this.scene.anims.generateFrameNumbers(this.name, {
                    frames: [ 0 ]
                }),
                frameRate: 10,
                repeat: 0
            });
        }
    }

    sitInAmbush() {
        this.setVelocity(0);
        this.switchAnimation(this.ambushAnimation);
    }

    update(time, delta) {
        if(this.knockbackTimer > 0 ) {
            this.knockbackTimer -= delta;
            return;
        }

        if (!this.isDead) {
            let distanceBetweenPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);

            if (distanceBetweenPlayer <= 100) {
                this.attack();
            } else {
                this.sitInAmbush();
            }
        }
    }
}