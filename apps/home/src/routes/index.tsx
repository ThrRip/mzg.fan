import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <>
      <Title>Home - Solid App</Title>

      <main class="flex h-dvh w-dvw flex-col items-center justify-center">
        <a
          href="https://v2.solidjs.com"
          target="_blank"
          rel="noopener noreferrer"
          class="underline-blue-200 hover:underline-blue-400 text-2xl text-blue-500 underline transition-colors"
        >
          Learn Solid
        </a>
      </main>
    </>
  );
}
