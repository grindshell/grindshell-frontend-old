import { Accessor, Component, Setter, createContext, createEffect, createSignal, useContext } from "solid-js";

const NavBarContext = createContext<{
  visible: Accessor<boolean>,
  setVisible: Setter<boolean>
}>();

function Brand() {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error("missing NavBarContext in Burger component");
  }

  const clickHandler = () => {
    context.setVisible((prev) => !prev);
  }

  return (
    <div class="navbar-brand">
      <a class="navbar-item" href="">
        <svg height="100" width="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="gold" />
        </svg>
      </a>

      <a role="button" classList={{
        "navbar-burger": true,
        "is-active": context.visible(),
      }} aria-label="menu" aria-expanded="false" onClick={() => clickHandler()}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  )
}

function Menu() {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error("missing NavBarContext in Menu component");
  }

  return (
    <div classList={{
      "navbar-menu": true,
      "is-active": context.visible()
    }}>
      <div class="navbar-start">

      </div>
      <div class="navbar-end">

      </div>
    </div>
  )
}

function NavBar() {
  const [visible, setVisible] = createSignal(false);

  return (
    <NavBarContext.Provider value={{ visible, setVisible }}>
      <nav class="navbar is-fixed-top">
        <Brand />

        <Menu />
      </nav>
    </NavBarContext.Provider>

  )
}

export default NavBar;
