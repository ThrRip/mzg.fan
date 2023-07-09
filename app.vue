<template>
  <main
    class="portrait:overflow-y-auto landscape:grid landscape:grid-cols-[36vw_1fr]
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
      ref="viewPlaylistArea"
      class="overflow-y-hidden grid grid-cols-1 grid-rows-[auto_1fr] portrait:grid-rows-[auto_auto_1fr]
      gap-y-8 portrait:gap-y-6 portrait:px-6 portrait:py-1 justify-items-stretch portrait:pt-10
      landscape:pr-10 landscape:xl:pr-12 landscape:2xl:pr-20 landscape:3xl:pr-0 portrait:h-screen"
    >
      <header
        class="grid grid-areas-stack place-items-center
        h-36 landscape:h-20 landscape:xl:h-36 landscape:2xl:h-40 landscape:3xl:h-48 landscape:5xl:h-52"
      >
        <ClientOnly>
          <font-awesome-icon :icon="['fas', 'music']" class="min-h-full text-pink-l" />
        </ClientOnly>
        <span class="-mr-2 max-xl:landscape:text-3xl portrait:text-5xl text-6xl font-light tracking-wider text-brown">歌单</span>
      </header>
      <div class="overflow-y-hidden grid grid-rows-[auto_1fr] landscape:col-span-2 h-full text-black rounded-2xl">
        <div
          class="overflow-y-scroll grid grid-cols-[0.55fr_0.45fr_5rem_5.5rem] portrait:grid-cols-[1fr_3.5rem_4.5rem]
          grid-rows-1 portrait:grid-rows-[1.625rem_1rem] content-center
          px-2 h-12 portrait:h-16 bg-gray scrollbar scrollbar-thumb-transparent scrollbar-track-transparent"
        >
          <button
            class="flex flex-row gap-x-2 items-center px-4 portrait:px-3 py-2 portrait:py-0.5 portrait:leading-snug h-full"
            @click="viewPlaylistToggleSorting('name')"
          >
            歌名
            <ClientOnly>
              <font-awesome-icon
                :icon="['fas', 'caret-up']"
                class="mt-px opacity-0 transition"
                :class="{
                  'opacity-100': viewPlaylistSortingColumn === 'name',
                  'rotate-180': viewPlaylistSortingOrder === 'descending'
                }"
              />
            </ClientOnly>
          </button>
          <button
            class="flex flex-row portrait:order-4 gap-x-2 items-center px-4 portrait:px-3 landscape:py-2 h-full portrait:text-xs"
            @click="viewPlaylistToggleSorting('artist')"
          >
            歌手
            <ClientOnly>
              <font-awesome-icon
                :icon="['fas', 'caret-up']"
                class="mt-px opacity-0 transition"
                :class="{
                  'opacity-100': viewPlaylistSortingColumn === 'artist',
                  'rotate-180': viewPlaylistSortingOrder === 'descending'
                }"
              />
            </ClientOnly>
          </button>
          <span class="flex flex-row portrait:row-span-2 gap-x-2 items-center px-4 portrait:px-3 h-full">
            SC
          </span>
          <span class="flex flex-row portrait:row-span-2 gap-x-2 items-center pl-4 portrait:pl-3 py-2 h-full">
            语言
          </span>
        </div>
        <div class="overflow-y-hidden grid grid-areas-stack h-full">
          <div
            ref="viewPlaylistList"
            class="overflow-y-auto flex flex-col portrait:gap-y-5 pt-2.5 portrait:pt-4 pb-14 portrait:pb-16 bg-white-alta"
          >
            <transition-group move-class="transition-transform duration-[1300ms]">
              <div
                v-for="song in viewPlaylistData"
                :key="song.$id"
                class="grid grid-cols-[0.55fr_0.45fr_5rem_5.5rem] portrait:grid-cols-[1fr_3.5rem_4.5rem]
              grid-rows-1 portrait:grid-rows-[auto_auto] px-2"
              >
                <span class="flex flex-row items-center px-4 portrait:px-3 py-2 portrait:py-0.5 portrait:leading-snug h-full">
                  {{ song.name }}
                </span>
                <span class="flex flex-row portrait:order-4 items-center px-4 portrait:px-3 landscape:py-2 h-full portrait:text-xs">
                  {{ song.artist }}
                </span>
                <span class="flex flex-row portrait:row-span-2 items-center px-4 portrait:px-3 h-full">
                  <font-awesome-icon v-if="song.payment_required" :icon="['fas', 'comment-dollar']" class="!h-5" />
                </span>
                <span class="flex flex-row portrait:row-span-2 items-center pl-4 portrait:pl-3 py-2 h-full">
                  {{ song.language }}
                </span>
              </div>
            </transition-group>
          </div>
          <div class="flex flex-row justify-between items-center self-end pl-6 pr-2.5 py-1.5 h-12 bg-white-alta/75 border-t border-gray backdrop-blur">
            共 {{ viewPlaylistCountTotal }} 首歌
            <span v-if="viewPlaylistCountTotal !== viewPlaylistCountDisplayed">
              ，已显示 {{ viewPlaylistCountDisplayed }} 首
            </span>
            <button
              class="aspect-square flex flex-row justify-center items-center h-full rounded-lg hover:bg-gray
              transition active:scale-95 duration-200"
              @click="viewPlaylistReshuffle"
            >
              <ClientOnly>
                <font-awesome-icon :icon="['fas', 'dice']" />
              </ClientOnly>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Client, Databases, Query } from 'appwrite'
