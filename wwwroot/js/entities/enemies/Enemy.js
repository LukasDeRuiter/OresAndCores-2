import { Item } from "../Item.js";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, spritesheet, health, speed, items, angleSprite = false) {
        super(scene, x, y, spritesheet);

        this.scene = scene;
        this.name = name;
        this.spritesheet = spritesheet;
        this.walkingAnimation = `${name}-walk`;
        this.attackingAnimation = `${name}-attack`;
        this.deathAnimation = `${name}-death`;

        this.attackSound = `${name}-attack-1`;
        this.damageSound = `${name}-damage-1`;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5);
        this.setDepth(30);
        this.setScale(1);
        this.setCollideWorldBounds(true);

        this.createAnimations(scene, name);

        this.wanderTimer = 0;
        this.speed = speed;
        this.health = health;
        this.isDead = false;
        this.knockbackDuration = 200;
        this.knockbackTimer = 0;
        this.wanderCooldown = Phaser.Math.Between(1000, 3000);
        this.wanderDirection = new Phaser.Math.Vector2(0, 0);
        this.items = this.buildDropItems(items);
        this.angleSprite = angleSprite;
    }

    createAnimations(scene) {
        if (!scene.anims.exists(this.walkingAnimation)) {
            scene.anims.create({
                key: this.walkingAnimation,
                frames: scene.anims.generateFrameNumbers(this.name, {
                    frames: [0, 1, 2, 1, 0]
                }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!scene.anims.exists(this.attackingAnimation)) {
            scene.anims.create({
                key: this.attackingAnimation,
                frames: scene.anims.generateFrameNumbers(this.name, {
                    frames: [3, 4, 5, 4, 3]
                }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!scene.anims.exists(this.deathAnimation)) {
            scene.anims.create({
                key: this.deathAnimation,
                frames: scene.anims.generateFrameNumbers(this.name, {
                    frames: [ 6 ]
                }),
                frameRate: 10,
                repeat: 0
            });
        }
    }
    
    walk(time, delta) {
        this.switchAnimation(this.walkingAnimation);

        this.wanderTimer += delta;

        if (this.wanderTimer >= this.wanderCooldown) {
            const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            this.wanderDirection.setTo(Math.cos(angle, Math.sin(angle)));
            this.wanderDirection.normalize();

            this.wanderCooldown = Phaser.Math.Between(1000, 3000);
            this.wanderTimer = 0;
            this.setVelocity(this.wanderDirection.x * this.speed, this.wanderDirection.y * this.speed);
        }
    }

    attack() {
        this.scene.physics.moveToObject(this, this.scene.player, 45);
        this.playSound(this.attackSound, this.attackingAnimation);
        
        this.switchAnimation(this.attackingAnimation);
    }

    takeDamage(attackerX, attackerY) {
        if(this.health > 0) {
            this.health -= 1;
            this.createSparks();

            this.scene.sound.play(this.damageSound);
    
            const pushBackVector = new Phaser.Math.Vector2(this.x - attackerX, this.y - attackerY).normalize().scale(200);
            this.knockbackTimer = this.knockbackDuration;
            this.setVelocity(pushBackVector.x, pushBackVector.y);
            if(this.health <= 0) {
                this.die();
            }
        }
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

    die() {
        this.isDead = true;
        this.setVelocity(0);
        this.play(this.deathAnimation);
        this.dropItems();
        this.on("animationcomplete", () => {
            this.scene.time.delayedCall(1000, () => {
                this.scene.tweens.add({
                    targets: this,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        this.destroy();
                    }
                });
            });
        }, this);
    }

    switchAnimation(animationKey) {
        if (!this.anims.isPlaying || this.anims.currentAnim.key !== animationKey) {
            this.play(animationKey);
        }
    }

    playSound(sound, animationKey) {
        if (!this.anims.isPlaying || this.anims.currentAnim.key !== animationKey) {
            this.scene.sound.play(sound);
        }
    }

    buildDropItems(items) {

        let itemsInsideEnemy = [];

        items.forEach(item => {
            for (let i = 0; i < item.amount; i++) {
                const roll = Math.random() * 100;

                if (roll <= item.dropChance) {
                    itemsInsideEnemy.push(item.itemId);
                }
            }
        });

        return itemsInsideEnemy;
    }

    dropItems() {
        this.items.forEach(dropItem => {
            let dropX = this.x + Phaser.Math.Between(-12, 12);
            let dropY = this.y + Phaser.Math.Between(-12, 12);

            const itemData = window.items.find(objData => objData.id === dropItem);

            new Item(this.scene, dropX, dropY, itemData.name, itemData.name, itemData.value);
        });
    }
}