import { EnvironmentObject } from "../entities/EnvironmentObject.js";
import { InteractiveTile } from "../entities/InteractiveTile.js";
import { Chunk } from "../entities/Chunk.js";
import { Tile } from "../entities/Tile.js";
import { Porthole } from "../entities/InteractiveObjects/Porthole.js";
import { Smelter } from "../entities/InteractiveObjects/Smelter.js";

export class LevelGenerator {
    constructor(scene, levelConfiguration) {
        this.scene = scene;
        this.levelConfiguration = levelConfiguration;
    }

    generateChunks() {
        let chunks = [];

        let chunksPerRow = Math.ceil(this.scene.physics.world.bounds.width / (this.scene.chunkSize * this.scene.tileSize));
        let chunksPerColumn = Math.ceil(this.scene.physics.world.bounds.height / (this.scene.chunkSize * this.scene.tileSize));

        for (let x = 0; x < chunksPerRow; x++) {
            for (let y = 0; y < chunksPerColumn; y++) {
                let newChunk = new Chunk(this.scene, x, y);
                chunks.push(newChunk);
            }
        }

        return chunks;
    }

    loadChunk(chunk) {
         if (!chunk.isLoaded) {
                    for (var x = 0; x < this.scene.chunkSize; x++) {
                        for (var y = 0; y < this.scene.chunkSize; y++) {

                            let worldWidth = this.scene.physics.world.bounds.width;
                            let worldHeight = this.scene.physics.world.bounds.height;
        
                            this.scene.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        
                            var tileX = (chunk.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
                            var tileY = (chunk.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);
        
                            var key = "";
                            let isWalkable = true;
                            let interactive = false;
                            var animationKey = ""; 
        
                            if (tileX !== 0 && tileY !== 0 && tileX < worldWidth - this.scene.tileSize && tileY < worldHeight - this.scene.tileSize) {
                                var perlinValue = noise.perlin2(tileX / 100, tileY / 100) * this.levelConfiguration.id;
        
                                if (perlinValue < 0.2) {
                                    key = "cave-3";
                                    interactive = false;
                                    this.createObject(tileX, tileY, this.generateLevelObject(1));
                                } else if (perlinValue >= 0.2 && perlinValue < 0.5) {
                                    key = "cave-2";
                                    interactive = false;
                                    this.createObject(tileX, tileY, this.generateLevelObject(2));
                                } else if (perlinValue >= 0.5) {
                                    key = "cave-1";
                                    interactive = false;
                                    this.createObject(tileX, tileY, this.generateLevelObject(3));
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
        
                            chunk.tiles.add(tile);
                        }
                    }
        
                    chunk.isLoaded = true;
                }
    }

     generateLevelObject(layer) {
            const objectChance = Math.random() * 100;
    
            let cumulative = 0;

            let selectedObjects = this.levelConfiguration.environmentObjects.filter((object) => object.layer === layer);
    
            for (let object of selectedObjects) {
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
            let object = new EnvironmentObject(this.scene, x + 8, y + 8, objectName, objectData.health, objectData.materialType, objectData.items);
            this.scene.environmentObjects.add(object);
        }

        generateInteractiveObjects() {
            this.spawnPorthole();
            this.spawnSmelter();
        }

        spawnPorthole() {
            const worldWidth = this.scene.physics.world.bounds.width;
            const worldHeight = this.scene.physics.world.bounds.height;

            let x = Phaser.Math.Between(16, worldWidth - 32);
            let y = Phaser.Math.Between(16, worldHeight - 32);

            this.scene.porthole = new Porthole(this.scene, x + 8, y + 8, this.scene.level);
        }

        spawnSmelter() {
            const worldWidth = this.scene.physics.world.bounds.width;
            const worldHeight = this.scene.physics.world.bounds.height;

            let x = Phaser.Math.Between(16, worldWidth - 32);
            let y = Phaser.Math.Between(16, worldHeight - 32);

            //this.scene.smelter = new Smelter(this.scene, x + 8, y + 8);

            this.scene.smelter = new Smelter(this.scene, 400, 50);
        }
}