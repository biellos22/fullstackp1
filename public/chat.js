const socket = io();
const senderId = Math.random().toString(36).substring(7); 

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    socket.emit('sendMessage', { roomId: 'roomIdAqui', content: message, senderId });

    displayMessage(message, 'sent');

    messageInput.value = '';
}

function displayMessage(message, type) {
    const messagesContainer = document.getElementById('messagesContainer');

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

socket.on('receiveMessage', (data) => {
    if (data.senderId !== senderId) {
        displayMessage(data.content, 'received');
    }
});
