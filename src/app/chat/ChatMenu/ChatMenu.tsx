"use client"

import { Dispatch, SubmitEvent, useState } from "react";
import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { getAuth } from "firebase/auth";

import ChatList from "../ChatList/ChatList";
import ImgButton from "@/comp/ImgButton/ImgButton";
import Settings from "../Settings/Settings";

import "./style.css";
import { api } from "@/lib/client/api";

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
                await sendAdd(token);
            },
            err => {
                setError("Failed to get auth token");
                console.error(err);
            }
        )   
    }

    async function sendAdd(token: string) {
        try {
            api.createChat(token, [input]);
        } catch(e) {
            setError((e as Error).message);
        }
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
    const [settingsVisible, setSettingsVisible] = useState(false);

    return (
        <div id="menu">
            <Settings visible={settingsVisible} setVisible={setSettingsVisible} />
            <div id="menu-header">
                <h1><a href="/">Firetell</a></h1>
                <div className="flex">
                    <ImgButton src="/img/icons/settings.svg" title="Settings" onClick={() => setSettingsVisible(true)} />
                    <ImgButton src="/img/icons/logout.svg" title="Log out" href="/logout" />
                
                </div>
            </div>

            <ContactAdder />
            <ChatList currentChatId={props.currentChatId} setCurrentChatId={props.setCurrentChatId} />
        </div>
    )
}
