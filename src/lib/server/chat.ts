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

    const data: Chat = {
        createdAt: Date.now()
    };

    if(chatInit.name) { // firebase doesnt like undefined
        data.name = chatInit.name;
    }

    const promise = ref.push(data);

    await setChatMembers(promise.key, chatInit.members);

    return promise.key;
}

export async function clearChat(chatId: string): Promise<void> {
    getFrbAdmin();
    const db = getDatabase();

    const ref = db.ref(`messages/${chatId}`);
    await ref.set({});
}

export async function setChatMembers(chatId: string, members: Record<string, boolean>) {
    getFrbAdmin();

    const db = getDatabase();
    const updates: any = {};

    for(const [uid, val] of Object.entries(members)) {
        updates[`/users/${uid}/chatMembership/${chatId}`] = val;
    }

    db.ref().update(updates);
}

export async function isChatMember(chatId: string, uid: string) {
    getFrbAdmin();

    const db = getDatabase();
    const res = await db.ref(`users/${uid}/chatMembership/${chatId}`).get();

    return res.exists();
}

export async function getChatById(chatId: string): Promise<Chat | undefined> {
    getFrbAdmin();

    const db = getDatabase();
    const res = await db.ref("chats").child(chatId).get();

    if(!res.exists()) {
        return;
    }

    return res.val() as Chat | undefined;
}
