var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    backgroundColor: "black",
    scene: [ 
        SceneStart,
        SceneMain,
        SceneEnd,
        ],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 } 
        }
    },
    parent: "gameContainer",
    pixelArt: true,
    roundedPixels: true,
};

document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.environmentObjects !== "undefined" && Array.isArray(window.environmentObjects)) {
        console.log("Environment Objects Loaded:", window.environmentObjects);
        window.environmentObjects = environmentObjects; 
    } else {
        console.error("Environment objects are not defined or not an array.");
        window.environmentObjects = [];
    }
});

var game = new Phaser.Game(config);

function saveInventoryToServer(inventory) {
    fetch('api/mineApi/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventory)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}