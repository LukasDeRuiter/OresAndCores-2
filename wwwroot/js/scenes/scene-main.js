import { Player } from "../entities/Player.js";
import { Inventory } from "../entities/Inventory.js";
import { InventorySlot } from "../entities/InventorySlot.js";
import { InventoryItem } from "../entities/InventoryItem.js";
import { InventoryTool } from "../entities/InventoryTool.js";
import { Tool } from "../entities/Tool.js";
import { Item } from "../entities/Item.js";
import { Chunk } from "../entities/Chunk.js";
import { Tile } from "../entities/Tile.js";
import { EnvironmentObject } from "../entities/EnvironmentObject.js";
import { Porthole } from "../entities/Porthole.js";
import { Enemy } from "../entities/Enemy.js";
import { Npc } from "../entities/Npc.js";

export class SceneMain extends Phaser.Scene {
        constructor() {
            super({ key: "SceneMain" });
        }

        preload() {
            this.load.spritesheet("player", "assets/mine/sprites/player/test-spritesheet.png",
                {
                    frameHeight: 64,
                    frameWidth: 64,
                }
            );
            this.load.spritesheet("sprWater", "assets/mine/sprites/tiles/sprWater.png", {
                frameWidth: 16,
                frameHeight: 16
            });

            this.load.image("cave-1", "assets/mine/sprites/tiles/cave-1.png");
            this.load.image("cave-2", "assets/mine/sprites/tiles/cave-2.png");
            this.load.image("cave-3", "assets/mine/sprites/tiles/cave-3.png");
            this.load.image("wall-1", "assets/mine/sprites/tiles/wall-1.png");
            this.load.image("wall-gate-1", "assets/mine/sprites/tiles/wall-gate-1.png");

            this.load.image("porthole", "assets/mine/sprites/objects/porthole.png")

            this.load.image("item-shadow", "assets/mine/sprites/effects/item-shadow.png");
            this.load.image("spark", "assets/mine/sprites/effects/spark.png");

            this.load.image("pickaxe", "assets/mine/sprites/tools/pickaxe.png");
            this.load.image("sword", "assets/mine/sprites/tools/sword.png");

           if (window.environmentObjects && Array.isArray(window.environmentObjects)) {
                window.environmentObjects.forEach(environmentObject => {
                    this.load.image(environmentObject.name, environmentObject.path);
                });
            }

            if (window.items && Array.isArray(window.items)) {
                window.items.forEach(item => {
                    this.load.image(item.name, item.path);
                });
            }

            if (window.enemies && Array.isArray(window.enemies)) {
                window.enemies.forEach(enemy => {
                    this.load.spritesheet(enemy.name, enemy.sprite, {
                        frameWidth: 16,
                        frameHeight: 16,
                    });
                });
            }


            this.load.audio('pickaxe-hit-1', 'assets/mine/sounds/effects/pickaxe-hit.mp3');
            this.load.audio('pickaxe-hit-2', 'assets/mine/sounds/effects/pickaxe-hit-2.mp3');
            this.load.audio('pickaxe-hit-3', 'assets/mine/sounds/effects/pickaxe-hit-3.mp3');

            this.load.audio('tool-swing-1', 'assets/mine/sounds/effects/tool-swing-1.mp3');

            this.load.audio('slime-attack-1', 'assets/mine/sounds/effects/slime-attack-1.mp3');
            this.load.audio('slime-damage-1', 'assets/mine/sounds/effects/slime-damage-1.mp3');
        }

