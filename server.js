// node server which will handle socket.io connection

//import the sockit.io liberary
//server to use at 8000 port
const io = require('socket.io')(3000,{
    // as cors is making connection error
    cors:{
        origin : "hhttps://reerajput930.github.io/Real-Time-Chat-Application/",
   },
})

const users = {};


// this server is listening the incomming event or and Event Listener
// connection is the event name(can give any variable name) and socket is the function
io.on('connection', socket => {

    // Event listener ,when new user will enter
    // here new-user-connected is a Event and newuser as function
    socket.on('new-user-connected', newuser => {
        console.log("new user connected ", newuser)
        users[socket.id] = newuser;
        socket.broadcast.emit('user-joined', newuser)

    });
    
    // Event listener ,when message occur
    socket.on('message-send', message => {
        // console.log(message)
        socket.broadcast.emit('receive', { message: message, username: users[socket.id]})
        
    });
    
    // disconnect attribute tells(automaticaly) if client has left the server
    // Event listener
    socket.on('disconnect', message => {
        // console.log(message)
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    });


})
index.listen(3000)
