import { Npc } from "./Npc.js";
import { ShopSlot } from "../ShopSlot.js";
import { InventoryItem } from "../InventoryItem.js";

export class Merchant extends Npc {
    constructor(scene, x, y, name, spritesheet, shopItems = []) {
        super(scene, x, y, name, spritesheet);

        this.shopItems = shopItems;
        this.speechBox = null;
        this.slots = [];
        this.shopUI = null;
        this.isSpeechBoxVisible = false
        this.isShopVisible = false;
        this.sellMode = false;

        this.setInteractive();
        this.bindInput();

        this.getSalableItems();
        this.createShopUI(this.scene.player);
    }

    interact() {
        if (!this.speechBox) {
            this.createSpeechBox();
        }
        
        this.isSpeechBoxVisible = !this.isSpeechBoxVisible;

        this.updateUI();
    }

    updateUI() {
        if (this.isSpeechBoxVisible) {
            this.fadeInText(this.speechBox);
        } else {
            this.fadeOutText(this.speechBox);
        }
        
        if(this.shopUI) {
            this.shopUI.setVisible(this.isShopVisible);
            
            this.updateShopUI();
        }
    }

    updateShopUI() {
        this.shopUI.list.forEach(item => {
            item.setVisible(this.isShopVisible);
        })
        this.slots.forEach(slot => {
            slot.toggleVisible(this.isShopVisible);
            slot.toggleSellMode(this.isSellMode);
            slot.updateSlotUI();
        })

        if (this.isShopVisible) {
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
        if (this.shopUI) {
            this.shopUI.destroy();
            this.shopUI = null;

            return;
        }

        const background = this.scene.add.rectangle(400, 300, 350, 250, 0X000000, 0.3).setDepth(50).setScrollFactor(0);
        background.setVisible(this.isShopVisible);

        const exitButton = this.scene.add.rectangle(0, 0, 20, 20, 0xFF0000).setDepth(51).setScrollFactor(0).setAlpha(0.6);
        exitButton.setInteractive();

        exitButton.on('pointerdown', (pointer) => {
            if (pointer.button === 0) {
                this.isShopVisible = !this.isShopVisible;
                this.interact();
            }
        })
        
        exitButton.on('pointerover', () => {
            exitButton.setAlpha(1).setScale(1.2);

        });

        exitButton.on('pointerout', () => {
            exitButton.setAlpha(0.6).setScale(1);

        });

        const exitButtonIcon = this.scene.add.image(0, 0, "cancel-button-icon").setDepth(52).setScrollFactor(0);

        const exitButtonContainer = this.scene.add.container(565, 185, [exitButton, exitButtonIcon]);

            

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

            let shopSlot = new ShopSlot(this.scene, this, 0, 0 + (index * 50), 50, 40, this.isShopVisible);
            shopSlot.setItem(item);
            shopSlot.setPrice(item.value);

            this.slots.push(shopSlot);

            let singleItemContainer = this.scene.add.container(beginX, beginY, [shopSlot.slot, shopSlot.itemImage, shopSlot.purchaseButton, shopSlot.amountContainer]).setDepth(52).setScrollFactor(0);
            itemContainer.add(singleItemContainer);

            counter += 1;
        })

        this.shopUI = this.scene.add.container(0, 0 , [background, exitButtonContainer, itemContainer]);
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

    createSpeechBox() {
        const boxWidth = 120;
        const boxHeight = 60;
        const boxX = this.x;
        const boxY = this.y - 50;

    
        const background = this.scene.add.rectangle(0, 0, boxWidth, boxHeight,0x222222, 0.5)
            .setStrokeStyle(2, 0xffffff)
   
    
        const text = this.scene.add.text(-boxWidth / 2 + 10, -boxHeight / 2 + 5, "Welcome to my \n shop! What would \n you like?", {
            fontSize: "10px",
            fill: "#fff"
        }).setResolution(2);
    
        const buyBtn = this.scene.add.text(-boxWidth / 2 + 10, 10, "Buy", {
            fontSize: "10px",
            fill: "#00ff00",
            backgroundColor: "#003300",
            padding: { x: 5, y: 2 }
        }).setInteractive().setResolution(2);
    
        const sellBtn = this.scene.add.text(15, 10, "Sell", {
            fontSize: "10px",
            fill: "#ffcc00",
            backgroundColor: "#332200",
            padding: { x: 5, y: 2 }
        }).setInteractive().setResolution(2);
    
        buyBtn.on('pointerdown', () => {
            this.isSellMode = false;
            this.isShopVisible = !this.isShopVisible;
            this.interact();
        });
    
        sellBtn.on('pointerdown', () => {
            this.isSellMode = true;
            this.isShopVisible = !this.isShopVisible;
            this.interact();
        });
    
        this.speechBox = this.scene.add.container(boxX, boxY, [background, text, buyBtn, sellBtn])
            .setDepth(999)
            .setVisible(true);
    }


    fadeInText(container, duration = 300) {
        container.setVisible(true);
        container.alpha = 0;
        this.scene.tweens.add({
            targets: container,
            alpha: 1,
            duration: duration,
            ease: 'Power2'
        });
    }
    
    fadeOutText(container, duration = 300) {
        this.scene.tweens.add({
            targets: container,
            alpha: 0,
            duration: duration,
            ease: 'Power2',
            onComplete: () => {
                container.setVisible(false);
            }
        });
    }
 }