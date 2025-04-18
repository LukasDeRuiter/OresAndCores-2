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
import { Enemy } from "../entities/enemies/Enemy.js";
import { Npc } from "../entities/Npcs/Npc.js";
import { TransitionSaver } from "../utils/transition-saver.js";
import { LevelConfigurationCalculator } from "../utils/level-configuration-calculator.js";
import { Preloader } from "../utils/preloader.js";
import { Merchant } from "../entities/Npcs/Merchant.js";
import { StandardEnemy } from "../entities/enemies/StandardEnemy.js";
import { EnemyParser } from "../utils/enemy-parser.js";

export class SceneMain extends Phaser.Scene {
        constructor() {
            super({ key: "SceneMain" });
        }

        preload() {
            this.preloader = new Preloader(this);

            this.preloader.preloadSceneAssets();
            this.preloader.preloadSceneAssetsFromData();
        }

        create() {
            const worldWidth = 1008;
            const worldHeight = 1008;
            this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
            this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

            let playerLevel = 1;

            if (this.registry.has("playerLevel")) {
                playerLevel =  this.registry.get("playerLevel");
            } 

            this.levelConfiguration = this.levelConfigurations.find(levelConfiguration => levelConfiguration.id === playerLevel);

            this.transitionSaver = new TransitionSaver(this);
            this.LevelConfigurationCalculator = new LevelConfigurationCalculator(
                this, 
                this.levelConfiguration,
            );

            this.enemyParser = new EnemyParser(this, window.enemies);

            let inventory =  new Inventory(this);
            this.player = new Player(this, worldWidth / 2, worldHeight / 12, inventory, playerLevel);

            if (this.registry.has("playerInventory")) {
                const savedInventory = this.registry.get("playerInventory");
                inventory.restoreInventory(savedInventory)
            }
    
            this.player.inventory = inventory;

            if (this.registry.has("playerLevel")) {
                playerLevel =  this.registry.get("playerLevel");
            } 

            this.spawnPorthole();

            this.staticGroup = this.add.group();
            this.environmentObjects = this.add.group();
            this.droppedItems = this.add.group();
            this.enemies = this.add.group();
            this.npcs = this.add.group();

            this.player = new Player(this, worldWidth / 2, worldHeight / 12, inventory, playerLevel);

            let npc = new Merchant(this, worldWidth / 2, (worldHeight / 12) + 30, "merchant-1", "merchant-1");
            this.npcs.add(npc);

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
            const enemiesToSpawn = this.LevelConfigurationCalculator.calculateEnemiesToSpawn();

            enemiesToSpawn.forEach(spawnData => {
                const objectData = window.enemies.find(obj => obj.id === spawnData.id);
                
                for (let i = 0; i < spawnData.count; i++) {
                    this.enemyParser.parseEnemy(objectData);
                } 
            });
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
                this.transitionSaver.transition("SceneMain",  "Next level...", this.player.inventory, this.player.level)
            }
        }

        update(time, delta) {
            if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
                this.transitionSaver.transition("SceneEnd",  "Leaving the mine...", this.player.inventory, this.player.level);
            }

            const cameraBounds = this.cameras.main.worldView;

            const snappedChunkX = Math.floor(cameraBounds.centerX / (this.chunkSize * this.tileSize));
            const snappedChunkY = Math.floor(cameraBounds.centerY / (this.chunkSize * this.tileSize))

            for (let chunk of this.chunks) {
                if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 3) {
                    chunk.load(this.levelConfiguration);
                } else {
                    chunk.unload();
                }
            }


            for (let i = 0; i < this.chunks.length; i++) {
                let chunk = this.chunks[i];

                if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 3) {
                    chunk.load(this.levelConfiguration);
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