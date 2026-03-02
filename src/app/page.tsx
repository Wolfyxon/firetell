import Page from "@/layouts/Page/Page";

import "@/style/home.css";

export default function Home() {
  return (
    <Page>
      <div id="banner">
        <h1 id="title">Firetell</h1>
        <p>
          A simple chat web app I made for school.
        </p>

        <div id="">
          <a href="/signup" className="btn">Sign up</a>
          <a href="/login" className="btn btn-primary">Log in</a>
        </div>
      </div>
      
    </Page>
  );
}
