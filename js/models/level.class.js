class Level{
    enemies;
    clouds;
    backgroundObject;
    coins;
    bottles;
    level_end_x = 720*5; // 3600
    youLost;
    youWon; 

    constructor(enemies, clouds, backgroundObject, bottles, coins, youLost, youWon){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.bottles = bottles;
        this.coins = coins;
        this.youLost = youLost;
        this.youWon = youWon;
    }
}