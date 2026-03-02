"use client"

import Page from "@/layouts/Page/Page";
import { getFrbApp, getPublicFirebaseConfig } from "@/lib/shared/firebaseUtil";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SubmitEvent, useEffect, useState } from "react";

const ERRORS: Record<string, string> = {
    "auth/invalid-email": "Invalid e-mail format",
    "auth/invalid-credential": "Invalid e-mail or password"
};

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function submit(e: SubmitEvent) {
        e.preventDefault();
        setError("");

        getFrbApp();
        const auth = getAuth();        

        signInWithEmailAndPassword(auth, email, password).then(
            res => {
                console.log(res)
            },
            (err: FirebaseError) => {
                setError(ERRORS[err.code] ?? "Unable to log in");
                console.log(err);
            }
        );
    }

    return (
        <Page>
            <div>{error}</div>
            <form onSubmit={submit}>
                <label>E-mail:</label> <br/>
                <input type="text" onChange={e => setEmail(e.target.value)}/> <br/>

                <label>Password:</label> <br/>
                <input type="password" onChange={e => setPassword(e.target.value)}/> <br/>

                <input type="submit" value="Log in" />
            </form>
        </Page>
    );
}