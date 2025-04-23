export class ControlBinder {
    constructor(scene) {
        this.scene = scene;
    }

    bind() {
        this.scene.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.scene.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.scene.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.scene.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.scene.keyESC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.scene.keyR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.scene.keyR.on('down', () => this.scene.player.showTool());
        this.scene.keyR.on('up', () => this.scene.player.hideTool());
        
        this.scene.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.scene.keyE.on('down', () => this.scene.toggleInventory());

        this.scene.numberKeys = this.scene.input.keyboard.addKeys({
            one: Phaser.Input.Keyboard.KeyCodes.ONE,
            two: Phaser.Input.Keyboard.KeyCodes.TWO,
            three: Phaser.Input.Keyboard.KeyCodes.THREE,
        });
    }
}