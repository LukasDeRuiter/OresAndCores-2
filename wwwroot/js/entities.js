class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, inventory) {
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
    console.log(item);
 }
}

class Inventory {
    constructor(scene) {
        this.scene = scene;
        this.items = {};

        this.isVisible = false;
        
        this.inventoryText = this.scene.add.text(100, 100, "Inventory: {},", {
            fontSize: "16px",
            fill: "#FFFFFF",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        }).setScrollFactor(0);


         this.inventoryText.setDepth(50); 
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
        console.log(this.inventoryText);
        console.log("Inventory text created at:", this.inventoryText.x, this.inventoryText.y);
        this.inventoryText.setText(`Inventory: ${JSON.stringify(this.items)}`);
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

    load() {
        if (!this.isLoaded) {
            for (var x = 0; x < this.scene.chunkSize; x++) {
                for (var y = 0; y < this.scene.chunkSize; y++) {
                    var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
                    var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

                    var perlinValue = noise.perlin2(tileX / 100, tileY / 100);

                    var key = "";
                    var animationKey = "";

                    if (perlinValue < 0.2) {
                        key = "sprWater";
                        animationKey = "sprWater";
                    } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
                        key = "sprSand";
                    } else if (perlinValue >= 0.3) {
                        key = "sprGrass";
                        if(Math.random() < 0.1) {
                            var object = new EnvironmentObject(this.scene, tileX + 8, tileY - 8, "rock");
                            console.log("test");
                            this.scene.environmentObjects.add(object);
                        }
                    }

                    var tile = new Tile(this.scene, tileX, tileY, key);
                    //tile.setDepth(0);
                   
                    if (animationKey !== "") {
                        tile.play(animationKey);
                    }

                    this.tiles.add(tile);
                }
            }

            this.isLoaded = true;
        }
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
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this); 
    
        this.setDepth(2);

        this.setScale(16 / this.width, 16 / this.height);
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