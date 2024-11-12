// Matrix effect JavaScript
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charArray = chars.split("");
const fontSize = 20;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Background opacity
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the fill style for the letters with 50% transparency
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)"; 
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, x) => {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, x * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
        }
        drops[x]++;
    });
}

setInterval(drawMatrix, 35);

// Typing effect with sound
const terminalText = [
    "Welcome to the Shadow Syndicate",
    "A new force is rising from the digital shadows...",
    // Additional lines omitted for brevity
    "Are You Ready to Join?"
];

let terminalIndex = 0;
let charIndex = 0;
const terminalElement = document.querySelector(".terminal");

const typingSound = new Audio("sounds/typing.mp3");
typingSound.loop = true;

function startTyping() {
    typingSound.play().catch(error => console.log("Sound playback requires user interaction."));
    typeText();
}

function typeText() {
    if (charIndex < terminalText[terminalIndex].length) {
        terminalElement.innerHTML += terminalText[terminalIndex][charIndex];
        charIndex++;
        setTimeout(typeText, 50);
    } else {
        if (terminalIndex < terminalText.length - 1) {
            terminalIndex++;
            charIndex = 0;
            terminalElement.innerHTML += "<br>"; // Add new line
            setTimeout(typeText, 300);
        } else {
            typingSound.pause();
            typingSound.currentTime = 0;
        }
    }
}




// Handle "CYPHR IT" button animation and progress
const cyphrButton = document.querySelector('.cyphr-button');
const progressBarContainer = document.querySelector('.progress-cubes-container');
const percentageDisplay = document.querySelector('.progress-percentage');

// Create cubes dynamically inside the progress bar container
const totalCubes = 20;
for (let i = 0; i < totalCubes; i++) {
    const cube = document.createElement('div');
    cube.classList.add('progress-cube');
    progressBarContainer.appendChild(cube);
}

function updateProgress(progress) {
    const cubes = document.querySelectorAll('.progress-cube');
    const percentage = Math.round(progress * 100);
    let filledCubes = Math.round(progress * totalCubes);

    cubes.forEach((cube, index) => {
        cube.style.backgroundColor = index < filledCubes ? '#00ff00' : '#000';
    });

    percentageDisplay.textContent = `${percentage}%`;
}

// Button click logic to trigger progress, sound, and typing effect
cyphrButton.addEventListener('click', () => {
    let progress = 0;
    terminalElement.innerHTML = ''; // Clear the terminal before starting
    startTyping(); // Start the typing effect and play music

    const progressInterval = setInterval(() => {
        if (progress < 1) {
            progress += 0.05;
            updateProgress(progress);
        } else {
            clearInterval(progressInterval);
        }
    }, 500);
});
