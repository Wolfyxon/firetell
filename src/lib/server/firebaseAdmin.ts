import "server-only";
import { applicationDefault, getApp, initializeApp } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { getPublicFirebaseConfig } from "../shared/firebaseUtil";

export function getAdminFrbConfig() {
    if(!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS env");
    }

    return {
        credential: applicationDefault(),
        databaseURL: getPublicFirebaseConfig().databaseURL
    }
}

export function getFrbAdmin() {
    try {
        return getApp()
    } catch {
        return initializeApp(getAdminFrbConfig());
    }
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
