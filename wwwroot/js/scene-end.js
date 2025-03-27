class SceneEnd extends Phaser.Scene {
    constructor() {
        super({ key: "SceneEnd" });
    }

    create() {
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
            this.scene.start("SceneMain");
        })

        saveButton.on("pointerdown", () => {
            const inventory = this.registry.get("playerInventory");
            console.log(inventory);
        })
    }
}