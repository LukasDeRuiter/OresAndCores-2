import { Tile } from "./Tile.js";
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

    load(level) {
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
                    var animationKey = ""; 

                    if (tileX !== 0 && tileY !== 0 && tileX < worldWidth - this.scene.tileSize && tileY < worldHeight - this.scene.tileSize) {
                        var perlinValue = noise.perlin2(tileX / 100, tileY / 100) * level;

                        if (perlinValue < 0.2) {
                            key = "cave-3";
                        } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
                            key = "cave-2";
                        } else if (perlinValue >= 0.3) {
                            key = "cave-1";
                            const objectChance = Math.random() * 100;
                            this.createObject(tileX, tileY, this.generateLevelObject(objectChance, level));
                        } 
                    } else {
                        key = "wall-1";
                        isWalkable = false;
                    }

                    var tile = new Tile(this.scene, tileX, tileY, key, isWalkable);
                   
                    if (animationKey !== "") {
                        tile.play(animationKey);
                    }

                    this.tiles.add(tile);
                }
            }

            this.isLoaded = true;
        }
    }

    generateLevelObject(objectChance, level) {
        if(level >= 1 && level <= 5) {
            if (objectChance > 50 &&  objectChance <= 70) {
                return "rock";
            } else if (objectChance > 70 && objectChance <= 80) {
                return "copper-rock";
            } else if (objectChance > 80 && objectChance <= 85) {
                return "tin-rock";
            } else if (objectChance > 85 && objectChance <= 90) {
                return "iron-rock";
            }
        }
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