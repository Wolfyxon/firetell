import "server-only";
import { initializeApp } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

export function getAdminFrbConfig() {
    const jsonEnv = process.env.FRB_ADMIN;

    if(jsonEnv) {
        return JSON.parse(jsonEnv);
    }

    throw new Error("FRB_ADMIN env not found");
}

export function getFrbAdmin() {
    return initializeApp(getAdminFrbConfig());
}

export async function decodeToken(idToken: string): Promise<DecodedIdToken | undefined> {
    getFrbAdmin();

    try {
        const res = await getAuth().verifyIdToken(idToken);
        return res;
    } catch {
        return
    }
}
