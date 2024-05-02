class Chicken extends MovableObject {
    
    x = 500 + Math.random() * 3000;
    y = 350;
    height = 100;
    width = 80;
    speed = 0.2 + Math.random() * 0.5;
    energy = 5;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate () {
        this.animateMovement();
        this.animateImages();
    }

    animateMovement() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 25);
    }

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