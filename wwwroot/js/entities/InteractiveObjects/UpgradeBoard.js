import { TownUpgrade } from "../TownUpgrade.js";
import { TownUpgradeSlot } from "../TownUpgradeSlot.js";
import { InteractiveObject } from "./InteractiveObject.js";

export class UpgradeBoard extends InteractiveObject {

    constructor(scene, x, y, key, town) {
        super(scene, x, y, key);
        this.isVisible = false;
        this.town = town;
        this.slots = [];

        this.availableUpgrades = null;

        this.bindInput();
    }

    interact() {
        this.isVisible = !this.isVisible;

        this.createUI();
     

        if (this.isVisible) {
            this.scene.physics.world.pause();
        } else {
            this.scene.physics.world.resume();
        }
    }

    createUI() {
        if (this.ui) {
            this.ui.destroy();
            this.ui = null;

            return;
        }
        
        this.availableUpgrades = this.upgrades();

        const background = this.scene.add.rectangle(0, 0, 350, 250, 0X000000, 0.3);

        const exitButton = this.scene.add.rectangle(0, 0, 20, 20, 0xFF0000).setDepth(1010).setScrollFactor(0).setAlpha(0.6);
        exitButton.setInteractive();

        exitButton.on('pointerdown', (pointer) => {
            if (pointer.button === 0) {
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

        const exitButtonContainer = this.scene.add.container(165, -115, [exitButton, exitButtonIcon]).setDepth(1010);

         const itemContainer = this.scene.add.container(0, 0).setDepth(1020).setScrollFactor(0);            
                let counter = 0;
                let beginX = -120;
                let beginY = -80;

                Object.entries(this.availableUpgrades).forEach(([key, upgrade], index) => {    
                    let shopSlot = new TownUpgradeSlot(this.scene, this, 0, 0, upgrade, this.isVisible);
                    shopSlot.setPrice(upgrade.cost);
                    shopSlot.setItem(upgrade.level);

                    this.slots.push(shopSlot);
        
                    let singleItemContainer = this.scene.add.container(beginX, beginY, [shopSlot.uiContainer]).setDepth(1030).setScrollFactor(0).setVisible(this.isVisible);
                    itemContainer.add(singleItemContainer);
    
                    counter += 1;
                })

        this.ui = this.scene.add.container(400, 300 , [background, exitButtonContainer, itemContainer]);
        this.ui.setDepth(1020);
        this.ui.setScrollFactor(0);
        this.ui.setVisible(this.isVisible);
    }

    upgrades() {
        let returnArray = {
        };

        const townUpgradeCosts = [
            0, 
            0,
            new TownUpgrade(this.scene, 2, 1, "town", "Add the first tents and inhabitants of your new town!"), 
            new TownUpgrade(this.scene, 3, 2, "town", "More tenants come to inhabit your town, as it grows rapidly."),
            3, 
            4, 
            5,
            6,
            7,
            8,
            9,
            10
        ];

        returnArray['town'] = townUpgradeCosts[this.scene.town.level + 1];

        return returnArray;
    }

    createButton(buttonText, y = 0, callback) {
        let text = this.scene.add.text(-20, -10, buttonText, {
            fontSize: "10px",
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 5,
        }).setResolution(2);

       let buttonBackground = this.scene.add.rectangle(0, 0, 130, 20, '0xaaaaaa').setDepth(1010).setScrollFactor(0).setInteractive().setAlpha(0.6).setScale(1);
       let button = this.scene.add.container(0, y - 100, [buttonBackground, text]).setDepth(1010).setScrollFactor(0);
       
       buttonBackground.on('pointerover', () => {
            buttonBackground.setAlpha(1).setScale(1.2);
        });

        buttonBackground.on('pointerout', () => {
            buttonBackground.setAlpha(0.6).setScale(1);
        });

        buttonBackground.on('pointerdown',
            callback
        );

        return button;
    }

    bindInput() {
        this.on('pointerdown', (pointer) => {

            if (pointer.button === 0) {
                this.interact();
        }}
    );
    }

    purchaseUpgrade(entity, level) {
        this.interact();
        this.scene.town.upgrade(entity, level);
    }
}