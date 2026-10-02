import { Title } from "@solidjs/meta";
import Counter from "../components/Counter";
import logo from "../logo.svg";

export default function Home() {
  return (
    <main class="flex flex-col items-center">
      <Title>Home - Solid App</Title>
      <img src={logo} class="logo" alt="Solid logo" />
      <h1 class="mt-6 mb-4 text-3xl">Hello Solid!</h1>
      <Counter />
      <p class="mt-4 mb-1">
        Edit <code>src/routes/index.tsx</code> and save to reload.
      </p>
      <a href="https://v2.solidjs.com/" target="_blank" rel="noopener noreferrer">
        Learn Solid
      </a>
    </main>
  );
}
