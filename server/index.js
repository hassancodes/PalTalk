const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io")

app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"],
    }
});


// waiting for connections 
io.on("connection",(socket)=>{
    console.log(`${socket.id} is connecting`);


    // logic for add to room
    socket.on("join_room",(roomName)=>{
        socket.join(roomName)
        console.log(`User : ${socket.id} is connected to the room: ${roomName}`);

    })

     // recieving text message 
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);

    })

    
    // runs when the user is disconnecting
    socket.on("disconnect", ()=>{
        console.log(`${socket.id} is disconnecting`);
    })

   

})
server.listen(3001,()=>{
    console.log("server is running")
})