        create() {
            const worldWidth = 1008;
            const worldHeight = 1008;
            this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
            this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

            this.anims.create({
                key: "walk-down",
                frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }), 
                frameRate: 8,
                repeat: -1
            });
        
            this.anims.create({
                key: "walk-left",
                frames: this.anims.generateFrameNumbers("player", { start: 1, end: 8 }), 
                frameRate: 8,
                repeat: -1
            });
        
            this.anims.create({
                key: "walk-right",
                frames: this.anims.generateFrameNumbers("player", { start: 1, end: 8 }), 
                frameRate: 8,
                repeat: -1
            }); 
        
            this.anims.create({
                key: "walk-up",
                frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }), 
                frameRate: 8,
                repeat: -1
            });

            let inventory =  new Inventory(this);
            let playerLevel = 1;

            if (this.registry.has("playerInventory")) {
                const savedInventory = this.registry.get("playerInventory").items;
                inventory.items = {};
            
                for (let itemName in savedInventory) {
                    let count = savedInventory[itemName];
            
                    for (let i = 0; i < count; i++) {
                        inventory.addItem(new InventoryItem(itemName), 0);
                    }
                }
            } 

            if (this.registry.has("playerLevel")) {
                playerLevel =  this.registry.get("playerLevel");
            } 

            this.registry.set("playerInventory", inventory);

            this.spawnPorthole();

            this.staticGroup = this.add.group();
            this.environmentObjects = this.add.group();
            this.droppedItems = this.add.group();
            this.enemies = this.add.group();

            this.player = new Player(this, worldWidth / 2, worldHeight / 2, inventory, playerLevel);

            this.physics.world.enable(this.player);
            this.cameras.main.startFollow(this.player);

            this.anims.create({
                key: "sprWater",
                frames: this.anims.generateFrameNumbers("sprWater"),
                frameRate: 5,
                repeat: -1
            });

            this.chunkSize = 16;
            this.tileSize = 16;
            this.cameraSpeed = 10;

            this.cameras.main.setZoom(2);

            this.followPoint = new Phaser.Math.Vector2(
                this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
                this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5)
            );

            this.chunks = [];

            let chunksPerRow = Math.ceil(this.physics.world.bounds.width / (this.chunkSize * this.tileSize));
            let chunksPerColumn = Math.ceil(this.physics.world.bounds.height / (this.chunkSize * this.tileSize));

            for (let x = 0; x < chunksPerRow; x++) {
                for (let y = 0; y < chunksPerColumn; y++) {
                    let newChunk = new Chunk(this, x, y);
                    this.chunks.push(newChunk);
                }
            }

            this.physics.add.collider(this.player, this.environmentObjects);
            this.physics.add.collider(this.player, this.porthole);
            this.physics.add.collider(this.player, this.staticGroup);

            this.physics.add.collider(this.enemies, this.staticGroup);
            this.physics.add.collider(this.enemies, this.porthole);
            this.physics.add.collider(this.enemies, this.environmentObjects);
            this.physics.add.collider(this.enemies, this.enemies);

            this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

            this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

            this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
            this.keyR.on('down', () => this.player.showTool());
            this.keyR.on('up', () => this.player.hideTool());
            
            this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            this.keyE.on('down', () => this.toggleInventory());

            this.numberKeys = this.input.keyboard.addKeys({
                one: Phaser.Input.Keyboard.KeyCodes.ONE,
                two: Phaser.Input.Keyboard.KeyCodes.TWO,
            });

            this.porthole.setInteractive();
            this.input.on('pointerdown', (pointer) => {
                if (pointer.button === 0);
                this.checkPortholeInteraction();
            })

            this.porthole.on('pointerover', () => {
                this.porthole.highLight(true);
            });
        
            this.porthole.on('pointerout', () => {
                this.porthole.highLight(false);
            });
            

            this.createEnemies();
        }

        createEnemies() {
            const enemyCount = 10;

            const generateEnemyPosition = () => {
                let x, y;

                do {
                    const side = Phaser.Math.Between(0, 3);

                    if (side === 0) {
                        x = Phaser.Math.Between(20, this.physics.world.bounds.width - 20);
                        y = 20;
                    } else if (side === 1) {
                        x = Phaser.Math.Between(20, this.physics.world.bounds.width - 20);
                        y = this.physics.world.bounds.height - 20;
                    } else if (side === 2) {
                        x = 20;
                        y = Phaser.Math.Between(20, this.physics.world.bounds.height - 20);
                    } else {
                        x = this.physics.world.bounds.width - 20;
                        y = Phaser.Math.Between(20, this.physics.world.bounds.height - 20);
                    }
                } while (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 50);
        
                return { x, y };
            };
        
            // Create 10 enemies at random positions within 20px of the boundaries, but at least 150px away from the player
            for (let i = 0; i < enemyCount; i++) {
                const { x, y } = generateEnemyPosition();

                const objectData = window.enemies.find(objData => objData.name === "slime");
                const enemy = new Enemy(this, x, y, objectData.name, objectData.name, objectData.health, objectData.speed, objectData.items);
                this.enemies.add(enemy);
            }
        }

        toggleInventory() {
            this.player.inventory.levelText.setText(`Current level: ${this.player.level}`);
            this.player.inventory.moneyText.setText(`Money: ${this.player.inventory.money}`);
            this.player.inventory.toggle();
        }

        getChunk(x, y) {
            var chunk = null;

            for (var i = 0; i < this.chunks.length; i++) {
                if (this.chunks[i].x == x && this.chunks[i].y == y) {
                    chunk = this.chunks[i];
                }
            }

            return chunk;
        }

        spawnPorthole() {
            const worldWidth = this.physics.world.bounds.width;
            const worldHeight = this.physics.world.bounds.height;

            let x = Phaser.Math.Between(16, worldWidth - 32);
            let y = Phaser.Math.Between(16, worldHeight - 32);

            this.porthole = new Porthole(this, x, y, this.level);
        }

        checkPortholeInteraction() {
            let distance = this.porthole.calculateDistanceWithPlayer();

            if (distance <= 32) {
                this.player.level += 1;
                this.registry.set("playerLevel", this.player.level);
                this.scene.restart();
            }
        }

        update(time, delta) {
            if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
                this.scene.start("SceneEnd");
            }

            const cameraBounds = this.cameras.main.worldView;

            const snappedChunkX = Math.floor(cameraBounds.centerX / (this.chunkSize * this.tileSize));
            const snappedChunkY = Math.floor(cameraBounds.centerY / (this.chunkSize * this.tileSize))

            for (let chunk of this.chunks) {
                if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 3) {
                    chunk.load(this.player.level);
                } else {
                    chunk.unload();
                }
            }


            for (let i = 0; i < this.chunks.length; i++) {
                let chunk = this.chunks[i];

                if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 3) {
                    chunk.load(this.player.level);
                } else {
                chunk.unload();
                }
            }

            if (Phaser.Input.Keyboard.JustDown(this.keyR) && this.player.tool !== null) {
                const hitDetected = this.physics.world.overlap(
                    this.player.tool,
                    this.player.selectedTool.interactsWith,
                    this.onObjectOverlap,
                    null,
                    this
                );

                if (!hitDetected) {
                    this.sound.play("tool-swing-1");
                }
            }

            this.physics.world.overlap(this.player, this.droppedItems, this.pickUpItem, null, this);
            this.physics.world.overlap(this.player, this.enemies, this.damagePlayer, null, this);

            this.cameras.main.centerOn(this.player.x, this.player.y);
            this.player.setDepth(1);
    
            this.player.update({W: this.keyW, A: this.keyA, S: this.keyS, D: this.keyD});

            this.enemies.children.iterate(enemy => {
                if (enemy) enemy.update(time, delta);
            })
        }

        damagePlayer(player, enemy) {
            // this.scene.start("SceneDeath");
        }

        onObjectOverlap(tool, object) {
            if (object instanceof Enemy) {
                this.damageEnemy(object);
            } 

            if (object instanceof EnvironmentObject) {
                this.hitEnvironmentObject(object);
            }
        }

        hitEnvironmentObject(object) {
            const pickedSound = Phaser.Math.Between(1, 3);
            this.sound.play(`pickaxe-hit-${pickedSound}`); 
            object.takeDamage(1);
        }

        damageEnemy(enemy) {
            enemy.takeDamage(this.player.x, this.player.y);
        }

        pickUpItem(player, item) {
            let rockItem = new InventoryItem(item.itemName, item.value);

            this.player.collectItem(rockItem);

            item.destroyItem();
        }
    }   