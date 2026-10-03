import { createDB } from "mzg.fan-core/database";
import { Song } from "mzg.fan-core/domain";
import * as service from "mzg.fan-core/service";
import { createSignal, For, Loading } from "solid-js";
import { v7 } from "uuid";

export async function listSongs(): Promise<Song[]> {
  "use server";

  const db = createDB();
  const songs = await service.listSongs(db);

  return songs;
}

export async function createSong(): Promise<Song> {
  "use server";

  const db = createDB();
  const song = await service.createSong(db, "test~~" + v7(), "Suu", "zh_CN");

  return song;
}

export default function Songs() {
  const [songs, setSongs] = createSignal(() => listSongs());

  return (
    <main>
      <h1 class="mb-4 text-2xl">Songs</h1>

      <ul>
        <Loading fallback={<p>Loading...</p>}>
          <For each={songs()}>
            {(song) => (
              <li>
                {song.id}, {song.name}, {song.artist}, {song.language}
              </li>
            )}
          </For>
        </Loading>
      </ul>

      <button
        type="button"
        class="p-2 bg-blue-100"
        onClick={async () => {
          createSong();
          setSongs(await listSongs());
        }}
      >
        Create
      </button>
    </main>
  );
}
