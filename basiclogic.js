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
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            triggerAction('course-selection');
        });
    });
});

window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-wrapper input');
        if (searchInput) searchInput.focus();
    }
});


// --- SYSTEMS DESIGN FOR AUTH: USERNAME VS DISPLAY NAME ---

function toggleAuthForms(showSignup) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    if (showSignup) {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
}

function handleAuth(event, type) {
    event.preventDefault();
    
    if (type === 'signup') {
        const usernameInput = document.getElementById('signupUser').value.trim();
        const displayNameInput = document.getElementById('signupDisplay').value.trim();
        const pass = document.getElementById('signupPass').value;
        
        // Strict pattern validation: Alphanumeric and underscores only
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(usernameInput)) {
            alert("Error: Username can only contain letters, numbers, and underscores!");
            return;
        }
        
        if (!usernameInput || !displayNameInput || !pass) return;
        
        // Store user profile components securely map bound
        localStorage.setItem(`user_pass_${usernameInput}`, pass);
        localStorage.setItem(`user_display_${usernameInput}`, displayNameInput);
        localStorage.setItem('studySessionUser', usernameInput);
        
        applyAuthenticatedUser(usernameInput);
    } else if (type === 'login') {
        const usernameInput = document.getElementById('loginUser').value.trim();
        const pass = document.getElementById('loginPass').value;
        
        const savedPass = localStorage.getItem(`user_pass_${usernameInput}`);
        
        if (savedPass && savedPass === pass) {
            localStorage.setItem('studySessionUser', usernameInput);
            applyAuthenticatedUser(usernameInput);
        } else {
            alert("Invalid username or password!");
        }
    }
}

function applyAuthenticatedUser(username) {
    const authOverlay = document.getElementById('authContainer');
    const sidebarName = document.getElementById('sidebarName');
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const welcomeGreeting = document.getElementById('welcomeGreeting');
    const leaderboardUserName = document.getElementById('leaderboardUserName');

    // Retrieve display name. Fallback to username if none exists.
    const displayName = localStorage.getItem(`user_display_${username}`) || username;

    if (sidebarName) sidebarName.textContent = displayName;
    if (sidebarAvatar) sidebarAvatar.textContent = displayName.charAt(0).toUpperCase();
    if (welcomeGreeting) {
        welcomeGreeting.innerHTML = `Welcome back ${displayName}! Ready to kill your exams?`;
    }
    if (leaderboardUserName) {
        leaderboardUserName.textContent = `${displayName} (You)`;
    }

    if (authOverlay) {
        authOverlay.style.opacity = '0';
        setTimeout(() => {
            authOverlay.style.display = 'none';
        }, 400);
    }
}

// Runtime dynamic modification routine for your display name
function promptChangeDisplayName() {
    const currentUsername = localStorage.getItem('studySessionUser');
    if (!currentUsername) return;

    const currentDisplayName = localStorage.getItem(`user_display_${currentUsername}`) || currentUsername;
    const newName = prompt("Enter your new Public Display Name:", currentDisplayName);
    
    if (newName !== null && newName.trim() !== "") {
        localStorage.setItem(`user_display_${currentUsername}`, newName.trim());
        applyAuthenticatedUser(currentUsername);
    }
}

// Check for active login tokens on initial page load
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('studySessionUser');
    const authOverlay = document.getElementById('authContainer');
    
    if (savedUser) {
        applyAuthenticatedUser(savedUser);
    } else {
        if (authOverlay) authOverlay.style.display = 'flex';
    }
});