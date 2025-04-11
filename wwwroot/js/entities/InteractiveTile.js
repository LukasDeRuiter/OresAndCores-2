import { Tile } from "./Tile.js";

export class InteractiveTile extends Tile {
    constructor(scene, x, y, key, isWalkable, interactToScene) {
        super(scene, x, y, key, isWalkable);

        this.scene = scene;
        this.interactToScene = interactToScene;
        this.setInteractive();

        this.on('pointerover', () => {
            if (this.calculateDistanceWithPlayer() <= 32) {
                this.setTint(0xcccccc);
            }
        });

        this.on('pointerout', () => {
            this.clearTint();
        });

        this.on('pointerdown', () => {
            this.interact();
        });

        scene.add.existing(this);
    }

    interact() {
        if (this.calculateDistanceWithPlayer() <= 32) {
            this.scene.scene.start(this.interactToScene);
        }
    }

    calculateDistanceWithPlayer() {
        return Phaser.Math.Distance.Between(
            this.scene.player.x, 
            this.scene.player.y,    
            this.x,
            this.y
        );
    }
}