const socket = io.connect('http://localhost:5000');

const chat = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

console.log('ChatApp.js Loaded');

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('message-input', function(data) {
    console.log('Received input:', data);
    messageElement = document.createElement('pre');
    messageElement.classList.add("chat-item-input");
    messageElement.textContent = data;
    chat.appendChild(messageElement);
});


socket.on('message-response', function(data) {
    console.log('Received message:', data.message);
    messageElement = document.createElement('pre');
    messageElement.classList.add("chat-item");
    messageElement.textContent = data.message;
    chat.appendChild(messageElement);
});

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const message = messageInput.value;
    socket.emit('input', { message: message });
    messageInput.value = '';
});