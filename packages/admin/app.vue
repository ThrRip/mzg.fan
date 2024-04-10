<!--
  - Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
  -
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this
  - file, You can obtain one at https://mozilla.org/MPL/2.0/.
  -->

<template>
  <div class="overflow-clip grid grid-areas-stack h-dscreen">
    <nav
      class="grid grid-rows-[auto_1fr_auto] max-lg:landscape:gap-y-2 gap-y-4 self-center
      px-12 max-lg:landscape:py-2 py-7 w-screen sm:w-[26rem] h-2/3 lg:h-[calc(100dvh_-_14rem)]
      text-white transition-[margin-left] duration-300"
      :class="{
        '-ml-[26rem]': !backendLoggedIn,
        '-ml-[16.5rem]': !viewShowFullNavigationBar,
        'z-50': viewShowFullNavigationBar
      }"
    >
      <section class="z-50 flex flex-row max-lg:landscape:gap-y-2 gap-y-4 justify-between items-center">
        <h1 class="min-w-max text-xl sm:text-2xl text-white-alt transition-opacity" :class="{ 'opacity-0': !viewShowFullNavigationBar }">
          管理面板｜洺知-故犯
        </h1>
        <NuxtLink
          to="/"
          title="首页"
          class="aspect-square flex flex-row justify-center items-center h-14 bg-blue hover:bg-blue-a
          rounded-xl focus-visible:outline outline-2 outline-offset-3 outline-blue-a transition duration-300
          active:scale-95"
          :class="{ 'bg-blue-a': route.path === '/' }"
          @click="viewToggleFullNavigationBar(false)"
        >
          <font-awesome-icon :icon="['fas', 'house']" class="max-lg:landscape:!h-4 !h-5" />
        </NuxtLink>
      </section>
      <section class="z-50 flex flex-col max-lg:landscape:gap-y-2 gap-y-4 items-end">
        <NuxtLink
          to="/playlist"
          class="overflow-clip flex flex-row gap-x-1 items-center px-2 h-14 w-full max-w-full bg-blue hover:bg-blue-a
          rounded-xl focus-visible:outline outline-2 outline-offset-3 outline-blue-a transition-all duration-300
          active:scale-95"
          :class="{
            '!px-0 !max-w-[3.5rem]': !viewShowFullNavigationBar,
            'bg-blue-a': route.path === '/playlist'
          }"
          @click="viewToggleFullNavigationBar(false)"
        >
          <span class="aspect-square flex flex-row justify-center items-center pl-0.5 h-14">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" class="max-lg:landscape:!h-5 !h-6" />
          </span>
          <span class="min-w-max">
            歌单编辑
          </span>
        </NuxtLink>
      </section>
      <section class="z-50 flex flex-row gap-x-12 justify-between">
        <button
          class="flex flex-row gap-x-1 items-center px-2 w-full h-14 bg-blue hover:bg-blue-a
          rounded-xl focus-visible:outline outline-2 outline-offset-3 outline-blue-a transition duration-300
          active:scale-95"
          @click="backendLogout"
        >
          <ClientOnly>
            <transition-group
              tag="span"
              class="aspect-square grid grid-areas-stack place-items-center pl-0.5 h-14 max-lg:landscape:*:!h-5 *:!h-6"
              enter-from-class="opacity-0"
              enter-active-class="transition-opacity duration-200"
              leave-active-class="transition-opacity duration-200"
              leave-to-class="opacity-0"
            >
              <font-awesome-icon v-if="backendAuthState === ''" key="idle" :icon="['fas', 'right-from-bracket']" />
              <font-awesome-icon v-if="backendAuthState === 'processing'" key="processing" :icon="['fas', 'circle-notch']" spin />
              <font-awesome-icon v-if="backendAuthState === 'succeeded'" key="succeeded" :icon="['fas', 'check']" />
              <font-awesome-icon v-if="backendAuthState === 'failed'" key="failed" :icon="['fas', 'circle-exclamation']" />
            </transition-group>
          </ClientOnly>
          <transition-group
            tag="span"
            class="grid grid-areas-stack justify-items-start"
            enter-from-class="opacity-0"
            enter-active-class="transition-opacity duration-200"
            leave-active-class="transition-opacity duration-200"
            leave-to-class="opacity-0"
          >
            <span v-if="backendAuthState === 'succeeded'" key="succeeded">已退出登录</span>
            <span v-else-if="backendAuthState === 'failed'" key="failed">请重试</span>
            <span v-else key="idle">退出登录</span>
          </transition-group>
        </button>
        <button
          :title="viewShowFullNavigationBar ? '收起导航栏' : '展开导航栏'"
          class="aspect-square flex flex-row justify-center items-center h-14 bg-blue hover:bg-blue-a
          rounded-xl focus-visible:outline outline-2 outline-offset-3 outline-blue-a transition duration-300
          active:scale-95"
          @click="viewToggleFullNavigationBar()"
        >
          <font-awesome-icon
            :icon="['fas', 'angle-right']"
            class="max-lg:landscape:!h-4 !h-5 transition-transform duration-300"
            :style="[viewFullNavigationBarToggles === 0 ?
              '' :
              `transform: rotate(${180 * viewFullNavigationBarToggles}deg)`]"
          />
        </button>
      </section>
    </nav>
    <main class="overflow-x-clip overflow-y-auto lg:overflow-y-hidden grid grid-cols-[1fr] grid-rows-[1fr] h-full">
      <LoginModal
        v-if="!backendLoggedIn && !backendLoggedInChecking"
        :auth-state="backendAuthState"
        :visible="viewShowLoginModal"
        @submit="backendLogin"
      />
      <NuxtPage
        v-if="backendLoggedIn"
        :backend-client="backendClient"
        class="transition-opacity duration-300"
        :class="{
          'opacity-0': !viewShowPageContent,
          'hidden': viewShowFullNavigationBar && viewShowFullNavigationBarRealState
        }"
      />
    </main>
    <div class="-z-10 w-full backdrop-blur-[3rem]" />
    <div
      class="-z-20 grid grid-areas-stack justify-items-center items-center
      -ml-[13.5rem] sm:-ml-[13rem] w-[52rem] h-full transition-[margin-left] duration-300"
      :class="{
        '!-ml-[52rem] sm:!-ml-[52rem]': !backendLoggedIn,
        '!-ml-[30rem] sm:!-ml-[29rem]': !viewShowFullNavigationBar
      }"
    >
      <div class="w-[85vw] sm:w-1/2 h-2/3 lg:h-[calc(100dvh_-_14rem)] bg-blue-l" />
    </div>
    <div class="-z-50 w-full bg-white-alt" />
  </div>
