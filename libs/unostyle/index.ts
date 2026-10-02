import { defineConfig, presetWind4, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [presetWind4()],
  transformers: [transformerDirectives()],
});
