"use client"

import Page from "@/layouts/Page/Page";
import ChatPanel from "./ChatPanel/ChatPanel";
import ChatMenu from "./ChatMenu/ChatMenu";

import "./style.css";

export default function ChatPage() {
    return (
        <Page>
            <div id="sides">
                <ChatMenu />
                <ChatPanel />
            </div>
        </Page>
    );
}
