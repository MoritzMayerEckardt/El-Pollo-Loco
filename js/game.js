let canvas;
let world;
let keyboard = new Keyboard();
let fullScreenIsOpen = false;

function init() {
    canvas = document.getElementById('canvas');
    canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_1.png")';
}

async function startGame() {
    await initLevel1();
    world = new World(canvas, keyboard);
    let playButton = document.getElementById('play');
    playButton.classList.add('d-none');
}

function gameLost() {
    stopGame();
    canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
    let gameOverContainer = document.getElementById('game-over');
    let gameOverImage = document.getElementById('img-game-over');
    gameOverContainer.classList.remove('d-none');
    gameOverImage.setAttribute("src", "img/9_intro_outro_screens/game_over/you lost.png");
}

function gameWon() {
    stopGame();
    canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
    let gameOverContainer = document.getElementById('game-over');
    let gameOverImage = document.getElementById('img-game-over');
    gameOverContainer.classList.remove('d-none');
    gameOverImage.setAttribute("src", "img/9_intro_outro_screens/game_over/you lost.png");
}

function stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function loadStartPage() {
    location.reload();
}

function playAgain() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    let gameOverContainer = document.getElementById('game-over');
    gameOverContainer.classList.add('d-none');
    init();
    startGame();
}

function playFullscreen() {
    if(!fullScreenIsOpen) {
        let content = document.getElementById('content');
        enterFullscreen(content);
        fullScreenIsOpen = true;
    } else {
        exitFullscreen()
        fullScreenIsOpen = false;
    }
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
});

function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}
