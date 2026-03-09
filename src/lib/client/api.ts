import { UserResponse } from "../shared/publicUser";

const API_URL = "/api/v1/";

export namespace api {
    export async function sendMessage(token: string, chatId: string, content: string) {
        const body = {
            content: content
        };

        return await fetch(API_URL + `chats/${chatId}/messages`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Authorization": token
            }
        });
    }

    export async function createChat(token: string, members: string[]) {
        const memberDict: Record<string, true> = {};

        for(const member of members) {
            memberDict[member] = true;
        }

        const body = {
            members: memberDict
        };

        const res = await fetch(API_URL + "chats", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Authorization": token
            }
        });

        const json = await res.json();

        if(json.error) {
            throw new Error(json.error.message);
        }

        return;
    }

    export async function getUserInfo(id: string): Promise<UserResponse> {
        const res = await fetch(API_URL + "/users/" + id);
        const json = await res.json();

        if(json.error) {
            throw new Error(json.error.message);
        }

        return json as UserResponse;
    }
}
