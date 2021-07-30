//nodeserver and clienrserver both are different website
const socket = io('http://localhost:3000');

// on - listen event
// emit - send update

// get element by id or queryselector 
const form = document.getElementById('send_input')
const messageInput = document.getElementById('input-message')
const chatsection = document.querySelector('.chat-section')

var audio = new Audio('ting.mp3');

// prompt
const username = prompt("Enter Your Name to join the Hangout Room");
// emit() to send a message to all the connected clients.

socket.emit('new-user-connected', username)


const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message;
    // messageElement.classList.add('message')
    messageElement.classList.add(position);
    chatsection.append(messageElement)
    if(position == 'message-left'){
        audio.play()
    }
}

// listening the user-joined event from the server 
// and calling the append function for innerhtml work
socket.on('user-joined', Name => {
    append(`<h4>${Name} </h4>joined Hangout Chat `, 'message-mid')
})

// this is listening the event of button(type = submit)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`<h4>You:</h4> ${message}`, 'message-right')

    // giving update to server by emit
    socket.emit('message-send', message)
    // empty th input when message is send
    messageInput.value = ''
})

// listening the recieved event from the server
// and calling the append function for innerhtml work
socket.on('receive', data => {
    append(`<h4>${data.username}:</h4> ${data.message}`, 'message-left')
})
socket.on('left', data => {
    append(`<h4>${data}:</h4> Left the chat`, 'message-mid')
})










