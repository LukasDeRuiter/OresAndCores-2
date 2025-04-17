import { Npc } from "./Npc.js";
import { ShopSlot } from "../ShopSlot.js";
import { InventoryItem } from "../InventoryItem.js";

export class Merchant extends Npc {
    constructor(scene, x, y, name, spritesheet, shopItems = []) {
        super(scene, x, y, name, spritesheet);

        this.shopItems = shopItems;
        this.slots = [];
        this.shopUI = null;
        this.isShopVisible = false;

        this.setInteractive();
        this.bindInput();

        this.getSalableItems();
        this.createShopUI(this.scene.player);
    }

    interact() {
         this.isShopVisible = !this.isShopVisible;

        this.updateUI();
    }

    updateUI() {
        if(this.shopUI) {
            this.shopUI.setVisible(this.isShopVisible);

            this.shopUI.list.forEach(item => {
                item.setVisible(this.isShopVisible);
            })
            this.slots.forEach(slot => {
                slot.toggleVisible(this.isShopVisible);
            })

            console.log(this.slots);
        }
    }
        
    bindInput() {
        this.on('pointerdown', (pointer) => {

            if (pointer.button === 0);
                this.interact();
        })
    }

    createShopUI(player) {
        if (this.shopUI) {
            this.shopUI.destroy();
            this.shopUI = null;

            return;
        }

        const background = this.scene.add.rectangle(400, 300, 350, 250, 0X000000, 0.3).setDepth(50).setScrollFactor(0);
        background.setVisible(this.isShopVisible);

        const exitButton = this.scene.add.rectangle(565, 185, 20, 20, 0xFF0000, 0.3).setDepth(51).setScrollFactor(0);
        exitButton.setVisible(this.isShopVisible);
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

        this.shopItems.forEach((item, index) => {
            if (index % 3 === 0) {
                beginX += 60;
                counter = 0;
            }

            //let item = this.scene.add.rectangle(beginX, beginY + (counter * 50), 50, 40, 0X0F0000, 0.3).setScrollFactor(0).setDepth(52);
            let shopSlot = new ShopSlot(this.scene, 0, 0 + (index * 50), 50, 40, this.isShopVisible);
            shopSlot.setItem(item);
            shopSlot.setPrice(item.value);
                
            console.log('test23');
            this.slots.push(shopSlot);

            let singleItemContainer = this.scene.add.container(beginX, beginY, [shopSlot.slot, shopSlot.itemImage, shopSlot.itemText]).setDepth(52).setScrollFactor(0);
            itemContainer.add(singleItemContainer);

            counter += 1;
        })

        this.shopUI = this.scene.add.container(0, 0 , [background, exitButton, itemContainer]);
        this.shopUI.setDepth(1000);
        this.shopUI.setVisible(this.isShopVisible);
    }

    getSalableItems() {
        let item1 = new InventoryItem('stone-item', 5, 1);
        let item2 = new InventoryItem('copper-ore-item', 10, 1);
        let item3 = new InventoryItem('tin-ore-item', 15, 1);

        this.shopItems.push(item1);
        this.shopItems.push(item2);
        this.shopItems.push(item3);
    }
 }