import "@/style/main.css";

export default function Page(props: {children?: any}) {
    return (
        <main id="main">
            {props.children}
        </main>
    );
}
