class World {
    canvas;
    ctx;
    keyboard;
    character = new Character();
    level = level1;
    camera_x = 0;
    throwableObjects = [];
    throwableObject;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setIcons();
        this.setStatusBars();
        this.setAudioObjects();
        this.setBoolean();
        this.draw();
        this.run();
        this.checkGameOver();
        this.checkDeadObjects();   
        this.playRandomSound();      
    }

    setStatusBars() {
        this.statusBarHealth = new StatusBarHealth();
        this.statusBarCoin = new statusBarCoin();
        this.statusBarBottle = new StatusBarBottle();
        this.statusBarEndboss = new StatusBarEndboss();
    }

    setIcons() {
        this.fullScreen = new FullScreen(this.canvas);
        this.audioHandler = new AudioHandler(this.canvas);
    }

    setAudioObjects() {
        this.coin_sound = new Audio('audio/coin.mp3');
        this.bottle_sound = new Audio('audio/bottle.mp3');
        this.random_sound = new Audio('audio/random.mp3');
        this.hurt_sound = new Audio('audio/ouch.mp3');
        this.chicken_dead_sound = new Audio('audio/chicken_dead.mp3');
        this.buy_bottle_sound = new Audio ('audio/buy_bottle.mp3');
        this.endboss_hurt_sound = new Audio ('audio/endboss_hurt.mp3');
    }

    setBoolean() {
        this.gameOver = false;
        this.gameWon = false;
        this.isHit = false;
        this.isThrowing = false;
        this.isBought = false;
        this.showIcons = true;
        this.audioOn = true; 
        this.fullscreenOn = false;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBuyBottles();
            this.checkCheats();
            this.checkLeavingFullscreen();
        }, 50);
    }

    playAudio(audio) {
        if (this.audioOn) {
            audio.play();
        } else {
            audio.pause();
        }
    }
   
    checkCollisions() {
        this.enemyAndCharacterCollide();
        this.enemyAndBottleCollide();
        this.collectCoin();
        this.collectBottle();
    }

    checkLeavingFullscreen() {
        if(!document.fullscreenElement) {
            this.fullscreenOn = false;
        } else if (document.fullscreenElement) {
            this.fullscreenOn = true;
        }
    }

    checkDeadObjects() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isDead()) {
                    this.level.enemies.splice(index, 1)
                }
            });
        }, 7500);
    }

    checkGameOver() {
        setInterval(() => {
            if(this.gameOver) {
                gameLost();
            } else if (this.gameWon) {
                gameWon();
            }
        }, 3000); 
    }

    checkCheats() {
        if(this.keyboard.X && this.keyboard.Y) {
            this.playAudio(this.coin_sound);
            this.fullStatusBar(this.statusBarCoin, 100);
        }
        if (this.keyboard.X && this.keyboard.Y && this.keyboard.W) {
            this.level.enemies.forEach(function(enemy) {
                enemy.hit();
            });
        }
    }       
    
    fullStatusBar(statusBar, value) {
        statusBar.percentage = value;
        statusBar.setPercentage(statusBar.percentage);
    }

    decreaseStatusBar(statusBar, value) {
        statusBar.percentage -= value;
        statusBar.setPercentage(statusBar.percentage);
    }

    increaseStatusBar(statusBar, value) {
        statusBar.percentage += value;
        statusBar.setPercentage(statusBar.percentage);
    }

    checkBuyBottles() {
        if(this.keyboard.W && this.statusBarCoin.percentage >= 50 && !this.isBought) {
            this.playAudio(this.buy_bottle_sound);
            this.decreaseStatusBar(this.statusBarCoin, 50);
            this.increaseStatusBar(this.statusBarBottle, 20);
            this.isBought = true;
            setTimeout(() => {
                this.isBought = false;
            }, 1000);
        }
    }

    checkThrowObjects() {
        if(this.keyboard.D && this.statusBarBottle.percentage > 0 && !this.isThrowing) {
            if(!this.character.otherDirection) {
                this.throwableObject = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            } else {
                this.throwableObject = new ThrowableObject(this.character.x, this.character.y + 100);
            }
            this.throwableObjects.push(this.throwableObject);
            this.decreaseStatusBar(this.statusBarBottle, 20);
            this.isThrowing = true;
            setTimeout(() => {
                this.isThrowing = false;
            }, 1000);
        }
    }

    draw() {
        this.drawBackGround();
        this.drawFixedObjects();
        this.drawMovingObjects();
        let self = this;                            
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    drawBackGround() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
        if(!this.fullscreenOn && window.innerWidth >= 1000) {
            this.addToMap(this.fullScreen);
            this.addToMap(this.audioHandler);
        }
        this.ctx.translate(this.camera_x, 0);
    }

    drawMovingObjects() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
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

    collectBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.playAudio(this.bottle_sound);
                this.increaseStatusBar(this.statusBarBottle, 20);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    collectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.playAudio(this.coin_sound);
                this.increaseStatusBar(this.statusBarCoin, 10);
                this.level.coins.splice(index, 1);
            }
        });
    }

    enemyAndBottleCollide() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && enemy instanceof Chicken || bottle.isColliding(enemy) && enemy instanceof SmallChicken) {
                    enemy.hit(); 
                } else if (bottle.isCollidingFromSide(enemy) && enemy instanceof Endboss) {
                    this.playAudio(this.endboss_hurt_sound);
                    enemy.hit();
                    this.statusBarEndboss.percentage = enemy.energy * 0.5;
                    this.statusBarEndboss.setPercentage(this.statusBarEndboss.percentage);
                }
            });
        });
    }

    enemyAndCharacterCollide() {
        this.level.enemies.forEach((enemy) => {
            let enemyIsAlive = enemy.energy >= 5;
            if (this.character.isCollidingFromSide(enemy) && enemyIsAlive && !this.isHit) {
                this.enemyHurtsCharacter(enemy);
            } else if (this.character.isCollidingFromTop(enemy) && enemyIsAlive && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                this.characterKillsEnemy(enemy);
            }
        });
    }

    characterKillsEnemy(enemy) {
            enemy.hit();
            this.playAudio(this.chicken_dead_sound);
            this.character.jump();
    }

    enemyHurtsCharacter(enemy) {
        this.playAudio(this.hurt_sound);
        this.character.isHurt();
        if (enemy instanceof Endboss) {
            this.character.bigHit();
        } else {
            this.character.hit();
        }
        this.statusBarHealth.setPercentage(this.character.energy);
        this.isHit = true;
        setTimeout(() => {
            this.isHit = false;
        }, 500);
    }

    playRandomSound() {
        setInterval(() => {
            this.playAudio(this.random_sound)
        }, 10000);   
    }
}