import { pinyin } from 'pinyin-pro'

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
const viewPlaylistArea = ref()
function scrollToPlaylist () {
  window.scroll({
    top: viewPlaylistArea.value.getBoundingClientRect().top,
    behavior: 'smooth'
  })
}

const viewPlaylistList = ref()

type PlaylistColumn = 'name' | 'artist'
type PlaylistSortingOrder = 'ascending' | 'descending'
const viewPlaylistSortingColumn = ref<null | PlaylistColumn>(null)
const viewPlaylistSortingOrder = ref<PlaylistSortingOrder>('ascending')
function viewPlaylistToggleSorting (column: PlaylistColumn) {
  if (viewPlaylistSortingColumn.value === null || column !== viewPlaylistSortingColumn.value) {
    viewPlaylistSortingColumn.value = column
    viewPlaylistSortingOrder.value = 'ascending'
  } else if (viewPlaylistSortingOrder.value === 'ascending') {
    viewPlaylistSortingOrder.value = 'descending'
  } else {
    viewPlaylistSortingColumn.value = null
    setTimeout(() => { viewPlaylistSortingOrder.value = 'ascending' }, 150)
  }
}

const viewPlaylistData = computed<Playlist>(() => {
  interface SortingSong extends Song {
    namePinyin?: string
    artistPinyin?: string
    languageCode?: string
  }
  let playlist: Array<SortingSong> = []
  if (backendPlaylist.value.length !== 0) {
    // eslint-disable-next-line no-unused-expressions
    viewPlaylistShuffles.value
    // Shuffle if not sorting
    if (viewPlaylistSortingColumn.value === null) {
      playlist = backendPlaylist.value.slice()
      let currentSong = playlist.length
      while (currentSong !== 0) {
        const targetSong = Math.floor(Math.random() * currentSong)
        currentSong--
        const targetSongBackup = Object.assign({}, playlist[targetSong])
        playlist[targetSong] = playlist[currentSong]
        playlist[currentSong] = targetSongBackup
      }
    }
    if (viewPlaylistSortingColumn.value !== null) {
      const orderModifier = viewPlaylistSortingOrder.value === 'ascending' ? 1 : -1
      // Sort by name or artist in alphabetical order
      if (viewPlaylistSortingColumn.value === 'name' || viewPlaylistSortingColumn.value === 'artist') {
        backendPlaylist.value.forEach((song: SortingSong) => {
          // @ts-ignore
          song[`${viewPlaylistSortingColumn.value}Pinyin`] =
            // @ts-ignore
            pinyin(song[viewPlaylistSortingColumn.value], { toneType: 'none', nonZh: 'consecutive' })
              .replace('/ /g', '')
          playlist.push(song)
        })
        playlist.sort((a, b) => {
          // @ts-ignore
          if (a[`${viewPlaylistSortingColumn.value}Pinyin`] < b[`${viewPlaylistSortingColumn.value}Pinyin`]) {
            return -1 * orderModifier
          }
          // @ts-ignore
          if (a[`${viewPlaylistSortingColumn.value}Pinyin`] > b[`${viewPlaylistSortingColumn.value}Pinyin`]) {
            return 1 * orderModifier
          }
          return 0
        })
      }
    }
  }
  return playlist
})
// Reshuffles can also be triggered manually
const viewPlaylistShuffles = ref(0)
function viewPlaylistReshuffle () {
  viewPlaylistSortingColumn.value = null
  setTimeout(() => { viewPlaylistSortingOrder.value = 'ascending' }, 150)
  viewPlaylistShuffles.value++
}

const viewPlaylistCountTotal = computed<number>(() => backendPlaylist.value.length)
const viewPlaylistCountDisplayed = computed<number>(() => viewPlaylistData.value.length)
</script>
