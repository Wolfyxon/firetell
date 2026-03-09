export namespace api {
    export async function sendMessage(token: string, chatId: string, content: string) {
        const body = {
            content: content
        };

        return await fetch(`/api/v1/chats/${chatId}/messages`, {
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
            memberDict
        };

        const res = await fetch("/api/v1/chats", {
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
}
