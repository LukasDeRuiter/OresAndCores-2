class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, inventory, level) {
        super(scene, x, y, "player");   

        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); 

        this.setOrigin(0.5);
        this.setDisplaySize(16, 16);
        
        this.body.setSize(16, 16);
        this.body.setCollideWorldBounds(true);

        this.speed = 100;
        this.viewDirection = "down";
        
        this.level = level;

        this.inventory = inventory;

        this.toolBelt = this.createToolBelt();

        this.selectedTool = this.toolBelt.find(tool => tool.name === "pickaxe");
        this.tool = null;
    }

    update(cursors) {
        this.body.setVelocity(0);

        if (cursors.W.isDown) {
            this.anims.play("walk-up", true);
            this.body.setVelocityY(-this.speed);
            this.viewDirection = "up";
        } else if (cursors.S.isDown) {
            this.anims.play("walk-down", true);
            this.body.setVelocityY(this.speed);
            this.viewDirection = "down";
        }

        if(cursors.A.isDown) {
            this.anims.play("walk-left", true);
            this.body.setVelocityX(-this.speed);
            this.setFlipX(true);
            this.viewDirection = "left";
        } else if (cursors.D.isDown) {
            this.anims.play("walk-right", true);
            this.body.setVelocityX(this.speed);
            this.viewDirection = "right";
            this.setFlipX(false);
        }

        if (cursors.W.isDown && cursors.A.isDown) {
            this.viewDirection = "up-left";
        } else if (cursors.W.isDown && cursors.D.isDown) {
            this.viewDirection = "up-right";
        } else if (cursors.S.isDown && cursors.A.isDown) {
            this.viewDirection = "down-left";
        } else if (cursors.S.isDown && cursors.D.isDown) {
            this.viewDirection = "down-right";
        }
        
        if (!cursors.W.isDown && !cursors.S.isDown && !cursors.A.isDown && !cursors.D.isDown) {
            this.anims.stop();
        }

        if (Phaser.Input.Keyboard.JustDown(this.scene.numberKeys.one)) {
            this.selectedTool = this.toolBelt.find(tool => tool.name === "sword");
        } else if (Phaser.Input.Keyboard.JustDown(this.scene.numberKeys.two)) {
            this.selectedTool = this.toolBelt.find(tool => tool.name === "pickaxe");
        }

        if (this.tool) {
            this.updateToolPosition();
        }
    }
    
    createToolBelt() {
        if (this.toolBelt !== null) {
            let toolbelt = [];

            const pickaxe = new InventoryTool("pickaxe", "pickaxe", this.scene.environmentObjects);
            const sword = new InventoryTool("sword", "sword", this.scene.enemies);

            toolbelt.push(pickaxe);
            toolbelt.push(sword);

            return toolbelt;
        }

    return this.toolBelt;
}

showTool() {
    if (!this.tool) {
        let position = this.getBreakingPositionArea();
        this.tool = new Tool(this.scene, position.x, position.y, this.selectedTool.name, this.selectedTool.name);

        this.swingTool();
    }
}

swingTool() {
    if (!this.tool) return;

    this.scene.tweens.add({
        targets: this.tool,
        angle: { from: -45, to: 45},
        duration: 200,
        yoyo: true,
        repeate: 0,
        ease: "Sine.easeInOut",
        onComplete: () => {
            this.hideTool();
        }
    })
}

hideTool() {
    if (this.tool) {
        this.tool.destroy();
        this.tool = null;
    }
}

updateToolPosition() {
    if (this.tool) {
        let position = this.getBreakingPositionArea();
        this.tool.setPosition(position.x, position.y);

        if (this.viewDirection === "left") {
            this.tool.setFlipX(true);
        } else if (this.viewDirection === "right") {
            this.tool.setFlipX(false);
        } else if (this.viewDirection === "up") {
            this.tool.setFlipY(false);
        } else if (this.viewDirection === "down") {
            this.tool.setFlipY(true);
        }
    }
}

