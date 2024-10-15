<!--
  - Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
  -
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this
  - file, You can obtain one at https://mozilla.org/MPL/2.0/.
  -->

<!-- Modified from ~/packages/home/app.vue -->
<template>
  <div class="overflow-hidden grid grid-rows-[auto_1fr] text-black rounded-2xl">
    <div
      class="landscape:overflow-y-scroll grid grid-cols-[1.875rem_0.55fr_0.45fr_5rem_5.5rem] portrait:grid-cols-[2.125rem_1fr_3.5rem_4.5rem]
      grid-rows-1 portrait:grid-rows-[1.625rem_1rem] content-center px-2 h-12 portrait:h-16
      bg-gray scrollbar scrollbar-thumb-transparent scrollbar-track-transparent"
    >
      <label
        title="全选"
        class="group flex flex-row row-span-2 pl-2.5 portrait:pl-2.5 portrait:pr-1 h-full items-center cursor-pointer"
      >
        <input
          type="checkbox"
          class="hidden"
          @click="selectedIds = selectedIds.size === selectableIds.length ? new Set() : new Set(selectableIds)"
        >
        <span class="grid place-items-center w-5">
          <svg class="hidden"><symbol id="far-square"><font-awesome-icon :icon="['far', 'square']" /></symbol></svg>
          <svg class="hidden"><symbol id="fas-square-check"><font-awesome-icon :icon="['fas', 'square-check']" /></symbol></svg>
          <svg class="hidden"><symbol id="fas-circle-notch">
            <font-awesome-icon :icon="['fas', 'circle-notch']" />
          </symbol></svg>
          <svg class="hidden"><symbol id="fas-check">
            <font-awesome-icon :icon="['fas', 'check']" />
          </symbol></svg>
          <svg class="hidden"><symbol id="fas-exclamation">
            <font-awesome-icon :icon="['fas', 'exclamation']" />
          </symbol></svg>
          <svg v-if="selectedIds.size === 0" class="size-5 transition group-active:scale-90">
            <use href="#far-square" />
          </svg>
          <font-awesome-icon
            v-if="selectedIds.size !== 0 && selectedIds.size !== selectableIds.length"
            :icon="['fas', 'square-minus']"
            class="!h-5 text-blue group-hover:text-blue-a transition group-active:scale-90"
          />
          <svg
            v-if="selectedIds.size !== 0 && selectedIds.size === selectableIds.length"
            class="size-5 text-blue group-hover:text-blue-a transition group-active:scale-90"
          >
            <use href="#fas-square-check" />
          </svg>
        </span>
      </label>
      <button
        class="flex flex-row gap-x-2 items-center px-4 portrait:px-3 py-2 portrait:py-0.5 portrait:leading-snug h-full"
        title="按歌名排序"
        :aria-label="`按歌名排序${props.sortingColumn === 'name' ?
          props.sortingOrder === 'ascending' ? ' - 当前按歌名升序排序' :
          props.sortingOrder === 'descending' ? ' - 当前按歌名降序排序' : '' :
          ''
        }`"
        @click="emit('toggleSorting', 'name')"
      >
        歌名
        <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <font-awesome-icon
            v-if="props.sortingColumn === 'name'"
            :icon="['fas', 'caret-up']"
            class="mt-px transition"
            :class="{ 'rotate-180': props.sortingOrder === 'descending' }"
          />
        </transition>
      </button>
      <button
        class="flex flex-row portrait:order-4 gap-x-2 items-center px-4 portrait:px-3 landscape:py-2 h-full portrait:text-xs"
        title="按歌手排序"
        :aria-label="`按歌手排序${props.sortingColumn === 'artist' ?
          props.sortingOrder === 'ascending' ? ' - 当前按歌手升序排序' :
          props.sortingOrder === 'descending' ? ' - 当前按歌手降序排序' : '' :
          ''
        }`"
        @click="emit('toggleSorting', 'artist')"
      >
        歌手
        <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <font-awesome-icon
            v-if="props.sortingColumn === 'artist'"
            :icon="['fas', 'caret-up']"
            class="mt-px transition"
            :class="{ 'rotate-180': props.sortingOrder === 'descending' }"
          />
        </transition>
      </button>
      <button
        class="flex flex-row portrait:row-span-2 gap-x-2 items-center px-4 portrait:px-3 h-full"
        title="按 SC 要求排序"
        :aria-label="`按 SC 要求排序${props.sortingColumn === 'payment_amount' ?
          props.sortingOrder === 'descending' ? ' - 当前按 SC 要求降序排序' :
          props.sortingOrder === 'ascending' ? ' - 当前按 SC 要求升序排序' : '' :
          ''
        }`"
        @click="emit('toggleSorting', 'payment_amount')"
      >
        SC
        <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <font-awesome-icon
            v-if="props.sortingColumn === 'payment_amount'"
            :icon="['fas', 'caret-up']"
            class="mt-px transition"
            :class="{ 'transition-opacity rotate-180': props.sortingOrder === 'descending' }"
          />
        </transition>
      </button>
      <button
        class="flex flex-row portrait:row-span-2 gap-x-2 items-center pl-4 portrait:pl-3 py-2 h-full"
        title="按语言排序"
        :aria-label="`按语言排序${props.sortingColumn === 'language' ?
          props.sortingOrder === 'ascending' ? ' - 当前按语言升序排序' :
          props.sortingOrder === 'descending' ? ' - 当前按语言降序排序' : '' :
          ''
        }`"
        @click="emit('toggleSorting', 'language')"
      >
        语言
        <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <font-awesome-icon
            v-if="props.sortingColumn === 'language'"
            :icon="['fas', 'caret-up']"
            class="mt-px transition"
            :class="{ 'rotate-180': props.sortingOrder === 'descending' }"
          />
        </transition>
      </button>
    </div>
    <div class="overflow-y-hidden grid grid-areas-stack h-full">
      <div
        class="z-20 flex flex-row order-2 justify-between items-center self-end px-6 pr-2 py-1.5 h-12
        bg-white-alta/75 border-t border-gray backdrop-blur"
      >
        共 {{ props.countTotal }} 首歌有改动
        <span
          class="flex flex-row gap-x-1 h-full
          *:aspect-square *:flex *:flex-row *:justify-center *:items-center *:h-full *:rounded-lg hover:*:bg-gray
          *:transition active:*:scale-95 *:duration-200"
        >
          <button title="撤销改动" @click="emit('undoChanges', selectedIds); selectedIds.clear()">
            <font-awesome-icon :icon="['fas', 'rotate-left']" />
          </button>
          <button title="清除已发布的改动" @click="emit('clearPublishedChanges')">
            <font-awesome-icon :icon="['fas', 'broom']" />
          </button>
          <button title="发布改动" @click="emit('publishChanges', selectedIds); selectedIds.clear()">
            <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
          </button>
        </span>
      </div>
      <svg class="hidden"><symbol id="fas-comment-dollar"><font-awesome-icon :icon="['fas', 'comment-dollar']" /></symbol></svg>
      <div class="overflow-y-scroll flex flex-col portrait:gap-y-5 px-2 pt-2.5 portrait:pt-4 pb-14 portrait:pb-16 bg-white-alta">
        <transition-group
          enter-from-class="opacity-0 -translate-x-full"
          enter-active-class="transition duration-700"
          leave-active-class="transition duration-700"
          leave-to-class="opacity-0 -translate-x-full"
        >
          <div
            v-for="song in props.dataChanges"
            :key="song.$id"
            class="grid grid-cols-[1.875rem_0.55fr_0.45fr_5rem_5.5rem] portrait:grid-cols-[2.125rem_1fr_3.5rem_4.5rem]
            grid-rows-1 portrait:grid-rows-[auto_auto]"
            :class="{
              'bg-blue-l/50 rounded-xl': (
                (
                  getPublishingStateById(song.$id) &&
                  getPublishingStateById(song.$id)?.state !== 'processing' &&
                  getPublishingStateById(song.$id)?.state !== 'failed'
                ) ?
                  !getPublishingStateById(song.$id)?.old :
                  !getUnmodifiedSongById(song.$id)
              ) && song.name === '' && song.artist === '' && song.payment_amount === null && song.language === '',
              'bg-pink-l/75 rounded-xl': Object.keys(song).length === 1 && Object.keys(song)[0] === '$id' && (
                (
                  getUnmodifiedSongById(song.$id)?.name === '' &&
                  getUnmodifiedSongById(song.$id)?.artist === '' &&
                  getUnmodifiedSongById(song.$id)?.payment_amount === null &&
                  getUnmodifiedSongById(song.$id)?.language === ''
                ) || (
                  getPublishingStateById(song.$id)?.old?.name === '' &&
                  getPublishingStateById(song.$id)?.old?.artist === '' &&
                  getPublishingStateById(song.$id)?.old?.payment_amount === null &&
                  getPublishingStateById(song.$id)?.old?.language === ''
                )
              )
            }"
          >
            <label
              :title="(selectedIds.has(song.$id) || !getPublishingStateById(song.$id)) ? '选择' :
                getPublishingStateById(song.$id)?.state === 'processing' ? '发布改动中' :
                getPublishingStateById(song.$id)?.state === 'succeeded' ? '改动已发布' :
                getPublishingStateById(song.$id)?.state === 'failed' ?
                  '改动发布失败\n\n' +
                  `错误：${getPublishingStateById(song.$id)?.error?.message}\n\n` +
                  '请联系您的技术支持人员以获取帮助，或点击此图标以重新选择此项目，并再次尝试发布改动。' :
                  ''"
              class="group grid portrait:row-span-2 place-items-center pl-2.5 portrait:pl-2.5 portrait:pr-1 py-2.5 h-full"
              :class="[!getPublishingStateById(song.$id) ? 'cursor-pointer' :
                getPublishingStateById(song.$id)?.state === 'failed' ? 'grid-areas-stack cursor-pointer' :
                'grid-areas-stack']"
            >
              <input
                v-if="!getPublishingStateById(song.$id) || getPublishingStateById(song.$id)?.state === 'failed'"
                type="checkbox"
                class="hidden"
                @click="selectedIds.has(song.$id) ? selectedIds.delete(song.$id) : selectedIds.add(song.$id)"
              >
              <ClientOnly>
                <svg
                  v-if="!selectedIds.has(song.$id) && !getPublishingStateById(song.$id)"
                  class="size-5 transition group-active:scale-90"
                >
                  <use href="#far-square" />
                </svg>
                <transition
                  :css="Boolean(getPublishingStateById(song.$id))"
                  enter-from-class="opacity-0"
                  enter-active-class="duration-200"
                  leave-active-class="duration-200"
                  leave-to-class="opacity-0"
                >
                  <svg
                    v-if="selectedIds.has(song.$id) && (
                      !getPublishingStateById(song.$id) ||
                      getPublishingStateById(song.$id)?.state === 'failed'
                    )"
                    class="z-10 size-5 text-blue group-hover:text-blue-a transition group-active:scale-90"
                  >
                    <use href="#fas-square-check" />
                  </svg>
                </transition>
                <transition-group
                  enter-from-class="opacity-0"
                  enter-active-class="transition-opacity duration-200"
                  leave-active-class="transition-opacity duration-200"
                  leave-to-class="opacity-0"
                >
                  <svg v-if="getPublishingStateById(song.$id)?.state === 'processing'" key="processing" class="size-5 animate-[spin_2s_linear_infinite]">
                    <use href="#fas-circle-notch" />
                  </svg>
                  <svg v-if="getPublishingStateById(song.$id)?.state === 'succeeded'" key="succeeded" class="size-5">
                    <use href="#fas-check" />
                  </svg>
                  <svg v-if="getPublishingStateById(song.$id)?.state === 'failed' && !selectedIds.has(song.$id)" key="failed" class="size-5">
                    <use href="#fas-exclamation" />
                  </svg>
                </transition-group>
              </ClientOnly>
            </label>
            <span class="group grid grid-areas-stack items-center px-4 portrait:px-3 h-full portrait:leading-snug">
              <span key="text" class="flex flex-row items-center w-full">
                {{ ((
                  getPublishingStateById(song.$id) &&
                  getPublishingStateById(song.$id)?.state !== 'processing' &&
                  getPublishingStateById(song.$id)?.state !== 'failed'
                ) ?
                  getPublishingStateById(song.$id)?.old?.name === song.name :
                  getUnmodifiedSongById(song.$id)?.name === song.name) ? song.name : '' }}
                <span
                  v-if="(
                    getPublishingStateById(song.$id) &&
                    getPublishingStateById(song.$id)?.state !== 'processing' &&
                    getPublishingStateById(song.$id)?.state !== 'failed'
                  ) ? getPublishingStateById(song.$id)?.old?.name !== song.name :
                    getUnmodifiedSongById(song.$id)?.name !== song.name"
                  class="flex flex-row gap-x-1.5"
                >
                  <span
                    v-if="(
                      getPublishingStateById(song.$id) &&
                      getPublishingStateById(song.$id)?.state !== 'processing' &&
                      getPublishingStateById(song.$id)?.state !== 'failed'
                    ) ?
                      (getPublishingStateById(song.$id)?.old && getPublishingStateById(song.$id)?.old?.name !== '') :
                      (getUnmodifiedSongById(song.$id) && getUnmodifiedSongById(song.$id)?.name !== '')"
                    class="px-2.5 py-0.5 line-through bg-pink-l/75 rounded-lg"
                  >
                    {{ (
                      getPublishingStateById(song.$id) &&
                      getPublishingStateById(song.$id)?.state !== 'processing' &&
                      getPublishingStateById(song.$id)?.state !== 'failed'
                    ) ? getPublishingStateById(song.$id)?.old?.name : getUnmodifiedSongById(song.$id)?.name }}
                  </span>
                  <span v-if="song.name" class="px-2.5 py-0.5 bg-blue-l/50 rounded-lg">
                    {{ song.name }}
                  </span>
                </span>
              </span>
            </span>
            <span class="group grid grid-areas-stack portrait:order-4 items-center px-4 portrait:px-3 h-full portrait:text-xs">
              <span key="text" class="flex flex-row items-center w-full">
                {{ ((
                  getPublishingStateById(song.$id) &&
                  getPublishingStateById(song.$id)?.state !== 'processing' &&
                  getPublishingStateById(song.$id)?.state !== 'failed'
                ) ?
                  getPublishingStateById(song.$id)?.old?.artist === song.artist :
                  getUnmodifiedSongById(song.$id)?.artist === song.artist) ? song.artist : '' }}
                <span
                  v-if="(
                    getPublishingStateById(song.$id) &&
                    getPublishingStateById(song.$id)?.state !== 'processing' &&
                    getPublishingStateById(song.$id)?.state !== 'failed'
                  ) ?
                    getPublishingStateById(song.$id)?.old?.artist !== song.artist :
                    getUnmodifiedSongById(song.$id)?.artist !== song.artist"
                  class="flex flex-row gap-x-1.5"
                >
                  <span
                    v-if="(
                      getPublishingStateById(song.$id) &&
                      getPublishingStateById(song.$id)?.state !== 'processing' &&
                      getPublishingStateById(song.$id)?.state !== 'failed'
                    ) ?
                      (getPublishingStateById(song.$id)?.old && getPublishingStateById(song.$id)?.old?.artist !== '') :
                      (getUnmodifiedSongById(song.$id) && getUnmodifiedSongById(song.$id)?.artist !== '')"
                    class="px-2.5 py-0.5 line-through bg-pink-l/75 rounded-lg"
                  >
                    {{ (
                      getPublishingStateById(song.$id) &&
                      getPublishingStateById(song.$id)?.state !== 'processing' &&
                      getPublishingStateById(song.$id)?.state !== 'failed'
                    ) ?
                      getPublishingStateById(song.$id)?.old?.artist : getUnmodifiedSongById(song.$id)?.artist }}
                  </span>
                  <span v-if="song.artist" class="px-2.5 py-0.5 bg-blue-l/50 rounded-lg">
                    {{ song.artist }}
                  </span>
                </span>
              </span>
            </span>
            <span class="group grid grid-areas-stack portrait:row-span-2 items-center px-4 portrait:px-3 h-full">
              <span
                key="text"
                class="flex flex-col justify-center h-full"
                :title="song.payment_required && song.payment_amount ? `需要 ${song.payment_amount} 元 SC` : ''"
              >
                <span
                  v-if="song.payment_amount ||
                    getUnmodifiedSongById(song.$id)?.payment_amount ||
                    getPublishingStateById(song.$id)?.old?.payment_amount"
                >
                  {{ (song.payment_amount && (
                    (
                      getPublishingStateById(song.$id) &&
                      getPublishingStateById(song.$id)?.state !== 'processing' &&
                      getPublishingStateById(song.$id)?.state !== 'failed'
                    ) ?
                      getPublishingStateById(song.$id)?.old?.payment_amount === song.payment_amount :
                      getUnmodifiedSongById(song.$id)?.payment_amount === song.payment_amount)) ?
                    `¥${song.payment_amount}` : '' }}
                  <span
                    v-if="(
                      getPublishingStateById(song.$id) &&
                      getPublishingStateById(song.$id)?.state !== 'processing' &&
                      getPublishingStateById(song.$id)?.state !== 'failed'
                    ) ?
                      getPublishingStateById(song.$id)?.old?.payment_amount !== song.payment_amount :
                      getUnmodifiedSongById(song.$id)?.payment_amount !== song.payment_amount"
                    class="flex flex-col gap-y-1 py-0.5 text-sm"
                  >
                    <span
                      v-if="(
                        getPublishingStateById(song.$id) &&
                        getPublishingStateById(song.$id)?.state !== 'processing' &&
                        getPublishingStateById(song.$id)?.state !== 'failed'
                      ) ?
                        (getPublishingStateById(song.$id)?.old && getPublishingStateById(song.$id)?.old?.payment_amount) :
                        (getUnmodifiedSongById(song.$id) && getUnmodifiedSongById(song.$id)?.payment_amount)"
                      class="px-2 py-0.5 w-fit line-through bg-pink-l/75 rounded-md"
                    >
                      ¥{{ (
                        getPublishingStateById(song.$id) &&
                        getPublishingStateById(song.$id)?.state !== 'processing' &&
                        getPublishingStateById(song.$id)?.state !== 'failed'
                      ) ?
                        getPublishingStateById(song.$id)?.old?.payment_amount :
                        getUnmodifiedSongById(song.$id)?.payment_amount }}
                    </span>
                    <span v-if="song.payment_amount" class="px-2 py-0.5 w-fit bg-blue-l/50 rounded-md">
                      ¥{{ song.payment_amount }}
                    </span>
                  </span>
                </span>
              </span>
            </span>
            <span class="group grid grid-areas-stack portrait:row-span-2 items-center pl-4 portrait:pl-3 h-full">
              <span key="text" class="flex flex-row items-center w-full h-full">
                {{ ((
                  getPublishingStateById(song.$id) &&
                  getPublishingStateById(song.$id)?.state !== 'processing' &&
                  getPublishingStateById(song.$id)?.state !== 'failed'
                ) ?
                  getPublishingStateById(song.$id)?.old?.language === song.language :
                  getUnmodifiedSongById(song.$id)?.language === song.language) ? song.language : '' }}
                <span
                  v-if="(
                    getPublishingStateById(song.$id) &&
                    getPublishingStateById(song.$id)?.state !== 'processing' &&
                    getPublishingStateById(song.$id)?.state !== 'failed'
                  ) ?
                    getPublishingStateById(song.$id)?.old?.language !== song.language :
                    getUnmodifiedSongById(song.$id)?.language !== song.language"
                  class="flex flex-col gap-y-1 py-0.5"
                >
                  <span
                    v-if="(
                      getPublishingStateById(song.$id) &&
                      getPublishingStateById(song.$id)?.state !== 'processing' &&
                      getPublishingStateById(song.$id)?.state !== 'failed'
                    ) ?
                      (getPublishingStateById(song.$id)?.old && getPublishingStateById(song.$id)?.old?.language !== '') :
                      (getUnmodifiedSongById(song.$id) && getUnmodifiedSongById(song.$id)?.language !== '')"
                    class="px-2.5 py-0.5 w-fit line-through bg-pink-l/75 rounded-lg"
                  >
                    {{ (
                      getPublishingStateById(song.$id) &&
                      getPublishingStateById(song.$id)?.state !== 'processing' &&
                      getPublishingStateById(song.$id)?.state !== 'failed'
                    ) ?
                      getPublishingStateById(song.$id)?.old?.language : getUnmodifiedSongById(song.$id)?.language }}
                  </span>
                  <span v-if="song.language" class="px-2.5 py-0.5 w-fit bg-blue-l/50 rounded-lg">
                    {{ song.language }}
                  </span>
                </span>
              </span>
            </span>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Song, Playlist, PlaylistPublishingState, PlaylistColumn, PlaylistSortingOrder } from '../../pages/playlist.vue'

const props = defineProps<{
  // Unmodified
  data: Playlist
  // Modifications
  dataChanges: Playlist
  publishingState: PlaylistPublishingState
  sortingColumn: null | PlaylistColumn
  sortingOrder: PlaylistSortingOrder
  countTotal: number
}>()
const emit = defineEmits<{
  toggleSorting: [PlaylistColumn]
  undoChanges: [changesIds: Set<Song['$id']>]
  clearPublishedChanges: []
  publishChanges: [changesIds: Set<Song['$id']>]
}>()

const selectableIds = computed<Array<Song['$id']>>(() => {
  return props.dataChanges.map(song => song.$id)
    .filter(id => getPublishingStateById(id)?.state !== 'processing' && getPublishingStateById(id)?.state !== 'succeeded')
})
const selectedIds = ref<Set<Song['$id']>>(new Set())

function getUnmodifiedSongById (id: Song['$id']) {
  return props.data.find(song => song.$id === id)
}
function getPublishingStateById (id: Song['$id']) {
  return props.publishingState?.find(_ => _.$id === id)
}
</script>
