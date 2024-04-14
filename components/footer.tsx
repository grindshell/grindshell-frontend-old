import { Show } from "solid-js";

function Footer() {
  const date = new Date(Date.now());
  const isDesktop = "__TAURI__" in window;

  return (
    <footer class="footer mt-auto">
      <div class="content has-text-centered">
        <p>
          <strong>Grindshell</strong> <Show when={isDesktop} fallback={"web"}>
            desktop
          </Show> by <a href="https://github.com/you-win">youwin</a>.
        </p>

        <p>
          Copyright youwin {date.getFullYear()}.
        </p>
      </div>
    </footer>
  )
}

export default Footer;
