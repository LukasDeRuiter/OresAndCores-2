class SceneStart extends Phaser.Scene {
    constructor() {
        super({ key: "SceneStart" });
    }

    create() {
        this.add.text(400, 200, "Enter the mine!", { fontSize: "32px", fill: "#fff"}).setOrigin(0.5);

        let startButton = this.add.text(400, 300, "Enter the mine!", { fontSize: "24px", fill: "#fff", backgroundColor: "#444"})
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive();

            startButton.on("pointerdown", () => {
                this.scene.start("SceneMain");
            })
    }
}