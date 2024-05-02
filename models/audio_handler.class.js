class AudioHandler extends MovableObject {
    
    width = 20;
    height = 20;
    y = 70;
    x = 240;
    canvas;
    audioOnImage = 'img/audio_on.svg';
    audioOffImage = 'img/audio_off.svg';
    
    constructor() {
        super();
        this.canvas = canvas;
        this.world = world;
        this.loadImage('img/audio_on.svg');
        this.canvas.addEventListener('click', () => this.handleClick());
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    handleClick() {
        if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
            this.turnOnAndOffAudio();
        }
    }

    turnOnAndOffAudio() {
            if (world.audioOn) {
            world.audioOn = false;
            this.loadImage(this.audioOffImage);
        } else {
            world.audioOn = true;
            this.loadImage(this.audioOnImage)
        }
    }
}