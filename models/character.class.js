/**
 * Represents a character object.
 * @extends MovableObject
 */
class Character extends MovableObject {

    /**
     * The y-coordinate of the character.
     * @type {number}
     */
    y = 150;

    /**
     * The x-coordinate of the character.
     * @type {number}
     */
    x = -500;

    /**
     * The height of the character.
     * @type {number}
     */
    height = 300;

    /**
     * The width of the character.
     * @type {number}
     */
    width = 150;

    /**
     * The speed of the character.
     * @type {number}
     */
    speed = 10;

    /**
     * The energy of the character.
     * @type {number}
     */
    energy = 100;

    /**
     * The sound for walking.
     * @type {Audio}
     */
    walking_sound = new Audio('audio/running.mp3');

    /**
     * The sound for jumping.
     * @type {Audio}
     */
    jump_sound = new Audio('audio/jump.mp3');

    /**
     * The timestamp of the last key press.
     * @type {number}
     */
    lastKeyPress = Date.now();

    /**
     * Images for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    /**
     * Images for jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    /**
     * Images for dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Images for hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Images for idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    
    /**
     * Images for long idle animation.
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    
    /**
     * Creates an instance of Character.
     */
    constructor() {
        super();
        this.world = world;
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.applyGravity();
    }

    /**
     * Initiates character animation.
     */
    animate() {
        this.animateMovement();
        this.animateImages();
        this.animateIdle();
    }

    /**
     * Makes the character walk right.
     */
    walkRight() {
        this.moveRight();
        this.wakeUp();
        this.otherDirection = false;
        this.walking_sound.playbackRate = 3;
        world.playAudio(this.walking_sound);
    }
    
    /**
     * Makes the character walk left.
     */
    walkLeft() {
        this.moveLeft();
        this.wakeUp();
        this.otherDirection = true;
        world.playAudio(this.walking_sound);
    }

    /**
     * Makes the character jump upwards.
     */
    jumpUpwards() {
        this.jump();
        this.wakeUp();
        world.playAudio(this.jump_sound);
    }

    /**
     * Animates character movement.
     */
    animateMovement() {
        setInterval(() => {
            this.walking_sound.pause();
            if (world.keyboard.RIGHT && this.x < world.level.level_end_x) {
                this.walkRight();
            }
            if (world.keyboard.LEFT && this.x > -720) {
                this.walkLeft();
            } 
            if (world.keyboard.SPACE && !this.isAboveGround()) {
                this.jumpUpwards();
            }
            world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Animates character images.
     */
    animateImages() {
        let moveInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.stopGameAfterDying(moveInterval);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (world.keyboard.RIGHT && !this.isAboveGround() || world.keyboard.LEFT && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isAboveGround() ) {
                this.playAnimation(this.IMAGES_JUMPING); 
            }
        }, 50);  
    }

    /**
     * Animates character idle state.
     */
    animateIdle() {
        setInterval(() => {
            if (this.anyKeyPressed()) {
                this.lastKeyPressTime = Date.now();
            }
            if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime <= 10000)) {
                this.playAnimation(this.IMAGES_IDLE);
            } else if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime >= 10000)) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                world.playAudio(this.long_idle_sound);
            }
        }, 200);  
    }

    /**
     * Checks if any key is pressed.
     * @returns {boolean} - True if any key is pressed, otherwise false.
     */
    anyKeyPressed() {
        return world.keyboard.LEFT || world.keyboard.RIGHT || world.keyboard.UP || world.keyboard.DOWN || world.keyboard.SPACE || world.keyboard.D;
    }

    /**
     * Checks if no key is pressed.
     * @returns {boolean} - True if no key is pressed, otherwise false.
     */
    noKeyPressed() {
        let noKeyInputs = !world.keyboard.LEFT && !world.keyboard.RIGHT && !world.keyboard.UP && !world.keyboard.DOWN && !world.keyboard.SPACE && !world.keyboard.D;
        return noKeyInputs;
    }

    /**
     * Stops the game after the character dies.
     * @param {number} moveInterval - The interval for character movement.
     */
    stopGameAfterDying(moveInterval) {
        setTimeout(() => {
            clearInterval(moveInterval);
        }, 2000);
        world.gameOver = true;
    }
}
