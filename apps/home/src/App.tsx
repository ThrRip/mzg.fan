import { Title } from "@solidjs/meta";
import { Loading } from "solid-js";
import { Router } from "./router";
import "virtual:uno.css";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid App</Title>
          <Loading fallback={<main>Loading…</main>}>{props.children}</Loading>
        </>
      )}
    </Router>
  );
}
