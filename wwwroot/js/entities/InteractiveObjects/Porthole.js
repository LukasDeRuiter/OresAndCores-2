import { InteractiveObject } from "./InteractiveObject.js";

export class Porthole extends InteractiveObject {
    constructor(scene, x, y, level) {
        super(scene, x, y, "porthole");
        this.price = this.calculatePriceToNextLevel(level);

        this.text = "Click to go to the next level"
    }

    calculatePriceToNextLevel(level) {
        return level * 100;
    }
}