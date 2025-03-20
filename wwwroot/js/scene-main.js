class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMain" });
    }

    preload() {
        this.load.image("player", "assets/mine/sprites/player/player.png");
        this.load.spritesheet("sprWater", "assets/mine/sprites/tiles/sprWater.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.image("sprSand", "assets/mine/sprites/tiles/sprSand.png");
        this.load.image("sprGrass", "assets/mine/sprites/tiles/sprGrass.png");
    }

    create() {
        this.physics.world.setBounds(0, 0, 1000, 1000);
        this.cameras.main.setBounds(0, 0, 1000, 1000);

        this.player = new Player(this, this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
        this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5));

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

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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

    this.cameras.main.centerOn(this.player.x, this.player.y);
    this.player.setDepth(1);
    this.player.update({W: this.keyW, A: this.keyA, S: this.keyS, D: this.keyD});
    }
}   