import { For } from "solid-js";
import { playlist } from "../data/songs";

export default function Playlist() {
  return (
    <section
      id="playlist"
      class="landscape:3xl:pr-0 portrait:h-dscreen grid grid-cols-1 grid-rows-[auto_1fr] gap-y-8 overflow-y-hidden portrait:gap-y-6 portrait:px-6 portrait:pt-10 portrait:pb-6 landscape:pr-10 landscape:xl:pr-12 landscape:2xl:pr-20"
    >
      <header class="grid-areas-stack landscape:3xl:h-48 landscape:5xl:h-52 grid h-36 place-items-center landscape:h-20 landscape:xl:h-36 landscape:2xl:h-40">
        <svg viewBox="0 0 512 512" aria-hidden="true" class="text-pink-l h-full w-full">
          <path
            fill="currentColor"
            d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v336c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147l-256 76.8V432c0 44.2-43 80-96 80S0 476.2 0 432s43-80 96-80c11.2 0 22 1.6 32 4.6V128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5"
          />
        </svg>
        <h2 class="text-brown -mr-2 text-6xl font-light tracking-wider portrait:text-5xl max-xl:landscape:text-3xl">
          歌单
        </h2>
      </header>
      <div class="grid h-full grid-rows-[auto_1fr] overflow-y-hidden rounded-2xl text-black">
        <div class="bg-gray scrollbar grid h-12 scrollbar-thumb-transparent grid-cols-[0.55fr_0.45fr_5rem_5.5rem] grid-rows-1 content-center px-2 *:flex *:h-full *:flex-row *:items-center *:gap-x-1 *:pl-4 portrait:h-16 portrait:grid-cols-[1fr_3.5rem_4.5rem] portrait:grid-rows-[0.55fr_0.45fr] portrait:*:pl-3 landscape:overflow-y-scroll">
          <button
            type="button"
            class="portrait:pt-3 portrait:pb-0.5 portrait:leading-snug"
            title="按歌名排序"
          >
            歌名
          </button>
          <button
            type="button"
            class="portrait:order-4 portrait:pb-2.5 portrait:text-xs"
            title="按歌手排序"
          >
            歌手
          </button>
          <button type="button" class="portrait:row-span-2" title="按 SC 要求排序">
            SC
          </button>
          <button type="button" class="portrait:row-span-2" title="按语言排序">
            语言
          </button>
        </div>
        <div class="grid-areas-stack grid h-full overflow-y-hidden">
          <div class="bg-white-alta/75 border-gray order-2 grid h-12 grid-cols-[1fr_auto_auto] items-center gap-x-0.5 gap-y-1.5 self-end overflow-y-hidden border-t px-2 py-1.5 backdrop-blur transition-[height] duration-300 portrait:grid-rows-[2.25rem_2.625rem]">
            <span class="pl-4 portrait:pl-3">共 {playlist.length} 首歌</span>
            <div class="grid-areas-stack grid justify-items-end portrait:hidden">
              <button
                type="button"
                class="grid-areas-stack hover:bg-gray/75 z-30 grid h-full max-w-24 justify-self-end overflow-hidden rounded-lg transition-[max-width,height,background-color,transform] duration-300 active:scale-90"
              >
                <span class="flex flex-row items-center gap-x-0.5 pr-2.5 pl-0.5 text-nowrap transition-[padding-left] duration-200">
                  <span class="grid-areas-stack grid size-9 place-items-center transition-[width,height] duration-200">
                    <span class="i-fa6-solid-magnifying-glass" />
                  </span>
                  搜索
                </span>
              </button>
            </div>
            <button
              type="button"
              class="grid-areas-stack hover:bg-gray/75 grid justify-self-end overflow-x-hidden rounded-lg transition-[width,background-color,transform] duration-200 active:scale-95 landscape:hidden"
            >
              <span class="flex flex-row items-center gap-x-0.5 pr-2.5 pl-0.5">
                <span class="grid size-9 place-items-center">
                  <span class="i-fa6-solid-magnifying-glass" />
                </span>
                搜索
              </span>
            </button>
            <button
              type="button"
              class="hover:bg-gray/75 flex flex-row items-center gap-x-0.5 rounded-lg pr-2.5 pl-0.5 transition duration-200 active:scale-95"
            >
              <span class="grid size-9 place-items-center">
                <span class="i-fa6-solid-dice" />
              </span>
              随机
            </button>
          </div>
          <div class="bg-white-alta scrollbar scrollbar-thumb-gray-alt flex flex-col overflow-y-scroll px-2 pt-2.5 pb-14 *:grid *:grid-cols-[0.55fr_0.45fr_5rem_5.5rem] *:grid-rows-1 portrait:gap-y-5 portrait:pt-4 portrait:pb-16 *:portrait:grid-cols-[1fr_3.5rem_4.5rem] *:portrait:grid-rows-[auto_auto]">
            <For each={playlist}>
              {(song) => (
                <div class="*:flex *:h-full *:flex-row">
                  <span class="items-center gap-x-3 px-4 portrait:px-3 portrait:py-0.5 portrait:leading-snug">
                    {song.name}
                  </span>
                  <span class="items-center px-4 portrait:order-4 portrait:px-3 portrait:text-xs landscape:py-2">
                    {song.artist}
                  </span>
                  {song.paymentRequired && (
                    <span class="px-4 portrait:row-span-2 portrait:px-3">
                      <span
                        class="flex flex-col items-center justify-center"
                        title={song.paymentAmount != null ? `需要 ${song.paymentAmount} 元 SC` : ""}
                      >
                        <span class="i-fa6-solid-comment-dollar size-5" />
                        {song.paymentAmount != null && (
                          <span class="text-[0.625rem] leading-snug">¥{song.paymentAmount}</span>
                        )}
                      </span>
                    </span>
                  )}
                  <span class="col-start-4 items-center py-2 pl-4 portrait:col-start-3 portrait:row-span-2 portrait:pl-3">
                    {song.language}
                  </span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
}
