<template>
  <main
    class="overflow-y-auto landscape:grid landscape:grid-cols-[36vw_1fr]
    gap-x-14 lg:gap-x-16 xl:gap-x-28 2xl:gap-x-40 3xl:gap-x-6
    landscape:3xl:px-40 landscape:5xl:px-64 landscape:py-7 landscape:2xl:py-16 landscape:5xl:py-28
    landscape:h-screen bg-white-alt bg-center bg-cover bg-inline-areas portrait:bg-inline-areas-vertical"
  >
    <section class="flex flex-col max-xl:landscape:gap-y-4 gap-y-14 justify-center items-center portrait:h-screen">
      <picture class="aspect-square max-xl:landscape:w-1/3 w-1/2 2xl:max-w-[15rem]">
        <source srcset="~/assets/img/profile-pic.avif" type="image/avif">
        <img src="~/assets/img/profile-pic.webp" alt="洺知-故犯的头像" class="rounded-[15%]">
      </picture>
      <h1 class="max-xl:landscape:text-4xl portrait:text-6xl text-7xl font-light text-white-alt">
        洺知-故犯
      </h1>
      <div class="flex flex-col max-xl:landscape:gap-y-1 gap-y-4">
        <NuxtLink
          to="https://space.bilibili.com/32159860"
          target="_blank"
          class="flex flex-row gap-x-2 justify-between items-center
          max-xl:landscape:px-1.5 px-2.5 w-54 max-xl:landscape:h-10 h-12
          text-white bg-blue hover:bg-blue-a focus:outline outline-2 outline-offset-3 outline-blue-a rounded-xl
          transition active:scale-95"
        >
          <span class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fab', 'bilibili']" />
            </ClientOnly>
          </span>
          哔哩哔哩主页
          <span class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
            </ClientOnly>
          </span>
        </NuxtLink>
        <NuxtLink
          to="https://live.bilibili.com/1267105"
          target="_blank"
          class="flex flex-row gap-x-2 justify-between items-center
          max-xl:landscape:px-1.5 px-2.5 w-54 max-xl:landscape:h-10 h-12
          text-white bg-blue hover:bg-blue-a focus:outline outline-2 outline-offset-3 outline-blue-a rounded-xl
          transition active:scale-95"
        >
          <span v-if="!biliApiLiveStatus" class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'podcast']" class="!h-5" />
            </ClientOnly>
          </span>
          <span v-if="biliApiLiveStatus" class="aspect-square flex flex-col justify-center items-center h-8">
            <ClientOnly>
              <span class="overflow-hidden max-h-[1.2rem]">
                <font-awesome-icon :icon="['fas', 'podcast']" class="!h-[1.125rem]" />
              </span>
              <span class="text-[0.5rem] leading-snug">
                直播中
              </span>
            </ClientOnly>
          </span>
          直播间
          <span class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
            </ClientOnly>
          </span>
        </NuxtLink>
        <NuxtLink
          to="https://space.bilibili.com/391500490"
          target="_blank"
          class="flex flex-row gap-x-2 justify-between items-center
          max-xl:landscape:px-1.5 px-2.5 w-54 max-xl:landscape:h-10 h-12
          text-white bg-blue hover:bg-blue-a focus:outline outline-2 outline-offset-3 outline-blue-a rounded-xl
          transition active:scale-95"
        >
          <span class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'video']" />
            </ClientOnly>
          </span>
          录播组
          <span class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
            </ClientOnly>
          </span>
        </NuxtLink>
        <button
          class="landscape:hidden flex flex-row gap-x-2 justify-between items-center
          max-xl:landscape:px-1.5 px-2.5 w-54 max-xl:landscape:h-10 h-12
          text-white bg-blue hover:bg-blue-a focus:outline outline-2 outline-offset-3 outline-blue-a rounded-xl
          transition active:scale-95"
          @click="scrollToPlaylist"
        >
          <span class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'list']" />
            </ClientOnly>
          </span>
          歌单
          <span class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </ClientOnly>
          </span>
        </button>
      </div>
    </section>
    <section
      ref="viewPlaylist"
      class="grid grid-cols-[auto_1fr] portrait:grid-cols-1 grid-rows-[auto_1fr] portrait:grid-rows-[auto_auto_1fr]
      justify-center portrait:p-8 portrait:pt-12
      landscape:pr-10 landscape:xl:pr-12 landscape:2xl:pr-20 landscape:3xl:pr-0 portrait:h-screen"
    >
      <header
        class="aspect-square grid grid-areas-[playlist-hero] place-items-center
        portrait:w-full h-36 landscape:h-20 landscape:xl:h-36 landscape:2xl:h-40 landscape:3xl:h-48 landscape:5xl:h-52"
      >
        <ClientOnly>
          <font-awesome-icon :icon="['fas', 'music']" class="!h-full text-pink-l" />
        </ClientOnly>
        <span class="-mr-2 max-xl:landscape:text-3xl portrait:text-5xl text-6xl font-light tracking-wider text-brown">歌单</span>
      </header>
      <div />
      <div class="landscape:col-span-2" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { Client, Databases, Query } from 'appwrite'

// Live status
const { data: biliApiRoomPlayInfo } = await useFetch<{
  data: {
    live_status: 0 | 1
    [key: string]: any
  }
}>(
  useAppConfig().biliApiRoomPlayInfoEndpoint,
  { query: useAppConfig().biliApiRoomPlayInfoEndpointQueries }
)
const biliApiLiveStatus = ref<0 | 1 | undefined>(biliApiRoomPlayInfo.value?.data.live_status)

// Backend
const backendClient = new Client()
const backendDatabases = new Databases(backendClient)
backendClient.setEndpoint(useAppConfig().backendBase)
  .setProject(useAppConfig().backendProjectId)

interface Song {
  hidden?: false
  name?: string
  artist?: string
  language?: string
  payment_required?: boolean
  $id: string
  $createdAt: string
}
type Playlist = Array<Song>

const backendPlaylist = ref<Playlist>([])
const backendFetchPlaylistState = ref<'processing' | 'succeeded' | 'failed'>('processing')

backendDatabases.listDocuments('home', 'playlist', [Query.limit(1000)])
  .then(
    (res) => {
      backendFetchPlaylistState.value = 'succeeded'
      backendPlaylist.value = res.documents
    },
    () => {
      backendFetchPlaylistState.value = 'failed'
    }
  )

// View
const viewPlaylist = ref()
function scrollToPlaylist () {
  window.scroll({
    top: viewPlaylist.value.getBoundingClientRect().top,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.grid-areas-\[playlist-hero\] {
  grid-template-areas: "playlist-hero";
}

.grid-areas-\[playlist-hero\] > * {
  grid-area: playlist-hero;
}
</style>
