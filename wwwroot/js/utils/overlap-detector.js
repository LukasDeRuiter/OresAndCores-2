import { Enemy } from "../entities/enemies/Enemy.js";
import { EnvironmentObject } from "../entities/EnvironmentObject.js";
import { InventoryItem } from "../entities/InventoryItem.js";

export class OverlapDetector {
    constructor(scene) {
        this.scene = scene;
    }

    detectOverlap() {
        if (Phaser.Input.Keyboard.JustDown(this.scene.keyR) && this.scene.player.tool !== null) {
            if (    this.scene.player.selectedTool.interactsWith &&
                this.scene.player.selectedTool.interactsWith.children) {
                const hitDetected = this.scene.physics.world.overlap(
                    this.scene.player.tool,
                    this.scene.player.selectedTool.interactsWith,
                    this.onObjectOverlap,
                    null,
                    this
                );
    
                if (!hitDetected) {
                    this.scene.sound.play("tool-swing-1");
                }
            } else {
                this.scene.sound.play("tool-swing-1");
            }
        }

        this.scene.physics.world.overlap(this.scene.player, this.scene.droppedItems, this.pickUpItem, null, this);
        this.scene.physics.world.overlap(this.scene.player, this.scene.enemies, this.damagePlayer, null, this);
    }

    damagePlayer(player, enemy) {
        // this.scene.start("SceneDeath");
    }

    onObjectOverlap(tool, object) {
        if (object instanceof Enemy) {
            this.damageEnemy(object);
        } 

        if (object instanceof EnvironmentObject && tool.isValidHit(object)) {
            this.hitEnvironmentObject(object, tool);
        }
    }

    hitEnvironmentObject(object, tool) {
        const pickedSound = Phaser.Math.Between(1, 3);

        this.scene.sound.play(`${tool.toolType}-hit-${pickedSound}`); 
        object.takeDamage(1);
    }

    damageEnemy(enemy) {
        enemy.takeDamage(this.scene.player.x, this.scene.player.y);
    }

    pickUpItem(player, item) {
        let rockItem = new InventoryItem(item.itemName, item.value);

        this.scene.player.collectItem(rockItem);

        item.destroyItem();
    }
}