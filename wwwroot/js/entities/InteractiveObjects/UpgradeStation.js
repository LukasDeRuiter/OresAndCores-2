import { InteractiveObject } from "./InteractiveObject.js";
import { CraftingSlot } from "../CraftingSlot.js";
import { CraftingMaterial } from "../CraftingMaterial.js";
import { InventoryItem } from "../InventoryItem.js";
import { CraftingRecipe } from "../CraftingRecipe.js";
import { Item } from "../Item.js";
import { UpgradeRecipe } from "../UpgradeRecipe.js";
import { InventoryTool } from "../InventoryTool.js";

export class UpgradeStation extends InteractiveObject {
    constructor(scene, x, y, key, craftingRecipes = []) {
        super(scene, x, y, key);

        this.key = key;
        this.craftingRecipes = craftingRecipes;
        this.craftingUI = null;
        this.slots = [];
        this.isCraftMenuVisible = false;
        this.isCrafting = false;
        this.upgradables = this.getUpgradables();
       
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

            console.log(this.upgradables);
    
            this.upgradables.forEach((upgradable, index) => {
                if (index % 3 === 0) {
                    beginX += 60;
                    counter = 0;
                }

                if (upgradable.level >= 5) {
                    return;
                }

                let recipe = this.craftingRecipes[upgradable.level + 1];
                let result = new InventoryItem(`${upgradable.name}-level-${upgradable.level + 1}`, 5, upgradable.name);
    


                recipe.result = result;

                console.log(upgradable);
                console.log(recipe);
                let shopSlot = new CraftingSlot(this.scene, this, 0, 0 + (index * 50), 50, 40, this.isCraftMenuVisible, recipe);
    
                shopSlot.updateSlotDisplay();
                
                this.slots.push(shopSlot);
    
                let singleItemContainer = this.scene.add.container(beginX, beginY, [shopSlot.slot, shopSlot.itemImage, shopSlot.craftButton, shopSlot.amountContainer]).setDepth(52).setScrollFactor(0);
                itemContainer.add(singleItemContainer);
    
                counter += 1;
            })

            console.log(itemContainer);
    
            this.craftingUI = this.scene.add.container(0, 0 , [background, exitButton, itemContainer]);
            this.craftingUI.setDepth(1000);
            this.craftingUI.setVisible(this.isCraftMenuVisible);
        }
    

        getCraftableItems() {
            let result1 = "pickaxe";
            let result2 = "axe";
            let result3 = "sword";

            let materialItem1 = new InventoryItem('stone-item', 5, 1);
            let materialItem2 = new InventoryItem('wood-item', 10, 1);
            let materialItem3 = new InventoryItem('copper-bar-item', 15, 1);
            let materialItem4 = new InventoryItem('bronze-bar-item', 15, 1);
            let materialItem5 = new InventoryItem('iron-bar-item', 15, 1);
            let materialItem6 = new InventoryItem('steel-bar-item', 15, 1);

            let recipe1 = new UpgradeRecipe(
                this.scene, 
                [
                    new CraftingMaterial(this.scene, materialItem1, 1),
                    new CraftingMaterial(this.scene, materialItem2, 1),
                ],
                result1
            );
            let recipe2 = new UpgradeRecipe(
                this.scene, 
                [
                    new CraftingMaterial(this.scene, materialItem3, 1),
                    new CraftingMaterial(this.scene, materialItem2, 1),
                ],
                result1
            );
            let recipe3 = new UpgradeRecipe(
                this.scene, 
                [
                    new CraftingMaterial(this.scene, materialItem4, 1),
                    new CraftingMaterial(this.scene, materialItem2, 1),
                ],
                result1
            );
            let recipe4 = new UpgradeRecipe(
                this.scene, 
                [
                    new CraftingMaterial(this.scene, materialItem5, 1),
                    new CraftingMaterial(this.scene, materialItem2, 1),
                ],
                result1
            );
            let recipe5 = new UpgradeRecipe(
                this.scene, 
                [
                    new CraftingMaterial(this.scene, materialItem6, 1),
                    new CraftingMaterial(this.scene, materialItem2, 1),
                ],
                result1
            );
    
            this.craftingRecipes[1] = recipe1;
            this.craftingRecipes[2] = recipe2;
            this.craftingRecipes[3] = recipe3;
            this.craftingRecipes[4] = recipe4;
            this.craftingRecipes[5] = recipe5;
        }

        getUpgradables() {
            return this.scene.player.toolBelt;
        }

        upgradeItem(item) {
            this.interact();

            console.log(this.scene.player.toolBelt);    

            this.isCrafting = true;
            this.scene.sound.play(`${this.key}-craft-1`);

            const index = this.scene.player.toolBelt.find(tool => tool.name === item.key);

            index.level += 1;

            console.log(item);
            console.log(this.scene.player.toolBelt);    

            this.isCrafting = false;
        }
}