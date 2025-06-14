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
import { Porthole } from "../entities/InteractiveObjects/Porthole.js";
import { Enemy } from "../entities/enemies/Enemy.js";
import { Npc } from "../entities/Npcs/Npc.js";
import { TransitionSaver } from "../utils/transition-saver.js";
import { LevelConfigurationCalculator } from "../utils/level-configuration-calculator.js";
import { Preloader } from "../utils/preloader.js";
import { Merchant } from "../entities/Npcs/Merchant.js";
import { StandardEnemy } from "../entities/enemies/StandardEnemy.js";
import { EnemyParser } from "../utils/enemy-parser.js";
import { LevelGenerator } from "../utils/level-generator.js";
import { ControlBinder } from "../utils/control-binder.js";
import { OverlapDetector } from "../utils/overlap-detector.js";
import { Menu } from "../ui/Menu.js";
import { Tooltip } from "../ui/Tooltip.js";
import { DialogueNpc } from "../entities/Npcs/DialogueNpc.js";

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

            this.cameras.main.fadeIn(1000);

            let playerLevel = 1;

            if (this.registry.has("playerLevel")) {
                playerLevel =  this.registry.get("playerLevel");
            } 

            this.levelConfiguration = this.levelConfigurations.find(levelConfiguration => levelConfiguration.id === playerLevel);

            this.menu = new Menu(this);
            this.tooltip = new Tooltip(this);
            this.transitionSaver = new TransitionSaver(this);
            this.LevelConfigurationCalculator = new LevelConfigurationCalculator(
                this, 
                this.levelConfiguration,
            );

            this.levelGenerator = new LevelGenerator(this, this.levelConfiguration);
            this.controlBinder = new ControlBinder(this);
            this.overlapDetector = new OverlapDetector(this);

            this.enemyParser = new EnemyParser(this, window.enemies);

            let inventory =  new Inventory(this);

            if (this.registry.has("playerInventory")) {
                const savedInventory = this.registry.get("playerInventory");
                inventory.restoreInventory(savedInventory)
            }

            if (this.registry.has("playerLevel")) {
                const level = this.registry.get("playerLevel");
            } 

            this.controlBinder.bind();

            this.staticGroup = this.add.group();
            this.environmentObjects = this.add.group();
            this.droppedItems = this.add.group();
            this.enemies = this.add.group();
            this.npcs = this.add.group();

            this.player = new Player(this, worldWidth / 2, worldHeight / 12, inventory, playerLevel);
            if (this.registry.has("playerTools")) {
                const playerTools = this.registry.get("playerTools");
                playerTools.forEach(tool => {
                    tool.setInteractsWith();
                })
                this.player.toolBelt = playerTools;
                this.selectedTool = this.player.toolBelt.find(tool => tool.name = "pickaxe");
            } 

            let npc = new Merchant(this, worldWidth / 2, (worldHeight / 12) + 30, "merchant-1", "merchant-1");

            let npc2 = new DialogueNpc(this, worldWidth / 2, (worldHeight / 12) + 42, "merchant-1", "merchant-1", "test123");
            
            this.npcs.add(npc);
            this.npcs.add(npc2);

            this.levelGenerator.generateInteractiveObjects();

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

            this.chunks = this.levelGenerator.generateChunks();

            this.physics.add.collider(this.player, this.environmentObjects);
            this.physics.add.collider(this.player, this.porthole);
            this.physics.add.collider(this.player, this.smelter);
            this.physics.add.collider(this.player, this.staticGroup);

            this.physics.add.collider(this.enemies, this.staticGroup);
            this.physics.add.collider(this.enemies, this.porthole);
            this.physics.add.collider(this.enemies, this.smelter);
            this.physics.add.collider(this.enemies, this.environmentObjects);
            this.physics.add.collider(this.enemies, this.enemies);

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

        checkPortholeInteraction() {
            let distance = this.porthole.calculateDistanceWithPlayer();

            if (distance <= 32) {
                this.player.level += 1;
                this.transitionSaver.transition("SceneMain",  "Next level...", this.player.inventory, this.player.level)
            }
        }

        checkSmelterInteraction() {
            let distance = this.smelter.calculateDistanceWithPlayer();

            if (distance <= 32) {
                this.smelter.transition("SceneMain",  "Next level...", this.player.inventory, this.player.level)
            }
        }

        update(time, delta) {
            const cameraBounds = this.cameras.main.worldView;

            const snappedChunkX = Math.floor(cameraBounds.centerX / (this.chunkSize * this.tileSize));
            const snappedChunkY = Math.floor(cameraBounds.centerY / (this.chunkSize * this.tileSize))

            for (let chunk of this.chunks) {
                if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 3) {
                    this.levelGenerator.loadChunk(chunk);
                } else {
                    chunk.unload();
                }
            }

            this.overlapDetector.detectOverlap();

            this.cameras.main.centerOn(this.player.x, this.player.y);
            this.player.setDepth(1);
    
            this.player.update({W: this.keyW, A: this.keyA, S: this.keyS, D: this.keyD});

            this.enemies.children.iterate(enemy => {
                if (enemy) enemy.update(time, delta);
            })
        }
    }   