import { createChat } from "@/lib/server/chat";
import { errorRes, getRequestToken } from "@/lib/server/serverUtil";
import { MAX_CHAT_MEMBERS } from "@/lib/shared/limits";
import { getAuth } from "firebase-admin/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { members } = await req.json();

    if(!Array.isArray(members)) {
        return errorRes(400, "Expected 'members' array of user IDs");
    }

    if(members.length > MAX_CHAT_MEMBERS) {
        return errorRes(400, `Max member count is ${MAX_CHAT_MEMBERS}`);
    }

    for(let i = 0; i < members.length; i++) {
        const uid = members[i];

        if(typeof uid != "string") {
            return errorRes(400, "'members' must only contain strings");
        }
    }

    const [authError, token] = await getRequestToken(req);

    if(authError) {
        return authError;
    }

    try {
        const usersRes = await getAuth().getUsers(members);
    } catch {
        return errorRes(400, "Invalid IDs");
    }

    const chatId = await createChat({
        members: members
    });

    return Response.json({
        "created": true,
        "chatId": chatId
    });
}
