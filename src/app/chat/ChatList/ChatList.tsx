"use client"

import { Dispatch, useEffect, useState } from "react";
import "./style.css";
import { Chat } from "@/lib/shared/publicChat";
import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

function ChatButton(props: {
    id: string, 
    chat: Chat,
    currentChatId: string | null,
    setCurrentChatId: Dispatch<string | null>
}) {
    return (
        <div className="chat-entry" onClick={() => props.setCurrentChatId(props.id)}>
            <div className="chat-entry-text">
                <div className="chat-name">{props.chat.name ?? "Unknown chat"}</div>
            </div>
        </div>
    )
}

export default function ChatList(props: {currentChatId: string | null, setCurrentChatId: Dispatch<string | null>}) {
    const [chats, setChats] = useState<Record<string, Chat>>({});
    const [firstLaunch, setFirstLaunch] = useState(true);

    useEffect(() => {
        getFrbApp();

        const rf = ref(getDatabase(), "/chats");
        const auth = getAuth();
        
        onValue(rf, (snapshot) => {
            if(!snapshot.exists()) {
                return;
            }
            
            const chats = snapshot.val();
            setChats(chats);

            if(firstLaunch) {
                const ids = Object.keys(chats);

                if(ids.length != 0) {
                    props.setCurrentChatId(ids[0]);
                }

                setFirstLaunch(false);
            }

        }, (error) => {
            console.error(error)
        });

    }, []);

    return (
        <div id="chats">
            {
                Object.entries(chats).map(
                    ([id, chat]) => 
                        <ChatButton 
                            key={id} 
                            id={id} 
                            chat={chat}
                            currentChatId={props.currentChatId}
                            setCurrentChatId={props.setCurrentChatId} 
                    />
                )
            }
        </div>
    )
}