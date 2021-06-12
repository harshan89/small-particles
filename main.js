import Particle from './particle.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: null,
    y: null
};

canvas.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    particlesArray.push(new Particle(event.x, event.y, hue, ctx));
});

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle(event.x, event.y, hue, ctx));
    }
});

function drawCircle() {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
    ctx.fill();
}

function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        if(particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

animate();