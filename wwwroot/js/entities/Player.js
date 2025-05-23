import { InventoryTool } from "./InventoryTool.js";
import { Tool } from "./Tool.js";

export class Player extends Phaser.GameObjects.Sprite {
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

        this.idle = "player-idle";
        this.walkDown = "player-walk-down";
        this.walkSideways = "player-walk-sideways";
        this.walkUp = "player-walk-up";

        this.createAnimations(scene);

        this.selectedTool = this.toolBelt.find(tool => tool.name = "pickaxe");
        this.tool = null;

        this.play(this.idle, true);
    }

    update(cursors) {
        this.body.setVelocity(0);

        let animToPlay = null;

        if (cursors.W.isDown && cursors.A.isDown) {
            this.viewDirection = "up-left";
            animToPlay = this.walkSideways;
        } else if (cursors.W.isDown && cursors.D.isDown) {
            this.viewDirection = "up-right";
            animToPlay = this.walkSideways;
        } else if (cursors.S.isDown && cursors.A.isDown) {
            this.viewDirection = "down-left";
            animToPlay = this.walkSideways;
        } else if (cursors.S.isDown && cursors.D.isDown) {
            this.viewDirection = "down-right";
            animToPlay = this.walkSideways;
        }   

        if (cursors.W.isDown) {
            animToPlay = this.walkUp;
            this.body.setVelocityY(-this.speed);
            this.viewDirection = "up";
        } else if (cursors.S.isDown) {
            animToPlay = this.walkDown
            this.body.setVelocityY(this.speed);
            this.viewDirection = "down";
        }

        if(cursors.A.isDown) {
            animToPlay = this.walkSideways;
            this.body.setVelocityX(-this.speed);
            this.setFlipX(true);
            this.viewDirection = "left";
        } else if (cursors.D.isDown) {
            animToPlay = this.walkSideways;
            this.body.setVelocityX(this.speed);
            this.viewDirection = "right";
            this.setFlipX(false);
        }
        
        if (!cursors.W.isDown && !cursors.S.isDown && !cursors.A.isDown && !cursors.D.isDown) {
            animToPlay = this.idle;
        }

        if (animToPlay && (this.anims.currentAnim?.key !== animToPlay || !this.anims.isPlaying)) {
            this.anims.play(animToPlay, true);
        }

        if (Phaser.Input.Keyboard.JustDown(this.scene.numberKeys.one)) {
            this.selectedTool = this.toolBelt.find(tool => tool.name === "sword");
        } else if (Phaser.Input.Keyboard.JustDown(this.scene.numberKeys.two)) {
            this.selectedTool = this.toolBelt.find(tool => tool.name === "pickaxe");
        } else if (Phaser.Input.Keyboard.JustDown(this.scene.numberKeys.three)) {
            this.selectedTool = this.toolBelt.find(tool => tool.name === "axe");
        }

        if (Phaser.Input.Keyboard.JustDown(this.scene.keyESC)) {
            this.scene.menu.toggleMenu();
        }

        if (this.tool) {
            this.updateToolPosition();
        }
    }
    

    createAnimations(scene) {
        if (!this.scene.anims.exists(this.idle)) {
            this.scene.anims.create({
                key: this.idle,
                frames: this.scene.anims.generateFrameNumbers("player", {
                    frames: [0, 1, 2, ]
                }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists(this.walkDown)) {
            this.scene.anims.create({
                key: this.walkDown,
                frames: this.scene.anims.generateFrameNumbers("player", {
                    frames: [3, 4, 5, 6 ]
                }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists(this.walkSideways)) {
            this.scene.anims.create({
                key: this.walkSideways,
                frames: this.scene.anims.generateFrameNumbers("player", {
                    frames: [7, 8, 9, 10 ]
                }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists(this.walkUp)) {
            this.scene.anims.create({
                key: this.walkUp,
                frames: this.scene.anims.generateFrameNumbers("player", {
                    frames: [11, 12, 13, 14 ]
                }),
                frameRate: 6,
                repeat: -1
            });
        }
    }
    
    createToolBelt() {
        if (this.toolBelt !== null) {
            let toolbelt = [];

            const pickaxe = new InventoryTool(this.scene, "pickaxe", "pickaxe-level-1", this.scene.environmentObjects, 1, "stone");
            const sword = new InventoryTool(this.scene,"sword", "sword-level-1", this.scene.enemies, 1);
            const axe = new InventoryTool(this.scene,"axe", "axe-level-1", this.scene.environmentObjects, 1, "wood");

            toolbelt.push(pickaxe);
            toolbelt.push(sword);
            toolbelt.push(axe);

            return toolbelt;
        }

    return this.toolBelt;
}

showTool() {
    if (!this.tool && this.selectedTool) {
        let position = this.getBreakingPositionArea();
        this.tool = new Tool(
            this.scene,
            position.x,
            position.y, 
            this.selectedTool.name, 
            this.selectedTool.getKey(), 
            this.selectedTool.level, 
            this.selectedTool.materialType
            );

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
    if(item.name === "coin-item") {
        this.inventory.addMoney(item.value);
    } else {
        this.inventory.addItem(item);
    }
 }

 levelUp() {
    this.level += 1;
    this.scene.updateEnvironment;
 }
}