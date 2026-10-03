import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema",

  dialect: "sqlite",
  dbCredentials: {
    url: "file:/tmp/mzg.fan/db.sqlite",
  },
});
