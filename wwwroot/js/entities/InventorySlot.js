export class InventorySlot {
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
        this.slotText = null;
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