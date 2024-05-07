/**
 * Represents an end boss character.
 */
class Endboss extends MovableObject {

    /**
     * The height of the end boss character.
     * @type {number}
     */
    height = 400;

    /**
     * The width of the end boss character.
     * @type {number}
     */
    width = 250;

    /**
     * The y-coordinate of the end boss character.
     * @type {number}
     */
    y = 60;

    /**
     * The x-coordinate of the end boss character.
     * @type {number}
     */
    x = 3500;

    /**
     * The energy level of the end boss character.
     * @type {number}
     */
    energy = 200;

    /**
     * The speed of the end boss character.
     * @type {number}
     */
    speed = 40;

    /**
     * Images for the alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',    
    ];

    /**
     * Images for the attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    /**
     * Images for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    /**
     * Images for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Images for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Audio for the chicken sound.
     * @type {HTMLAudioElement}
     */
    chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * Constructs a new Endboss object.
     */
    constructor() {
        super();
        this.world = world; 
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
    }

    /**
     * Initiates the animation loop.
     */
    animate() {
        let endbossInterval = setInterval(() => {
            if (this.energy == 0) {
                this.achieveVictory(endbossInterval);
            } else if(this.isHurt() && this.energy >= 120) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.energy <= 140) {
                this.walkLeft();
                this.speed += 0.5;
            } else if(this.energy <= 160) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else {
                this.inAlert();
            }
        }, 200); 
    }

    /**
     * Stops the game after achieving victory.
     * @param {number} endbossInterval - The interval identifier.
     */
    stopGameAfterVictory(endbossInterval) {
        setTimeout(() => {
            clearInterval(endbossInterval);
        }, 1000);
        world.gameWon = true;
    }

    /**
     * Moves the end boss character left.
     */
    walkLeft() {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft(); 
    }

    /**
     * Executes the alert animation.
     */
    inAlert() {
        this.playAnimation(this.IMAGES_ALERT);
        world.playAudio(this.chicken_sound);
    }

    /**
     * Initiates victory animation.
     * @param {number} endbossInterval - The interval identifier.
     */
    achieveVictory(endbossInterval) {
        this.playAnimation(this.IMAGES_DEAD);
        this.stopGameAfterVictory(endbossInterval);
    }
}
