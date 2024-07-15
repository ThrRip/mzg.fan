<!--
  - Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
  -
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this
  - file, You can obtain one at https://mozilla.org/MPL/2.0/.
  -->

<template>
  <div class="relative portrait:overflow-y-auto h-dscreen scroll-smooth">
    <main
      class="absolute z-10 landscape:grid landscape:grid-cols-[36vw_1fr]
      gap-x-14 lg:gap-x-16 xl:gap-x-28 2xl:gap-x-40 3xl:gap-x-6
      landscape:3xl:px-40 landscape:5xl:px-64 landscape:py-7 landscape:2xl:py-16 landscape:5xl:py-28
      w-full landscape:h-full backdrop-blur-[8rem]"
    >
      <section class="flex flex-col max-xl:landscape:gap-y-4 gap-y-14 justify-center items-center portrait:h-dscreen">
        <picture class="aspect-square max-xl:landscape:w-1/3 w-1/2 2xl:max-w-[15rem]">
          <source srcset="~/assets/img/profile-pic.avif" type="image/avif">
          <img src="~/assets/img/profile-pic.webp" alt="洺知-故犯的头像" class="rounded-[15%]">
        </picture>
        <h1 class="max-xl:landscape:text-4xl portrait:text-6xl text-7xl font-light text-white-alt">
          洺知-故犯
        </h1>
        <div
          class="flex flex-col max-xl:landscape:gap-y-1 gap-y-4
          *:flex *:flex-row *:gap-x-2 *:justify-between *:items-center max-xl:landscape:*:px-1.5 *:px-2.5
          *:w-54 max-xl:landscape:*:h-10 *:h-12 *:text-white *:bg-blue hover:*:bg-blue-a
          *:rounded-xl focus-visible:*:outline *:outline-2 *:outline-blue-a *:outline-offset-3
          *:transition active:*:scale-95"
        >
          <NuxtLink
            :to="`https://space.bilibili.com/${useAppConfig().appHomeBiliUid}`"
            target="_blank"
            class="*:flex *:flex-row *:justify-center *:items-center *:size-8"
          >
            <span><font-awesome-icon :icon="['fab', 'bilibili']" /></span>
            哔哩哔哩主页
            <span><font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" /></span>
          </NuxtLink>
          <NuxtLink
            :to="`https://live.bilibili.com/${useAppConfig().appHomeBiliRoomId}`"
            target="_blank"
            class="*:flex *:justify-center *:items-center *:size-8"
          >
            <span v-if="!biliApiLiveStatus" class="flex-row"><font-awesome-icon :icon="['fas', 'podcast']" class="!h-5" /></span>
            <span v-else class="flex-col">
              <span class="overflow-hidden min-h-[1.2rem] max-h-[1.2rem]">
                <font-awesome-icon :icon="['fas', 'podcast']" class="!h-[1.125rem]" />
              </span>
              <span class="text-[0.5rem] leading-snug">
                直播中
              </span>
            </span>
            直播间
            <span><font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" /></span>
          </NuxtLink>
          <NuxtLink
            to="#playlist"
            :external="true"
            class="landscape:hidden *:flex *:flex-row *:justify-center *:items-center *:size-8"
          >
            <span><font-awesome-icon :icon="['fas', 'list']" /></span>
            歌单
            <span><font-awesome-icon :icon="['fas', 'arrow-down']" /></span>
          </NuxtLink>
        </div>
      </section>
      <section
        id="playlist"
        class="overflow-y-hidden grid grid-cols-1 grid-rows-[auto_1fr] gap-y-8 portrait:gap-y-6
        portrait:px-6 portrait:pt-10 landscape:pr-10 landscape:xl:pr-12 landscape:2xl:pr-20 landscape:3xl:pr-0 portrait:pb-6
        portrait:h-dscreen"
      >
        <header
          class="grid grid-areas-stack place-items-center
          h-36 landscape:h-20 landscape:xl:h-36 landscape:2xl:h-40 landscape:3xl:h-48 landscape:5xl:h-52"
        >
          <font-awesome-icon :icon="['fas', 'music']" class="min-h-full text-pink-l" />
          <h2 class="-mr-2 max-xl:landscape:text-3xl portrait:text-5xl text-6xl font-light tracking-wider text-brown">
            歌单
          </h2>
        </header>
        <div class="overflow-y-hidden grid grid-rows-[auto_1fr] h-full text-black rounded-2xl">
          <div
            class="landscape:overflow-y-scroll grid grid-cols-[0.55fr_0.45fr_5rem_5.5rem] portrait:grid-cols-[1fr_3.5rem_4.5rem]
            grid-rows-1 portrait:grid-rows-[0.55fr_0.45fr] content-center px-2 h-12 portrait:h-16 bg-gray
            scrollbar scrollbar-thumb-transparent scrollbar-track-transparent
            *:flex *:flex-row *:gap-x-2 *:items-center *:h-full *:pl-4 portrait:*:pl-3"
          >
            <button
              class="portrait:pt-3 portrait:pb-0.5 portrait:leading-snug"
              title="按歌名排序"
              :aria-label="`按歌名排序${viewPlaylistSortingColumn === 'name' ?
                viewPlaylistSortingOrder === 'ascending' ? ' - 当前按歌名升序排序' :
                viewPlaylistSortingOrder === 'descending' ? ' - 当前按歌名降序排序' : '' :
                ''
              }`"
              @click="viewPlaylistToggleSorting('name')"
            >
              歌名
              <transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
              >
                <font-awesome-icon
                  v-if="viewPlaylistSortingColumn === 'name'"
                  :icon="['fas', 'caret-up']"
                  class="mt-px transition"
                  :class="{ 'rotate-180': viewPlaylistSortingOrder === 'descending' }"
                />
              </transition>
            </button>
            <button
              class="portrait:pb-2.5 portrait:order-4 portrait:text-xs"
              title="按歌手排序"
              :aria-label="`按歌手排序${viewPlaylistSortingColumn === 'artist' ?
                viewPlaylistSortingOrder === 'ascending' ? ' - 当前按歌手升序排序' :
                viewPlaylistSortingOrder === 'descending' ? ' - 当前按歌手降序排序' : '' :
                ''
              }`"
              @click="viewPlaylistToggleSorting('artist')"
            >
              歌手
              <transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
              >
                <font-awesome-icon
                  v-if="viewPlaylistSortingColumn === 'artist'"
                  :icon="['fas', 'caret-up']"
                  class="mt-px transition"
                  :class="{ 'rotate-180': viewPlaylistSortingOrder === 'descending' }"
                />
              </transition>
            </button>
            <button
              class="portrait:row-span-2"
              title="按 SC 要求排序"
              :aria-label="`按 SC 要求排序${viewPlaylistSortingColumn === 'payment_amount' ?
                viewPlaylistSortingOrder === 'descending' ? ' - 当前按 SC 要求降序排序' :
                viewPlaylistSortingOrder === 'ascending' ? ' - 当前按 SC 要求升序排序' : '' :
                ''
              }`"
              @click="viewPlaylistToggleSorting('payment_amount')"
            >
              SC
              <transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
              >
                <font-awesome-icon
                  v-if="viewPlaylistSortingColumn === 'payment_amount'"
                  :icon="['fas', 'caret-up']"
                  class="mt-px transition"
                  :class="{ 'rotate-180': viewPlaylistSortingOrder === 'descending' }"
                />
              </transition>
            </button>
            <button
              class="portrait:row-span-2"
              title="按语言排序"
              :aria-label="`按语言排序${viewPlaylistSortingColumn === 'language' ?
                viewPlaylistSortingOrder === 'ascending' ? ' - 当前按语言升序排序' :
                viewPlaylistSortingOrder === 'descending' ? ' - 当前按语言降序排序' : '' :
                ''
              }`"
              @click="viewPlaylistToggleSorting('language')"
            >
              语言
              <transition enter-from-class="opacity-0" leave-to-class="opacity-0">
                <font-awesome-icon
                  v-if="viewPlaylistSortingColumn === 'language'"
                  :icon="['fas', 'caret-up']"
                  class="mt-px transition"
                  :class="{ 'rotate-180': viewPlaylistSortingOrder === 'descending' }"
                />
              </transition>
            </button>
          </div>
          <div class="overflow-y-hidden grid grid-areas-stack h-full">
            <div
              class="flex flex-row order-2 justify-between items-center self-end pl-6 pr-2.5 py-1.5 h-12
              bg-white-alta/75 border-t border-gray backdrop-blur"
            >
              {{ `共 ${viewPlaylistCountTotal} 首歌` +
                (viewPlaylistCountTotal !== viewPlaylistCountDisplayed ? `，已显示 ${viewPlaylistCountDisplayed} 首` : '') }}
              <button
                class="aspect-square flex flex-row justify-center items-center h-full rounded-lg hover:bg-gray
                transition active:scale-95 duration-200"
                title="随机排列"
                @click="viewPlaylistDataUpdate(['shuffle'])"
              >
                <font-awesome-icon :icon="['fas', 'dice']" />
              </button>
            </div>
            <svg class="hidden"><symbol id="fas-comment-dollar"><font-awesome-icon :icon="['fas', 'comment-dollar']" /></symbol></svg>
            <transition-group
              tag="div"
              move-class="transition-transform duration-[1300ms]"
              class="overflow-y-scroll flex flex-col portrait:gap-y-5 px-2 pt-2.5 portrait:pt-4 pb-14 portrait:pb-16 bg-white-alta"
            >
              <div
                v-for="song in viewPlaylistData"
                :key="song.$id"
                class="grid grid-cols-[0.55fr_0.45fr_5rem_5.5rem] portrait:grid-cols-[1fr_3.5rem_4.5rem]
                grid-rows-1 portrait:grid-rows-[auto_auto]"
                @click="viewPlaylistCopySongName(song.name, song.$id)"
              >
                <span class="flex flex-row gap-x-3 items-center px-4 portrait:px-3 portrait:py-0.5 portrait:leading-snug h-full">
                  {{ song.name }}
                  <ClientOnly>
                    <transition-group
                      tag="span"
                      class="grid grid-areas-stack"
                      enter-from-class="opacity-0"
                      enter-active-class="transition-opacity"
                      leave-active-class="transition-opacity duration-300"
                      leave-to-class="opacity-0"
                    >
                      <font-awesome-icon
                        v-if="viewPlaylistCopySongNameState[song.$id] === 'succeeded'"
                        key="copied"
                        :icon="['fas', 'clipboard-check']"
                        class="!h-5"
                      />
                      <font-awesome-icon
                        v-if="viewPlaylistCopySongNameState[song.$id] === 'failed'"
                        key="copying-failed"
                        :icon="['fas', 'clipboard-question']"
                        class="!h-5"
                      />
                    </transition-group>
                  </ClientOnly>
                </span>
                <span class="flex flex-row portrait:order-4 items-center px-4 portrait:px-3 landscape:py-2 h-full portrait:text-xs">
                  {{ song.artist }}
                </span>
                <span v-if="song.payment_required" class="flex flex-row portrait:row-span-2 px-4 portrait:px-3 h-full">
                  <span
                    class="flex flex-col justify-center items-center"
                    :title="song.payment_amount ? `需要 ${song.payment_amount} 元 SC` : ''"
                  >
                    <svg class="size-5"><use href="#fas-comment-dollar" /></svg>
                    <span v-if="song.payment_amount" class="text-[0.625rem] leading-snug">
                      ¥{{ song.payment_amount }}
                    </span>
                  </span>
                </span>
                <span class="col-start-4 portrait:col-start-3 flex flex-row portrait:row-span-2 items-center pl-4 portrait:pl-3 py-2 h-full">
                  {{ song.language }}
                </span>
              </div>
            </transition-group>
          </div>
        </div>
      </section>
    </main>
    <div class="absolute w-full h-full portrait:h-2dscreen bg-white-alt" />
    <div class="absolute w-full landscape:w-[37vw] h-full portrait:h-dscreen+ bg-blue-l" />
  </div>
</template>

<script setup lang="ts">
import { Client, Databases, Query } from 'appwrite'

// Live status
const { data: biliApiLiveStatus } = await useFetch(
  useAppConfig().biliApiRoomPlayInfoEndpoint,
  {
    query: { room_id: useAppConfig().appHomeBiliRoomId },
    transform: (res: {
      data: {
        live_status: 0 | 1
      }
    }): boolean => (Boolean(res.data.live_status))
  }
)

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
  payment_amount?: null | number
  $id: string
}
type Playlist = Array<Song>

const { data: backendPlaylist } = await useAsyncData<Playlist>(
  'backend-databases-home-playlist',
  // @ts-expect-error
  () => backendDatabases.listDocuments('home', 'playlist', [
    useAppConfig().monitoringDataCollectorUserAgentMatch.test(useRequestHeader('user-agent') ?? '') ?
      Query.limit(1) :
      Query.limit(useAppConfig().backendQueryResultsLimit)
  ]),
  {
    default: () => [],
    transform: (res: { total: number, documents: Playlist }): Playlist => res.documents
  }
)

// View
type PlaylistColumn = 'name' | 'artist' | 'payment_amount' | 'language'
interface SortingSong extends Song {
  namePinyin?: string
  artistPinyin?: string
  languageCode?: string
}
type PlaylistSortingOrder = 'ascending' | 'descending'
const viewPlaylistSortingColumn = ref<null | PlaylistColumn>(null)
const viewPlaylistSortingOrder = ref<PlaylistSortingOrder>('ascending')
const viewPlaylistSortingOrderOptions = computed<Array<PlaylistSortingOrder>>(() => {
  return viewPlaylistSortingColumn.value === 'payment_amount' ?
    ['descending', 'ascending'] :
    ['ascending', 'descending']
})
function viewPlaylistToggleSorting (column: PlaylistColumn) {
  // Enable sorting or switch to another column
  if (viewPlaylistSortingColumn.value === null || column !== viewPlaylistSortingColumn.value) {
    viewPlaylistSortingColumn.value = column
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions.value[0]
  }
  else
  // Disable sorting because out of ordering options
  if (
    column === viewPlaylistSortingColumn.value &&
    viewPlaylistSortingOrder.value === viewPlaylistSortingOrderOptions.value[viewPlaylistSortingOrderOptions.value.length - 1]
  ) {
    viewPlaylistSortingColumn.value = null
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions.value[0]
  }
  // Rotate between ordering options
  else {
    const sortingOrderOptionIndex: number =
      viewPlaylistSortingOrderOptions.value.findIndex(option => option === viewPlaylistSortingOrder.value) + 1 >
      viewPlaylistSortingOrderOptions.value.length - 1 ?
        0 :
        viewPlaylistSortingOrderOptions.value.findIndex(option => option === viewPlaylistSortingOrder.value) + 1
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions.value[sortingOrderOptionIndex]
  }
  viewPlaylistDataUpdate(['sort'])
}

const viewPlaylistData = useState<Playlist>('viewPlaylistData')
const viewPlaylistDataShuffled = ref<Playlist>([])
function viewPlaylistDataUpdate (tasks: Array<'shuffle' | 'sort'>) {
  // @ts-expect-error
  if (backendPlaylist.value.length !== 0) {
    function shuffle () {
      // @ts-expect-error
      const playlist = backendPlaylist.value.slice()
      let currentSong = playlist.length
      while (currentSong !== 0) {
        const targetSong = Math.floor(Math.random() * currentSong)
        currentSong--
        const targetSongBackup = { ...playlist[targetSong] }
        playlist[targetSong] = playlist[currentSong]
        playlist[currentSong] = targetSongBackup
      }
      viewPlaylistDataShuffled.value = playlist
      return playlist
    }

    async function sort () {
      // @ts-expect-error
      const playlist: Array<SortingSong> = backendPlaylist.value.slice()
      const orderModifier = viewPlaylistSortingOrder.value === 'ascending' ? 1 : -1

      // Sort by song name or artist in alphabetical order
      if (viewPlaylistSortingColumn.value === 'name' || viewPlaylistSortingColumn.value === 'artist') {
        const pinyinPro = await import('pinyin-pro')
        playlist.forEach((song, index) => {
          // @ts-expect-error
          playlist[index][`${viewPlaylistSortingColumn.value}Pinyin`] =
            // @ts-expect-error
            pinyinPro.pinyin(song[viewPlaylistSortingColumn.value], { toneType: 'none', nonZh: 'consecutive' })
              .replaceAll(' ', '')
        })
        playlist.sort((a, b) => {
          // @ts-expect-error
          if (a[`${viewPlaylistSortingColumn.value}Pinyin`] < b[`${viewPlaylistSortingColumn.value}Pinyin`]) {
            return -1 * orderModifier
          }
          else
          // @ts-expect-error
          if (a[`${viewPlaylistSortingColumn.value}Pinyin`] > b[`${viewPlaylistSortingColumn.value}Pinyin`]) {
            return 1 * orderModifier
          }
          else {
            return 0
          }
        })
      }
      else

      // Sort by payment requirement
      if (viewPlaylistSortingColumn.value === 'payment_amount') {
        playlist.sort((a, b) => {
          if (a.payment_required === false || b.payment_required === false) {
            return (Number(a.payment_required ?? 0) - Number(b.payment_required ?? 0)) * orderModifier
          }
          return ((a.payment_amount ?? 0) - (b.payment_amount ?? 0)) * orderModifier
        })
      }
      else

      // Sort by language
      if (viewPlaylistSortingColumn.value === 'language') {
        const languageOrder = ['国语', '粤语', '日语']
        playlist.sort((a, b) => {
          return (languageOrder.findIndex(language => a.language === language) -
            languageOrder.findIndex(language => b.language === language)) * orderModifier
        })
      }

      return playlist
    }

    tasks.forEach(async (task, index) => {
      if (task === 'shuffle') {
        shuffle()
        if (index !== tasks.length - 1) { return }
        viewPlaylistSortingColumn.value = null
        viewPlaylistDataUpdate(['sort'])
        viewPlaylistData.value = viewPlaylistDataShuffled.value
      }
      else
      if (task === 'sort') {
        if (index !== tasks.length - 1) { return }
        viewPlaylistData.value = viewPlaylistSortingColumn.value === null ? viewPlaylistDataShuffled.value : await sort()
      }
    })
  }
}
callOnce(() => viewPlaylistDataUpdate(['shuffle']))
if (import.meta.client && useNuxtApp().isHydrating && useNuxtApp().payload.serverRendered) {
  viewPlaylistDataShuffled.value = viewPlaylistData.value
}

const viewPlaylistCopySongNameState = ref<{
  [key: Song['$id']]: 'succeeded' | 'failed'
}>({})
function viewPlaylistCopySongName (name: Song['name'], id: Song['$id']) {
  if (Object.keys(viewPlaylistCopySongNameState.value).includes(id)) { return }
  const clipboardWritePromise = navigator.clipboard.writeText(`点歌 ${name}`)
  setTimeout(() => {
    if (viewPlaylistCopySongNameState.value[id] !== 'succeeded') { viewPlaylistCopySongNameState.value[id] = 'failed' }
  }, 500)
  clipboardWritePromise.then(
    () => {
      viewPlaylistCopySongNameState.value[id] = 'succeeded'
      setTimeout(() => delete viewPlaylistCopySongNameState.value[id], 2000)
    },
    () => {
      viewPlaylistCopySongNameState.value[id] = 'failed'
      setTimeout(() => delete viewPlaylistCopySongNameState.value[id], 5000)
    }
  )
}

// @ts-expect-error
const viewPlaylistCountTotal = computed<number>(() => backendPlaylist.value.length)
const viewPlaylistCountDisplayed = computed<number>(() => viewPlaylistData.value.length)
</script>
