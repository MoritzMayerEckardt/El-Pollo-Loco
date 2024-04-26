class ThrowableObject extends MovableObject {

    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASHING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    throw_sound = new Audio('audio/throw.mp3');
   
    constructor(x, y) {
        super();
        this.world = world; 
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

    throw() {
        this.playThrowSound();
        this.wakeUp();
        this.speedY = 20;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            this.world.level.enemies.forEach(enemy => {
                if (this.isColliding(enemy) && (!enemy instanceof Endboss)) {
                    clearInterval(throwInterval);
                    this.y = enemy.y;
                } else if (this.y > 400) {
                    this.y = 400;
                }});   
            if (!this.world.character.otherDirection) {
                this.x += 20;
            } else {
                this.x -= 20;
            }
        }, 1000 / 25);
    }
    
    
    animate() {
        let splashInterval = setInterval(() => {
            if(this.checkHeight() < 321) {
                this.playAnimation(this.IMAGES_THROWING);
            } else {
                this.playAnimation(this.IMAGES_SPLASHING);
                setTimeout(() => {
                    clearInterval(splashInterval);
                }, 240);
                setTimeout(() => {
                    this.world.throwableObjects.splice(0, 1);
                }, 80);
            }
        }, 60); 
    }

    checkHeight() {
            return this.y;
    }

    playThrowSound() {
        this.throw_sound.play();
    }
}