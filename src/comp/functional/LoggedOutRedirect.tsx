"use client"

import { getFrbApp } from "@/lib/shared/firebaseUtil";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";


export function LoggedOutRedirect() {
    useEffect(() => {
        getFrbApp();
        const auth = getAuth();

        auth.onAuthStateChanged((user) => {
            if(!user) {
                window.location.replace("/login");
            }
        });
    }, []);

    return (<></>);
}
