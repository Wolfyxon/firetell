import { getRequestToken } from "@/lib/server/serverUtil";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const [authErr, token] = await getRequestToken(req);
    
    if(authErr) {
        return authErr;
    }

    return Response.json({
        "success": true
    });
}
