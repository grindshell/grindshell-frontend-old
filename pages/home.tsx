import { render } from "solid-js/web";
import { Show, createEffect, createSignal, onMount } from "solid-js";

import "bulma/css/bulma.min.css";

import Footer from "@components/footer";

const NAV_BAR_SPACER_CLASS = "has-navbar-fixed-top";
const GAME_PAGE = "/game";

/**
 * Helper function for getting the body element.
 * 
 * @returns the `<body>` element
 */
function getBodyElement() {
  const root = document.getElementById("root") as HTMLElement;
  const body = root.parentElement as HTMLElement;

  return body;
}

async function register(email: string, username: string, password: string): Promise<boolean> {
  // TODO add browser information

  const body = {
    email,
    username,
    password
  };

  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (response.status !== 201) {
    return false;
  }

  const data = await response.json();

  if (!("session_id" in data)) {
    return false;
  }

  return true;
}

async function login(username: string, password: string): Promise<boolean> {
  // TODO stub

  return true;
}

type SubmissionFormProps = {
  showLogin: boolean
};

function SubmissionForm(props: SubmissionFormProps) {
  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [canSubmit, setCanSubmit] = createSignal(false);

  createEffect(() => {
    setCanSubmit(() => username().length !== 0 && password().length !== 0 &&
      (props.showLogin ? true : email().length !== 0));
  });

  return <form onSubmit={async (e) => {
    e.preventDefault();
    const isSuccess = props.showLogin ?
      await login(username(), password()) :
      await register(email(), username(), password());

    if (isSuccess) {
      getBodyElement().classList.add(NAV_BAR_SPACER_CLASS);

      window.location.assign(GAME_PAGE);
    } else {
      // TODO stub
    }
  }}>
    <Show when={!props.showLogin}>
      <input
        class="input mb-2"
        placeholder="Email@address.com"
        type="email"
        value={email()}
        onInput={(e) => setEmail(e.target.value)} />
    </Show>
    <input
      class="input mb-2"
      placeholder="Username"
      value={username()}
      type="text" onInput={(e) => setUsername(e.target.value)} />
    <input
      class="input mb-2"
      placeholder="Password"
      value={password()}
      type="password" onInput={(e) => setPassword(e.target.value)} />
    <input
      class="button mb-2"
      type="submit"
      disabled={!canSubmit()} />
  </form>
}

function Home() {
  onMount(() => {
    getBodyElement().classList.remove(NAV_BAR_SPACER_CLASS)
  })

  const [showLogin, setShowLogin] = createSignal(true);

  return (
    <>
      <section class="hero mlrt-6" style="padding: 5%">
        <div class="columns is-multiline">
          <div class="column p-6">
            <div class="container has-text-centered">
              <h1 class="title is-1">Grindshell</h1>
              <h2 class="subtitle is-4">Infinite grinding</h2>
            </div>
            <button class="button" onClick={() => {
              window.location.assign(GAME_PAGE);
            }} />
          </div>

          <div class="column p-6">
            <div class="container has-text-centered">
              <button
                class="button is-4 m-1"
                role="button"
                onClick={() => setShowLogin(true)}
                disabled={showLogin()}
              >
                Login
              </button>
              <button
                class="button is-4 m-1"
                role="button"
                onClick={() => setShowLogin(false)}
                disabled={!showLogin()}
              >
                Register
              </button>
              <div class="container mt-2">
                <SubmissionForm showLogin={showLogin()} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home;
