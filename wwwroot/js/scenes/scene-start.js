export class SceneStart extends Phaser.Scene {
    constructor() {
        super({ key: "SceneStart" });
    }

    create() {
        this.add.text(400, 200, "Enter the mine!", { fontSize: "32px", fill: "#fff"}).setOrigin(0.5).setResolution(2);

        let startButton = this.add.text(400, 300, "Enter the mine!", { fontSize: "24px", fill: "#fff", backgroundColor: "#444"})
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive().setResolution(2);

            startButton.on("pointerdown", () => {
                this.scene.start("SceneTransition", {
                    targetScene: "SceneMain",
                    message: "Entering the mine...",
                    tip: "press ESC to open the main menu and find the controls!"
                })
            })
    }
}