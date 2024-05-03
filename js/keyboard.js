/**
 * Updates the keyboard state based on keydown events.
 * @param {KeyboardEvent} e - The keydown event object.
 */
window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39:
            keyboard.RIGHT = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
        case 68:
            keyboard.D = true;
            break;
        case 87:
            keyboard.W = true;
            break;
        case 88:
            keyboard.X = true;
            break;
        case 89:
            keyboard.Y = true;
            break;
        case 27:
            keyboard.ESC = true;
            break;
    }
}); 

/**
 * Updates the keyboard state based on keyup events.
 * @param {KeyboardEvent} e - The keyup event object.
 */
window.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 39:
            keyboard.RIGHT = false;
            break;
        case 37:
            keyboard.LEFT = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
        case 68:
            keyboard.D = false;
            break;
        case 87:
            keyboard.W = false;
            break;
        case 88:
            keyboard.X = false;
            break;
        case 89:
            keyboard.Y = false;
            break;
        case 27:
            keyboard.ESC = false;
            break;
    }
});

/**
 * Updates the state of a specific key based on a touch event.
 * @param {string} key - The key to update.
 * @param {boolean} state - The state to set for the key.
 */
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

// Event listeners for touch events on virtual buttons
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
