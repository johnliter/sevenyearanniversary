const canvas = document.getElementById("hearts-canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

const hearts = [];
const colors = ["#ff4d6d", "#ff6b81", "#ff878d", "#ffb3c1", "#ffc2d1"];

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * -1; // Start off-screen
        this.size = Math.random() * 15 + 5; // Random size
        this.speedY = Math.random() * 3 + 2; // Falling speed
        this.speedX = Math.random() * 2 - 1; // Slight horizontal drift
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y - this.size / 2,
            this.x - this.size, this.y + this.size / 3,
            this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x + this.size, this.y + this.size / 3,
            this.x + this.size / 2, this.y - this.size / 2,
            this.x, this.y
        );
        ctx.closePath();
        ctx.fill();
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > canvas.height) {
            this.y = -10; // Reset to top
            this.x = Math.random() * canvas.width;
        }
    }
}

// Create hearts
function createHearts() {
    const heartCount = prefersReducedMotion ? 50 : 100; // Fewer hearts if reduced motion is preferred
    for (let i = 0; i < heartCount; i++) {
        hearts.push(new Heart());
    }
}

// Animate hearts
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart) => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animate);
}

// Resize canvas and reset hearts on window resize
window.addEventListener("resize", () => {
    setCanvasSize();
    hearts.length = 0; // Clear hearts array
    createHearts(); // Recreate hearts
});

// Start animation
createHearts();
animate();
