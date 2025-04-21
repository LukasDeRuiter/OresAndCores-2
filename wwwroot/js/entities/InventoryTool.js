export class InventoryTool {
    constructor(name, key, interactsWith, level) {
        this.name = name;
        this.key = key;
        this.interactsWith = interactsWith;
        this.level = level;

        this.swingWithNoHitSound = this.getNoHitSound();
    }

    getNoHitSound() {
        return "tool-swing-1";
    }
}