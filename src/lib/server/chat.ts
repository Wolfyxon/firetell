import { getDatabase } from "firebase-admin/database";
import { getFrbAdmin } from "./firebaseAdmin";

export type MessageType = "user";

export type MessageInit = {
    uid?: string,
    type: MessageType,
    content: string
}

export type ChatInit = {
    name?: string,
    members: string[]
}

export type Chat = ChatInit & {
    createdAt: number
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

    const ref = db.ref(`chats/${chatId}/messages`);

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
