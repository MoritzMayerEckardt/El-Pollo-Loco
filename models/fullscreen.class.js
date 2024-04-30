class FullScreen extends MovableObject {
    width = 20;
    height = 20;
    y = 30;
    x = 240;
    canvas;

    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage('img/fullscreen.svg');
        this.world = world;
        this.canvas.addEventListener('click', () => this.handleClick());
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    handleClick() {
        if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
            this.canvas.requestFullscreen();
            world.fullscreenOn = false;
        }
    }
}