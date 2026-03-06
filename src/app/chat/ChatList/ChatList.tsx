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
        <div 
            className={"chat-entry " + (props.id == props.currentChatId ? "current" : "")} 
            onClick={() => props.setCurrentChatId(props.id)}
        >
            <div className="chat-entry-text">
                <div className="chat-name">{props.chat.name ?? "Unknown chat"}</div>
            </div>
        </div>
    )
}

export default function ChatList(props: {currentChatId: string | null, setCurrentChatId: Dispatch<string | null>}) {
    const [chats, setChats] = useState<Record<string, Chat>>({});
    const [firstLaunch, setFirstLaunch] = useState(true);

    function loadChats(uid: string) {
        const rf = ref(getDatabase(), `/users/${uid}/chatMembership`);
        
        onValue(rf, async (snapshot) => {
            if(!snapshot.exists()) {
                return;
            }
            
            const chatIds = Object.keys(snapshot.val());
            await loadChatsFromIds(chatIds);

            if(firstLaunch) {
                if(chatIds.length != 0) {
                    props.setCurrentChatId(chatIds[0]);
                }
            }

        }, (error) => {
            console.error("Error getting chat IDs", error)
        });

        setFirstLaunch(false);
    }

    function loadChatsFromIds(chatIds: string[]) {
        const db = getDatabase();

        for(const id of chatIds) {
            const rf = ref(db, `/chats/${id}`);

            onValue(rf, 
                (snapshot) => {
                    setChats((chats) => {
                        const newChats = {...chats};
                        if(snapshot.exists()) {
                            newChats[id] = snapshot.val();
                        } else {
                            delete newChats[id];
                        }
                        
                        return newChats;
                    });
                },
                (err) => {
                    console.error(`Failed loading chat ${id}:`, err)
                }
            );
        }
    }

    useEffect(() => {
        getFrbApp();

        const auth = getAuth();

        auth.onAuthStateChanged(
            (user) => {
                if(!user) {
                    return;
                }

                loadChats(user.uid);
            }
        )
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