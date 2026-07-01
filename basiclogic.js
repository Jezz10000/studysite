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
        ctx.fillStyle = 'rgba(255, 0, 234, 0.16)'; 
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

function initParticles() {
    dotsArray.length = 0;
    for (let i = 0; i < dotCount; i++) {
        dotsArray.push(new Dot());
    }
}
initParticles();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dotsArray.length; i++) {
        dotsArray[i].update();
        dotsArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();

const quotes = [
    "\"Discipline today, success tomorrow. Keep pushing forward.\"",
    "\"Mistakes are proof that you are trying. Learn from them.\"",
    "\"Focus on progress, not perfection. Every step counts.\"",
    "\"The expert in anything was once a beginner.\"",
    "\"Your future self will thank you for the work you do today.\""
];

let currentQuoteIndex = 0;
const quoteElement = document.getElementById('rotator-quote-text');

function rotateQuote() {
    if (!quoteElement) return;
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteElement.style.opacity = 0;
    setTimeout(() => {
        quoteElement.textContent = quotes[currentQuoteIndex];
        quoteElement.style.opacity = 1;
    }, 500);
}
setInterval(rotateQuote, 7000);

function toggleAuthForms(showSignup) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    if (loginForm && signupForm) {
        if (showSignup) {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        } else {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        }
    }
}

function handleAuth(event, mode) {
    event.preventDefault();
    
    let userVal = "Student";
    if (mode === 'login') {
        const loginInput = document.getElementById('loginUser');
        if (loginInput && loginInput.value.trim() !== "") {
            userVal = loginInput.value.trim();
        }
    } else {
        const signupDisplay = document.getElementById('signupDisplay');
        const signupUser = document.getElementById('signupUser');
        if (signupDisplay && signupDisplay.value.trim() !== "") {
            userVal = signupDisplay.value.trim();
        } else if (signupUser && signupUser.value.trim() !== "") {
            userVal = signupUser.value.trim();
        }
    }
    
    const formattedUser = userVal.split(' ')[0];
    
    const sidebarName = document.getElementById('sidebarName');
    if (sidebarName) sidebarName.textContent = formattedUser;
    
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    if (sidebarAvatar) sidebarAvatar.textContent = formattedUser.charAt(0).toUpperCase();
    
    const welcomeGreeting = document.getElementById('welcomeGreeting');
    if (welcomeGreeting) welcomeGreeting.textContent = `Welcome back ${formattedUser}! Ready to kill your exams?`;
    
    const leaderboardUserName = document.getElementById('leaderboardUserName');
    if (leaderboardUserName) leaderboardUserName.textContent = `${userVal} (You)`;
    
    const authOverlay = document.getElementById('authContainer');
    if (authOverlay) {
        authOverlay.style.display = 'none';
    }

    const landingView = document.getElementById('landingView');
    if (landingView) landingView.style.display = 'none';

    const appWorkspace = document.getElementById('appWorkspace');
    if (appWorkspace) appWorkspace.style.display = 'flex';
}

function openAuthModal(mode) {
    const authOverlay = document.getElementById('authContainer');
    if (authOverlay) {
        authOverlay.style.display = 'flex';
        toggleAuthForms(mode === 'signup');
    }
}

function closeAuthModal() {
    const authOverlay = document.getElementById('authContainer');
    if (authOverlay) {
        authOverlay.style.display = 'none';
    }
}