import React from "react";
import { useState } from "react";
// sending and recieving  messages
export function Chat({scoket,username,room}){
    const [currentMessage,setCurrentMessage] = useState("");
    
    
    const sendMessage= ()=>{
        if (currentMessage!==""){
            // pass
        }

    }



    return (
        <div>
            <div className="chat-header">
                <p>People</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
            <input onChange={(event)=>{setCurrentMessage(event.target.value)}} type="text" placeholder="Type Message"/>
            <button>&#9658;</button>
            </div>
        </div>
    );
}