import { Item } from "../Item.js";
import { Enemy } from "./Enemy.js";

export class CrawlerEnemy extends Enemy {
    constructor(scene, x, y, name, spritesheet, health, speed, items) {
        super(scene, x, y, name, spritesheet, health, speed, items);
        this.hidden = true;

        this.play(this.walkingAnimation);
    }

    angleToTarget(startX, startY, target) {
        const angle = Phaser.Math.Angle.Between(startX, startY, target.x, target.y);
        this.setRotation(angle + Phaser.Math.DegToRad(270));
    }

    update(time, delta) {
        if(this.knockbackTimer > 0 ) {
            this.knockbackTimer -= delta;
            return;
        }

        if (!this.isDead) {
            let distanceBetweenPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);

            if (distanceBetweenPlayer <= 100) {
                this.angleToTarget(this.x, this.y, this.scene.player);
                this.attack();
            } else {
                this.angleToTarget(0, 0, this.wanderDirection);
                this.walk(time, delta);
            }
        }
    }
}