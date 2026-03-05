"use client"

import { useEffect, useState } from "react";
import "./style.css";
import { Chat } from "@/lib/shared/publicChat";
import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

function ChatButton(props: {id: string, chat: Chat}) {
    return (
        <div className="chat-entry">
            <div className="chat-entry-text">
                <div className="chat-name">{props.chat.name ?? "Unknown chat"}</div>
            </div>
        </div>
    )
}

export default function ChatList() {
    const [chats, setChats] = useState<Record<string, Chat>>({});

    useEffect(() => {
        getFrbApp();

        const rf = ref(getDatabase(), "/chats");
        const auth = getAuth();
        
        onValue(rf, (snapshot) => {
            if(!snapshot.exists()) {
                return;
            }
            
            setChats(snapshot.val());
        }, (error) => {
            console.error(error)
        });

    }, []);

    return (
        <div id="chats">
            {
                Object.entries(chats).map(
                    ([id, chat]) => <ChatButton key={id} id={id} chat={chat} />
                )
            }
        </div>
    )
}