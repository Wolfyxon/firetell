import ImgButton from "@/comp/ImgButton/ImgButton";
import "./style.css";
import { Dispatch, KeyboardEvent, MouseEvent, SubmitEvent, useEffect, useState } from "react";
import { Auth, getAuth, updateProfile } from "firebase/auth";
import { getFrbApp } from "@/lib/shared/firebaseUtil";

export default function Settings(props: { visible: boolean, setVisible: Dispatch<boolean> }) {
    function click(e: MouseEvent) {
        const target = e.target as HTMLElement;
        
        if(target.id == "settings-container") {
            props.setVisible(false);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if(e.key == "Escape") {
                props.setVisible(false);
            }
        });
    }, []);

    return (
        <div id="settings-root" className={props.visible ? "visible" : ""}>
            <div id="settings-shadow"></div>
            <div id="settings-container" onClick={click}>
                <div id="settings">
                    <div id="settings-header">
                        <h1>Settings</h1>
                        <ImgButton src="/img/icons/x.svg" title="Close" onClick={() => props.setVisible(false)}/>
                    </div>

                    <h2>Account</h2>
                <ChangeNameForm />
                </div>
            </div>
            
        </div>
    );
}

function ChangeNameForm() {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [auth, setAuth] = useState<Auth | null>(null);

    function submit(e: SubmitEvent) {
        e.preventDefault();

        if(!auth) {
            setError("Auth not available");
            return;
        }

        auth.onAuthStateChanged(
            user => {
                if(!user) {
                    setError("You're not logged in");
                    return;
                }

                updateProfile(user, {
                    displayName: name
                }).then(
                    _ => {
                        console.log("Name changed successfully");
                    },
                    err => {
                        setError("Failed to update name");
                        console.error(err);
                    }
                );
            },
            err => {
                setError("Failed to get current user");
                console.error(err);
            }
        )
    }

    useEffect(() => {
        getFrbApp();
        const auth = getAuth();
        setAuth(auth);

        auth.onAuthStateChanged(
            user => {
                if(user) {
                    setName(user.displayName || "");
                }
            }
        )
    }, []);

    return (
         <form className="flex" onSubmit={submit}>
            <div className="error">{error}</div>
            <input
                type="text" 
                className="input input-dark" 
                id="inp-display-name"
                placeholder="Enter new display name..."
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button className="btn btn-primary">Change name</button>
        </form>
    )
}