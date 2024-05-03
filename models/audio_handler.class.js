/**
 * Class representing an audio control button.
 * @extends MovableObject
 */
class AudioHandler extends MovableObject {
    /**
     * Width of the audio control button.
     * @type {number}
     */
    width = 20;

    /**
     * Height of the audio control button.
     * @type {number}
     */
    height = 20;

    /**
     * Y coordinate of the audio control button.
     * @type {number}
     */
    y = 70;

    /**
     * X coordinate of the audio control button.
     * @type {number}
     */
    x = 240;

    /**
     * Reference to the canvas element.
     * @type {HTMLElement}
     */
    canvas;

    /**
     * Image path for when audio is on.
     * @type {string}
     */
    audioOnImage = 'img/audio_on.svg';

    /**
     * Image path for when audio is off.
     * @type {string}
     */
    audioOffImage = 'img/audio_off.svg';

    /**
     * Constructs a new instance of AudioHandler.
     */
    constructor() {
        super();
        this.canvas = canvas;
        this.loadImage('img/audio_on.svg');
        this.canvas.addEventListener('click', () => this.handleClick());
    }

    /**
     * Checks if the mouse is over the audio control button.
     * @param {number} mouseX - The x-coordinate of the mouse.
     * @param {number} mouseY - The y-coordinate of the mouse.
     * @returns {boolean} - True if the mouse is over the button, false otherwise.
     */
    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    /**
     * Handles click event on the audio control button.
     */
    handleClick() {
        if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
            this.turnOnAndOffAudio();
        }
    }

    /**
     * Toggles the audio on and off.
     */
    turnOnAndOffAudio() {
        if (world.audioOn) {
            world.audioOn = false;
            this.loadImage(this.audioOffImage);
        } else {
            world.audioOn = true;
            this.loadImage(this.audioOnImage);
        }
    }
}
