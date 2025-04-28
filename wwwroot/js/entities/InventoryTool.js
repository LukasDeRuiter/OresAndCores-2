export class InventoryTool {
    constructor(name, key, interactsWith, level, materialType = null) {
        this.name = name;
        this.key = key;
        this.interactsWith = interactsWith;
        this.level = level;
        this.materialType = materialType;

        this.swingWithNoHitSound = this.getNoHitSound();
    }

    getNoHitSound() {
        return "tool-swing-1";
    }

    getKey() {
        return `${this.name}-level-${this.level}`;
    }
}