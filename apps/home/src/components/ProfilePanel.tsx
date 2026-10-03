import { BILI_ROOM_ID, BILI_UID } from "../config";
import profilePicAvif from "../assets/img/profile-pic.avif";
import profilePicWebp from "../assets/img/profile-pic.webp";

export default function ProfilePanel() {
  return (
    <section class="portrait:h-dscreen flex flex-col items-center justify-center gap-y-14 max-xl:landscape:gap-y-4">
      <picture class="aspect-square w-1/2 2xl:max-w-[15rem] max-xl:landscape:w-1/3">
        <source srcset={profilePicAvif} type="image/avif" />
        <img src={profilePicWebp} alt="洺知-故犯的头像" class="rounded-[15%]" />
      </picture>
      <h1 class="text-white-alt text-7xl font-light portrait:text-6xl max-xl:landscape:text-4xl">
        洺知-故犯
      </h1>
      <div class="*:bg-blue hover:*:bg-blue-a focus-visible:*:outline-blue-a flex flex-col gap-y-4 *:flex *:h-12 *:w-54 *:flex-row *:items-center *:justify-between *:gap-x-2 *:rounded-xl *:px-2.5 *:text-white *:transition focus-visible:*:outline-2 focus-visible:*:outline-offset-3 active:*:scale-95 max-xl:landscape:gap-y-1 max-xl:landscape:*:h-10 max-xl:landscape:*:px-1.5">
        <a
          href={`https://space.bilibili.com/${BILI_UID}`}
          target="_blank"
          rel="noopener noreferrer"
          class="*:grid *:size-8 *:place-items-center"
        >
          <span>
            <span class="i-fa6-brands-bilibili" />
          </span>
          哔哩哔哩主页
          <span>
            <span class="i-fa6-solid-arrow-up-right-from-square" />
          </span>
        </a>
        <a
          href={`https://live.bilibili.com/${BILI_ROOM_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          class="*:grid *:size-8 *:place-items-center"
        >
          <span>
            <span class="i-fa6-solid-podcast text-5" />
          </span>
          直播间
          <span>
            <span class="i-fa6-solid-arrow-up-right-from-square" />
          </span>
        </a>
        <a href="#playlist" class="*:grid *:size-8 *:place-items-center landscape:hidden">
          <span>
            <span class="i-fa6-solid-list" />
          </span>
          歌单
          <span>
            <span class="i-fa6-solid-arrow-down" />
          </span>
        </a>
      </div>
    </section>
  );
}
