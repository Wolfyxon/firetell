"use client"

import "./style.css";

function Chat(props: {name: string}) {
    return (
        <div className="chat-entry">
            <div className="chat-entry-text">
                <div className="chat-name">{props.name}</div>
            </div>
        </div>
    )
}

export default function ChatList() {
    return (
        <div id="chats">
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            <Chat name="Hi"/>
            
        </div>
    )
}