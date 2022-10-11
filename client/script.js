const url = `ws://localhost:9876/websocket`
const server = new WebSocket(url)

const message = document.getElementById('messages')
const input = document.getElementById('message')
const button = document.getElementById('send')

button.disabled = true
button.addEventListener('click', sendMessage, false)

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("send").click();
    }
  });

server.onopen = function() {
    button.disabled = false
}

server.onmessage = function(event) {
    const { data } = event
    generateMessageEntry(data, 'Server')
}

function generateMessageEntry(msg, type) {
    const newMessage = document.createElement('div')
    newMessage.innerText = `${type} : ${msg}`
    message.appendChild(newMessage)
}

function sendMessage() {
    const text = input.value
    generateMessageEntry(text, 'You')
    server.send(text)
}