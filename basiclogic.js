const canvas = document.getElementById('dotsCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const dotCount = 60; 
const dotsArray = [];

class Dot {
    constructor() {
        this.radius = 3;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.vx = (Math.random() - 0.5) * 1.5; 
        this.vy = (Math.random() - 0.5) * 1.5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'; // Semitransparent white dots
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.vx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.vy *= -1;
        }
    }
}

for (let i = 0; i < dotCount; i++) {
    dotsArray.push(new Dot());
}

function handleCollisions() {
    for (let i = 0; i < dotsArray.length; i++) {
        for (let j = i + 1; j < dotsArray.length; j++) {
            let dx = dotsArray[j].x - dotsArray[i].x;
            let dy = dotsArray[j].y - dotsArray[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < (dotsArray[i].radius + dotsArray[j].radius)) {
                let tempVx = dotsArray[i].vx;
                let tempVy = dotsArray[i].vy;
                
                dotsArray[i].vx = dotsArray[j].vx;
                dotsArray[i].vy = dotsArray[j].vy;
                
                dotsArray[j].vx = tempVx;
                dotsArray[j].vy = tempVy;
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    handleCollisions();

    dotsArray.forEach(dot => {
        dot.update();
        dot.draw();
    });

    requestAnimationFrame(animate);
}

//
animate();

const MOTIVATIONAL_QUOTES = [
    "\"Learn by levels ahead.\"",
    "\"Discipline today, success tomorrow. Keep pushing forward.\"",
    "\"Hard work and wisdom are the covershell of talent.\"",
    "\"If you fear suffering you already suffer because you fear.\"",
    "\"Whoever pursues righteousness and love finds life, prosperity and honor.\"",
    "\"STUDYING IS RIGHTEOUS.\"",
    "\"Just do it. - Nike\""
];

let currentQuoteIndex = 0;

function rotateQuoteSmoothly() {
    const quoteElement = document.getElementById('rotator-quote-text');
    if (!quoteElement) return;
    
    quoteElement.classList.add('fade-out');
    
    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % MOTIVATIONAL_QUOTES.length;
        quoteElement.textContent = MOTIVATIONAL_QUOTES[currentQuoteIndex];
        
        quoteElement.classList.remove('fade-out');
        quoteElement.classList.add('fade-in');
        
        setTimeout(() => {
            quoteElement.classList.remove('fade-in');
        }, 50);
        
    }, 400);
}
setInterval(rotateQuoteSmoothly, 5000);

function triggerAction(nodeType) {
    console.log(`Initializing system sequence for: ${nodeType}`);
    
    const coinCounter = document.getElementById('coin-amount');
    if (coinCounter) {
        let currentCoins = parseInt(coinCounter.textContent.replace(/,/g, ''));
        currentCoins += 5;
        coinCounter.textContent = currentCoins.toLocaleString();
        
        coinCounter.parentElement.style.transform = 'scale(1.1)';
        coinCounter.parentElement.style.borderColor = '#38bdf8';
        setTimeout(() => {
            coinCounter.parentElement.style.transform = '';
            coinCounter.parentElement.style.borderColor = '';
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            triggerAction('course-selection');
        });
    });
});

// Global command search shortcut listener
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-wrapper input');
        if (searchInput) searchInput.focus();
    }
});