/**
 * Represents a level in the game.
 */
class Level {
    /**
     * Array of enemy objects in the level.
     * @type {Array}
     */
    enemies;

    /**
     * Array of cloud objects in the level.
     * @type {Array}
     */
    clouds;

    /**
     * Array of background objects in the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * Array of coin objects in the level.
     * @type {Array}
     */
    coins;

    /**
     * Array of bottle objects in the level.
     * @type {Array}
     */
    bottles;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     */
    level_end_x = 719 * 5;

    /**
     * Creates a level object.
     * @param {Array} enemies - Array of enemy objects.
     * @param {Array} clouds - Array of cloud objects.
     * @param {Array} backgroundObjects - Array of background objects.
     * @param {Array} coins - Array of coin objects.
     * @param {Array} bottles - Array of bottle objects.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
