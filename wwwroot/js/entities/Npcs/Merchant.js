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

            console.log('test123');
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

            
            const scrollbarTrack = this.scene.add.rectangle(325, 300, 10, 250, 0x444444, 0.3).setScrollFactor(0).setDepth(51);
            const scrollbarThumb = this.scene.add.rectangle(325, 185, 10, 20, 0x888888, 0.3).setInteractive().setScrollFactor(0).setDepth(52);

            scrollbarThumb.setInteractive({ draggable: true });
            this.scene.input.setDraggable(scrollbarThumb)

            const trackTop = scrollbarTrack.y - scrollbarTrack.height / 2;
            const trackBottom = scrollbarTrack.y + scrollbarTrack.height / 2;

            scrollbarThumb.on('drag', (pointer, dragX, dragY) => {
                console.log('test123');
                const clampedY = Phaser.Math.Clamp(dragY, trackTop + (scrollbarThumb.height / 2), trackBottom - (scrollbarThumb.height / 2) );
                scrollbarThumb.y = clampedY;
                const scrollRatio = (clampedY - trackTop) / (trackBottom - trackTop - scrollbarThumb.height);
                itemContainer.y = -scrollRatio * (itemContainer.height - 200);
            });

            this.shopUI = this.scene.add.container(0, 0 , [background, exitButton, itemContainer, scrollbarTrack, scrollbarThumb]);
            this.shopUI.setDepth(1000);
            this.shopUI.setVisible(this.isShopVisible);
        }
    }