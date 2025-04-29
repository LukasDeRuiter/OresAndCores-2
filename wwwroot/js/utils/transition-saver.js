export class TransitionSaver {
    constructor(scene) {
        this.scene = scene;
    }

    transition(scene, message, inventory, playerLevel) {
        this.scene.registry.set("playerInventory", inventory.saveInventory());
        this.scene.registry.set("playerLevel", playerLevel);
        this.scene.registry.set("playerMoney", inventory.money);
        this.scene.registry.set("playerTools", this.scene.player.toolBelt);

        this.scene.scene.start("SceneTransition", {
            targetScene: scene,
            message: message,
        })
    }
}