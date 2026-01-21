import React from "react";
import './message.css';

export function Message({message}){
    if(!message.message){
        return;
    }
    return(
        <section style={{backgroundColor:message.color}} className="message">
            <h3>{message.message}</h3>
        </section>
    );
}