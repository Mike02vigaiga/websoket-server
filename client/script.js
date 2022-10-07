const url = `ws://localhost:9876/websocket`
const server = new WebSocket(url)

const message = document.getElementById('messages')
const button = document.getElementById('send')

button.disabled = true
button.addEventListener('click', sendMessage, false)

server.onopen = function() {
    button.disabled = false
}

server.onmessage = function(event) {
    const { data } = event
    generateMessageEntry(data, 'Server')
    const buttonText = document.getElementById('button-text')
    if (data == 'STOP'){
        buttonText.innerHTML = 'START'
     } 
     else if (data == 'OVER'){
        buttonText.innerHTML = 'OVER'
     } 
     else{
        buttonText.innerHTML = 'STOP'
     }
}

function generateMessageEntry(msg, type) {
    console.log(`${type} says: ${msg}`)
}

function sendMessage() {
    const buttonText = document.getElementById('button-text')
    const text = buttonText.textContent
    generateMessageEntry(text, 'Client')
    server.send(text)
}