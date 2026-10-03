/// <reference types="node" />
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  defineConfig,
  extractorSplit,
  presetIcons,
  presetWind4,
  transformerDirectives,
} from "unocss";

// Global styles live in real .css files next to this config (syntax
// highlighting, no template-string blobs) and are injected through preflights
// at module load, so consumers need no extra imports.
//
// NOTE: this requires Node >= 22.6 — the UnoCSS config loader (unconfig/jiti)
// takes the native ESM path there; its CJS-transform fallback cannot parse
// `import.meta` syntax. The nix dev shell pins nodejs_24.

const baseCssPath = fileURLToPath(new URL("./base.css", import.meta.url));
const utilitiesCssPath = fileURLToPath(new URL("./utilities.css", import.meta.url));
const baseCss = readFileSync(baseCssPath, "utf8");
const utilitiesCss = readFileSync(utilitiesCssPath, "utf8");

// Solid's template compiler may emit single-value static attributes unquoted
// (e.g. `<span class=p-2></span>`); the default extractor does not split those
// out of the surrounding markup, so utilities declared as the only class of an
// element would be missed. Extract them explicitly.
const unquotedClassExtractor = {
  name: "unquoted-class",
  async extract({ code }: { code: string }) {
    const tokens = new Set<string>();
    for (const match of code.matchAll(/\bclass=([^"'`\s<>]+)/g)) {
      for (const token of match[1].split(/\s+/)) {
        if (token) {
          tokens.add(token);
        }
      }
    }
    return tokens;
  },
};

export default defineConfig({
  // Watch the injected CSS files in dev so editing them reloads the config.
  configDeps: [baseCssPath, utilitiesCssPath],

  presets: [
    presetWind4(),
    presetIcons({
      collections: {
        "fa6-brands": () =>
          import("@iconify-json/fa6-brands/icons.json", { with: { type: "json" } }).then(
            (m) => m.default,
          ),
        "fa6-solid": () =>
          import("@iconify-json/fa6-solid/icons.json", { with: { type: "json" } }).then(
            (m) => m.default,
          ),
      },
    }),
  ],

  transformers: [transformerDirectives()],

  extractors: [unquotedClassExtractor, extractorSplit],

  theme: {
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",

      blue: { l: "#89c1cf", DEFAULT: "#6caebf", a: "#5194a7", alt: "#3b7a91" },
      pink: { l: "#fed3c8", la: "#f2beb1" },
      brown: { DEFAULT: "#493437" },
      white: { DEFAULT: "#fefaf7", alt: "#efeaf1", alta: "#f3f1f6" },
      gray: { DEFAULT: "#e7e2e9", alt: "#cec8d0" },
      black: { DEFAULT: "#433a47", a: "#352939" },
    },

    breakpoint: {
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
      "3xl": "135rem",
      "5xl": "240rem",
    },
  },

  rules: [
    [
      /^h-dscreen$/,
      () => [
        ["height", "100vh"],
        ["height", "100dvh"],
      ],
    ],
    [
      /^h-2dscreen$/,
      () => [
        ["height", "200vh"],
        ["height", "200dvh"],
      ],
    ],
    [
      /^h-dscreen\+$/,
      () => [
        ["height", "calc(100vh + 1px)"],
        ["height", "calc(100dvh + 1px)"],
      ],
    ],
    [/^grid-areas-stack$/, () => ({ "grid-template-areas": '"stack"' })],
    [
      /^scrollbar-thumb-([a-z0-9-]+)$/,
      ([, colorName], context) => {
        const node = (colorName.includes("-") ? colorName.split("-") : [colorName]).reduce(
          (acc: unknown, key: string) =>
            (acc as Record<string, unknown> | undefined)?.[key] ??
            (key === "DEFAULT" ? undefined : (acc as Record<string, unknown>)?.DEFAULT),
          (context.theme as Record<string, unknown>).colors,
        );
        if (typeof node !== "string") {
          return;
        }
        return { [`--scrollbar-thumb`]: `${node} !important` };
      },
    ],
  ],

  preflights: [
    { layer: "base", getCSS: () => baseCss },
    { layer: "utilities", getCSS: () => utilitiesCss },
  ],
});
