var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    scene: {
        preload: preload,
        create: create,
        update: update // This must be defined
    }
};

var game = new Phaser.Game(config);

var score = 0;
var scoreText;
var timerText;
var gameOver = false;
var gameTime = 30; // Game duration in seconds

function preload() {
    this.load.image('star', '/assets/star.png'); // Load the star image
}

function create() {
    // Display score
    scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '24px', fill: '#fff' });

    // Display timer
    timerText = this.add.text(650, 20, `Time: ${gameTime}`, { fontSize: '24px', fill: '#fff' });

    // Create the star and make it interactive
    var star = this.add.image(400, 300, 'star').setInteractive();

    // Click event: move star and update score
    star.on('pointerdown', function () {
        if (!gameOver) {
            score += 1;
            scoreText.setText('Score: ' + score);

            // Move star to a random position
            var newX = Phaser.Math.Between(50, 750);
            var newY = Phaser.Math.Between(50, 550);
            star.setPosition(newX, newY);
        }
    });

    // Start game countdown timer
    this.time.addEvent({
        delay: 1000,
        callback: updateTimer,
        callbackScope: this,
        loop: true
    });
}

// ✅ Add the missing update function
function update() {
    if (gameOver) return;
    // You can add animations or game logic here if needed
}

function updateTimer() {
    if (gameTime > 0) {
        gameTime -= 1;
        timerText.setText(`Time: ${gameTime}`);
    } else {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    timerText.setText('Time: 0');
    this.add.text(300, 250, 'Game Over!', { fontSize: '32px', fill: '#ff0000' });

    // Send score to server
    sendScoreToServer("Player1", score);
}

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