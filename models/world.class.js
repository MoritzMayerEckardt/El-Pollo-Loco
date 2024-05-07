/**
 * Represents the game world.
 */
class World {
    /**
     * Canvas element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * Canvas context.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * Keyboard object.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * Character object.
     * @type {Character}
     */
    character = new Character();

    /**
     * Level object.
     * @type {Level}
     */
    level = level1;

    /**
     * Camera x-coordinate.
     * @type {number}
     */
    camera_x = 0;

    /**
     * Array of throwable objects.
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Current throwable object.
     * @type {ThrowableObject}
     */
    throwableObject;


    audioOn = JSON.parse(localStorage.getItem('audioOn'));


    /**
     * Indicates whether the game is over.
     * @type {boolean}
     */
    gameOver = false;

    /**
     * Indicates whether the game is won.
     * @type {boolean}
     */
    gameWon = false;

    /**
     * Indicates whether the character is hit.
     * @type {boolean}
     */
    isHit = false;

    /**
     * Indicates whether an object is being thrown.
     * @type {boolean}
     */
    isThrowing = false;

    /**
     * Indicates whether a bottle is bought.
     * @type {boolean}
     */
    isBought = false;

    /**
     * Indicates whether icons are shown.
     * @type {boolean}
     */
    showIcons = true;

    /**
     * Indicates whether fullscreen mode is on.
     * @type {boolean}
     */
    fullscreenOn = false;

    /**
     * Constructs a new World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard object.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setBoolean();
        this.setIcons();
        this.setStatusBars();
        this.setAudioObjects();
        this.draw();
        this.run();
        this.checkGameOver();
        this.checkDeadObjects();   
        this.playRandomSound();      
    }

    /**
     * Sets up status bars.
     */
    setStatusBars() {
        this.statusBarHealth = new StatusBarHealth();
        this.statusBarCoin = new StatusBarCoin();
        this.statusBarBottle = new StatusBarBottle();
        this.statusBarEndboss = new StatusBarEndboss();
    }

    /**
     * Sets up icons.
     */
    setIcons() {
        this.fullScreen = new FullScreen(this.canvas);
        this.audioHandler = new AudioHandler(this.canvas, this.audioOn);
    }

    /**
     * Sets up audio objects.
     */
    setAudioObjects() {
        this.coin_sound = new Audio('audio/coin.mp3');
        this.bottle_sound = new Audio('audio/bottle.mp3');
        this.random_sound = new Audio('audio/random.mp3');
        this.hurt_sound = new Audio('audio/ouch.mp3');
        this.chicken_dead_sound = new Audio('audio/chicken_dead.mp3');
        this.buy_bottle_sound = new Audio ('audio/buy_bottle.mp3');
        this.endboss_hurt_sound = new Audio ('audio/endboss_hurt.mp3');
    }

    /**
     * Initializes boolean variables.
     */
    setBoolean() {
        this.gameOver = false;
        this.gameWon = false;
        this.isHit = false;
        this.isThrowing = false;
        this.isBought = false;
        this.showIcons = true;
        this.fullscreenOn = false;
    }

    /**
     * Main game loop.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBuyBottles();
            this.checkCheats();
            this.checkLeavingFullscreen();
        }, 50);
    }

    /**
     * Plays audio if audio is on.
     * @param {Audio} audio - The audio object to play.
     */
    playAudio(audio) {
        if (this.audioOn) {
            audio.play();
        } else {
            audio.pause();
        }
    }
   
    /**
     * Checks for collisions between game objects.
     */
    checkCollisions() {
        this.enemyAndCharacterCollide();
        this.enemyAndBottleCollide();
        this.collectCoin();
        this.collectBottle();
    }

    /**
     * Checks for leaving fullscreen mode.
     */
    checkLeavingFullscreen() {
        if(!document.fullscreenElement) {
            this.fullscreenOn = false;
        } else if (document.fullscreenElement) {
            this.fullscreenOn = true;
        }
    }

    /**
     * Removes dead enemies.
     */
    checkDeadObjects() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isDead()) {
                    this.level.enemies.splice(index, 1)
                }
            });
        }, 7500);
    }

    /**
     * Checks for game over or game won conditions.
     */
    checkGameOver() {
        setInterval(() => {
            if(this.gameOver) {
                gameLost();
            } else if (this.gameWon) {
                gameWon();
            }
        }, 3000); 
    }

    /**
     * Checks for cheat codes.
     */
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
    
    /**
     * Sets the percentage of a status bar to the specified value.
     * @param {StatusBar} statusBar - The status bar object.
     * @param {number} value - The value to set the percentage to.
     */
    fullStatusBar(statusBar, value) {
        statusBar.percentage = value;
        statusBar.setPercentage(statusBar.percentage);
    }

    /**
     * Decreases the percentage of a status bar.
     * @param {StatusBar} statusBar - The status bar object.
     * @param {number} value - The value to decrease.
     */
    decreaseStatusBar(statusBar, value) {
        statusBar.percentage -= value;
        statusBar.setPercentage(statusBar.percentage);
    }

    /**
     * Increases the percentage of a status bar.
     * @param {StatusBar} statusBar - The status bar object.
     * @param {number} value - The value to increase.
     */
    increaseStatusBar(statusBar, value) {
        statusBar.percentage += value;
        statusBar.setPercentage(statusBar.percentage);
    }

    /**
     * Checks for buying bottles.
     */
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

    /**
     * Checks for throwing objects.
     */
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

    /**
     * Draws the game world.
     */
    draw() {
        this.drawBackGround();
        this.drawFixedObjects();
        this.drawMovingObjects();
        let self = this;                            
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    /**
     * Draws the background.
     */
    drawBackGround() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws fixed objects.
     */
    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
        if(!this.fullscreenOn && window.innerWidth >= 940) {
            this.addToMap(this.fullScreen);
            this.addToMap(this.audioHandler);
        }
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws moving objects.
     */
    drawMovingObjects() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds objects to the map.
     * @param {DrawableObject[]} objects - The objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the map.
     * @param {DrawableObject} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image.
     * @param {DrawableObject} mo - The object whose image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips an image back.
     * @param {DrawableObject} mo - The object whose image to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Collects bottles.
     */
    collectBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.playAudio(this.bottle_sound);
                this.increaseStatusBar(this.statusBarBottle, 20);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    /**
     * Collects coins.
     */
    collectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.playAudio(this.coin_sound);
                this.increaseStatusBar(this.statusBarCoin, 10);
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * Checks for collisions between enemies and throwable objects.
     */
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

    /**
     * Checks for collisions between the character and enemies.
     */
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

    /**
     * Handles character killing enemy.
     * @param {Enemy} enemy - The enemy that is killed.
     */
    characterKillsEnemy(enemy) {
        enemy.hit();
        this.playAudio(this.chicken_dead_sound);
        this.character.jump();
    }

    /**
     * Handles enemy hurting character.
     * @param {Enemy} enemy - The enemy that hurts the character.
     */
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

    /**
     * Plays a random sound at intervals.
     */
    playRandomSound() {
        setInterval(() => {
            this.playAudio(this.random_sound)
        }, 10000);   
    }
}
