export class TownUpgradeSlot {
    constructor(scene, station, x, y, upgrade, isVisible) {
        this.scene = scene;
        this.station = station;
        this.x = x;
        this.y = y;
        this.cost = upgrade.cost;
        this.level = upgrade.level;
        this.entity = upgrade.entity;
        this.isVisible = isVisible;
        this.slotWidth = 50;
        this.slotHeight = 40;

        this.slot = this.scene.add.rectangle(x, y, this.slotWidth, this.slotHeight  , 0x858585)
        .setScrollFactor(0)
        .setDepth(300)
        .setVisible(this.isVisible);

        this.background = null;
        this.itemImage = null;
        this.slotText = `${this.entity} level ${this.level}`;
        this.description = upgrade.text;
        this.craftButton = null;
        this.craftButtonBackground = null;
        this.amountContainer = null;
        this.descriptionText = null;

        this.canPurchaseUpgrade = false;
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

            
            if (!this.descriptionText) {
                this.descriptionText = this.scene.add.text(this.x + 45, this.y - 18, this.description, {
                    fontSize: "8px",
                    fill: "#fff",   
                    stroke: "#000",
                    strokeThickness: 5,
                    wordWrap: { width: 250, useAdvancedWrap: true } 
                }).setResolution(2).setDepth(1000).setScrollFactor(0);
            }

            if (!this.craftButton) {
                this.itemText = this.scene.add.text(Math.round(10), Math.round(-10), 'Upgrade', {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                }).setResolution(2);

                this.craftButtonBackground = this.scene.add.rectangle(28, 0, 45, 20, '#008000').setDepth(50).setScrollFactor(0).setInteractive().setAlpha(0.6).setScale(1);
                this.craftButton = this.scene.add.container(this.x - 20, this.y + 20, [this.craftButtonBackground, this.itemText]).setDepth(52).setScrollFactor(0);

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

            if (!this.background) {
                 this.background = this.scene.add.rectangle(this.x + 120, this.y, 350, 60, 0x858585).setDepth(50).setScrollFactor(0).setAlpha(0.5);
            }

            if (!this.amountContainer) {
                let coinBackground = this.scene.add.rectangle(-this.slotWidth / 2, 0, this.slotWidth / 2, 20, '#008000', 0.3).setDepth(50).setScrollFactor(0);
                let costSprite = this.scene.add.image((-this.slotWidth / 2) - 5, 0, "coin-item").setScale(0.5);

                this.coinAmount = this.scene.add.text(Math.round(-28), Math.round(-10), this.cost, {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                }).setResolution(2);

                this.updatePriceCheck();

                this.amountContainer = this.scene.add.container(this.x, this.y + 20, [coinBackground, costSprite, this.coinAmount]).setDepth(52).setScrollFactor(0);
            }
            if (!this.uiContainer) {
                this.uiContainer = this.scene.add.container(this.x, this.y + 20, [
                this.background,
                this.slot,
                this.craftButton,
                this.amountContainer,
                this.descriptionText
            ]).setDepth(1030).setScrollFactor(0).setVisible(this.isVisible);
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

            if(this.descriptionText) {
                this.descriptionText.destroy();
                this.descriptionText = null;
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

            this.uiContainer.setVisible(this.isVisible);
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