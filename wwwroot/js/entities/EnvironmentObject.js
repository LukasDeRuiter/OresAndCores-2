import { Item } from "./Item.js";

export class EnvironmentObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, health, items) {
        super(scene, x, y, key);
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); 
        this.body.setImmovable(true);
        this.health = health;

        this.items = this.buildDropItems(items);
    
        this.setDepth(2);

        this.setScale(16 / this.width, 16 / this.height);
    }

    buildDropItems(items) {

        let itemsInsideObject = [];

        items.forEach(item => {
            for (let i = 0; i < item.amount; i++) {
                const roll = Math.random() * 100;

                if (roll <= item.dropChance) {
                    itemsInsideObject.push(item.itemId);
                }
            }
        });

        return itemsInsideObject;
    }

    dropItems() {
        this.items.forEach(dropItem => {
            let dropX = this.x + Phaser.Math.Between(-12, 12);
            let dropY = this.y + Phaser.Math.Between(-12, 12);

            const itemData = window.items.find(objData => objData.id === dropItem);

            new Item(this.scene, dropX, dropY, itemData.name, itemData.name, itemData.value);
        });
    }

    takeDamage(hit) {
        this.health -= hit;

        if (this.health <= 0) {
            this.dropItems();
            this.destroy();
        }
    }
}