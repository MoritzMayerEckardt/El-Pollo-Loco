let canvas;
let world;
let keyboard = new Keyboard();
let i = 1;

function init() {
    canvas = document.getElementById('canvas');
    canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_1.png")';
}

function startGame() {
    window[`initLevel${i}`]();
    setWorld();
    world.level = window[`level${i}`];
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    responsiveButtonsContainer.classList.remove('d-none');
    responsiveButtonsContainer.style.display = 'flex';
    let playButton = document.getElementById('play');
    playButton.classList.add('d-none');
}

function setWorld() {
    world = new World(canvas, keyboard);
}

function nextLevel() {
    setNextLevel();
    window[`initLevel${i}`]();
    setWorld();
    world.level = window[`level${i}`];
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    let gameOverContainer = document.getElementById('game-over');
    let youWonContainer = document.getElementById('you-won');
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    responsiveButtonsContainer.style.display = 'flex';
    gameOverContainer.classList.add('d-none');
    youWonContainer.classList.add('d-none');
}

function setNextLevel() {
    if (i <= 3) {
        i++
    } else {
        i = 1;
    }
}

function gameLost() {
    stopGame();
    closeFullscreen();
    canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
    let gameOverContainer = document.getElementById('game-over');
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    gameOverContainer.classList.remove('d-none');
    responsiveButtonsContainer.style.display = 'none';
}

function gameWon() {
    stopGame();
    closeFullscreen();
    canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
    let gameOverContainer = document.getElementById('you-won');
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    gameOverContainer.classList.remove('d-none');
    responsiveButtonsContainer.style.display = 'none';
    gameOverContainer.style.filter = 'brightness(80%)';
}

function stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function loadStartPage() {
    location.reload();
}

function closeFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function playAgain() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    let gameOverContainer = document.getElementById('game-over');
    let youWonContainer = document.getElementById('you-won');
    let responsiveButtonsContainer = document.getElementById('responsive-buttons-container');
    responsiveButtonsContainer.style.display = 'flex';
    gameOverContainer.classList.add('d-none');
    youWonContainer.classList.add('d-none');
    init();
    startGame();
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 87) {
        keyboard.W = true;
    } 
    if (e.keyCode == 88) {
        keyboard.X = true;
    }
    if (e.keyCode == 89) {
        keyboard.Y = true;
    }
    if (e.keyCode == 27) {
        keyboard.ESC = true;
    }
}); 

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 87) {
        keyboard.W = false;
    }
    if (e.keyCode == 88) {
        keyboard.X = false;
    }
    if (e.keyCode == 89) {
        keyboard.Y = false;
    }
    if (e.keyCode == 27) {
        keyboard.ESC = false;
    }
});


function updateKeyState(key, state) {
    switch (key) {
        case 'left':
            keyboard.LEFT = state;
            break;
        case 'right':
            keyboard.RIGHT = state;
            break;
        case 'jump':
            keyboard.SPACE = state;
            break;
        case 'throw':
            keyboard.D = state;
            break;
        case 'buy':
            keyboard.W = state;
            break;

        default:
            break;
    }
}

document.getElementById('button-left').addEventListener('touchstart', function() {
    updateKeyState('left', true);
}, { passive: true });

document.getElementById('button-left').addEventListener('touchend', function() {
    updateKeyState('left', false);
}, { passive: true });

document.getElementById('button-right').addEventListener('touchstart', function() {
    updateKeyState('right', true);
}, { passive: true });

document.getElementById('button-right').addEventListener('touchend', function() {
    updateKeyState('right', false);
}, { passive: true });

document.getElementById('button-jump').addEventListener('touchstart', function() {
    updateKeyState('jump', true);
}, { passive: true });

document.getElementById('button-jump').addEventListener('touchend', function() {
    updateKeyState('jump', false);
}, { passive: true });

document.getElementById('button-throw').addEventListener('touchstart', function() {
    updateKeyState('throw', true);
}, { passive: true });

document.getElementById('button-throw').addEventListener('touchend', function() {
    updateKeyState('throw', false);
}, { passive: true });

document.getElementById('button-buy-bottle').addEventListener('touchstart', function() {
    updateKeyState('buy', true);
}, { passive: true });

document.getElementById('button-buy-bottle').addEventListener('touchend', function() {
    updateKeyState('buy', false);
}, { passive: true });





