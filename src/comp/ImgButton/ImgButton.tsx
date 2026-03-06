import "./style.css";

export default function ImgButton(props: {title: string, src: string, onClick?: () => any}) {
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
