/**
 * Represents a game level with its objects, enemies, collectibles, and end screens.
 */
class Level {
  enemies;
  clouds;
  backgroundObject;
  coins;
  bottles;
  level_end_x = 720 * 5; // 3600
  youLost;
  youWon;

    /**
   * Creates a new level instance with all its objects, enemies, and end screens.
   * 
   * @param {Array<MovableObject>} enemies - List of enemies in the level.
   * @param {Array<DrawableObject>} clouds - List of clouds in the level.
   * @param {Array<DrawableObject>} backgroundObject - List of background objects.
   * @param {Array<DrawableObject>} bottles - List of collectible bottles.
   * @param {Array<DrawableObject>} coins - List of collectible coins.
   * @param {YouLost} youLost - The "You Lost" screen object for this level.
   * @param {YouWon} youWon - The "You Won" screen object for this level.
   */
  constructor(
    enemies,
    clouds,
    backgroundObject,
    bottles,
    coins,
    youLost,
    youWon
  ) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.bottles = bottles;
    this.coins = coins;
    this.youLost = youLost;
    this.youWon = youWon;
  }
}
