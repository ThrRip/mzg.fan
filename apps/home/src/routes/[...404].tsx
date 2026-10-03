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

      <main class="flex h-dvh w-dvw items-center justify-center">
        <h1 class="font-italic text-4xl font-semibold text-blue-400">Page Not Found</h1>
      </main>
    </>
  );
}
