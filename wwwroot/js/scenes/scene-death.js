    export class SceneDeath extends Phaser.Scene {
        constructor() {
            super({ key: "SceneDeath" });
        }

        create() {
            this.add.text(400, 200, "Oh no, you died!", { fontSize: "32px", fill: "#fff"}).setOrigin(0.5);

            let restartButton = this.add.text(400, 300, "restart", { fontSize: "24px", fill: "#fff", backgroundColor: "#444"})
                .setOrigin(0.5)
                .setPadding(10)
                .setInteractive();

            restartButton.on("pointerdown", () => {
                this.scene.start("SceneTransition", {
                    targetScene: "SceneMain",
                    message: "Entering the mine...",
                })
            })
        }
    }

    console.log("SceneDeath loaded");