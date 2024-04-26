class World {
    canvas;
    ctx;
    keyboard;
    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new statusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    level = level1;
    camera_x = 0;
    throwableObjects = [];
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    random_sound = new Audio('audio/random.mp3');
    hurt_sound = new Audio('audio/ouch.mp3');
    chicken_dead_sound = new Audio('audio/chicken_dead.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.isThrowing = false;
        this.throwableObject = null;
        this.draw();
        this.setWorld();
        this.run();                 
    }

    playRandomSound() {
        setInterval(() => {
            this.random_sound.play();
        }, 10000);   
    }

    setWorld() {
        this.character.world = this;                // damit kann ich in Character auf die Variablen aus world zugreifen
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 50);
    }

    checkThrowObjects() {
        if(this.keyboard.D && this.statusBarBottle.percentage > 0 && !this.isThrowing) {
            if(!this.character.otherDirection) {
                this.throwableObject = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            } else {
                this.throwableObject = new ThrowableObject(this.character.x, this.character.y + 100);
            }
            this.throwableObjects.push(this.throwableObject);
            this.statusBarBottle.percentage -= 20;
            this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
            this.isThrowing = true;
            setTimeout(() => {
                this.isThrowing = false;
            }, 1000);
        }
    }
    

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isCollidingFromSide(enemy)) {
                this.character.hit();
                this.hurt_sound.play();
                this.character.isHurt();
                this.statusBarHealth.setPercentage(this.character.energy);
            } else if (this.character.isCollidingFromTop(enemy) && enemy instanceof Chicken || this.character.isCollidingFromTop(enemy) && enemy instanceof SmallChicken) {
                enemy.hit();
                this.chicken_dead_sound.play();
                this.character.jump();
                setTimeout(() => {
                    this.level.enemies.splice(index, 1)
                }, 500);
            }
        });
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy, index) => {
                if (bottle.isCollidingFromTop(enemy) && enemy instanceof Chicken || bottle.isCollidingFromTop(enemy) && enemy instanceof SmallChicken || bottle.isCollidingFromSide(enemy) && enemy instanceof Endboss) {
                    enemy.hit();
                    console.log('energy of enemy is', enemy.energy)
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1)
                    }, 500);  
                }
            });
        });
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.play();
                this.statusBarCoin.collectCoins();
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentage);
                this.level.coins.splice(index, 1);
            }
        });
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottle_sound.play();
                this.statusBarBottle.collectBottles();
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // -------------------- space for fixed objects ------------------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;                            
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.drawFrame(this.ctx);
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);        // verschiebt das Objekt um die Breite des jeweiligen Elements
        this.ctx.scale(-1, 1);                  // spiegelt das Objekt an der y-Achse
        mo.x = mo.x * -1;                       // dreht die Richtung der x-Achse um 180 Grad
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}