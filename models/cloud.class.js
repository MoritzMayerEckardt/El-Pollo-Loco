/**
 * Represents a cloud object.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    
    /**
     * The y-coordinate of the cloud.
     * @type {number}
     */
    y = 50;

    /**
     * The x-coordinate of the cloud.
     * @type {number}
     */
    x = Math.random() * 3500;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 200;

    /**
     * Creates an instance of Cloud.
     */
    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');   
        this.animate();
    }

    /**
     * Initiates cloud animation.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
