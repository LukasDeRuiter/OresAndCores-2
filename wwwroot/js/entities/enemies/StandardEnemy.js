import { Item } from "../Item.js";
import { Enemy } from "./Enemy.js";

export class StandardEnemy extends Enemy {
    constructor(scene, x, y, name, spritesheet, health, speed, items) {
        super(scene, x, y, name, spritesheet, health, speed, items);
        this.hidden = true;
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
                this.walk(time, delta);
            }
        }
    }
}