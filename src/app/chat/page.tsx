"use client"

import Page from "@/layouts/Page/Page";
import ChatList from "./ChatList/ChatList";
import ChatPanel from "./ChatPanel/ChatPanel";

import "./style.css";

export default function ChatPage() {
    return (
        <Page>
            <div id="sides">
                <ChatList />
                <ChatPanel />
            </div>
        </Page>
    );
}
