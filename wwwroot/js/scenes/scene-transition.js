export class SceneTransition extends Phaser.Scene {
    constructor() {
        super({ key: "SceneTransition" });
    }

    init(data) {
        this.targetScene = data.targetScene;
        this.message = data.message || "Loading...";
        this.tip = data.tip;
    }

    create() {
        const { width, height } = this.sys.game.canvas;

        this.cameras.main.setBackgroundColor("#000000");
        this.cameras.main.fadeIn(500);

        const text = this.add.text(width / 2, 150, this.message, {
            fontSize: "40px",
            fill: "#ffffff",
        }).setOrigin(0.5).setResolution(2);

        const progressBackground = this.add.graphics();
        progressBackground.fillStyle(0x115511, 1);
        progressBackground.fillRect(width / 2 - 250, 300, 500, 20);

        const progressBar = this.add.graphics();

        let progress = 0;
        const maxSteps = 100;

        this.time.addEvent({
            delay: 30,
            repeat: maxSteps - 1,
            callback: () => {
                progress += 1 / maxSteps;
                progressBar.clear();
                progressBar.fillStyle(0x33ff33, 1);
                progressBar.fillRect(width / 2 - 250, 300, 500 * progress, 20);

                if (progress >= 1) {
                    this.transitionScene();
                }
            },
        });

        const tipText = this.add.text(width / 2, 450, this.tip ? this.tip : this.getRandomTip(), {
            fontSize: "20px",
            fill: "#ffffff",
        }).setOrigin(0.5).setResolution(2);
    }

    getRandomTip() {
        const tips = [
            "Don't forget to upgrade your tools at the town",
            "Use merchants to sell your items",
            "All toasters toast toast!",
        ]
        
        const randomIndex = Math.floor(Math.random() * tips.length);
        
        return tips[randomIndex];
    }

    transitionScene() {
        this.cameras.main.fadeOut(500);
        this.time.delayedCall(500, () => {
            this.scene.start(this.targetScene);
        });
    }
}