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