export default class Particle {
    constructor(x, y, hue, ctx) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5;
        this.speedX = Math.random() * 4 - 1.5;
        this.speedY = Math.random() * 5 - 1.5;
        this.color = 'hsl('+ hue + ', 100%, 50%)';
        this.ctx = ctx;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.08;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}