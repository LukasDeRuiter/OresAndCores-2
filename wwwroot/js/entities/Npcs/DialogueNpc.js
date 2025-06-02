import { Npc } from "./Npc.js";

export class DialogueNpc extends Npc {
    constructor(scene, x, y, name, spritesheet, dialogue) {
        super(scene, x, y, name, spritesheet);

        this.dialogue = dialogue;
        this.isSpeechBoxVisible = false;

        this.setInteractive();
        this.bindInput();
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

     bindInput() {
        this.on('pointerdown', (pointer) => {

            if (pointer.button === 0);
                this.interact();
        })
    }

    createSpeechBox() {
        const boxWidth = 120;
        const boxHeight = 60;
        const boxX = this.x;
        const boxY = this.y - 50;

    
        const background = this.scene.add.rectangle(0, 0, boxWidth, boxHeight,0x222222, 0.5)
            .setStrokeStyle(2, 0xffffff)
   
    
        const text = this.scene.add.text(-boxWidth / 2 + 10, -boxHeight / 2 + 5, this.dialogue, {
            fontSize: "10px",
            fill: "#fff"
        }).setResolution(2);
    
        this.speechBox = this.scene.add.container(boxX, boxY, [background, text])
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