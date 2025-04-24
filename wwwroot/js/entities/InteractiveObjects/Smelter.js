import { InteractiveObject } from "./InteractiveObject.js";
import { CraftingSlot } from "../CraftingSlot.js";

export class Smelter extends InteractiveObject {
    constructor(scene, x, y, craftingRecipes = []) {
        super(scene, x, y, "smelter");

        this.craftingRecipes = craftingRecipes;
        this.craftingUI = null;
        this.slots = [];
        this.isCraftMenuVisible = false;
       
        this.bindInput();

        this.createCraftingUI(this.scene.player);
    }

    interact() {
        this.isCraftMenuVisible = !this.isCraftMenuVisible;

        this.updateCraftUI();
    }

    updateCraftUI() {
        this.craftingUI.list.forEach(item => {
            item.setVisible(this.isCraftMenuVisible);
        })
        this.slots.forEach(slot => {
            slot.toggleVisible(this.isCraftMenuVisible);
            slot.updateSlotUI();
        })

        if (this.isCraftMenuVisible) {
            this.scene.physics.world.pause();
        } else {
            this.scene.physics.world.resume();
        }
    }

    bindInput() {
        this.on('pointerdown', (pointer) => {

            if (pointer.button === 0);
                this.interact();
        })
    }

     createShopUI() {
            if (this.craftingUI) {
                this.craftingUI.destroy();
                this.craftingUI = null;
    
                return;
            }
    
            const background = this.scene.add.rectangle(400, 300, 350, 250, 0X000000, 0.3).setDepth(50).setScrollFactor(0);
            background.setVisible(this.isCraftMenuVisible);
    
            const exitButton = this.scene.add.rectangle(565, 185, 20, 20, 0xFF0000, 0.3).setDepth(51).setScrollFactor(0);
            exitButton.setVisible(this.isCraftMenuVisible);
            exitButton.setInteractive();
    
            exitButton.on('pointerdown', (pointer) => {
                if (pointer.button === 0) {
                    this.isCraftMenuVisible = !this.isCraftMenuVisible;
                    this.interact();
                }
            })
    
                
    
            const itemContainer = this.scene.add.container(0, 0).setDepth(51).setScrollFactor(0);
            itemContainer.x = 200;
            itemContainer.y = 160;
            
            let counter = 0;
            let beginX = 50;
            let beginY = 100;
    
            this.craftingRecipes.forEach((recipe, index) => {
                if (index % 3 === 0) {
                    beginX += 60;
                    counter = 0;
                }
    
                let shopSlot = new CraftingSlot(this.scene, this, 0, 0 + (index * 50), 50, 40, this.isCraftMenuVisible, recipe);
    
                this.slots.push(shopSlot);
    
                let singleItemContainer = this.scene.add.container(beginX, beginY, [shopSlot.slot, shopSlot.itemImage, shopSlot.purchaseButton, shopSlot.amountContainer]).setDepth(52).setScrollFactor(0);
                itemContainer.add(singleItemContainer);
    
                counter += 1;
            })
    
            this.craftingUI = this.scene.add.container(0, 0 , [background, exitButton, itemContainer]);
            this.craftingUI.setDepth(1000);
            this.craftingUI.setVisible(this.isShopVisible);
        }
    

        // refactor this
        getSalableItems() {
            let item1 = new InventoryItem('stone-item', 5, 1);
            let item2 = new InventoryItem('copper-ore-item', 10, 1);
            let item3 = new InventoryItem('tin-ore-item', 15, 1);
    
            this.shopItems.push(item1);
            this.shopItems.push(item2);
            this.shopItems.push(item3);
        }
}