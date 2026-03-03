import { getDatabase } from "firebase-admin/database";
import { getFrbAdmin } from "./firebaseAdmin";

export type MessageType = "user";

export type MessageInit = {
    uid?: string,
    type: MessageType,
    content: string
}

export type Message = MessageInit & {
    timestamp: number
};

export async function sendMessage(chatId: string, msg: MessageInit): Promise<string> {
    getFrbAdmin();
    const db = getDatabase();

    if(chatId.includes("/")) {
        throw new Error("Invalid chat ID");
    }

    const ref = db.ref(`chats/${chatId}/messages`);

    const promise = ref.push({
        ...msg,
        timestamp: Date.now()
    });

    await promise;
    return promise.key;
}
