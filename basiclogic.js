const flashcard = document.getElementById('flashcard');
const frontText = document.querySelector('.front');
const backText = document.querySelector('.back');

const deck = [
    { q: "What is the powerhouse of the cell?", a: "The Mitochondria! 🧬" },
    { q: "What is $5 \times 5$?", a: "25! 🧠" },
    { q: "Who wrote 'Romeo and Juliet'?", a: "William Shakespeare! 📜" }
];

let currentCardIndex = 0;

function flipCard() {
    flashcard.classList.toggle('flipped');
}

function nextCard() {
    // Reset flip animation first
    flashcard.classList.remove('flipped');
    
    // Wait a brief moment for the flip to reset, then change content
    setTimeout(() => {
        currentCardIndex = (currentCardIndex + 1) % deck.length;
        frontText.textContent = deck[currentCardIndex].q;
        backText.textContent = deck[currentCardIndex].a;
    }, 200);
}