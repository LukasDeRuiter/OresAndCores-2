export class ShopSlot {
    constructor(scene, x, y, slotWidth, slotHeight, isVisible) {
        this.scene = scene;
        this.x = x;
        this.y = y;


        this.slotWidth = slotWidth;
        this.slotHeight = slotHeight;
        this.isVisible = isVisible;

        this.slot = this.scene.add.rectangle(x, y, this.slotWidth, this.slotHeight, 0x858585)
        .setScrollFactor(0)
        .setDepth(300)
        .setVisible(this.isVisible);

        this.item = null;
        this.itemImage = null;
        this.slotText = null;
        this.price = null;
    }

    setItem(item) {
        this.item = item;
        this.updateSlotDisplay();
    }

    setPrice(price) {
        this.price = price;
    }

    updateSlotDisplay() {
        if (this.item) {
            if (!this.itemImage) {  
            this.itemImage = this.scene.add.image(this.x, this.y, this.item.name)
            .setScrollFactor(0)
            .setScale(this.slotWidth / 32)
            .setDepth(155)
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