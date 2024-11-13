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
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

// Chat functionality
const messages = [
    { sender: 'jorgie', text: "Hey! Where are we going? I'm supposed to be with my mom!" },
    { sender: 'officer', text: "We just need to keep you somewhere safe for now, little guy." },
    { sender: 'jorgie', text: "But I'm already safe! My mom takes *great* care of me!" },
    { sender: 'officer', text: "Sorry, JorgieBoy, rules are rules. You're coming with us." },
    { sender: 'jorgie', text: "What?! Nooo! I'm not a bad monkey!" },
    { sender: 'officer', text: "Sorry, bud. You're... under arrest." }
];

const chatMessages = document.querySelector('.chat-messages');
const progressFill = document.querySelector('.progress-fill');
const connectionStatus = document.querySelector('.connection-status');
const headerProgressBar = document.querySelector('.header-progress-bar');
let messageIndex = 0;

function createMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (message.sender === 'jorgie') {
        messageDiv.classList.add('jorgie');
    }

    const profilePic = document.createElement('div');
    profilePic.classList.add('profile-pic');
    profilePic.style.backgroundImage = `url(images/${message.sender}.png)`;

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message.text;

    if (message.sender === 'jorgie') {
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(profilePic);
    } else {
        messageDiv.appendChild(profilePic);
        messageDiv.appendChild(messageContent);
    }

    return messageDiv;
}

function displayNextMessage() {
    if (messageIndex < messages.length) {
        const message = messages[messageIndex];
        const messageElement = createMessage(message);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        messageIndex++;
        setTimeout(displayNextMessage, 2000);
    }
}

function startConnectionSequence() {
    progressFill.style.width = '0%';
    connectionStatus.style.display = 'none';
    headerProgressBar.style.display = 'block';
    chatMessages.innerHTML = '';
    messageIndex = 0;

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        progressFill.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                headerProgressBar.style.display = 'none';
                connectionStatus.style.display = 'block';
                displayNextMessage();
            }, 500);
        }
    }, 50);
}

// Event Listeners
document.getElementById('free-jorgie-btn').addEventListener('click', startConnectionSequence);

// Handle window resize for Matrix effect
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});