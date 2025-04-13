export class TransitionSaver {
    constructor(scene) {
        this.scene = scene;
    }

    transition(scene, message, inventory) {
        this.scene.registry.set("playerInventory", inventory.saveInventory());

        this.scene.scene.start("SceneTransition", {
            targetScene: scene,
            message: message,
        })
    }
}