"use client";

import Page from "@/layouts/Page/Page";
import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function LogoutPage() {
    useEffect(() => {
        getFrbApp();

        const auth = getAuth();
        auth.signOut().then(
            () => window.location.replace("/login"),
            (err) => {
                alert(`Error logging you out: ${err}`);
                console.error(err);
            }
        )
    }, []);

    return (
        <Page>
            <h1>Logging you out...</h1>
            <p>
                Please wait...
            </p>
        </Page>
    )
}