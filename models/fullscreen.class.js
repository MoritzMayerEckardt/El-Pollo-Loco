/**
 * Represents a full-screen button.
 */
class FullScreen extends MovableObject {
    
    /**
     * The width of the full-screen button.
     * @type {number}
     */
    width = 20;

    /**
     * The height of the full-screen button.
     * @type {number}
     */
    height = 20;

    /**
     * The y-coordinate of the full-screen button.
     * @type {number}
     */
    y = 30;

    /**
     * The x-coordinate of the full-screen button.
     * @type {number}
     */
    x = 240;

    /**
     * The canvas element associated with the full-screen button.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * Creates an instance of FullScreen.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage('img/fullscreen.svg');
        this.world = world;
        this.canvas.addEventListener('click', () => this.handleClick());
    }

    /**
     * Checks if the mouse is over the full-screen button.
     * @param {number} mouseX - The x-coordinate of the mouse.
     * @param {number} mouseY - The y-coordinate of the mouse.
     * @returns {boolean} - True if the mouse is over the button, otherwise false.
     */
    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    /**
     * Handles click event on the full-screen button.
     */
    handleClick() {
        if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
            this.canvas.requestFullscreen();
            world.fullscreenOn = true;
        }
    }
}
