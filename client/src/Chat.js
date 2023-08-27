import React from "react";
import { useState,useEffect } from "react";

// sending and recieving  messages
export function Chat({socket,username,room}){
    const [currentMessage,setCurrentMessage] = useState("");
    const [messageList,setMessageList]= useState([""]);

    
    const sendMessage= async ()=>{
        if (currentMessage!==""){
            const messageData = {
                room:room,
                author:username,
                message:currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list)=>[...list,messageData]);
        }

    }


    // Listen everytime when there is any change
    // the second parameter  'socket' means that the useEffect will run each time when there is any change to the socket
    useEffect(()=>{
        socket.on("receive_message", (data)=>{
            setMessageList((list)=>[...list,data]);
        });
    },[socket])


    return (
        <div>
            <div className="chat-header">
                <p>People</p>
            </div>
            <div className="chat-body">{messageList.map((messageData)=>{
                return <div className="message" id={username=== messageData.author ? "self" : "notself"}>
                    <div>
                        <p>{messageData.message}</p>
                    </div>
                    <div>
                        <p>{messageData.time}</p>
                        <p>{messageData.author}</p>
                    </div>
                </div>
            })}</div>
            <div className="chat-footer">
            <input onChange={(event)=>{setCurrentMessage(event.target.value)}} type="text" placeholder="Type Message" onKeyUp={(event)=>{event.key=="Enter" && sendMessage()}}/>
            <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}