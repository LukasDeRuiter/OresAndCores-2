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