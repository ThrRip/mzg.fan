import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <>
      <Title>Home - Solid App</Title>

      <main class="flex w-dvw h-dvh flex-col justify-center items-center">
        <a
          href="https://v2.solidjs.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-2xl text-blue-500 underline underline-blue-200 hover:underline-blue-400 transition-colors"
        >
          Learn Solid
        </a>
      </main>
    </>
  );
}
