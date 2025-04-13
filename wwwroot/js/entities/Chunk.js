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

    load(levelConfiguration) {
        if (!this.isLoaded) {
            for (var x = 0; x < this.scene.chunkSize; x++) {
                for (var y = 0; y < this.scene.chunkSize; y++) {
                    let worldWidth = this.scene.physics.world.bounds.width;
                    let worldHeight = this.scene.physics.world.bounds.height;

                    this.scene.physics.world.setBounds(0, 0, worldWidth, worldHeight);

                    var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
                    var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

                    var key = "";
                    let isWalkable = true;
                    let interactive = false;
                    var animationKey = ""; 

                    if (tileX !== 0 && tileY !== 0 && tileX < worldWidth - this.scene.tileSize && tileY < worldHeight - this.scene.tileSize) {
                        var perlinValue = noise.perlin2(tileX / 100, tileY / 100) * levelConfiguration.id;

                        if (perlinValue < 0.2) {
                            key = "cave-3";
                            interactive = false;
                        } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
                            key = "cave-2";
                            interactive = false;
                        } else if (perlinValue >= 0.3) {
                            key = "cave-1";
                            interactive = false;
                            this.createObject(tileX, tileY, this.generateLevelObject(levelConfiguration));
                        } 
                    } else if (y === 0 && tileX === 512) {
                        key = "wall-gate-1";
                        interactive = true;
                        isWalkable = false;
                    } else {
                        key = "wall-1";
                        interactive = false;
                        isWalkable = false;
                    }

                    if (!interactive) {
                        var tile = new Tile(this.scene, tileX, tileY, key, isWalkable);
                    } else {
                        var tile = new InteractiveTile(this.scene, tileX, tileY, key, isWalkable, "SceneTown", "Entering the town...");
                    }
                   
                    if (animationKey !== "") {
                        tile.play(animationKey);
                    }

                    this.tiles.add(tile);
                }
            }

            this.isLoaded = true;
        }
    }

    generateLevelObject(levelConfiguration) {
        const objectChance = Math.random() * 100;

        let cumulative = 0;

        for (let object of levelConfiguration.environmentObjects) {
            cumulative += object.percentage;
    
            if (objectChance <= cumulative) {
                const objectData = window.environmentObjects.find(obj => obj.id === object.entityId);
    
                if (objectData) {
                    return objectData.name;
                }
    
                return null;
            }
        }
    
        return null;

    }

    createObject(x, y, objectName) {

        if (!objectName) {
            return;
        }

        const objectData = window.environmentObjects.find(objData => objData.name === objectName);
        let object = new EnvironmentObject(this.scene, x + 8, y + 8, objectName, objectData.health, objectData.items);
        this.scene.environmentObjects.add(object);
    }
}