getBreakingPositionArea() {
    let breakX = this.x;
    let breakY = this.y;

    if (this.viewDirection === "up") {
     breakY -= 16;
 } else if (this.viewDirection === "down") {
     breakY += 16;
 } else if (this.viewDirection === "left") {
     breakX -= 16;
 } else if (this.viewDirection === "right") {
     breakX += 16;
 } else if (this.viewDirection === "up-left") {
     breakX -= 16;
     breakY -= 16;
} else if (this.viewDirection === "up-right") {
     breakX += 16;
     breakY -= 16;
} else if (this.viewDirection === "down-left") {
     breakX -= 16
     breakY += 16;
} else if (this.viewDirection === "down-right") {
     breakX += 16;
     breakY += 16;
}

 return { x: breakX, y: breakY };
 }

 collectItem(item) {
    this.inventory.addItem(item);
 }

 levelUp() {
    this.level += 1;
    this.scene.updateEnvironment;
 }
}

class Inventory {
    constructor(scene) {
        this.scene = scene;
        this.items = {};
        this.itemImages = {};

        this.isVisible = false;

        this.inventoryBackground = this.scene.add.rectangle(400, 300, 350, 250, 0X000000, 0.3).setOrigin(0.5).setDepth(50).setScrollFactor(0);
        this.inventoryBackground.setVisible(this.isVisible);

        this.levelText = this.scene.add.text(320, 350, "Current level: 1", {
            fontSize: "16",
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 3,
        }).setOrigin(0.5).setDepth(52).setScrollFactor(0).setVisible(this.isVisible);

        this.inventorySlots = [];
        let rows = 4;
        let cols = 6;
        let slotSize = 32;
        let startX = 300;
        let startY = 200;       
        let padding = 5;

        this.draggedItem = null;
        this.selectedSlot = null;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = startX + col * (slotSize + padding);
                let y = startY + row * (slotSize + padding);

                let slot = new InventorySlot(this.scene, x, y, slotSize, this.isVisible);
                this.inventorySlots.push(slot);
            }
        }
    }

    addItem(item) {
        for (let slot of this.inventorySlots) {
            if (slot.item && slot.item.name === item.name) {
                this.items[item.name]++;
                slot.updateTextAmount(this.items[item.name]);
                this.updateUI();
                
                return;
            }
        }

        for (let slot of this.inventorySlots) {
            if (!slot.item) {
                this.items[item.name] = 1;
                slot.setItem(new InventoryItem(item.name));
                this.updateUI();

                return;
            }
        }
    }

    updateUI() {
        this.inventoryBackground.setVisible(this.isVisible);
        this.inventorySlots.forEach((slot, index) => {
            slot.toggleVisible(this.isVisible);
        });

        this.levelText.setVisible(this.isVisible);
    }
    
    startItemDrag(slot, pointer) {
        this.draggedItem = slot.itemImage;
        this.selectedSlot = slot;
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.input.once('pointerup', this.onPointerUp, this);
    }

    onPointerMove(pointer) {
        if (this.draggedItem) {
            const camera = this.scene.cameras.main;
            const zoom = camera.zoom;

            const adjustedX = pointer.worldX - camera.scrollX;
            const adjustedY = pointer.worldY - camera.scrollY;
            
            this.draggedItem.setPosition(adjustedX, adjustedY);
            this.selectedSlot.itemText.setPosition(adjustedX + 20, adjustedY + 20);
        }
    }

    onPointerUp(pointer) {
        if (this.draggedItem) {
            let dropSlot = this.getSlotUnderPointer(pointer);
            if (dropSlot && dropSlot !== this.draggedItem.slot && !dropSlot.item) {
                dropSlot.setItem(this.selectedSlot.item);
                this.selectedSlot.setItem(null);
                dropSlot.toggleVisible(this.isVisible);
            } else {
                this.selectedSlot.setItem(this.selectedSlot.item);
                this.draggedItem.setPosition(this.selectedSlot.x, this.selectedSlot.y);
                this.selectedSlot.itemText.setPosition(this.selectedSlot.x + 20, this.selectedSlot.y + 20);
            }

            if (dropSlot && dropSlot.itemImage) {
                dropSlot.itemImage.setPosition(dropSlot.x, dropSlot.y);
            }

            this.selectedSlot = null;
            this.draggedItem = null;
        }

        this.scene.input.off('pointermove', this.onPointerMove, this);
    }

    getSlotUnderPointer(pointer) {
        for (let slot of this.inventorySlots) {
            let bounds = slot.slot.getBounds();

            const camera = this.scene.cameras.main;
            const zoom = camera.zoom;

            const adjustedX = pointer.worldX - camera.scrollX;
            const adjustedY = pointer.worldY - camera.scrollY;

            if (bounds.contains(adjustedX, adjustedY)) {
                return slot;
            }
        }

        return null;
    }

    toggle() {
        this.isVisible = !this.isVisible;
        this.updateUI();

        if (this.isVisible) {
            this.scene.physics.world.pause();
        } else {
            this.scene.physics.world.resume();
        }
    }
}

