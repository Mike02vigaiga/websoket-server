const url = `ws://localhost:9876/websocket`
const server = new WebSocket(url)

const start = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const reset = document.getElementById('reset')

start.disabled = true
stopBtn.disabled = true
reset.disabled = true
start.addEventListener('click', sendMessage('START'), false)
stopBtn.addEventListener('click', sendMessage('STOP'), false)
reset.addEventListener('click', sendMessage('RESET'), false)

server.onopen = function() {
    button.disabled = false
}
s

function generateMessageEntry(msg, type) {
    console.log(`${type} says: ${msg}`)
}

function sendMessage(text) {
    generateMessageEntry(text, 'Client')
    server.send(text)
}


