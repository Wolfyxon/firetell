import { getDatabase } from "firebase-admin/database";
import { getFrbAdmin } from "./firebaseAdmin";
import { ChatInit, Chat } from "../shared/publicChat";

export type MessageType = "user";

export type MessageInit = {
    uid?: string,
    type: MessageType,
    content: string
}

export type Message = MessageInit & {
    timestamp: number
}

export async function createMessage(chatId: string, msg: MessageInit): Promise<string> {
    getFrbAdmin();
    const db = getDatabase();

    if(chatId.includes("/") || chatId.includes("..")) {
        throw new Error("Invalid chat ID");
    }

    const ref = db.ref(`messages/${chatId}`);

    const promise = ref.push({
        ...msg,
        timestamp: Date.now()
    } as Message);

    await promise;
    return promise.key;
}

export async function createChat(chatInit: ChatInit): Promise<string> {
    getFrbAdmin();

    const db = getDatabase();
    const ref = db.ref(`chats`);

    const promise = ref.push({
        ...chatInit,
        createdAt: Date.now()
    } as Chat);

    return promise.key;
}

export async function getChatById(chatId: string): Promise<Chat | undefined> {
    getFrbAdmin();

    const db = getDatabase();
    const res = await db.ref("chats").child(chatId).get()

    if(!res.exists()) {
        return;
    }

    return res.val() as Chat | undefined;
}
