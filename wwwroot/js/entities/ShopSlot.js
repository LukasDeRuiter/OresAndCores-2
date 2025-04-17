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
        this.purchaseButton = null;
        this.purchaseButtonBackground = null;
        this.amountContainer = null;

        this.canPurchaseItem = false;
    }

    setItem(item) {
        this.item = item;
        this.setPrice(item.value);
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
                this.itemText = this.scene.add.text(0, 0, 'Buy', {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 1,
                }).setDepth(56)
                .setScrollFactor(0)
                .setVisible(this.isVisible);
            }

            if (!this.purchaseButton) {
                let itemText = this.scene.add.text(Math.round(10), Math.round(-10), 'Buy', {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                });

                this.purchaseButtonBackground = this.scene.add.rectangle(22, 0, this.slotWidth / 2, 20, '#008000', 0.3).setDepth(50).setScrollFactor(0).setInteractive();

                console.log(this.scene);
                this.purchaseButton = this.scene.add.container(this.x, this.y + 20, [this.purchaseButtonBackground, itemText]).setDepth(52).setScrollFactor(0);
            }

            if (!this.amountContainer) {
                let coinBackground = this.scene.add.rectangle(-this.slotWidth / 2, 0, this.slotWidth / 2, 20, '#008000', 0.3).setDepth(50).setScrollFactor(0);
                let costSprite = this.scene.add.image((-this.slotWidth / 2) - 5, 0, "coin-item").setScale(0.5);

                console.log(this.scene.player.inventory.money);
                let coinAmount = this.scene.add.text(Math.round(-28), Math.round(-10), this.price, {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                });
                this.amountContainer = this.scene.add.container(this.x, this.y + 20, [coinBackground, costSprite, coinAmount]).setDepth(52).setScrollFactor(0);
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

            if(this.purchaseButton) {
                this.purchaseButton.destroy();
                this.purchaseButton = null;
            }
        }
    }

    toggleVisible(isVisible) {
        this.slot.setVisible(isVisible);

        if (this.item) {
            this.updatePriceCheck();

            this.itemImage.setVisible(isVisible);
            this.itemText.setVisible(isVisible);
        }
    }

    updatePriceCheck() {
        this.canPurchaseItem = this.scene.player.inventory.money >= this.price;

        let color = this.canPurchaseItem ? 0x00aa00 : 0xaa0000;

        if (this.purchaseButtonBackground) {
            this.purchaseButtonBackground.setFillStyle(color, 0.3);
        }
    }

    updateTextAmount(amount) {
        this.itemText.setText(amount);
    }
}