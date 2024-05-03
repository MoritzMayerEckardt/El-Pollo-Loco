/**
 * Represents a chicken object.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    
    /**
     * The x-coordinate of the chicken.
     * @type {number}
     */
    x = 500 + Math.random() * 3000;

    /**
     * The y-coordinate of the chicken.
     * @type {number}
     */
    y = 350;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 100;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 80;

    /**
     * The speed of the chicken.
     * @type {number}
     */
    speed = 0.2 + Math.random() * 0.5;

    /**
     * The energy of the chicken.
     * @type {number}
     */
    energy = 5;

    /**
     * Images for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    
    /**
     * Images for dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates an instance of Chicken.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * Initiates chicken animation.
     */
    animate () {
        this.animateMovement();
        this.animateImages();
    }

    /**
     * Animates chicken movement.
     */
    animateMovement() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 25);
    }

    /**
     * Animates chicken images.
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
