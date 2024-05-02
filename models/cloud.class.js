class Cloud extends MovableObject {
    
    y = 50;
    x = Math.random() * 3500;
    width = 500;
    height = 200;

    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');   
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}