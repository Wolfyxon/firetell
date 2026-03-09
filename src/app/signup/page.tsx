"use client"

import { LoggedInChatRedirect } from "@/comp/functional/LoggedInChatRedirect";
import { PublicPage } from "@/layouts/Page/PublicPage";
import { FIREBASE_AUTH_ERRORS, getFrbApp } from "@/lib/shared/firebaseUtil";
import "@/style/signPage.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { SubmitEvent, useState } from "react";


export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const [error, setError] = useState("");

    async function submit(e: SubmitEvent) {
        e.preventDefault();
        setError("");

        if(password != password2) {
            setError("Passwords don't match");
            return;
        }

        if(password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        getFrbApp();
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password).then(
            (res) => {
                window.location.replace("/chat");
            },
            (err) => {
                setError(FIREBASE_AUTH_ERRORS[err.code] ?? err.code);
            }
        );
    }

    return (
        <PublicPage>
            <LoggedInChatRedirect />

            <h1>Sign up</h1>
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

                <label htmlFor="inp-repeat-password">Repeat password:</label>
                <input 
                    type="password"
                    id="inp-repeat-password"
                    className="input" 
                    placeholder="Repeat password..."
                    onChange={e => setPassword2(e.target.value)}
                />

                <a href="/login">Log into an existing account</a>

                <input
                    type="submit" 
                    value="Create account" 
                    className="btn btn-primary" 
                />
            </form>
        </PublicPage>
    )
}