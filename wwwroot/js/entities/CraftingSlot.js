import { CraftingRecipe } from "./CraftingRecipe.js";

export class CraftingSlot {
    constructor(scene, station, x, y, slotWidth, slotHeight, isVisible, craftingRecipe, upgradable = null) {
        this.scene = scene;
        this.station = station;
        this.craftingRecipe = craftingRecipe;
        this.x = x;
        this.y = y;
        this.upgradable = upgradable;


        this.slotWidth = slotWidth; 
        this.slotHeight = slotHeight;
        this.isVisible = isVisible;

        this.slot = this.scene.add.rectangle(x, y, this.slotWidth, this.slotHeight, 0x858585)
        .setScrollFactor(0)
        .setDepth(300)
        .setVisible(this.isVisible);

        this.item = craftingRecipe.result;
        this.itemImage = null;
        this.slotText = null;
        this.requiredMaterials = [];
        this.craftButton = null;
        this.craftButtonBackground = null;
        this.amountContainer = null;

        this.canCraftItem = false;
    }

    setItem() {
        this.item = this.craftingRecipe.result;
        this.updateSlotDisplay();
    }

    updateSlotUI() {
        this.updatePriceCheck();
    }

    updateSlotDisplay() {
        if (this.item) {
            if (!this.itemImage) {  
            this.itemImage = this.scene.add.image(this.x, this.y, this.upgradable ? `${this.upgradable.name}-level-${this.upgradable.level + 1}` : this.item.name)
            .setScrollFactor(0)
            .setScale(this.slotWidth / 32)
            .setDepth(155)
            .setVisible(this.isVisible);
            }

            if (!this.craftButton) {
                this.itemText = this.scene.add.text(Math.round(10), Math.round(-10), 'Craft', {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                }).setResolution(2);

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
                let amountBackground = this.scene.add.rectangle(-this.slot.x -40, -20, this.slotWidth / 2, this.slotHeight, '#008000', 0.3).setDepth(50).setScrollFactor(0);
                
                let costPosition = -28;
                let containerArray = [ amountBackground ];

                this.craftingRecipe.requiredMaterials.forEach(material => {

                    let costSprite = this.scene.add.image(-48, Math.round(costPosition - 5), material.item.name).setScale(0.8);

                    let costAmount = this.scene.add.text(-38, Math.round(costPosition - 12), material.amount, {
                        fontSize: "10px",
                        fill: "#fff",
                        stroke: "#000",
                        strokeThickness: 5,
                    }).setScale(0.8).setResolution(2);

                    containerArray.push(costSprite, costAmount)

                    costPosition += 10;
                });

        
                this.amountContainer = this.scene.add.container(this.x, this.y + 20, containerArray).setDepth(52).setScrollFactor(0);
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
        this.checkCraftingPrice();

        if (this.canCraftItem) {
            this.craftItem();
        }
    }

    craftItem() {
        this.craftingRecipe.requiredMaterials.forEach(material => {
            this.scene.player.inventory.removeItem(material.item, material.amount);
        });
 
        this.station.slots.forEach(slot => {
            slot.updatePriceCheck();
        })

        this.craftingRecipe instanceof CraftingRecipe ? 
        this.station.craftItem(this.craftingRecipe.result) : 
        this.station.upgradeItem(this.upgradable);
    }


    toggleVisible(isVisible) {
        this.slot.setVisible(isVisible);

        if (this.item) {
            this.updatePriceCheck();

            this.itemImage.setVisible(isVisible);
            this.itemText.setVisible(isVisible);
        }
    }

    checkCraftingPrice() {
        let isInsufficient = false;

        this.craftingRecipe.requiredMaterials.forEach(material => {
            let hasItem = this.scene.player.inventory.isItemInInventory(material.item.name);
    
            if (!hasItem || material.amount > this.scene.player.inventory.items[material.item.name]) {
                isInsufficient = true;
            }
        });

        return isInsufficient ? false: true;
    }

    updatePriceCheck() {
        this.canCraftItem = this.checkCraftingPrice();

        let color = this.canCraftItem ? 0x00aa00 : 0xaa0000;

        if (this.craftButtonBackground) {
            this.craftButtonBackground.setFillStyle(color, 0.3);
        }
    }
}