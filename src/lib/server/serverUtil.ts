import "server-only"

import { DecodedIdToken } from "firebase-admin/auth";
import { decodeToken } from "./firebaseAdmin";

export type ParamCtx<T extends object> = { params: Promise<T> }

function errorJson(message: string) {
    return {
        error: {
            message: message
        }
    };
}

export function errorRes(status: number, message: string) {
    const body = JSON.stringify(errorJson(message));
    
    return new Response(body, {
        status: status
    });
}

export async function getRequestToken(req: Request): Promise<[error: Response | undefined, decodedToken: DecodedIdToken | undefined]> {
    const token = req.headers.get("Authorization");

    if(!token) {
        return [errorRes(401, "'Authorization' header is required"), undefined];
    }

    const decoded = await decodeToken(token);

    if(!decoded) {
        return [errorRes(401, "Invalid token"), undefined];
    }

    return [undefined, decoded];
}