</template>

<script setup lang="ts">
import { Account, Client } from 'appwrite'

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
const backendAccount = new Account(backendClient)

const backendLoggedIn = ref<boolean>(false)
const backendLoggedInChecking = ref<boolean>(true)
if (import.meta.client) {
  backendAccount.get()
    .then(
      () => {
        backendLoggedIn.value = true
        backendLoggedInChecking.value = false
      },
      async () => {
        await navigateTo('/')
        backendLoggedInChecking.value = false
      }
    )
}

export type BackendAuthState = '' | 'processing' | 'succeeded' | 'failed'
const backendAuthState = ref<BackendAuthState>('')

function backendLogin (email: string, password: string) {
  backendAuthState.value = 'processing'
  backendAccount.createEmailPasswordSession(email, password)
    .then(
      () => {
        backendAuthState.value = 'succeeded'
        setTimeout(() => { viewShowLoginModal.value = false }, 1000)
        setTimeout(() => {
          backendAuthState.value = ''
          backendLoggedIn.value = true
          viewShowLoginModal.value = true
        }, 1300)
      },
      () => { backendAuthState.value = 'failed' }
    )
}

function backendLogout () {
  backendAuthState.value = 'processing'
  backendAccount.deleteSession('current')
    .then(
      () => {
        backendAuthState.value = 'succeeded'
        setTimeout(() => {
          viewToggleFullNavigationBar(false)
          backendAuthState.value = ''
          backendLoggedIn.value = false
        }, 1000)
      },
      () => { backendAuthState.value = 'failed' }
    )
}

// View
const viewShowLoginModal = ref<boolean>(true)

const viewShowFullNavigationBar = ref<boolean>(false)
const viewShowFullNavigationBarRealState = ref<boolean>(false)
const viewFullNavigationBarToggles = ref<number>(0)

const viewShowPageContent = ref<boolean>(true)

function viewToggleFullNavigationBar (show?: boolean) {
  if (show === undefined) {
    viewShowFullNavigationBar.value = !viewShowFullNavigationBar.value
    viewFullNavigationBarToggles.value++
  }
 else
  if (viewShowFullNavigationBar.value !== show) {
    viewShowFullNavigationBar.value = show
    viewFullNavigationBarToggles.value++
  }
  setTimeout(() => {
    viewShowFullNavigationBarRealState.value = viewShowFullNavigationBar.value
  }, 300)
  if (viewShowFullNavigationBar.value) {
    viewShowPageContent.value = !viewShowFullNavigationBar.value
  }
  else {
    setTimeout(() => { viewShowPageContent.value = !viewShowFullNavigationBar.value }, 150)
  }
}
</script>
