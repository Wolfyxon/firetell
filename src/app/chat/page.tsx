"use client"

import Page from "@/layouts/Page/Page";
import ChatMain from "./ChatMain/ChatMain";
import ChatMenu from "./ChatMenu/ChatMenu";

import "./style.css";
import { useState } from "react";

export default function ChatPage() {
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);

    return (
        <Page>
            <div id="sides">
                <ChatMenu currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
                <ChatMain currentChatId={currentChatId} />
            </div>
        </Page>
    );
}
