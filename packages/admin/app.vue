<template>
  <div class="overflow-clip grid grid-areas-stack h-dscreen">
    <nav
      class="grid grid-rows-[auto_1fr_auto] max-lg:landscape:gap-y-2 gap-y-4 self-center
      px-12 max-lg:landscape:py-2 py-7 w-screen sm:w-[26rem] h-2/3 lg:h-[calc(100dvh_-_14rem)]
      text-white transition-[margin-left] duration-300"
      :class="{ '-ml-[16.5rem]': !viewShowFullNavigationBar, 'z-50': viewShowFullNavigationBar }"
    >
      <section class="z-50 flex flex-row max-lg:landscape:gap-y-2 gap-y-4 justify-between items-center">
        <h1 class="min-w-max text-xl sm:text-2xl text-white-alt transition-opacity" :class="{ 'opacity-0': !viewShowFullNavigationBar }">
          管理面板｜洺知-故犯
        </h1>
        <NuxtLink
          to="/"
          title="首页"
          class="aspect-square flex flex-row justify-center items-center h-14
          bg-blue hover:bg-blue-a focus:outline outline-2 outline-offset-3 outline-blue-a rounded-xl
          transition duration-300 active:scale-95"
          :class="{ 'bg-blue-a': route.path === '/' }"
          @click="viewShowFullNavigationBar = false"
        >
          <ClientOnly>
            <font-awesome-icon :icon="['fas', 'house']" class="max-lg:landscape:!h-4 !h-5" />
          </ClientOnly>
        </NuxtLink>
      </section>
      <section class="z-50 flex flex-col max-lg:landscape:gap-y-2 gap-y-4 items-end">
        <NuxtLink
          to="/playlist"
          class="overflow-clip flex flex-row gap-x-1 items-center px-2 h-14 w-full max-w-full
          bg-blue hover:bg-blue-a focus:outline outline-2 outline-offset-3 outline-blue-a rounded-xl
          transition-all duration-300 active:scale-95"
          :class="{
            '!px-0 !max-w-[3.5rem]': !viewShowFullNavigationBar,
            'bg-blue-a': route.path === '/playlist'
          }"
          @click="viewShowFullNavigationBar = false"
        >
          <span class="aspect-square flex flex-row justify-center items-center pl-0.5 h-14">
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'pen-to-square']" class="max-lg:landscape:!h-5 !h-6" />
            </ClientOnly>
          </span>
          <span class="min-w-max">
            歌单编辑
          </span>
        </NuxtLink>
      </section>
      <section class="z-50 flex flex-row justify-end">
        <button
          :title="viewShowFullNavigationBar ? '收起导航栏' : '展开导航栏'"
          class="aspect-square flex flex-row justify-center items-center h-14
          bg-blue hover:bg-blue-a focus:outline outline-2 outline-offset-3 outline-blue-a rounded-xl
          transition duration-300 active:scale-95"
          @click="viewShowFullNavigationBar = !viewShowFullNavigationBar"
        >
          <ClientOnly>
            <font-awesome-icon
              :icon="['fas', 'angle-right']"
              class="max-lg:landscape:!h-4 !h-5 transition-transform duration-300"
              :style="[ viewShowFullNavigationBarToggles === 0 ?
                '' :
                `transform: rotate(${180 * viewShowFullNavigationBarToggles}deg)` ]"
            />
          </ClientOnly>
        </button>
      </section>
    </nav>
    <div
      class="z-10 grid grid-areas-stack justify-items-center items-center
      -ml-[13.5rem] sm:-ml-[13rem] w-[52rem] h-full transition-[margin-left] duration-300"
      :class="{ '!-ml-[30rem] sm:!-ml-[29rem]': !viewShowFullNavigationBar }"
    >
      <div class="w-full h-full backdrop-blur-[3rem]" />
      <div class="w-[85vw] sm:w-1/2 h-2/3 lg:h-[calc(100dvh_-_14rem)] bg-blue-l" />
    </div>
    <main class="overflow-x-clip overflow-y-auto lg:overflow-y-hidden grid grid-cols-[1fr] grid-rows-[1fr] h-full bg-white-alt">
      <NuxtPage
        :backend-client="backendClient"
        class="z-20 transition-opacity duration-300"
        :class="{
          'opacity-0': !viewShowPageContent,
          'hidden': viewShowFullNavigationBar && viewShowFullNavigationBarRealState
        }"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Client } from 'appwrite'

const route = useRoute()

if (route.query.entrytoken) {
  const entryRouteQueries = { ...route.query }
  delete entryRouteQueries.entrytoken
  await navigateTo({ path: route.path, query: entryRouteQueries })
}

// Backend
const backendClient = new Client()
backendClient.setEndpoint(useAppConfig().backendBase)
  .setProject(useAppConfig().backendProjectId)

// View
const viewShowFullNavigationBar = ref<Boolean>(false)
const viewShowFullNavigationBarToggles = ref<number>(0)
const viewShowFullNavigationBarRealState = ref<Boolean>(false)
const viewShowPageContent = ref<Boolean>(true)
watch(viewShowFullNavigationBar, (value) => {
  viewShowFullNavigationBarToggles.value++
  setTimeout(() => {
    viewShowFullNavigationBarRealState.value = value
  }, 300)
  if (value) {
    viewShowPageContent.value = !value
  } else {
    setTimeout(() => { viewShowPageContent.value = !value }, 150)
  }
})
</script>