class InventorySlot {
    constructor(scene, x, y, slotSize, isVisible) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.slotSize = slotSize;
        this.isVisible = isVisible;

        this.slot = scene.add.rectangle(x, y, slotSize, slotSize, 0xaaaaaa)
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setInteractive()
        .setDepth(52)
        .setVisible(this.isVisible);

        this.slot.on('pointerdown',  this.onPointerDown, this);
        this.slot.on('pointerover', this.onPointerOver, this);
        this.slot.on('pointerout', this.onPointerOut, this);

        this.item = null;
        this.itemImage = null;
        this.slotText = null
    }

    setItem(item) {
        this.item = item;
        this.updateSlotDisplay();
    }

    updateSlotDisplay() {
        if (this.item) {
            if (!this.itemImage) {  
            this.itemImage = this.scene.add.image(this.x, this.y, this.item.name)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setScale(this.slotSize / 32)
            .setDepth(55)
            .setVisible(this.isVisible);
            }

            if (!this.itemText) {  
                this.itemText = this.scene.add.text(this.x + 20, this.y + 20, this.scene.player.inventory.items[this.item.name], {
                    fontSize: "14px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 3,
                }).setOrigin(1)
                .setDepth(56)
                .setScrollFactor(0)
                .setVisible(this.isVisible);
            }
        } else {
            if (this.itemImage) {
                this.itemImage.destroy();
                this.itemImage = null;
            }

            if(this.itemText) {
                this.itemText.destroy();
                this.itemText = null;
            }
        }
    }

    onPointerDown(pointer, localX, localY, event) {
        if(this.item) {
            this.scene.player.inventory.startItemDrag(this, pointer);
        }
    }

    onPointerOver() {
        this.slot.setStrokeStyle(2, 0x00ff00);
    }

    onPointerOut() {
        this.slot.setStrokeStyle(0);
    }

    toggleVisible(isVisible) {
        this.slot.setVisible(isVisible);
        if (this.item) {
            this.itemImage.setVisible(isVisible);
            this.itemText.setVisible(isVisible);
        }
    }

    updateTextAmount(amount) {
        this.itemText.setText(amount);
    }
}

class InventoryItem {
    constructor(name, icon = null) {
        this.name = name;
        this.icon = icon;
    }
}

class InventoryTool {
    constructor(name, key, interactsWith) {
        this.name = name;
        this.key = key;
        this.interactsWith = interactsWith;

        this.swingWithNoHitSound = this.getNoHitSound();
    }

    getNoHitSound() {
        return "tool-swing-1";
    }
}

class Chunk {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
       
