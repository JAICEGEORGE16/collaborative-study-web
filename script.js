const socket = io();

// Handle chat
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const messages = document.getElementById('messages');

sendMessage.addEventListener('click', () => {
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit('message', msg);
    messageInput.value = '';
  }
});

socket.on('message', (msg) => {
  const msgElement = document.createElement('p');
  msgElement.textContent = msg;
  messages.appendChild(msgElement);
});

// Handle file upload
const uploadForm = document.getElementById('uploadForm');
const uploadMessage = document.getElementById('uploadMessage');

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(uploadForm);

  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      uploadMessage.textContent = data.message;
    })
    .catch((err) => {
      uploadMessage.textContent = 'File upload failed';
      console.error(err);
    });
});
