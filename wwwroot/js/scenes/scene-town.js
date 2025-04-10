import { Inventory } from "../entities/Inventory.js";
import { InventoryItem } from "../entities/InventoryItem.js";
import { Player } from "../entities/Player.js";

export class SceneTown extends Phaser.Scene {
    constructor() {
        super({ key: "SceneTown" });
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

        this.load.image("porthole", "assets/mine/sprites/objects/porthole.png")

        this.load.image("item-shadow", "assets/mine/sprites/effects/item-shadow.png");

        this.load.image("pickaxe", "assets/mine/sprites/tools/pickaxe.png");
        this.load.image("sword", "assets/mine/sprites/tools/sword.png");

        this.load.image("tileset-1", "assets/mine/sprites/tiles/tileset-1.png")
        this.load.tilemapTiledJSON('townMap', 'assets/mine/sprites/tiles/test.tmj');

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
                console.log(enemy);
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
        
                    this.staticGroup = this.add.group();
                    this.environmentObjects = this.add.group();
                    this.droppedItems = this.add.group();
                    this.enemies = this.add.group();
        
                    this.player = new Player(this, worldWidth / 2, worldHeight / 2, inventory, playerLevel);
        
                    this.physics.world.enable(this.player);
                    this.cameras.main.startFollow(this.player);

                    
                    this.chunkSize = 16;
                    this.tileSize = 16;
                    this.cameraSpeed = 10;

                    this.cameras.main.setZoom(2);

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

                    const map  = this.make.tilemap({ key: 'townMap'});
                    const tileset = map.addTilesetImage('tileset-1', 'tileset-1');

                    const groundLayer = map.createLayer('Tilelaag 1', tileset, 0, 0);
        
    }

    update(time, delta) {
        const cameraBounds = this.cameras.main.worldView;


        // if (Phaser.Input.Keyboard.JustDown(this.keyR) && this.player.tool !== null) {
        //     const hitDetected = this.physics.world.overlap(
        //         this.player.tool,
        //         this.player.selectedTool.interactsWith,
        //         this.onObjectOverlap,
        //         null,
        //         this
        //     );

        //     if (!hitDetected) {
        //         this.sound.play("tool-swing-1");
        //     }
        // }

        this.physics.world.overlap(this.player, this.droppedItems, this.pickUpItem, null, this);
        this.physics.world.overlap(this.player, this.enemies, this.damagePlayer, null, this);

        this.cameras.main.centerOn(this.player.x, this.player.y);
        this.player.setDepth(1);

        this.player.update({W: this.keyW, A: this.keyA, S: this.keyS, D: this.keyD});
    }
}