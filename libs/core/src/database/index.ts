import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";

export function createDB(): LibSQLDatabase {
  return drizzle("file:/tmp/mzg.fan/db.sqlite");
}
