import { Tile } from "./Tile.js";
import { InteractiveTile } from "./InteractiveTile.js";
import { EnvironmentObject } from "./EnvironmentObject.js";

export class Chunk {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
       
        this.tiles = this.scene.add.group();
        this.isLoaded = false;
    }

    unload() {
        if (this.isLoaded) {
            this.tiles.clear(true, true);

            this.isLoaded = false;
        }
    }
}