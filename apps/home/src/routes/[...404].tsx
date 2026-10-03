import { Title } from "@solidjs/meta";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";

// The catch-all route. httpStatus() is a no-op in the browser and takes
// effect when SSR is enabled; it runs in preload so the status code is set
// before the response head flushes.
export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <>
      <Title>Not Found - Solid App</Title>

      <main class="flex w-dvw h-dvh justify-center items-center">
        <h1 class="text-4xl font-semibold font-italic text-blue-400">Page Not Found</h1>
      </main>
    </>
  );
}
