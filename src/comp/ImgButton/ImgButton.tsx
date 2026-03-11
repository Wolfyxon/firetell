import "./style.css";

export default function ImgButton(props: {title: string, src: string, href?: string, onClick?: () => any}) {
    if(props.href) {
        return (
            <a
                className="img-btn" 
                title="Settings" 
                href={props.href}
                onClick={props.onClick}
            >
                <img title={props.title} src={props.src}/>
            </a>
        )
    }
    
    return (
        <div
            className="img-btn" 
            title="Settings" 
            tabIndex={0} 
            onClick={props.onClick}
        >
            <img title={props.title} src={props.src}/>
        </div>
    )
}
