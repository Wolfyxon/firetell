import { getFrbAdmin } from "@/lib/server/firebaseAdmin";
import { errorRes, ParamCtx } from "@/lib/server/serverUtil";
import { UserResponse } from "@/lib/shared/publicUser";
import { getAuth } from "firebase-admin/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, ctx: ParamCtx<{uid: string}>) {
    const { uid } = await ctx.params;

    if(typeof(uid) != "string") {
        return errorRes(400, "Expected string uid at the end of the url");
    }

    getFrbAdmin();
    
    try {    
        const auth = getAuth();
        const userRes = await auth.getUser(uid);

        return Response.json({
            uid: userRes.uid,
            displayName: userRes.displayName
        } as UserResponse);
    } catch(e) {
        console.error(e)
        return errorRes(404, "User not found");
    }
}
