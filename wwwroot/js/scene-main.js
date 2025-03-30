    class SceneMain extends Phaser.Scene {
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

            this.load.image("item-shadow", "assets/mine/sprites/effects/item-shadow.png");

            this.load.image("pickaxe", "assets/mine/sprites/tools/pickaxe.png");

    

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
        }

        create() {
            this.physics.world.setBounds(0, 0, 1000, 1000);
            this.cameras.main.setBounds(0, 0, 1000, 1000);

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

            if (!this.registry.has("playerInventory")) {
                this.registry.set("playerInventory", new Inventory(this));
            }

            this.player = new Player(this, this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
            this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5), this.registry.get("playerInventory"));

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

            this.environmentObjects = this.add.group();
            this.droppedItems = this.add.group();

            this.physics.add.collider(this.player, this.environmentObjects);

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
        }

        toggleInventory() {
            this.player.inventory.isVisible = !this.player.inventory.isVisible;
            this.player.inventory.inventoryText.setVisible(this.player.inventory.isVisible);

            if (this.player.inventory.isVisible){
                this.player.inventory.inventoryText.setPosition(200, 175); 
                this.physics.world.pause();
            } else {
                this.physics.world.resume();
            }
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

        update() {
            if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
                this.scene.start("SceneEnd");
            }

            const cameraBounds = this.cameras.main.worldView;

            const snappedChunkX = Math.floor(cameraBounds.centerX / (this.chunkSize * this.tileSize));
            const snappedChunkY = Math.floor(cameraBounds.centerY / (this.chunkSize * this.tileSize));


            for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
                for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
                    let existingChunk = this.getChunk(x, y);

                    if (existingChunk === null) {
                        let newChunk = new Chunk(this, x, y);
                        this.chunks.push(newChunk);
                    }
                }
            }


            for (let i = 0; i < this.chunks.length; i++) {
                let chunk = this.chunks[i];

                if (Phaser.Math.Distance.Between(snappedChunkX, snappedChunkY, chunk.x, chunk.y) < 3) {
                    chunk.load();
                } else {
                chunk.unload();
                }
            }

            if (Phaser.Input.Keyboard.JustDown(this.keyR) && this.player.tool !== null) {
                this.physics.world.overlap(this.player.tool, this.environmentObjects, this.onObjectOverlap, null, this);
            }

        this.physics.world.overlap(this.player, this.droppedItems, this.pickUpItem, null, this);

        this.cameras.main.centerOn(this.player.x, this.player.y);
        this.player.setDepth(1);
    
        this.player.update({W: this.keyW, A: this.keyA, S: this.keyS, D: this.keyD});
        }

        onObjectOverlap(tool, environmentObject) {
            environmentObject.dropItems();
            environmentObject.destroy();
        }

        pickUpItem(player, item) {
            let rockItem = new InventoryItem(item.itemName);

            this.player.collectItem(rockItem);

            item.destroyItem();
        }
    }   