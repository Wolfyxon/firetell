import HomeHeader from "@/comp/HomeHeader/HomeHeader";
import Page from "./Page";
import HomeFooter from "@/comp/HomeFooter/HomeFooter";

export function PublicPage(props: {children?: any}) {
    return (
        <>
            <HomeHeader />
            <Page>{props.children}</Page>
            <HomeFooter />
        </>
    )
}