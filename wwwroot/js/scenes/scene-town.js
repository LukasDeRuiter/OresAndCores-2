import { InteractiveTile } from "../entities/InteractiveTile.js";
import { Inventory } from "../entities/Inventory.js";
import { InventoryItem } from "../entities/InventoryItem.js";
import { Npc } from "../entities/Npc.js";
import { Player } from "../entities/Player.js";
import { TransitionSaver } from "../utils/transition-saver.js";

export class SceneTown extends Phaser.Scene {
    constructor() {
        super({ key: "SceneTown" });
    }

    preload() {
        this.load.spritesheet("player", "assets/mine/sprites/player/player.png",
            {
                frameHeight: 16,
                frameWidth: 16,
            }
        );

        this.load.spritesheet("merchant-1", "assets/mine/sprites/npcs/merchant-sprite-1.png",
            {
                frameHeight: 16,
                frameWidth: 16,
            }
        );

        this.load.image("cave-1", "assets/mine/sprites/tiles/cave-1.png");
        this.load.image("cave-2", "assets/mine/sprites/tiles/cave-2.png");
        this.load.image("cave-3", "assets/mine/sprites/tiles/cave-3.png");
        this.load.image("wall-1", "assets/mine/sprites/tiles/wall-1.png");
        this.load.image("wall-gate-1", "assets/mine/sprites/tiles/wall-gate-1.png");

        this.load.image("porthole", "assets/mine/sprites/objects/porthole.png")

        this.load.image("item-shadow", "assets/mine/sprites/effects/item-shadow.png");

        this.load.image("pickaxe", "assets/mine/sprites/tools/pickaxe.png");
        this.load.image("sword", "assets/mine/sprites/tools/sword.png");

        this.load.image("tileset-1", "assets/mine/sprites/tiles/tileset-1.png")
        this.load.tilemapTiledJSON('townMap', 'assets/mine/sprites/tiles/town-tilemap.tmj');

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

        this.transitionSaver = new TransitionSaver(this);

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
        this.player = new Player(this, worldWidth / 2, worldHeight / 12, inventory, playerLevel);
        
        if (this.registry.has("playerInventory")) {
            const savedInventory = this.registry.get("playerInventory");
            inventory.restoreInventory(savedInventory)
        }
        
        if (this.registry.has("playerLevel")) {
            playerLevel =  this.registry.get("playerLevel");
        } 

        this.player.inventory = inventory;

        this.interactiveTiles = this.add.group();
        this.staticGroup = this.add.group();
        this.environmentObjects = this.add.group();
        this.droppedItems = this.add.group();
        this.enemies = this.add.group();
        this.npcs = this.add.group();
        
        this.physics.world.enable(this.player);
        this.cameras.main.startFollow(this.player);

        this.chunkSize = 16;
        this.tileSize = 16;
        this.cameraSpeed = 10;

        this.cameras.main.setZoom(2);

        this.physics.add.collider(this.player, this.npcs);

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

        const groundLayer = map.createLayer('Ground', tileset, 0, 0);

        const collisionLayer = map.createLayer('Collision', tileset, 0, 0);
        collisionLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, collisionLayer); 
        collisionLayer.setCollisionBetween(1, 40);

        const interactiveLayer = map.createLayer('InteractiveTiles', tileset, 0, 0);
        interactiveLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, interactiveLayer); 
        interactiveLayer.setCollisionBetween(1, 40);

        interactiveLayer.forEachTile(tile => {
            if (tile && tile.properties.type) {
                const worldX = tile.getCenterX();
                const worldY = tile.getCenterY();

                const interactiveTile = new InteractiveTile(
                    this,
                    worldX,
                    worldY,
                    "wall-gate-1",
                    false,
                    tile.properties.value,
                    "Entering the mine..."
                );

                interactiveTile.setOrigin(0.5);

                this.interactiveTiles.add(interactiveTile);
            }
        })

        const objectLayer = map.getObjectLayer('Objects');
        
        this.fillInObjects(objectLayer);
    }

    fillInObjects(objectLayer) {
        objectLayer.objects.forEach(object => {
            let npc = new Npc(this, object.x, object.y, "merchant-1", "merchant-1");
            this.npcs.add(npc);
        });
    }

    update(time, delta) {
        const cameraBounds = this.cameras.main.worldView;

        this.physics.world.overlap(this.player, this.droppedItems, this.pickUpItem, null, this);
        this.physics.world.overlap(this.player, this.enemies, this.damagePlayer, null, this);

        this.cameras.main.centerOn(this.player.x, this.player.y);
        this.player.setDepth(1);

        this.player.update({W: this.keyW, A: this.keyA, S: this.keyS, D: this.keyD});
    }
    
    toggleInventory() {
        this.player.inventory.levelText.setText(`Current level: ${this.player.level}`);
        this.player.inventory.moneyText.setText(`Money: ${this.player.inventory.money}`);
        this.player.inventory.toggle();
    }
}