/**
 * Represents a status bar bottle object.
 */
class StatusBarBottle extends DrawableObject {
    /**
     * Array of paths to images representing the status bar bottle at different fill levels.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
     * The percentage of the status bar bottle filled.
     * @type {number}
     */
    percentage = 0;

    /**
     * Constructs a new StatusBarBottle object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES)
        this.x = 20;
        this.y = 80;
        this.width = 200;
        this.height = 60; 
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the status bar bottle filled.
     * @param {number} percentage - The percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage.
     * @returns {number} The index of the image.
     */
    resolveImageIndex() {
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        if(this.percentage == 100) {
            return 5; 
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
