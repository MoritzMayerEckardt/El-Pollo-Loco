/**
 * Represents a drawable object.
 */
class DrawableObject {
    
    /**
     * The x-coordinate of the drawable object.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the drawable object.
     * @type {number}
     */
    y = 200;

    /**
     * The height of the drawable object.
     * @type {number}
     */
    height = 150;

    /**
     * The width of the drawable object.
     * @type {number}
     */
    width = 100;

    /**
     * The image of the drawable object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for images.
     * @type {Object}
     */
    imageCache = {};

    /**
     * Index of the current image.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Loads a single image.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();                
        this.img.src = path;
    }

    /**
     * Loads multiple images.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    } 
}
