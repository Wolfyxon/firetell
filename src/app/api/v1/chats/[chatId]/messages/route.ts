import { createMessage, getChatById, isChatMember } from "@/lib/server/chat";
import { execCommand, isCommand } from "@/lib/server/chatCommands";
import { errorRes, getRequestToken, ParamCtx } from "@/lib/server/serverUtil"
import { MAX_MESSAGE_LENGTH } from "@/lib/shared/limits";
import { NextRequest } from "next/server"

export async function POST(req: NextRequest, ctx: ParamCtx<{chatId: string}>) {
    const { content } = await req.json();
    const { chatId } = await ctx.params;

    if(typeof content != "string") {
        return errorRes(400, "Expected 'chatId' as string");
    }

    if(content.length > MAX_MESSAGE_LENGTH) {
        return errorRes(400, "Message is too long");
    }
    
    const [authErr, token] = await getRequestToken(req);

    if(authErr) {
        return authErr;
    }

    const chat = await getChatById(chatId);

    if(!chat) {
        return errorRes(404, "Unknown chat");
    }

    if(!(await isChatMember(chatId, token!.uid))) {
        return errorRes(403, "You're not a member of this chat");
    }

    if(isCommand(content)) {
        await execCommand(token!.uid, chatId, content);

        return Response.json({
            "commandResult": {}
        });
    }
    
    const id = await createMessage(chatId, {
        uid: token!.uid,
        type: "user",
        content: content
    });

    return Response.json({
        "messageId": id
    });
}
