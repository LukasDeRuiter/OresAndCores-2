import { CraftingRecipe } from "./CraftingRecipe.js";

export class CraftingSlot {
    constructor(scene, station, x, y, slotWidth, slotHeight, isVisible, craftingRecipe) {
        this.scene = scene;
        this.station = station;
        this.craftingRecipe = craftingRecipe;
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
            this.itemImage = this.scene.add.image(this.x, this.y, this.item.name)
            .setScrollFactor(0)
            .setScale(this.slotWidth / 32)
            .setDepth(155)
            .setVisible(this.isVisible);
            }

            if (!this.purchaseButton) {
                this.itemText = this.scene.add.text(Math.round(10), Math.round(-10), 'Craft', {
                    fontSize: "10px",
                    fill: "#fff",
                    stroke: "#000",
                    strokeThickness: 5,
                });

                this.purchaseButtonBackground = this.scene.add.rectangle(22, 0, this.slotWidth / 2, 20, '#008000', 0.3).setDepth(50).setScrollFactor(0).setInteractive();
                this.purchaseButton = this.scene.add.container(this.x, this.y + 20, [this.purchaseButtonBackground, this.itemText]).setDepth(52).setScrollFactor(0);

                this.purchaseButtonBackground.on('pointerdown', () => {
                    this.startTransation();
                });
            }

            if (!this.amountContainer) {
                let amountBackground = this.scene.add.rectangle(-this.slotWidth / 2, 0, this.slotWidth / 2, 20, '#008000', 0.3).setDepth(50).setScrollFactor(0);
                
                let costPosition = -28;
                let containerArray = [ coinBackground ];

                this.craftingRecipe.requiredMaterials.forEach(material => {

                    let costSprite = this.scene.add.image(Math.round(costPosition - 5) - 5, 0, material.item.name).setScale(0.5);

                    let costAmount = this.scene.add.text(Math.round(costPosition), Math.round(-10), material.amount, {
                        fontSize: "10px",
                        fill: "#fff",
                        stroke: "#000",
                        strokeThickness: 5,
                    });

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

    // startTransation() {
    //     if (this.isSellMode) {
    //         this.checkSellPossible();

    //         if (this.canSellItem) {
    //             this.sellItem();
    //         }
    //     } else {
    //         this.checkPurchasePrice();

    //         if (this.canPurchaseItem) {
    //             this.buyItem();
    //         }
    //     }
    // }

    // buyItem() {
    //     this.scene.player.inventory.pay(this.price);
    //     this.scene.player.inventory.addItem(this.item);
    //     this.merchant.slots.forEach(slot => {
    //         slot.updatePriceCheck();
    //     })
    // }


    toggleVisible(isVisible) {
        this.slot.setVisible(isVisible);

        if (this.item) {
            this.updatePriceCheck();

            this.itemImage.setVisible(isVisible);
            this.itemText.setVisible(isVisible);
        }
    }

    checkCraftingPrice() {
        this.craftingRecipe.requiredMaterials.forEach(material => {
            let hasItem = this.scene.player.inventory.isItemInInventory(material.item.name);
    
            if (!hasItem || material.amount > this.scene.player.inventory[material.item.name]) {
                this.canCraftItem = false;

                return;
            }
        });

        this.canCraftItem = true;
    }

    updatePriceCheck() {
        this. checkCraftingPrice();

        let color = this.canCraftItem ? 0x00aa00 : 0xaa0000;

        if (this.purchaseButtonBackground) {
            this.purchaseButtonBackground.setFillStyle(color, 0.3);
        }
    }
}