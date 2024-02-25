const express = require('express');
const{Server}= require('socket.io');
const {createServer} = require('http');

const app = express();

app.use(express.static('./public'));
let PORT = process.env.PORT||3000;


server = createServer(app);
const io = new Server(server)

io.on("connection", (socket) => {
    // console.log(socket.id);
    socket.on('join', (username) => {
        // console.log(`join${username}`);
        socket.username = username;
        io.emit('userJoined', getUserList());
    });
    socket.on('disconnect', () => {
        // console.log('User disconnected');
        io.emit('userLeft', getUserList());
    });

    function getUserList() {
        const userList = [];
       
        io.sockets.sockets.forEach((connectedSocket) => {
            if (connectedSocket.username) {
                userList.push(connectedSocket.username);
            }
        });
        return userList;
    }
    //////////////////////////////////////////
    socket.on('userMsg',(msg)=>{
    // console.log(msg);
    socket.broadcast.emit('server-msg',msg)});
  });


app.get('/',function(req,res){
    res.render('/index.html');
})



server.listen(PORT,()=>{
    console.log(`running on port : ${PORT} `);
})