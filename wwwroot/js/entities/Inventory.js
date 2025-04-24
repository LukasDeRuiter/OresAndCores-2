import { InventorySlot } from "./InventorySlot.js";
import { InventoryItem } from "./InventoryItem.js";

export class Inventory {
    constructor(scene) {
        this.scene = scene;
        this.items = {};
        this.itemImages = {};

        this.isVisible = false;
        this.money = 0;

        this.inventoryBackground = this.scene.add.rectangle(400, 300, 350, 250, 0X000000, 0.3).setOrigin(0.5).setDepth(50).setScrollFactor(0);
        this.inventoryBackground.setVisible(this.isVisible);

        this.levelText = this.scene.add.text(280, 340, "Current level: 1", {
            fontSize: "16",
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 3,
        }).setDepth(52).setScrollFactor(0).setVisible(this.isVisible);

        this.moneyText = this.scene.add.text(280, 360, "Money: 0", {
            fontSize: "16",
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 3,
        }).setDepth(52).setScrollFactor(0).setVisible(this.isVisible);

        this.toolBeltText = null;

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
        this.showPickUpText(item.name, '#fff');

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

    removeItem(item) {
        this.showRemoveText(item.name, '#b20000');

        for (let slot of this.inventorySlots) {
            if (slot.item && slot.item.name === item.name) {
                this.items[item.name]--;
                slot.updateTextAmount(this.items[item.name]);
                this.updateUI();

                if (this.items[item.name] <= 0) {
                    delete this.items[item.name];
                    slot.removeItem();
                }
                
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
        this.moneyText.setVisible(this.isVisible);

        if (!this.toolBeltText) {
            this.toolBeltText = this.scene.add.text(430, 340, this.renderToolBeltText(), {
                fontSize: "16",
                fill: "#fff",
                stroke: "#000",
                strokeThickness: 3,
            }).setDepth(52).setScrollFactor(0).setVisible(this.isVisible);
        } else {
            this.toolBeltText.setVisible(this.isVisible);
        }
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

    addMoney(amount) {
        this.showPickUpText(amount === 1 ? '1 coin' : `${amount} coins`, '#fcce07');
        this.money += amount;
    }

    saveInventory() {
        const savedSlots = this.inventorySlots.map((slot, index) => {
            if (slot.item) {
                return {
                    index,
                    name: slot.item.name,
                    count: this.items[slot.item.name],
                };
            }

            return null;
        }).filter(s => s !== null);

        return {
            money: this.money,
            slots: savedSlots,
        }
    }

    restoreInventory(data) {
        this.items = {};

        data.slots.forEach(slotData => {
            const { index, name, count } = slotData;

            this.items[name] = count;

            const slot = this.inventorySlots[slotData.index];
            const item = new InventoryItem(name);
            slot.setItem(item);
            slot.updateTextAmount(count);
        });

        this.money = data.money || 0;
        this.updateUI();
    }

    renderToolBeltText() {
        let text = '';

        this.scene.player.toolBelt.forEach(tool => {
            text += `${tool.name}: ${tool.level} \n`;
        });

        return text;
    }

    pay(cost) {
        this.money -= cost;
    }

    showPickUpText(name, color) {
        const overlapPreventY = Phaser.Math.Between(0, 30);
        const overlapPreventX = Phaser.Math.Between(-20, 20);

        const pickUpText = this.scene.add.text(
            this.scene.player.x + overlapPreventX, 
            this.scene.player.y - 20 - overlapPreventY,
            `Collected ${name}!`, {
                font: '10px Arial',
                fill: color,
            }).setOrigin(0.5).setDepth(100);
        
        this.scene.tweens.add({
            targets: pickUpText,
            y: pickUpText.y - 50 - overlapPreventY,
            alpha: 0,
            duration: 2500,
            ease: 'Power1',
            onComplete: () => pickUpText.destroy()
        })
    }

    showRemoveText(name, color) {
        const overlapPreventY = Phaser.Math.Between(0, 30);
        const overlapPreventX = Phaser.Math.Between(-20, 20);

        const pickUpText = this.scene.add.text(
            this.scene.player.x + overlapPreventX, 
            this.scene.player.y - 20 - overlapPreventY,
            `Lost ${name}!`, {
                font: '10px Arial',
                fill: color,
            }).setOrigin(0.5).setDepth(100);
        
        this.scene.tweens.add({
            targets: pickUpText,
            y: pickUpText.y - 50 - overlapPreventY,
            alpha: 0,
            duration: 2500,
            ease: 'Power1',
            onComplete: () => pickUpText.destroy()
        })
    }

    isItemInInventory(item) {
        let itemInInventory = this.items[item.name];

        if (itemInInventory) {
            return true;
        }

        return false;
    }
}