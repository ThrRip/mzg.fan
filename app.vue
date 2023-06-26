<template>
  <main
    class="overflow-y-auto landscape:grid landscape:grid-cols-[36vw_1fr] landscape:h-screen bg-blue landscape:bg-assets-areas"
  >
    <section class="flex flex-col max-xl:landscape:gap-y-4 gap-y-14 justify-center items-center portrait:h-screen">
      <picture class="aspect-square max-xl:landscape:w-1/3 w-1/2 2xl:max-w-[15rem]">
        <source srcset="~/assets/img/profile-pic.avif" type="image/avif">
        <img src="~/assets/img/profile-pic.webp" alt="洺知-故犯的头像" class="rounded-[15%]">
      </picture>
      <h1 class="max-xl:landscape:text-4xl portrait:text-6xl text-7xl font-light text-white">
        洺知-故犯
      </h1>
      <div class="flex flex-col max-xl:landscape:gap-y-1 gap-y-4">
        <a
          href="https://space.bilibili.com/32159860"
          rel="noopener"
          target="_blank"
          class="flex flex-row gap-x-2 justify-between items-center
          max-xl:landscape:px-1.5 px-2.5 w-54 max-xl:landscape:h-10 h-12
          text-white bg-blue-a rounded-xl transition-transform duration-100 active:scale-95"
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
        </a>
        <a
          href="https://live.bilibili.com/1267105"
          rel="noopener"
          target="_blank"
          class="flex flex-row gap-x-2 justify-between items-center
          max-xl:landscape:px-1.5 px-2.5 w-54 max-xl:landscape:h-10 h-12
          text-white bg-blue-a rounded-xl transition-transform duration-100 active:scale-95"
        >
          <span v-if="!biliApiLiveStatus" class="aspect-square flex flex-row justify-center items-center h-8">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'podcast']" class="!h-5" />
            </ClientOnly>
          </span>
          <span v-if="biliApiLiveStatus" class="aspect-square flex flex-col justify-center items-center h-8">
            <ClientOnly>
              <span class="overflow-hidden max-h-[1.125rem]">
                <font-awesome-icon :icon="['fas', 'podcast']" class="!h-[1.125rem]" />
              </span>
              <span class="text-[0.5rem]">
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
        </a>
        <a
          href="https://space.bilibili.com/391500490"
          rel="noopener"
          target="_blank"
          class="flex flex-row gap-x-2 justify-between items-center
          max-xl:landscape:px-1.5 px-2.5 w-54 max-xl:landscape:h-10 h-12
          text-white bg-blue-a rounded-xl transition-transform duration-100 active:scale-95"
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
        </a>
      </div>
    </section>
    <section class="flex flex-col portrait:h-screen" />
  </main>
</template>

<script setup>
import { Client, Databases } from 'appwrite'

const { data: biliApiRoomPlayInfo } = await useFetch(
  'https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=1267105',
  { pick: ['data'] }
)
const biliApiLiveStatus = ref(biliApiRoomPlayInfo.value.data.live_status)

const backendClient = new Client()
const backendDatabases = new Databases(backendClient)
backendClient.setEndpoint(useAppConfig().backendBase)
  .setProject(useAppConfig().backendProjectId)

const backendPlaylist = ref([])
const backendFetchPlaylistState = ref('processing')

backendDatabases.listDocuments('home', 'playlist')
  .then(
    (res) => {
      backendFetchPlaylistState.value = 'succeeded'
      backendPlaylist.value = res.documents
    },
    () => {
      backendFetchPlaylistState.value = 'failed'
    }
  )
</script>
