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

    // TODO: Check if user is in the chat
    // TODO: Send message

    return Response.json({
        "success": true
    });
}
