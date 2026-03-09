import ImgButton from "@/comp/ImgButton/ImgButton";
import "./style.css";

export default function Settings() {
    return (<>
        
        <div id="settings-shadow"></div>
        <div id="settings-container">
            <div id="settings">
                <div id="settings-header">
                    <h1>Settings</h1>
                    <ImgButton src="/img/icons/x.svg" title="Close"/>
                </div>

                <h2>Account</h2>
                <form className="flex">
                    <input 
                        type="text" 
                        className="input input-dark" 
                        id="inp-display-name"
                        placeholder="Enter new display name..." 
                    />
                    <button className="btn btn-primary">Change name</button>
                </form>
            </div>
        </div>
         
    </>)
}