        this.tiles = this.scene.add.group();
        this.isLoaded = false;

    
    }

    unload() {
        if (this.isLoaded) {
            this.tiles.clear(true, true);

            this.isLoaded = false;
        }
    }

    load(level) {
        if (!this.isLoaded) {
            for (var x = 0; x < this.scene.chunkSize; x++) {
                for (var y = 0; y < this.scene.chunkSize; y++) {
                    let worldWidth = this.scene.physics.world.bounds.width;
                    let worldHeight = this.scene.physics.world.bounds.height;

                    this.scene.physics.world.setBounds(0, 0, worldWidth, worldHeight);

                    var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
                    var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

                    var key = "";
                    let isWalkable = true;
                    var animationKey = ""; 

                    if (tileX !== 0 && tileY !== 0 && tileX < worldWidth - this.scene.tileSize && tileY < worldHeight - this.scene.tileSize) {
                        var perlinValue = noise.perlin2(tileX / 100, tileY / 100) * level;

                        if (perlinValue < 0.2) {
                            key = "cave-3";
                        } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
                            key = "cave-2";
                        } else if (perlinValue >= 0.3) {
                            key = "cave-1";
                            const objectChance = Math.random() * 100;
                            this.createObject(tileX, tileY, this.generateLevelObject(objectChance, level));
                        } 
                    } else {
                        key = "wall-1";
                        isWalkable = false;
                    }

                    var tile = new Tile(this.scene, tileX, tileY, key, isWalkable);
                   
                    if (animationKey !== "") {
                        tile.play(animationKey);
                    }

                    this.tiles.add(tile);
                }
            }

            this.isLoaded = true;
        }
    }

    generateLevelObject(objectChance, level) {
        if(level >= 1 && level <= 5) {
            if (objectChance > 50 &&  objectChance <= 70) {
                return "rock";
            } else if (objectChance > 70 && objectChance <= 80) {
                return "copper-rock";
            } else if (objectChance > 80 && objectChance <= 85) {
                return "tin-rock";
            } else if (objectChance > 85 && objectChance <= 90) {
                return "iron-rock";
            }
        }
    }

    createObject(x, y, objectName) {
        if (!objectName) {
            return;
        }

        const objectData = window.environmentObjects.find(objData => objData.name === objectName);
        let object = new EnvironmentObject(this.scene, x + 8, y - 8, objectName, objectData.items);
        this.scene.environmentObjects.add(object);
    }
}

class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, itemName) {
        super(scene, x, y, key);
        this.scene = scene;
        this.itemName = itemName;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setDepth (7);
        this.setScale(16 / this.width, 16 / this.height);

        this.body.setSize(16, 16);

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

class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, isWalkable) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0);
        
        if (!isWalkable) {
            this.scene.physics.world.enable(this);
            this.body.setImmovable(true);
            this.scene.staticGroup.add(this); 
        }
    }
}

class EnvironmentObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, items) {
        super(scene, x, y, key);
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); 
        this.body.setImmovable(true);

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

            new Item(this.scene, dropX, dropY, itemData.name, itemData.name);
        });
    }
}

class Tool extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, toolType = 'pickaxe', key = "pickaxe") {
        super(scene, x, y, key);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setDepth(3);
        this.setScale(16 / this.width, 16 / this.height);
    }
}

class Porthole extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, level) {
        super(scene, x, y, "porthole");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); 
        this.body.setImmovable(true);
        this.price = this.calculatePriceToNextLevel(level);
        this.setDepth(100);
    }

    calculatePriceToNextLevel(level) {
        return level * 100;
    }
}

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritesheet, name, health, speed, items) {
        super(scene, x, y, spritesheet);

        this.scene = scene;
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

        this.play(this.walkingAnimation);
    }

    createAnimations(scene) {
        if (!scene.anims.exists(this.walkingAnimation)) {
            scene.anims.create({
                key: this.walkingAnimation,
                frames: scene.anims.generateFrameNumbers(this.spritesheet, {
                    frames: [0, 1, 2, 1, 0]
                }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!scene.anims.exists(this.attackingAnimation)) {
            scene.anims.create({
                key: this.attackingAnimation,
                frames: scene.anims.generateFrameNumbers(this.spritesheet, {
                    frames: [3, 4, 5, 4, 3]
                }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!scene.anims.exists(this.deathAnimation)) {
            scene.anims.create({
                key: this.deathAnimation,
                frames: scene.anims.generateFrameNumbers(this.spritesheet, {
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

            this.scene.sound.play(this.damageSound);
    
            const pushBackVector = new Phaser.Math.Vector2(this.x - attackerX, this.y - attackerY).normalize().scale(200);
            this.knockbackTimer = this.knockbackDuration;
            this.setVelocity(pushBackVector.x, pushBackVector.y);
    
            this.setTint(0xff0000);
            this.scene.time.delayedCall(100, () => this.clearTint());
    
            if(this.health <= 0) {
                this.die();
            }
        }
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

            new Item(this.scene, dropX, dropY, itemData.name, itemData.name);
        });
    }
}