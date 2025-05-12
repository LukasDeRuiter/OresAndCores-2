export class Town {
    constructor(scene, level) {
        this.scene = scene;
        this.level = level;
    }

    upgrade(entity) {
        if (entity === 'town') {
            this.level += 1;

            this.scene.registry.set("townLevel", this.level);
            this.scene.transitionSaver.transition("SceneTown", "Upgrading...", this.scene.player.inventory, this.scene.player.level);
        }
    }
}