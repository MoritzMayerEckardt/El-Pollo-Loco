/**
 * Represents the canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Represents the game world.
 * @type {World}
 */
let world;

/**
 * Represents the keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Represents the index of the current level.
 * @type {number}
 */
let i = 1;

/**
 * Initializes the game by setting up the canvas and background image.
 */
function init() {
    canvas = document.getElementById('canvas');
    canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_1.png")';
}

/**
 * Starts the game by initializing the level, world, and connecting them together.
 */
function startGame() {
    initLevel();
    setWorld();
    connectLevelToWorld();
    hideResponsiveScreen();
}

/**
 * Restarts the game when the player chooses to play again.
 */
function playAgain() {
    showCanvas();
    hideOtherScreens();
    init();
    startGame();
}

/**
 * Proceeds to the next level of the game.
 */
function nextLevel() {
    setNextLevel();
    initLevel();
    setWorld();
    connectLevelToWorld();
    increaseSpeedOfEnemies();
    showCanvas();
    hideOtherScreens();
}

/**
 * Handles the game loss scenario.
 */
function gameLost() {
    stopGame();
    closeFullscreen();
    hideCanvas();
    showYouLostScreen();
}

/**
 * Handles the game win scenario.
 */
function gameWon() {
    stopGame();
    closeFullscreen();
    hideCanvas();
    showYouWonScreen();
}

/**
 * Sets up the game world.
 */
function setWorld() {
    world = new World(canvas, keyboard);
}

/**
 * Connects the current level to the game world.
 */
function connectLevelToWorld() {
    world.level = window[`level${i}`];
}

/**
 * Initializes the current level.
 */
function initLevel() {
    window[`initLevel${i}`]();
}

/**
 * Sets the index for the next level.
 */
function setNextLevel() {
    if (i <= 3) {
        i++
    } else {
        i = 1;
    }
}

/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Reloads the start page of the game.
 */
function loadStartPage() {
    location.reload();
}

/**
 * Hides other screens and shows the canvas.
 */
function hideOtherScreens() {
    let gameOverContainer = document.getElementById('game-over');
    let youWonContainer = document.getElementById('you-won');
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    responsiveButtonsContainer.style.display = 'flex';
    gameOverContainer.classList.add('d-none');
    youWonContainer.classList.add('d-none');
    youWonContainer.classList.remove('flex');
}

/**
 * Hides the responsive screen.
 */
function hideResponsiveScreen() {
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    responsiveButtonsContainer.classList.remove('d-none');
    responsiveButtonsContainer.style.display = 'flex';
    let playButton = document.getElementById('play');
    playButton.classList.add('d-none');
}

/**
 * Shows the game canvas.
 */
function showCanvas() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
}

/**
 * Hides the game canvas.
 */
function hideCanvas() {
    canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
}

/**
 * Shows the game over screen.
 */
function showYouLostScreen() {
    let gameOverContainer = document.getElementById('game-over');
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    gameOverContainer.classList.remove('d-none');
    responsiveButtonsContainer.style.display = 'none';
}

/**
 * Shows the game won screen.
 */
function showYouWonScreen() {
    let gameOverContainer = document.getElementById('you-won');
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    gameOverContainer.classList.remove('d-none');
    gameOverContainer.classList.add('flex');
    responsiveButtonsContainer.style.display = 'none';
}

/**
 * Exits fullscreen mode if active.
 */
function closeFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

/**
 * Increases the speed of enemies in the game.
 * For chickens and small chickens, it increases their speed by 0.2 and triggers a jump.
 * For end bosses, it increases their speed by 5.
 */
function increaseSpeedOfEnemies() {
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.speed += 0.2;
            enemy.jump();
        } else if (enemy instanceof Endboss) {
            enemy.speed += 5;
        }
    });
}