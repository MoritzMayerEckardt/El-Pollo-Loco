let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let fullScreenIsOpen = false;

async function init() {
    canvas = document.getElementById('canvas');
    canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_1.png")';
}

async function startGame() {
    await initLevel1();
    world = new World(canvas, keyboard);
    let playButton = document.getElementById('play');
    playButton.classList.add('d-none');
}

function stopGame() {
    intervalIds.forEach(clearInterval);
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
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
