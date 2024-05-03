/**
 * Represents a throwable object.
 */
class ThrowableObject extends MovableObject {
    /**
     * Array of paths to images representing the throwing animation.
     * @type {string[]}
     */
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * Array of paths to images representing the splashing animation.
     * @type {string[]}
     */
    IMAGES_SPLASHING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Audio for throwing sound.
     * @type {Audio}
     */
    throw_sound = new Audio('audio/throw.mp3');
   
    /**
     * Constructs a new ThrowableObject.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_THROWING[3]);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.animate();
        this.throw();
    }

    /**
     * Throws the object.
     */
    throw() {
        world.playAudio(this.throw_sound);
        this.wakeUp();
        this.throwUpwards();
        this.applyGravity();
        this.playThrowInterval();
    }

    /**
     * Plays the throw animation.
     */
    animate() {
        let throwInterval = setInterval(() => {
            if(this.isFlying()) {
                this.playAnimation(this.IMAGES_THROWING);
            } else {
                this.playAnimation(this.IMAGES_SPLASHING);
                setTimeout(() => {
                    clearInterval(throwInterval);
                }, 240);
                setTimeout(() => {
                    world.throwableObjects.splice(0, 1);
                }, 80);
            }
        }, 60); 
    }

    /**
     * Checks if the object is flying.
     * @returns {boolean} True if flying, false otherwise.
     */
    isFlying() {
        return this.y < 321;
    }

    /**
     * Throws the object upwards.
     */
    throwUpwards() {
        this.speedY = 20;
    }

    /**
     * Plays the throw interval.
     */
    playThrowInterval() {
        let throwDirection = world.character.otherDirection ? -1 : 1;
        let throwInterval = setInterval(() => {
            world.level.enemies.forEach(enemy => {
                if (this.isColliding(enemy) && !(enemy instanceof Endboss)) {
                    clearInterval(throwInterval);
                    this.y = enemy.y;
                } else if (this.y > 400) {
                    this.y = 400;
                }
            });
            this.x += 20 * throwDirection;
        }, 1000 / 25);
    }
}
