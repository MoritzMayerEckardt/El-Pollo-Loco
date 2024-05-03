/**
 * Represents a status bar for health.
 */
class StatusBarHealth extends DrawableObject {
    /**
     * Array of paths to images representing the status bar at different fill levels.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * The percentage of the status bar filled.
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructs a new StatusBarHealth object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES)
        this.x = 20;
        this.y = 0;
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
