var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    backgroundColor: "black",
    scene: 
        SceneMain
    ,
    parent: "gameContainer",
    pixelArt: true,
    roundedPixels: true,
};

var game = new Phaser.Game(config);

function sendScoreToServer(playerName, score) {
    fetch('/api/game/SaveScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerName: playerName, score: score })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}