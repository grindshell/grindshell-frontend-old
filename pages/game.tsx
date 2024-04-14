import { render } from "solid-js/web";

import "bulma/css/bulma.min.css";

import Footer from "@components/footer";
import NavBar from "@components/navBar";

function Game() {
  return (
    <>
      <NavBar />
    </>
  )
}

render(() => (
  <>
    <Game />
    <Footer />
  </>
), document.getElementById("root") as HTMLElement);
