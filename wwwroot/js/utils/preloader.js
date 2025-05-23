export class Preloader {
    constructor(scene) {
        this.scene = scene;
    }

    preloadSceneAssets() {
        this.scene.load.spritesheet("player", "assets/mine/sprites/player/player.png",
            {
                frameHeight: 16,
                frameWidth: 16,
            }
        );
    
        this.scene.load.spritesheet("merchant-1", "assets/mine/sprites/npcs/merchant-sprite-1.png",
            {
                frameHeight: 16,
                frameWidth: 16,
            }
        );
    
        this.scene.load.spritesheet("sprWater", "assets/mine/sprites/tiles/sprWater.png", {
            frameWidth: 16,
            frameHeight: 16
        });
    
        /* Images */
        this.scene.load.image("cancel-button-icon", "assets/mine/sprites/buttons/cancel-button.png");

        this.scene.load.image("cave-1", "assets/mine/sprites/tiles/cave-1.png");
        this.scene.load.image("cave-2", "assets/mine/sprites/tiles/cave-2.png");
        this.scene.load.image("cave-3", "assets/mine/sprites/tiles/cave-3.png");
        this.scene.load.image("wall-1", "assets/mine/sprites/tiles/wall-1.png");
        this.scene.load.image("wall-gate-1", "assets/mine/sprites/tiles/wall-gate-1.png");

        this.scene.load.image("rock-block", "assets/mine/sprites/objects/rock-block.png");
    
        this.scene.load.image("porthole", "assets/mine/sprites/interactive-objects/porthole.png");
        this.scene.load.image("smelter", "assets/mine/sprites/interactive-objects/smelter.png");
        this.scene.load.image("anvil", "assets/mine/sprites/interactive-objects/anvil.png");
        this.scene.load.image('upgrade-board', 'assets/mine/sprites/interactive-objects/upgrade-board.png');
    
        this.scene.load.image("item-shadow", "assets/mine/sprites/effects/item-shadow.png");
        this.scene.load.image("spark", "assets/mine/sprites/effects/spark.png");
    
        this.scene.load.image("pickaxe-level-1", "assets/mine/sprites/tools/pickaxe-level-1.png");
        this.scene.load.image("pickaxe-level-2", "assets/mine/sprites/tools/pickaxe-level-2.png");
        this.scene.load.image("pickaxe-level-3", "assets/mine/sprites/tools/pickaxe-level-3.png");
        this.scene.load.image("pickaxe-level-4", "assets/mine/sprites/tools/pickaxe-level-4.png");
        this.scene.load.image("pickaxe-level-5", "assets/mine/sprites/tools/pickaxe-level-5.png");

        this.scene.load.image("axe-level-1", "assets/mine/sprites/tools/axe-level-1.png");
        this.scene.load.image("axe-level-2", "assets/mine/sprites/tools/axe-level-2.png");
        this.scene.load.image("axe-level-3", "assets/mine/sprites/tools/axe-level-3.png");
        this.scene.load.image("axe-level-4", "assets/mine/sprites/tools/axe-level-4.png");
        this.scene.load.image("axe-level-5", "assets/mine/sprites/tools/axe-level-5.png");

        this.scene.load.image("sword-level-1", "assets/mine/sprites/tools/sword-level-1.png");
        this.scene.load.image("sword-level-2", "assets/mine/sprites/tools/sword-level-2.png");
        this.scene.load.image("sword-level-3", "assets/mine/sprites/tools/sword-level-3.png");
        this.scene.load.image("sword-level-4", "assets/mine/sprites/tools/sword-level-4.png");
        this.scene.load.image("sword-level-5", "assets/mine/sprites/tools/sword-level-5.png");

        /* Audio */
        this.scene.load.audio('pickaxe-hit-1', 'assets/mine/sounds/effects/pickaxe-hit.mp3');
        this.scene.load.audio('pickaxe-hit-2', 'assets/mine/sounds/effects/pickaxe-hit-2.mp3');
        this.scene.load.audio('pickaxe-hit-3', 'assets/mine/sounds/effects/pickaxe-hit-3.mp3');

        this.scene.load.audio('axe-hit-1', 'assets/mine/sounds/effects/axe-hit-1.mp3');
        this.scene.load.audio('axe-hit-2', 'assets/mine/sounds/effects/axe-hit-2.mp3');
        this.scene.load.audio('axe-hit-3', 'assets/mine/sounds/effects/axe-hit-3.mp3');

        this.scene.load.audio('tool-swing-1', 'assets/mine/sounds/effects/tool-swing-1.mp3');
        this.scene.load.audio('tool-insufficient-level', 'assets/mine/sounds/effects/tool-insufficient-level.mp3');
        this.scene.load.audio('tool-wrong-type', 'assets/mine/sounds/effects/tool-wrong-type.mp3');

        this.scene.load.audio('pick-up-item', 'assets/mine/sounds/effects/pick-up-item.mp3');
        this.scene.load.audio('drop-item', 'assets/mine/sounds/effects/drop-item.mp3');

        this.scene.load.audio('slime-attack-1', 'assets/mine/sounds/effects/slime-attack-1.mp3');
        this.scene.load.audio('slime-damage-1', 'assets/mine/sounds/effects/slime-damage-1.mp3');

        this.scene.load.audio('spider-attack-1', 'assets/mine/sounds/effects/spider-attack-1.mp3');
        this.scene.load.audio('spider-damage-1', 'assets/mine/sounds/effects/spider-damage-1.mp3');

        this.scene.load.audio('rocker-attack-1', 'assets/mine/sounds/effects/rocker-attack-1.mp3');
        this.scene.load.audio('rocker-damage-1', 'assets/mine/sounds/effects/rocker-damage-1.mp3');

        this.scene.load.audio('smelter-craft-1', 'assets/mine/sounds/effects/smelter-craft-1.mp3');
        this.scene.load.audio('anvil-craft-1', 'assets/mine/sounds/effects/anvil-craft-1.mp3');
    }

    preloadSceneAssetsFromData() {
        if (window.environmentObjects && Array.isArray(window.environmentObjects)) {
            window.environmentObjects.forEach(environmentObject => {
                this.scene.load.image(environmentObject.name, environmentObject.path);
            });
        }

        if (window.items && Array.isArray(window.items)) {
            window.items.forEach(item => {
                this.scene.load.image(item.name, item.path);
            });
        }

        if (window.enemies && Array.isArray(window.enemies)) {
            window.enemies.forEach(enemy => {
                this.scene.load.spritesheet(enemy.name, enemy.sprite, {
                    frameWidth: 16,
                    frameHeight: 16,
                });
            });
        }

        if (window.levelConfigurations && Array.isArray(window.levelConfigurations)) {
            this.scene.levelConfigurations = window.levelConfigurations;
        }
    }
}