import { FirebaseOptions } from "firebase/app";
import firebase from "firebase/compat/app";
require('firebase/auth')

export function getPublicFirebaseConfig(): FirebaseOptions {
    // This could be done nicer, but the values are replaced at compile time and you can't seem to get them dynamically
    return {
        apiKey: process.env.NEXT_PUBLIC_FRB_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FRB_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FRB_DB_URL,
        projectId: process.env.NEXT_PUBLIC_FRB_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FRB_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FRB_MSG_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FRB_APP_ID
    };
}

export function getFrbApp() {
    return firebase.initializeApp(getPublicFirebaseConfig());
}
