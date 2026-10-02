import { defineConfig } from "oxlint";
// @ts-expect-error: TS5097 - Oxlint needs a full import path
import baseConfig from "../../oxlint.config.ts";
import solidV2 from "eslint-plugin-solid/configs/v2";

export default defineConfig({
  extends: [baseConfig],

  jsPlugins: ["eslint-plugin-solid"],
  ignorePatterns: ["**/*.gen.*", "dist"],
  settings: solidV2.settings,
  rules: solidV2.rules,
});
