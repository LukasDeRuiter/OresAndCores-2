export class InventoryTool {
    constructor(scene, name, key, interactsWith, level, materialType = null) {
        this.scene = scene;
        this.name = name;
        this.key = key;
        this.interactsWith = interactsWith;
        this.level = level;
        this.materialType = materialType;

        this.swingWithNoHitSound = this.getNoHitSound();
    }

    setInteractsWith() {
        this.interactsWith = this.getCollection();
    }

    getCollection() {
        switch (this.name) {
            case "pickaxe":
                return this.scene.environmentObjects;
                break;
            case "axe":
                return this.scene.environmentObjects;
                break;
            case "sword":
                return this.scene.enemies;
                break;
            default:
                console.log("No name found!");      
        }
    }

    getNoHitSound() {
        return "tool-swing-1";
    }

    getKey() {
        return `${this.name}-level-${this.level}`;
    }
}