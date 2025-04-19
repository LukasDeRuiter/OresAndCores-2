import { CrawlerEnemy } from "../entities/enemies/CrawlerEnemy.js";
import { StandardEnemy } from "../entities/enemies/StandardEnemy.js";

export class EnemyParser {
    constructor(scene, data) {
        this.scene = scene;
        this.data = data;
    }

    generateEnemyPosition() {
        let x, y;
        const minDistanceFromPlayer = 50;
        const borderPadding = 16;
        let tries = 0;
        const maxTries = 100;
        
        do {
            x = Phaser.Math.Between(borderPadding, this.scene.physics.world.bounds.width - borderPadding);
            y = Phaser.Math.Between(borderPadding, this.scene.physics.world.bounds.height - borderPadding);
            tries++;
        } while (
            Phaser.Math.Distance.Between(x, y, this.scene.player.x, this.scene.player.y) < minDistanceFromPlayer &&
            tries < maxTries
        );
        
        return { x, y };    
    }

    parseEnemy(enemyData) {

        let enemyPosition = this.generateEnemyPosition();

        let enemy;

        if (enemyData.enemyType === 'crawler') {
            enemy = new CrawlerEnemy(this.scene, enemyPosition.x, enemyPosition.y, enemyData.name, enemyData.name, enemyData.health, enemyData.speed, enemyData.items);
        } else {
            enemy = new StandardEnemy(this.scene, enemyPosition.x, enemyPosition.y, enemyData.name, enemyData.name, enemyData.health, enemyData.speed, enemyData.items);
        }

        this.scene.enemies.add(enemy);
    }
}