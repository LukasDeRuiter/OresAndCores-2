export class InventoryTool {
    constructor(name, key, interactsWith) {
        this.name = name;
        this.key = key;
        this.interactsWith = interactsWith;

        this.swingWithNoHitSound = this.getNoHitSound();
    }

    getNoHitSound() {
        return "tool-swing-1";
    }
}