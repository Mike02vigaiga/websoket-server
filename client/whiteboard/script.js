const url = `ws://localhost:9876/websocket`
const server = new WebSocket(url)

const message = document.getElementById('messages')
const button = document.getElementById('send')

var distance = 60000 * 1;
const setDistance = () => {distance = 60000 * 1;} // 1 minute in millisecond * number of minute of the timer
var x

//-----------------TIMER-----------------------------------------------------------------------------------------------------
const startTimer = () => {
x = setInterval(timer(), 1000);
timer = () => {
   
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var milliseconds = Math.floor(distance);
      
    // Output the result in an element with id="timer"
    document.getElementById("timer").innerHTML = minutes + " . " + seconds + " . " + milliseconds;
      
    // If the count down is over
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = "OVER";
      sendMessage('OVER');
    }
  }
}
//===========================================================================================================================  

button.disabled = true
button.addEventListener('click', sendMessage, false)

server.onopen = function() {
    button.disabled = false
}

server.onmessage = function(event) {
    const { data } = event
    generateMessageEntry(data, 'Server')
    if (data == 'STOP'){
        clearInterval(x);
        console.log('timer stopped')
    } 
    else if (data == 'RESET'){
        setDistance()
    } 
    else{
        startTimer();
        console.log('timer started')
    }
}

function generateMessageEntry(msg, type) {
    console.log(`${type} says: ${msg}`)
}

function sendMessage(text) {
    generateMessageEntry(text, 'Client')
    server.send(text)
}


