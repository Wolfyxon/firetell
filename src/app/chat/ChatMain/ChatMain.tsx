"use client"

import { KeyboardEvent, useEffect, useState } from "react";
import { Message } from "@/lib/server/chat";
import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { getAuth, User } from "firebase/auth";

import "./style.css";
import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database";


function MessageComponent(props: {message: Message}) {
    const msg = props.message;

    // TODO: Resolve author name

    return (
        <div className="msg">
            <div className="msg-author">{msg.uid}</div>
            <div className="msg-content">{msg.content}</div>
        </div>
    );
}

export default function ChatPanel(props: {currentChatId: string | null}) {
    const [msgInput, setMsgInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    function keydown(e: KeyboardEvent) {
        if(e.key == "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    }

    async function send() {
        const content = msgInput.trim();

        if(content.length == 0) {
            return;
        }

        setMsgInput("");

        const auth = getAuth();

        const body = {
            content: content
        };

        const res = await fetch(`/api/v1/chats/${props.currentChatId}/messages`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Authorization": await auth.currentUser!.getIdToken()
            }
        });
    }

    async function loadMessages() {
        console.log("LOAD")
        const db = getDatabase();

        const q = query(
             ref(db, `/messages/${props.currentChatId}`),
             orderByChild("timestamp")
        )
        
        onValue(q, 
            (snapshot) => {
                const msgs: Message[] = [];

                snapshot.forEach((msg) => {
                    msgs.push(msg.val());
                });

                setMessages(msgs);
            }, 
            (err) => {
                console.error("Loading messages failed", err);
            }
        )
    }

    useEffect(() => {
        getFrbApp();
        const auth = getAuth();

        auth.onAuthStateChanged((user) => {
            if(user && props.currentChatId) {
                loadMessages();
            }
        })

    }, [props.currentChatId])

    return (
        <div id="chat-panel">
            <div id="chat-messages">
                {messages.map((msg, i) => <MessageComponent key={i} message={msg}/>)}
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