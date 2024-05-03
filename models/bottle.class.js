/**
 * Class representing a bottle object.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /**
     * Y-coordinate of the bottle.
     * @type {number}
     */
    y = 380;

    /**
     * Randomized X-coordinate of the bottle within a range.
     * @type {number}
     */
    x = 500 + Math.random() * 3000;

    /**
     * Width of the bottle.
     * @type {number}
     */
    width = 60;

    /**
     * Height of the bottle.
     * @type {number}
     */
    height = 70;

    /**
     * Array of image paths for bottle animation.
     * @type {string[]}
     */
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Constructs a new instance of Bottle.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Initiates animation of the bottle.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }
}
