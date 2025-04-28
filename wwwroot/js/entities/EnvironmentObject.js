import { Item } from "./Item.js";

export class EnvironmentObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, health, materialType, requiredLevel, items) {
        super(scene, x, y, key);
        this.scene = scene;

        this.requiredLevel = requiredLevel;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); 
        this.body.setImmovable(true);
        this.health = health;
        this.materialType = materialType;

        this.items = this.buildDropItems(items);
    
        this.setDepth(2);

        this.setScale(16 / this.width, 16 / this.height);
    }

    flash() {
        const flash = this.scene.add.sprite(this.x, this.y, this.texture.key)
            .setDepth(this.depth + 1)
            .setScale(this.scaleX, this.scaleY)
            .setAlpha(0.8)
            .setBlendMode(Phaser.BlendModes.ADD);
    
        this.scene.time.delayedCall(100, () => {
            flash.destroy();
        });
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

    createSparks() {
        const particles = this.scene.add.particles("spark");

        const emitter = particles.createEmitter({
            x: this.x,
            y: this.y,
            speed: { min: 50, max: 150 },
            angle: { min: 0 , max: 360 },
            lifespan: 300,
            quantity: 10,
            scale: { start: 0.5, end: 0 },
            on: false
        });

        emitter.explode( 10,  this.x, this.y);

        this.scene.time.delayedCall(500, () => {
            particles.destroy();
        })
    }

    takeDamage(hit) {
        this.health -= hit;
        this.createSparks();
        this.flash();

        this.setTint(0xffffff);
   
        this.scene.time.delayedCall(1000, () => this.clearTint());

        if (this.health <= 0) {
            this.dropItems();
            this.destroy();
        }
    }
}