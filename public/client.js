const socket = io()

let Name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");

do{

   Name = prompt("Please enter your name: ")

} while (!Name)


textarea.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        sendMessege(e.target.value)
    }
})


function sendMessege(message) {
    let msg = {
    user: Name,
    message: message.trim()
    }

    //append  message

    appendMessage(msg, 'outgoing')
    textarea.value = "";
    scrollToBottom();

    //send to server via socket

    socket.emit('message', msg)



}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className, 'message');
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv)
}



//recieve message 

socket.on('message', (msg) => {
    // console.log(msg);

    appendMessage(msg, 'incoming');
    scrollToBottom();
})

//scroll to bottom

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}