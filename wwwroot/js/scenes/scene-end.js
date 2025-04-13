import { Inventory } from "../entities/Inventory.js";
import { TransitionSaver } from "../utils/transition-saver.js";

export class SceneEnd extends Phaser.Scene {
    constructor() {
        super({ key: "SceneEnd" });
    }

    create() {
        this.transitionSaver = new TransitionSaver(this);
        
        let inventory =  new Inventory(this);     
        
        let playerLevel = 1;
        this.player = new Player(this, worldWidth / 2, worldHeight / 12, inventory, playerLevel);
                
        if (this.registry.has("playerInventory")) {
            const savedInventory = this.registry.get("playerInventory");
            inventory.restoreInventory(savedInventory)
        }
                
        if (this.registry.has("playerLevel")) {
                 playerLevel =  this.registry.get("playerLevel");
                } 
        
                this.player.inventory = inventory;
                    
        if (this.registry.has("playerInventory")) {
            const savedInventory = this.registry.get("playerInventory");
                inventory.restoreInventory(savedInventory)
        }

        this.inventory = inventory;

        this.add.text(400, 200, "Thank you for playing!", { fontSize: "32px", fill: "#fff"}).setOrigin(0.5);

        let restartButton = this.add.text(300, 300, "restart", { fontSize: "24px", fill: "#fff", backgroundColor: "#444"})
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive();

        let saveButton = this.add.text(500, 300, "save progress", { fontSize: "24px", fill: "#fff", backgroundColor: "#444"})
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive();

        restartButton.on("pointerdown", () => {
            this.scene.start("SceneTransition", {
                targetScene: "SceneMain",
                message: "Entering the mine...",
            })
        })

        saveButton.on("pointerdown", async () => {
            console.log(inventory);
            let response = await this.saveInventoryToServer(this.inventory.items);

            const saveText = this.add.text(
                400, 
                400, 
                response.message, 
                { 
                    fontSize: "32px", 
                    fill: response.message === "Inventory successfully saved!" ? "#008000" : "#FF2C2C",
                }
            )
            .setOrigin(0.5);
        })
    }

    saveInventoryToServer(inventory) {
        return fetch('api/mineApi/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inventory)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Server Response:", data);
            return data;
        })
        .catch(error => {
            console.error("Error:", error);
            return error;
        });
    }
}