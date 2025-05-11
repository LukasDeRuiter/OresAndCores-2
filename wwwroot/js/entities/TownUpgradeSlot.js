export class TownUpgradeSlot {
    constructor(scene, station, x, y, cost, level, entity, isVisible) {
        this.scene = scene;
        this.station = station;
        this.x = x;
        this.y = y;
        this.cost = cost;
        this.level = level;
        this.entity = entity;
        this.isVisible = isVisible;
        this.slotWidth = 50;
        this.slotHeight = 40;

        this.slot = this.scene.add.rectangle(x, y, this.slotWidth, this.slotHeight  , 0x858585)
        .setScrollFactor(0)
        .setDepth(300)
        .setVisible(this.isVisible);

        this.entity = entity;
        this.itemImage = null;
        this.slotText = `${entity} level ${level}`;
        this.craftButton = null;
        this.craftButtonBackground = null;
        this.amountContainer = null;

        this.purchaseUpgrade = false;
    }

    setItem() {
        this.updateSlotDisplay();
    }

    updateSlotUI() {
        this.updatePriceCheck();
    }

    updateSlotDisplay() {
        if (this.entity) {
            if (!this.itemImage) {  
            // this.itemImage = this.scene.add.image(this.x, this.y, this.upgradable ? `${this.upgradable.name}-level-${this.upgradable.level + 1}` : this.item.name)
            // .setScrollFactor(0)
            // .setScale(this.slotWidth / 32)
            // .setDepth(155)
            // .setVisible(this.isVisible);
            }

            if (!this.craftButton) {
                this.itemText = this.scene.add.text(Math.round(10), Math.round(-10), 'Craft', {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                });

                this.craftButtonBackground = this.scene.add.rectangle(28, 0, 35, 20, '#008000').setDepth(50).setScrollFactor(0).setInteractive().setAlpha(0.6).setScale(1);
                this.craftButton = this.scene.add.container(this.x, this.y + 20, [this.craftButtonBackground, this.itemText]).setDepth(52).setScrollFactor(0);

                this.craftButtonBackground.on('pointerover', () => {
                    this.craftButtonBackground.setAlpha(1).setScale(1.2);
    
                });

                this.craftButtonBackground.on('pointerout', () => {
                    this.craftButtonBackground.setAlpha(0.6).setScale(1);
        
                });

                this.craftButtonBackground.on('pointerdown', () => {
                    this.startTransation();
                });
            }

            if (!this.amountContainer) {
                let coinBackground = this.scene.add.rectangle(-this.slotWidth / 2, 0, this.slotWidth / 2, 20, '#008000', 0.3).setDepth(50).setScrollFactor(0);
                let costSprite = this.scene.add.image((-this.slotWidth / 2) - 5, 0, "coin-item").setScale(0.5);

                this.coinAmount = this.scene.add.text(Math.round(-28), Math.round(-10), this.cost, {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                });
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
        this.checkUpgrade();

        if (this.canPurchaseUpgrade) {
            this.purchaseUpgrade();
        }
    }

    purchaseUpgrade() {
        this.scene.player.inventory.pay(this.cost);
        this.station.purchaseUpgrade(this.entity, this.level);
    }


    toggleVisible(isVisible) {
        this.slot.setVisible(isVisible);

        if (this.item) {
            this.updatePriceCheck();

            this.itemImage.setVisible(isVisible);
            this.itemText.setVisible(isVisible);
        }
    }

    checkUpgrade() {
       this.canPurchaseUpgrade = this.scene.player.inventory.money >= this.cost;
    }

    updatePriceCheck() {
        this.checkUpgrade();

        let color = this.canPurchaseUpgrade ? 0x00aa00 : 0xaa0000;

        if (this.craftButtonBackground) {
            this.craftButtonBackground.setFillStyle(color, 0.3);
        }
    }

    setPrice(cost) {
        this.cost = cost;
        this.updateSlotDisplay();
    }
}