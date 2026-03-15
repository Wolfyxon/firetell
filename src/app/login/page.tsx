"use client"

import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SubmitEvent, useEffect, useState } from "react";
import { FIREBASE_AUTH_ERRORS, getFrbApp } from "@/lib/shared/firebaseUtil";
import { PublicPage } from "@/layouts/Page/PublicPage";
import { LoggedInChatRedirect, redirectToChat } from "@/comp/functional/LoggedInChatRedirect";

import "@/style/signPage.css";

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
            (res) => {
                redirectToChat();
            },
            (err: FirebaseError) => {
                setError(FIREBASE_AUTH_ERRORS[err.code] ?? "Unable to log in");
                console.log(err);
            }
        );
    }

    return (
        <PublicPage>
            <LoggedInChatRedirect />

            <h1>Log in</h1>
            <div className="error">{error}</div>
            <form onSubmit={submit}>
                <label htmlFor="inp-mail">E-mail:</label>
                <input
                    type="text"
                    className="input"
                    id="inp-mail"  
                    placeholder="Your e-mail..."
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="inp-password">Password:</label>
                <input 
                    type="password"
                    id="inp-password"
                    className="input" 
                    placeholder="Your password..."
                    onChange={e => setPassword(e.target.value)}
                />

                <a href="/signup">Create a new account</a>

                <input
                    type="submit" 
                    value="Log in" 
                    className="btn btn-primary" 
                />
            </form>
        </PublicPage>
    );
}