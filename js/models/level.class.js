class Level{
    
    enemies;
    clouds;
    backgroundObject;
    coins;
    bottles;
    level_end_x = 720*5; // 3600

    constructor(enemies, clouds, backgroundObject, bottles, coins){
        
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.bottles = bottles;
        this.coins = coins;
    }
}