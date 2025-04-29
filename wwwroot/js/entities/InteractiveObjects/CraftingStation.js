import { InteractiveObject } from "./InteractiveObject.js";
import { CraftingSlot } from "../CraftingSlot.js";
import { CraftingMaterial } from "../CraftingMaterial.js";
import { InventoryItem } from "../InventoryItem.js";
import { CraftingRecipe } from "../CraftingRecipe.js";
import { Item } from "../Item.js";

export class CraftingStation extends InteractiveObject {
    constructor(scene, x, y, key, craftingRecipes = []) {
        super(scene, x, y, key);

        this.key = key;
        this.craftingRecipes = craftingRecipes;
        this.craftingUI = null;
        this.slots = [];
        this.isCraftMenuVisible = false;
        this.isCrafting = false;
       
        this.bindInput();
        this.getCraftableItems();

        this.createCraftingUI(this.scene.player);
    }

    interact() {
        if (!this.isCrafting) {
            this.isCraftMenuVisible = !this.isCraftMenuVisible;

            this.updateCraftUI();
        }
    }

    updateCraftUI() {
        this.craftingUI.setVisible(this.isCraftMenuVisible);
    
        this.slots.forEach(slot => {
            slot.toggleVisible(this.isCraftMenuVisible);
        })

        if (this.isCraftMenuVisible) {
            this.scene.physics.world.pause();
        } else {
            this.scene.physics.world.resume();
        }
    }

    bindInput() {
        this.on('pointerdown', (pointer) => {

            if (pointer.button === 0) {
                this.interact();
        }}
    );
    }

     createCraftingUI() {
            if (this.craftingUI) {
                this.craftingUI.destroy();
                this.craftingUI = null;
    
                return;
            }
    
            const background = this.scene.add.rectangle(400, 300, 350, 250, 0X000000, 0.3).setDepth(50).setScrollFactor(0);
    
            const exitButton = this.scene.add.rectangle(565, 185, 20, 20, 0xFF0000, 0.3).setDepth(51).setScrollFactor(0);
            exitButton.setInteractive();
    
            exitButton.on('pointerdown', (pointer) => {
                if (pointer.button === 0) {
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
    
                shopSlot.updateSlotDisplay();
                
                this.slots.push(shopSlot);
    
                let singleItemContainer = this.scene.add.container(beginX, beginY, [shopSlot.slot, shopSlot.itemImage, shopSlot.craftButton, shopSlot.amountContainer]).setDepth(52).setScrollFactor(0);
                itemContainer.add(singleItemContainer);
    
                counter += 1;
            })
    
            this.craftingUI = this.scene.add.container(0, 0 , [background, exitButton, itemContainer]);
            this.craftingUI.setDepth(1000);
            this.craftingUI.setVisible(this.isCraftMenuVisible);
        }
    

        getCraftableItems() {
            let result1 = new InventoryItem('copper-bar-item', 5, 1);
            let result2 = new InventoryItem('bronze-bar-item', 10, 1);
            let result3 = new InventoryItem('iron-bar-item', 15, 1);

            let materialItem1 = new InventoryItem('coal-item', 5, 1);
            let materialItem2 = new InventoryItem('copper-ore-item', 10, 1);
            let materialItem3 = new InventoryItem('tin-ore-item', 15, 1);
            let materialItem4 = new InventoryItem('iron-ore-item', 15, 1);

            let recipe1 = new CraftingRecipe(
                this.scene, 
                [
                    new CraftingMaterial(this.scene, materialItem1, 2),
                    new CraftingMaterial(this.scene, materialItem2, 2),
                ],
                result1
            );

            
            let recipe2 = new CraftingRecipe(
                this.scene, 
                [
                    new CraftingMaterial(this.scene, materialItem1, 2),
                    new CraftingMaterial(this.scene, materialItem2, 2),
                    new CraftingMaterial(this.scene, materialItem3, 2),
                ],
                result3
            );

                        
            let recipe3 = new CraftingRecipe(
                this.scene, 
                [
                    new CraftingMaterial(this.scene, materialItem1, 2),
                    new CraftingMaterial(this.scene, materialItem4, 2),
                ],
                result3
            );
    
            this.craftingRecipes.push(recipe1);
            this.craftingRecipes.push(recipe2);
            this.craftingRecipes.push(recipe3);
        }

        craftItem(item) {
            this.interact();

            this.isCrafting = true;
            this.scene.sound.play(`${this.key}-craft-1`);

            setTimeout(() => {
                this.dropItem(item);
            }, 5000)
        }c

        dropItem(item) {
            const overlapPreventX = Phaser.Math.Between(-20, 20);
            const overlapPreventy = Phaser.Math.Between(-20, 20);

            const itemToDrop = new Item(this.scene, this.x + overlapPreventX, this.y + overlapPreventy, item.name, item.name, 5);
            this.scene.sound.play("drop-item");

            this.isCrafting = false;
        }
}