export class Town {
    constructor(scene, level) {
        this.scene = scene;
        this.level = level;

        this.scene.registry.set("townLevel", this.level);
    }

    upgrade() {
        this.level += 1;
    }
}