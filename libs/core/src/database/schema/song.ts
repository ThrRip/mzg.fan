import { text } from "drizzle-orm/sqlite-core/columns";
import { sqliteTable } from "drizzle-orm/sqlite-core/table";

export const songTable = sqliteTable("song", {
  id: text().primaryKey(),
  name: text().notNull().unique(),
  artist: text().notNull(),
  language: text().notNull(),
});
