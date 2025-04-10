import { SceneStart } from './scenes/scene-start.js';
import { SceneMain } from './scenes/scene-main.js';
import { SceneDeath } from './scenes/scene-death.js';
import { SceneEnd } from './scenes/scene-end.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    backgroundColor: "black",
    scene: [ 
        SceneStart,
        SceneMain,
        SceneDeath,
        SceneEnd,
        ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 } 
        }
    },
    parent: "gameContainer",
    pixelArt: true,
    roundedPixels: true,
};

var game = new Phaser.Game(config);