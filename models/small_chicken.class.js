/**
 * Represents a small chicken enemy in the game.
 */
class SmallChicken extends MovableObject {
    /**
     * The x-coordinate of the small chicken.
     * @type {number}
     */
    x = 500 + Math.random() * 3000;

    /**
     * The y-coordinate of the small chicken.
     * @type {number}
     */
    y = 400;

    /**
     * The height of the small chicken.
     * @type {number}
     */
    height = 50;

    /**
     * The width of the small chicken.
     * @type {number}
     */
    width = 40;

    /**
     * The speed of the small chicken.
     * @type {number}
     */
    speed = 0.7 + Math.random() * 2;

    /**
     * The energy of the small chicken.
     * @type {number}
     */
    energy = 5;

    /**
     * Array of paths to walking images of the small chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /**
     * Array of paths to dead images of the small chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Constructs a new SmallChicken object.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * Animates the small chicken.
     */
    animate () {
        this.animateMovement();
        this.animateImages();
    }

    /**
     * Animates the movement of the small chicken.
     */
    animateMovement() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 25);
    }

    /**
     * Animates the images of the small chicken.
     */
    animateImages() {
        setInterval(() => {
            if (this.isAlive()) {
            this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200); 
    }
}
