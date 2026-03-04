"use client"

import "./style.css";

export default function ChatPanel() {
    return (
        <div id="chat-panel">
            <div id="chat-messages">

            </div>
            <div id="chat-controls">
                <textarea
                    className="input input-dark"
                    id="inp-message"
                    placeholder="Type your message..."
                />
            </div>
        </div>
    );
}