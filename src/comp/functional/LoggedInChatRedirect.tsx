"use client"

import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function redirectToChat() {
    window.location.replace("/chat");
}

export function LoggedInChatRedirect() {
    useEffect(() => {
        getFrbApp();
        const auth = getAuth();

        auth.onAuthStateChanged((user) => {
            if(user) {
                redirectToChat();
            }
        });
    }, []);

    return (<></>);
}
