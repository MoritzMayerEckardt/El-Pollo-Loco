/**
 * Represents a coin object.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    
    /**
     * The y-coordinate of the coin.
     * @type {number}
     */
    y = 250 - Math.random() * 250;

    /**
     * The x-coordinate of the coin.
     * @type {number}
     */
    x = 500 + Math.random() * 3000;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 150;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 150;

    /**
     * The images of the coin for animation.
     * @type {string[]}
     */
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Creates an instance of Coin.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Initiates coin animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }
}
