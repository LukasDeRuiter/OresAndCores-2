    import { Npc } from "./Npc.js";

    export class Merchant extends Npc {
        constructor(scene, x, y, name, spritesheet, shopItems = []) {
            super(scene, x, y, name, spritesheet);

            this.shopItems = shopItems;
            this.shopUI = null;
            this.isShopVisible = false;

            this.setInteractive();
            this.bindInput();

            this.createShopUI(this.scene.player);
        }

        interact() {
            this.isShopVisible = !this.isShopVisible;

            console.log(this.shopUI);

            this.updateUI();
        }

        updateUI() {
            if(this.shopUI) {
                this.shopUI.setVisible(this.isShopVisible);

                this.shopUI.list.forEach(item => {
                    item.setVisible(this.isShopVisible);
                })
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

                return
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

            for (let i = 0; i < 12; i++) {
                if (i % 3 === 0) {
                    beginX += 60;
                    counter = 0;
                }

                let item = this.scene.add.rectangle(beginX, beginY + (counter * 50), 50, 40, 0xFF0000, 0.3).setScrollFactor(0).setDepth(52);
                itemContainer.add(item);

                counter += 1;
            }

            this.shopUI = this.scene.add.container(0, 0 , [background, exitButton, itemContainer]);
            this.shopUI.setDepth(1000);
            this.shopUI.setVisible(this.isShopVisible);
        }
    }