import { InteractiveTile } from "../entities/InteractiveTile.js";
import { Inventory } from "../entities/Inventory.js";
import { InventoryItem } from "../entities/InventoryItem.js";
import { Npc } from "../entities/Npcs/Npc.js";
import { Player } from "../entities/Player.js";
import { TransitionSaver } from "../utils/transition-saver.js";
import { Preloader } from "../utils/preloader.js";
import { Merchant } from "../entities/Npcs/Merchant.js";
import { ControlBinder } from "../utils/control-binder.js";
import { LevelGenerator } from "../utils/level-generator.js";
import { OverlapDetector } from "../utils/overlap-detector.js";
import { Menu } from "../ui/Menu.js";
import { Town } from "../entities/town/Town.js";
import { Tooltip } from "../ui/Tooltip.js";

export class SceneTown extends Phaser.Scene {
    constructor() {
        super({ key: "SceneTown" });
    }

    preload() {
        this.preloader = new Preloader(this);

        this.preloader.preloadSceneAssets();
        this.preloader.preloadSceneAssetsFromData();

        this.load.image("tiles-tileset-1", "assets/mine/sprites/tiles/tiles-tileset-1.png");
        this.load.image("doodads-tileset-1", "assets/mine/sprites/tiles/doodads-tileset-1.png");
        this.load.image("buildings-tileset-1", "assets/mine/sprites/buildings/buildings-1.png");
        this.load.tilemapTiledJSON('townMap', 'assets/mine/sprites/tiles/town-tilemap.tmj');
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

        this.menu = new Menu(this);
        this.tooltip = new Tooltip(this);
        this.transitionSaver = new TransitionSaver(this);
        this.levelGenerator = new LevelGenerator(this);
        this.overlapDetector = new OverlapDetector(this);

        let townLevel = 1;

        if (this.registry.has("townLevel")) {
            townLevel = this.registry.get("townLevel");
        }

        this.town = new Town(this, townLevel);

        this.controlBinder = new ControlBinder(this);

        let inventory =  new Inventory(this);
        this.player = new Player(this, worldWidth / 2 + 120, worldHeight / 12 -  30, inventory, playerLevel);
        if (this.registry.has("playerTools")) {
            const playerTools = this.registry.get("playerTools");
            playerTools.forEach(tool => {
                tool.setInteractsWith();
            })
            this.player.toolBelt = playerTools;
            this.selectedTool = this.player.toolBelt.find(tool => tool.name = "pickaxe");
        } 
        
        this.controlBinder.bind();

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

        const map  = this.make.tilemap({ key: 'townMap'});
        const tilesTileset = map.addTilesetImage('tiles-tileset-1', 'tiles-tileset-1');
        const doodadsTileset = map.addTilesetImage('doodads-tileset-1', 'doodads-tileset-1');
        const buildingsTileset = map.addTilesetImage('buildings-1', 'buildings-tileset-1');

        const groundLayer = this.getGroundLayer(map, tilesTileset);
        const collisionLayer = this.getCollisionLayer(map, [tilesTileset, doodadsTileset]);
        const buildingsLayer = this.getBuildingsLayer(map, buildingsTileset);
    

        if (buildingsLayer) {
            buildingsLayer.setCollisionByProperty({ collides: true });
            this.physics.add.collider(this.player, buildingsLayer); 
            buildingsLayer.setCollisionBetween(1, 40);
        }

        collisionLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, collisionLayer); 
        collisionLayer.setCollisionBetween(1, 40);

        const interactiveLayer = map.createLayer('InteractiveTiles', doodadsTileset, 0, 0);
        interactiveLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, interactiveLayer); 
        interactiveLayer.setCollisionBetween(1, 40);

        interactiveLayer.forEachTile(tile => {
            if (tile && tile.properties.type) {
                console.log(tile);
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

        const objectLayer = map.getObjectLayer('objects-level-1');
        
        this.fillInObjects(objectLayer);
    }

    fillInObjects(objectLayer) {
        objectLayer.objects.forEach(object => {
            const requiredLevel = object.properties.find(property => property.name === "minimum-level");

            if (this.town.level >= requiredLevel.value) {
                 this.levelGenerator.fillInObject(object);
            }
        });
    }

    update(time, delta) {
        const cameraBounds = this.cameras.main.worldView;

        this.overlapDetector.detectOverlap();

        this.cameras.main.centerOn(this.player.x, this.player.y);
        this.player.setDepth(1);

        this.player.update({W: this.keyW, A: this.keyA, S: this.keyS, D: this.keyD});
    }
    
    toggleInventory() {
        this.player.inventory.levelText.setText(`Current level: ${this.player.level}`);
        this.player.inventory.moneyText.setText(`Money: ${this.player.inventory.money}`);
        this.player.inventory.toggle();
    }

    getGroundLayer(map, tileset) {
        switch (this.town.level) {
            case 1:
                return map.createLayer('ground-level-1', tileset, 0, 0);
                break;
            case 2:      
                return map.createLayer('ground-level-2', tileset, 0, 0);
                break;
            default:
                return map.createLayer('ground-level-1', tileset, 0, 0);
                break;
        }
    }

      getCollisionLayer(map, tileset) {
        switch (this.town.level) {
            case 1:
                return map.createLayer('collision-level-1', tileset, 0, 0);
                break;
            case 2:      
                return map.createLayer('collision-level-2', tileset, 0, 0);
                break;
            default:
                return map.createLayer('collision-level-1', tileset, 0, 0);
                break;
        }
    }

       getBuildingsLayer(map, tileset) {
        switch (this.town.level) {
            case 1:
                return;
                break;
            case 2:      
                return map.createLayer('buildings-1', tileset, 0, 0);
                break;
            default:
                return;
                break;
        }
    }
}