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
            debug: false,
            gravity: { y: 0 } 
        }
    },
    parent: "gameContainer",
    pixelArt: true,
    roundedPixels: true,
};

var game = new Phaser.Game(config);

function saveInventoryToServer(inventory) {
    return fetch('api/mineApi/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventory)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("Server Response:", data);
        return data;
    })
    .catch(error => {
        console.error("Error:", error);
        return error;
    });
}