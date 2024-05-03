/**
 * Represents a status bar for the end boss.
 */
class StatusBarEndboss extends DrawableObject {
    /**
     * Array of paths to images representing the status bar at different fill levels.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    /**
     * The percentage of the status bar filled.
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructs a new StatusBarEndboss object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES)
        this.x = 500;
        this.y = 5;
        this.width = 200;
        this.height = 60; 
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar filled.
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
        if(this.percentage == 100) {
            return 5; 
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
