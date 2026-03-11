import { getFrbAdmin, isKeyInputSafe, stripUserInfo } from "@/lib/server/firebaseAdmin";
import { errorRes, ParamCtx } from "@/lib/server/serverUtil";
import { UserResponse } from "@/lib/shared/publicUser";
import { getAuth } from "firebase-admin/auth";
import { NextRequest } from "next/server";

const DELIM = ",";

export async function GET(req: NextRequest, ctx: ParamCtx<{uids: string}>) {
    const { uids } = await ctx.params;
    const isBulk = req.nextUrl.searchParams.has("bulk");

    if(typeof(uids) != "string") {
        return errorRes(400, "Expected string uid at the end of the url");
    }

    if(uids.includes(",") && !isBulk) {
        return errorRes(400, "Multiple UIDs are only supported with ?bulk=1");
    }

    if(!isKeyInputSafe(uids)) {
        return errorRes(400, "Invalid UIDs");
    }

    getFrbAdmin();
    const auth = getAuth();
    
    if(isBulk) {
        const uidList = uids.split(DELIM);

        const res: Record<string, UserResponse | null> = {};

        for(const uid of uidList) {
            if(res[uid] !== undefined) {
                continue;
            }

            try {
                const user = await auth.getUser(uid);
                res[uid] = stripUserInfo(user);
            } catch {
                res[uid] = null;
            }
        }

        return Response.json({
            "users": res
        });
    } else {
        try {    
            
            const userRes = await auth.getUser(uids);

            return Response.json(stripUserInfo(userRes));
        } catch(e) {
            //console.error(e)
            return errorRes(404, "User not found");
        }
    }
}
