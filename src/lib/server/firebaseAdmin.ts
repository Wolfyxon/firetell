import "server-only";
import { applicationDefault, cert, getApp, initializeApp } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { getPublicFirebaseConfig } from "../shared/firebaseUtil";

export function getAdminFrbCredential() {
    const str = process.env.FRB_ADMIN_CREDENTIAL;
    
    if(!str) {
        throw new Error("Missing FRB__ADMIN_CREDENTIAL env");
    }

    return JSON.parse(str);
}

export function getAdminFrbConfig() {
    return {
        credential: cert(getAdminFrbCredential()),
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
