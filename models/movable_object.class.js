class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy;
    lastHit = 0;
    long_idle_sound = new Audio('audio/long_idle.mp3');

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {      // Throwable Object should always fall
            return this.y < 400;
        } else {
            return this.y < 150;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&    
            this.y + this.height > mo.y &&      
            this.x < mo.x &&                    
            this.y < mo.y + mo.height           
    }

    isCollidingFromSide(mo) {
        return (this.x + this.width >= mo.x && this.x + this.width <= mo.x + mo.width && this.y < mo.y + mo.height && this.y + this.height > mo.y) ||
        (this.x <= mo.x + mo.width && this.x >= mo.x && this.y < mo.y + mo.height && this.y + this.height > mo.y);
    }

    isCollidingFromTop(mo) {
        return this.y + this.height >= mo.y && this.y + this.height <= mo.y + mo.height && this.x < mo.x + mo.width && this.x + this.width > mo.x;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    bigHit() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;   // difference in ms
        timePassed = timePassed / 1000                          // difference in s
        return timePassed < 1;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    wakeUp() {
        this.long_idle_sound.pause();
    }
}