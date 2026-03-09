import { createChat } from "@/lib/server/chat";
import { errorRes, getRequestToken } from "@/lib/server/serverUtil";
import { MAX_CHAT_MEMBERS } from "@/lib/shared/limits";
import { getAuth } from "firebase-admin/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { members } = await req.json();

    if(typeof(members) != "object" || Array.isArray(members)) {
        return errorRes(400, "Expected 'members' dictionary of user IDs");
    }

    const [authError, token] = await getRequestToken(req);

    if(authError) {
        return authError;
    }

    const identifiers = Object.keys(members);
    
    const uids: Record<string, boolean> = {
        [token!.uid]: true
    };

    if(identifiers.length == 0) {
        return errorRes(400, "'members' cannot be empty");
    }

    for(let i = 0; i < identifiers.length; i++) {
        const id = identifiers[i];
        const val = members[id];

        if(typeof id != "string") {
            return errorRes(400, "'members' must only contain string keys");
        }

        if(typeof val != "boolean") {
            return errorRes(400, "'members' must only contain bool values");
        }

        if(i > MAX_CHAT_MEMBERS) {
            return errorRes(400, `Max member count is ${MAX_CHAT_MEMBERS}`);
        }

        if(!val) {
            return errorRes(400, "Values in 'members' must be true");
        }

        try {
            let uid: string;

            if(id.includes("@")) {
                const userRes = await getAuth().getUserByEmail(id);
                uid = userRes.uid;
            } else {
                const userRes = await getAuth().getUser(id);
                uid = userRes.uid;
            }

            uids[uid] = true;
        } catch(e) {
            console.error(e)
            return errorRes(400, "User not found");
        }
    }

    const chatId = await createChat({
        members: uids
    });

    return Response.json({
        "created": true,
        "chatId": chatId
    });
}
