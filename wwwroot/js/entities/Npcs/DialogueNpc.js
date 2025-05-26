import { Npc } from "./Npc.js";

export class Npc extends Npc {
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
}