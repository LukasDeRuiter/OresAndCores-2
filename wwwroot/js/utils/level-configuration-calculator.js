export class LevelConfigurationCalculator {
    constructor(scene, levelConfiguration) {
        this.scene = scene;
        this.levelConfiguration = levelConfiguration;
    }

    calculateEnemiesToSpawn() {
        const enemyCount = this.levelConfiguration.amount ? this.levelConfiguration.amount : 10;

        const levelEnemyTypes = this.levelConfiguration.enemies;

        const enemiesToSpawn = [];
        let totalAssigned = 0; 

        for (let i = 0; i < levelEnemyTypes.length; i++) {
            const enemy = levelEnemyTypes[i];
            const count = Math.floor((enemy.percentage / 100 * enemyCount));
            enemiesToSpawn.push({ id: enemy.entityId, count});
            totalAssigned += count;
        }

        let remaining = enemyCount - totalAssigned;
        while (remaining > 0) {
            for (let i = 0; i < enemiesToSpawn.length && remaining > 0; i++) {
                enemiesToSpawn[i] += 1;
                remaining--;
            }
        }

        return enemiesToSpawn;
    }

    calculateObjectsToSpawn() {
        const enemyCount = this.levelConfiguration.amount ? this.levelConfiguration.amount : 10;

        const levelEnemyTypes = this.levelConfiguration.enemies;

        const enemiesToSpawn = [];
        let totalAssigned = 0; 

        for (let i = 0; i < levelEnemyTypes.length; i++) {
            const enemy = levelEnemyTypes[i];
            const count = Math.floor((enemy.percentage / 100 * enemyCount));
            enemiesToSpawn.push({ id: enemy.entityId, count});
            totalAssigned += count;
        }

        let remaining = enemyCount - totalAssigned;
        while (remaining > 0) {
            for (let i = 0; i < enemiesToSpawn.length && remaining > 0; i++) {
                enemiesToSpawn[i] += 1;
                remaining--;
            }
        }

        return enemiesToSpawn;
    }
}