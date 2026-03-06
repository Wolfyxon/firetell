"use client"

import Page from "@/layouts/Page/Page";
import ChatPanel from "./ChatPanel/ChatPanel";
import ChatMenu from "./ChatMenu/ChatMenu";

import "./style.css";
import { useState } from "react";

export default function ChatPage() {
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);

    return (
        <Page>
            <div id="sides">
                <ChatMenu currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
                <ChatPanel currentChatId={currentChatId} />
            </div>
        </Page>
    );
}
