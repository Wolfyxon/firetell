"use client"

import { Dispatch, SubmitEvent, useState } from "react";
import ChatList from "../ChatList/ChatList";

import "./style.css";
import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { getAuth } from "firebase/auth";

function ContactAdder() {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    async function submit(e: SubmitEvent) {
        e.preventDefault();
        setError("");

        getFrbApp();

        const auth = getAuth();
        
        if(!auth.currentUser) {
            setError("Please login again");
            return;
        }

        auth.currentUser.getIdToken().then(
            async token => {
                const err = await sendAdd(token);

                if(err) {
                    setError(err);
                } else {
                    setInput("");
                }
            },
            err => {
                setError("Failed to get auth token");
                console.error(err);
            }
        )   
    }

    async function sendAdd(token: string): Promise<string | undefined> {
        const body = {
            members: {[input]: true}
        };

        const res = await fetch("/api/v1/chats", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Authorization": token
            }
        });

        const json = await res.json();

        if(json.error) {
            return json.error.message;
        }

        return;
    }

    return (
        <div>
            <label htmlFor="inp-add-contact">Add a contact</label> <br />
            <div className="error">{error}</div>
            <form className="flex" onSubmit={submit}>
                <input
                    className="input input-dark" 
                    type="text"
                    placeholder="Enter user e-mail or ID..."
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
                {/* TODO: Make smaller */}
                <input type="submit" className="btn" value="Add" />
            </form>

        </div>
    )
}

export default function ChatMenu(props: {currentChatId: string | null, setCurrentChatId: Dispatch<string | null>}) {
    return (
        <div id="menu">
            <h1>Firetell</h1>

            <ContactAdder />
            <ChatList currentChatId={props.currentChatId} setCurrentChatId={props.setCurrentChatId} />
        </div>
    )
}