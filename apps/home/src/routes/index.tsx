import { Title } from "@solidjs/meta";
import Playlist from "../components/Playlist";
import ProfilePanel from "../components/ProfilePanel";

export default function Home() {
  return (
    <>
      <Title>洺知-故犯</Title>

      <div class="h-dscreen relative scroll-smooth portrait:overflow-y-auto">
        <main class="3xl:gap-x-6 landscape:3xl:px-40 landscape:5xl:px-64 landscape:5xl:py-28 absolute z-10 w-full gap-x-14 backdrop-blur-[8rem] lg:gap-x-16 xl:gap-x-28 2xl:gap-x-40 landscape:grid landscape:h-full landscape:grid-cols-[36vw_1fr] landscape:py-7 landscape:2xl:py-16">
          <ProfilePanel />
          <Playlist />
        </main>
        <div class="portrait:h-2dscreen bg-white-alt absolute h-full w-full" />
        <div class="portrait:h-dscreen+ bg-blue-l absolute h-full w-full landscape:w-[37vw]" />
      </div>
    </>
  );
}
