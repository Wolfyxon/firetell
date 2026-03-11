"use client"

import { KeyboardEvent, useEffect, useState } from "react";
import { Message } from "@/lib/server/chat";
import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { Auth, getAuth, getIdToken } from "firebase/auth";
import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { api } from "@/lib/client/api";

import "./style.css";
import { clientCache } from "@/lib/client/cache";

function MessageComponent(props: {message: Message, isOwn: boolean}) {
    const msg = props.message;
    const [userName, setUserName] = useState(msg.uid);

    const getUserInfo = clientCache(api.getUserInfo);

    useEffect(() => {
        getUserInfo(msg.uid!).then(
            userData => {
                if(userData.displayName) {
                    setUserName(userData.displayName);
                }
            },
            err => {
                console.error("Failed to get user", msg.uid, err);
            }
        )
    }, []);

    return (
        <div className={`msg ` + (props.isOwn ? "own" : "")} data-uid={msg.uid}>
            <div className="msg-author">{userName ?? msg.uid}</div>
            <div className="msg-content">{msg.content}</div>
        </div>
    );
}

export default function ChatMain(props: {currentChatId: string | null}) {
    return (
        <>
            {props.currentChatId
            ?
                <ChatMainOpen currentChatId={props.currentChatId} />
            :
                <ChatMainNone />
            }
        </>
    )
}

function ChatMainNone() {
    return (
        <div id="chat-none">
            <h1>Firetell</h1>
            <p>
                Select or create a conversation on the left panel.
            </p>
        </div>
    )
}

function ChatMainOpen(props: {currentChatId: string | null}) {
    const [msgInput, setMsgInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [auth, setAuth] = useState<Auth | null>(null);

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
        const token = await auth.currentUser!.getIdToken();

        api.sendMessage(token, props.currentChatId!, content);
    }

    async function loadMessages() {
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
                
                setMessages(msgs.sort((a, b) => a.timestamp - b.timestamp));
            }, 
            (err) => {
                console.error("Loading messages failed", err);
            }
        )
    }

    useEffect(() => {
        getFrbApp();
        const auth = getAuth();
        setAuth(auth);

        auth.onAuthStateChanged((user) => {
            if(user && props.currentChatId) {
                loadMessages();
            }
        })

    }, [props.currentChatId])

    return (
        <div id="chat-panel">
            <div id="chat-messages">
                {messages.map((msg, i) => 
                    <MessageComponent
                        key={i} 
                        message={msg}
                        isOwn={auth != null && msg.uid !== undefined && auth.currentUser?.uid == msg.uid}
                     />
                )}
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