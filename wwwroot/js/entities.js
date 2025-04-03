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

         if (!cursors.W.isDown && !cursors.S.isDown && !cursors.A.isDown && !cursors.D.isDown) {
        this.anims.stop();
    }

    if (this.tool) {
        this.updateToolPosition();
    }
}

showTool() {
    if (!this.tool) {
        let position = this.getBreakingPositionArea();
        this.tool = new Tool(this.scene, position.x, position.y, "pickaxe", "pickaxe");

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

        this.inventorySlots = [];
        let rows = 4;
        let cols = 6;
        let slotSize = 32;
        let startX = 300;
        let startY = 200;       
        let padding = 5;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = startX + col * (slotSize + padding);
                let y = startY + row * (slotSize + padding);

                let slot = this.scene.add.rectangle(x, y, slotSize, slotSize, 0xffffff, 0.3).setOrigin(0.5).setDepth(50).setScrollFactor(0);
                slot.setVisible(this.isVisible);
                this.inventorySlots.push(slot);
            }
        }
    }

    addItem(item) {
        if (this.items[item.name]) {
            this.items[item.name]++;
        } else {
            this.items[item.name] = 1;
        }

        this.updateUI();
    }

    updateUI() {
        console.log(this.inventoryBackground);
        this.inventoryBackground.setVisible(this.isVisible);
        this.inventorySlots.forEach(slot => slot.setVisible(this.isVisible));


        Object.values(this.itemImages).forEach(image => image.destroy());
        this.itemImages = {};

        let count = 0;

        Object.entries(this.items).forEach(([itemName, itemCount]) => {
            if (count >= this.inventorySlots.length) {
                return;
            }

            let slot = this.inventorySlots[count];

            let itemImage = this.scene.add.image(slot.x, slot.y, itemName).setOrigin(0.5).setDepth(51).setScrollFactor(0).setVisible(this.isVisible);
            itemImage.setScale(32 / itemImage.width, 32 / itemImage.height);

            this.itemImages[itemName] = itemImage;

            let countText = this.scene.add.text(slot.x + 10, slot.y + 10, itemCount, {
                fontSize: "12px",
                fill: "#fff",
                stroke: "#000",
                strokeThickness: 3
            }).setOrigin(0.5).setDepth(52).setScrollFactor(0).setVisible(this.isVisible);

            this.itemImages[itemName + "_count"] = countText;


            count++;
        })

       



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

class InventoryItem {
    constructor(name, icon = null) {
        this.name = name;
        this.icon = icon;
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
                    var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
                    var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

                    var perlinValue = noise.perlin2(tileX / 100, tileY / 100) * level;

                    var key = "";
                    var animationKey = "";

                    if (perlinValue < 0.2) {
                        key = "cave-3";
                    } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
                        key = "cave-2";
                    } else if (perlinValue >= 0.3) {
                        key = "cave-1";

                        const objectChance = Math.random() * 100;

                        this.createObject(tileX, tileY, this.generateLevelObject(objectChance, level));
                    }

                    var tile = new Tile(this.scene, tileX, tileY, key);
                   
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
            if (objectChance > 70 &&  objectChance <= 95) {
                return "rock";
            } else if (objectChance > 95 && objectChance <= 100) {
                return "copper-rock";
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
    constructor(scene, x, y, key, object = null) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0);
        
        this.object = object;
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