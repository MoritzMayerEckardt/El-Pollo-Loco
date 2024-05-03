/**
 * Represents a movable object in the game.
 */
class MovableObject extends DrawableObject {
    /**
     * The speed of the movable object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Indicates whether the object is moving in the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The acceleration of the object.
     * @type {number}
     */
    acceleration = 2.5;

    /**
     * The energy of the object.
     * @type {number}
     */
    energy;

    /**
     * The timestamp of the last hit.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The sound played when in long idle state.
     * @type {HTMLAudioElement}
     */
    long_idle_sound = new Audio('audio/long_idle.mp3');

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 400;
        } else {
            return this.y < 150;
        }
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    /**
     * Checks if the object is colliding from the side with another object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding from the side, otherwise false.
     */
    isCollidingFromSide(mo) {
        let isCollidingFromLeft = this.x + this.width - 10 >= mo.x &&
            this.x + this.width - 10 <= mo.x + mo.width &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y;
        let isCollidingFromRight = this.x + 10 <= mo.x + mo.width &&
            this.x + 10 >= mo.x &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y;
        return isCollidingFromLeft || isCollidingFromRight;
    }

    /**
     * Checks if the object is colliding from the top with another object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding from the top, otherwise false.
     */
    isCollidingFromTop(mo) {
        let isCollidingFromTop = this.y + this.height >= mo.y &&
            this.y + this.height <= mo.y + mo.height &&
            this.x + 50 < mo.x + mo.width &&
            this.x + this.width - 50 > mo.x;
        return isCollidingFromTop;
    }

    /**
     * Handles when the object gets hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Handles when the object gets a big hit.
     */
    bigHit() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks if the object is alive.
     * @returns {boolean} True if the object is alive, otherwise false.
     */
    isAlive() {
        return this.energy >= 5;
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if the object is hurt, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Plays the animation for the object.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Stops the long idle sound of the object.
     */
    wakeUp() {
        this.long_idle_sound.pause();
    }
}
