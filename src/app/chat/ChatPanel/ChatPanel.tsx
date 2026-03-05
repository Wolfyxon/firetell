"use client"

import { KeyboardEvent, useState } from "react";
import "./style.css";

export default function ChatPanel() {
    const [msgInput, setMsgInput] = useState("");

    function keydown(e: KeyboardEvent) {
        if(e.key == "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    }

    function send() {
        const content = msgInput.trim();

        if(content.length == 0) {
            return;
        }

        setMsgInput("");
    }

    return (
        <div id="chat-panel">
            <div id="chat-messages">

            </div>
            <div id="chat-controls">
                <textarea
                    className="input input-dark"
                    id="inp-message"
                    placeholder="Type your message..."
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    onKeyDown={keydown}
                />
            </div>
        </div>
    );
}