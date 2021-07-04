const express = require('express');

const app = express()

const http = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//socket code
const io = require('socket.io')(http);

io.on("connection", (socket) => {
    console.log('connected....');

    socket.on('message', (msg) => {
        // console.log(msg);
        socket.broadcast.emit('message', msg)
    })
})

const PORT =  process.eventNames.PORT || 3000;

http.listen(PORT, () => {
    console.log("server is up and running...");
})
