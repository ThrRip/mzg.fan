import { LibSQLDatabase } from "drizzle-orm/libsql";
import * as domain from "../domain";
import { songTable } from "../database/schema/song";
import { eq } from "drizzle-orm";

export async function createSong(
  db: LibSQLDatabase,
  name: string,
  artist: string,
  language: string,
): Promise<domain.Song> {
  let song = domain.createSong(name, artist, language);

  song = (await db.insert(songTable).values(song).returning())[0];

  return song;
}

export async function getSong(db: LibSQLDatabase, id: string): Promise<domain.Song | null> {
  const songs = await db.select().from(songTable).where(eq(songTable.id, id));

  return songs[0] ?? null;
}

export async function listSongs(db: LibSQLDatabase): Promise<domain.Song[]> {
  const songs = await db.select().from(songTable);

  return songs;
}

export async function deleteSongs(db: LibSQLDatabase, id: string): Promise<void> {
  await db.delete(songTable).where(eq(songTable.id, id));
}
