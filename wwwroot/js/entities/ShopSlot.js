export class ShopSlot {
    constructor(scene, merchant, x, y, slotWidth, slotHeight, isVisible) {
        this.scene = scene;
        this.merchant = merchant;
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
        this.isSellMode = false;
        this.coinAmount = null;

        this.canPurchaseItem = false;
        this.canSellItem = false;
    }

    setItem(item) {
        this.item = item;
        this.setPrice(item.value);
        this.updateSlotDisplay();
    }

    setPrice(price) {
        this.price = price;
        this.sellPrice = (this.price / 100) * 80;
    }

    toggleSellMode(isSellMode) {
        this.isSellMode = isSellMode;
    }

    updateSlotUI() {
        if (this.isSellMode) {
            this.coinAmount.setText(this.sellPrice);
            this.itemText.setText('Sell');
            this.updateSalableCheck();
        } else {
            this.coinAmount.setText(this.price);
            this.itemText.setText('Buy');
            this.updatePriceCheck();
        }
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

            if (!this.purchaseButton) {
                this.itemText = this.scene.add.text(Math.round(10), Math.round(-10), this.isSellMode ? 'Sell' : 'Buy', {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                }).setResolution(2);

                this.purchaseButtonBackground = this.scene.add.rectangle(22, 0, this.slotWidth / 2, 20, '#008000').setDepth(50).setScrollFactor(0).setInteractive().setAlpha(0.6).setScale(1);;
                this.purchaseButton = this.scene.add.container(this.x, this.y + 20, [this.purchaseButtonBackground, this.itemText]).setDepth(52).setScrollFactor(0);

                this.purchaseButtonBackground.on('pointerdown', () => {
                    this.startTransation();
                });

                this.purchaseButtonBackground.on('pointerover', () => {
                    this.purchaseButtonBackground.setAlpha(1).setScale(1.2);
    
                });

                this.purchaseButtonBackground.on('pointerout', () => {
                    this.purchaseButtonBackground.setAlpha(0.6).setScale(1);
        
                });
            }

            if (!this.amountContainer) {
                let coinBackground = this.scene.add.rectangle(-this.slotWidth / 2, 0, this.slotWidth / 2, 20, '#008000', 0.3).setDepth(50).setScrollFactor(0);
                let costSprite = this.scene.add.image((-this.slotWidth / 2) - 5, 0, "coin-item").setScale(0.5);

                this.coinAmount = this.scene.add.text(Math.round(-28), Math.round(-10), this.price, {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                }).setResolution(2);
                this.amountContainer = this.scene.add.container(this.x, this.y + 20, [coinBackground, costSprite, this.coinAmount]).setDepth(52).setScrollFactor(0);
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

    startTransation() {
        if (this.isSellMode) {
            this.checkSellPossible();

            if (this.canSellItem) {
                this.sellItem();
            }
        } else {
            this.checkPurchasePrice();

            if (this.canPurchaseItem) {
                this.buyItem();
            }
        }
    }

    buyItem() {
        this.scene.player.inventory.pay(this.price);
        this.scene.player.inventory.addItem(this.item);
        this.merchant.slots.forEach(slot => {
            slot.updatePriceCheck();
        })
    }

    sellItem() {
        this.scene.player.inventory.addMoney(this.sellPrice);
        this.scene.player.inventory.removeItem(this.item);
        this.merchant.slots.forEach(slot => {
            slot.updateSalableCheck();
        })
    }

    toggleVisible(isVisible) {
        this.slot.setVisible(isVisible);

        if (this.item) {
            this.updatePriceCheck();

            this.itemImage.setVisible(isVisible);
            this.itemText.setVisible(isVisible);
        }
    }

    checkPurchasePrice() {
        this.canPurchaseItem = this.scene.player.inventory.money >= this.price;
    }

    checkSellPossible() {
        this.canSellItem = this.scene.player.inventory.isItemInInventory(this.item.name);
    }

    updatePriceCheck() {
        this.checkPurchasePrice();

        let color = this.canPurchaseItem ? 0x00aa00 : 0xaa0000;

        if (this.purchaseButtonBackground) {
            this.purchaseButtonBackground.setFillStyle(color, 0.3);
        }
    }

    updateSalableCheck() {
        this.checkSellPossible();

        let color = this.canSellItem ? 0x00aa00 : 0xaa0000;

        if (this.purchaseButtonBackground) {
            this.purchaseButtonBackground.setFillStyle(color, 0.3);
        }
    }

    updateTextAmount(amount) {
        this.itemText.setText(amount);
    }
}