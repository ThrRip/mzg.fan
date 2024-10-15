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
        {{ (props.countTotal !== props.countDisplayed ? `改动前共 ${props.countTotal} 首歌，改动后` : '') +
          `共 ${props.countDisplayed} 首歌` }}
        <span
          class="flex flex-row gap-x-1 h-full
          *:aspect-square *:flex *:flex-row *:justify-center *:items-center *:h-full *:rounded-lg hover:*:bg-gray
          *:transition active:*:scale-95 *:duration-200"
        >
          <button title="添加歌曲" @click="create">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
          <button title="删除歌曲" @click="selectedIds.forEach(id => { emit('stageChanges', { $id: id }); selectedIds.delete(id) })">
            <font-awesome-icon :icon="['fas', 'minus']" />
          </button>
        </span>
      </div>
      <svg class="hidden"><symbol id="fas-comment-dollar"><font-awesome-icon :icon="['fas', 'comment-dollar']" /></symbol></svg>
      <div
        ref="listArea"
        class="overflow-y-scroll flex flex-col portrait:gap-y-5 px-2 pt-2.5 portrait:pt-4 pb-14 portrait:pb-16 bg-white-alta"
      >
        <transition-group
          leave-active-class="transition duration-700"
          leave-to-class="opacity-0 translate-x-full"
        >
          <div
            v-for="song in props.data"
            :key="song.$id"
            class="grid grid-cols-[1.875rem_0.55fr_0.45fr_5rem_5.5rem] portrait:grid-cols-[2.125rem_1fr_3.5rem_4.5rem]
            grid-rows-1 portrait:grid-rows-[auto_auto]"
          >
            <label
              title="选择"
              class="group grid portrait:row-span-2 place-items-center pl-2.5 portrait:pl-2.5 portrait:pr-1 py-2.5 h-full cursor-pointer"
            >
              <input
                type="checkbox"
                class="hidden"
                @click="selectedIds.has(song.$id) ? selectedIds.delete(song.$id) : selectedIds.add(song.$id)"
              >
              <ClientOnly>
                <svg
                  v-if="!selectedIds.has(song.$id)"
                  class="size-5 transition group-active:scale-90"
                >
                  <use href="#far-square" />
                </svg>
                <svg
                  v-if="selectedIds.has(song.$id)"
                  class="z-10 size-5 text-blue group-hover:text-blue-a transition group-active:scale-90"
                >
                  <use href="#fas-square-check" />
                </svg>
              </ClientOnly>
            </label>
            <transition-group
              tag="span"
              class="group grid grid-areas-stack items-center px-4 portrait:px-3 h-full portrait:leading-snug cursor-text"
              enter-from-class="opacity-0"
              enter-active-class="transition-opacity"
              leave-active-class="transition-opacity"
              leave-to-class="opacity-0"
              @click="modifyStart({ id: song.$id, field: 'name' })"
            >
              <input
                v-if="modifyingTarget.id === song.$id && modifyingTarget.field === 'name'"
                key="input"
                ref="modifyingInput"
                type="text"
                class="z-10 w-full h-2/3 bg-white
                rounded focus:outline-none ring-2 ring-blue ring-offset-[4.5px] ring-offset-white"
                :value="song.name"
                @blur="// @ts-ignore
                  modifyFinish({ $id: song.$id, name: $event.target.value })"
                @keydown.enter="// @ts-ignore
                  $event.target.blur()"
                @keydown.esc="// @ts-ignore
                  $event.target.blur()"
                @keydown.tab.prevent="modifyNext({ id: song.$id, field: 'name' })"
              >
              <span
                key="text"
                class="flex flex-row items-center w-full !h-2/3 rounded ring-2 ring-white-alta
                group-hover:ring-blue ring-offset-[4.5px] ring-offset-white-alta transition-[box-shadow,opacity] duration-200"
              >
                {{ song.name }}
              </span>
            </transition-group>
            <transition-group
              tag="span"
              class="group grid grid-areas-stack portrait:order-4 items-center px-4 portrait:px-3 h-full portrait:text-xs cursor-text"
              enter-from-class="opacity-0"
              enter-active-class="transition-opacity"
              leave-active-class="transition-opacity"
              leave-to-class="opacity-0"
              @click="modifyStart({ id: song.$id, field: 'artist' })"
            >
              <input
                v-if="modifyingTarget.id === song.$id && modifyingTarget.field === 'artist'"
                key="input"
                ref="modifyingInput"
                type="text"
                class="z-10 w-full h-2/3 bg-white
                rounded focus:outline-none ring-2 ring-blue ring-offset-[4.5px] ring-offset-white"
                :value="song.artist"
                @blur="// @ts-ignore
                  modifyFinish({ $id: song.$id, artist: $event.target.value })"
                @keydown.enter="// @ts-ignore
                  $event.target.blur()"
                @keydown.esc="// @ts-ignore
                  $event.target.blur()"
                @keydown.tab.prevent="modifyNext({ id: song.$id, field: 'artist' })"
              >
              <span
                key="text"
                class="flex flex-row items-center w-full !h-2/3 rounded ring-2 ring-white-alta
                group-hover:ring-blue ring-offset-[4.5px] ring-offset-white-alta transition-[box-shadow,opacity] duration-200"
              >
                {{ song.artist }}
              </span>
            </transition-group>
            <transition-group
              tag="span"
              class="group grid grid-areas-stack portrait:row-span-2 items-center px-4 portrait:px-3 h-full"
              :class="{ 'cursor-text': song.payment_required }"
              enter-from-class="opacity-0"
              enter-active-class="transition-opacity"
              leave-active-class="transition-opacity"
              leave-to-class="opacity-0"
              @click="modifyStart({ id: song.$id, field: 'payment_amount' })"
            >
              <input
                v-if="modifyingTarget.id === song.$id && modifyingTarget.field === 'payment_amount'"
                key="input"
                ref="modifyingInput"
                type="text"
                class="z-10 w-full h-2/3 text-center bg-white
                rounded focus:outline-none ring-2 ring-blue ring-offset-[4.5px] ring-offset-white"
                :value="song.payment_amount"
                @blur="modifyFinish({
                  $id: song.$id,
                  // @ts-ignore
                  payment_amount: ($event.target.value === '' || $event.target.value === '0') ? null : Number($event.target.value)
                })"
                @keydown.enter="// @ts-ignore
                  $event.target.blur()"
                @keydown.esc="// @ts-ignore
                  $event.target.blur()"
                @keydown.tab.prevent="modifyNext({ id: song.$id, field: 'payment_amount' })"
              >
              <span
                key="text"
                class="flex flex-col justify-center h-full items-center !h-2/3 rounded ring-2 ring-white-alta
                group-hover:ring-blue ring-offset-[4.5px] ring-offset-white-alta transition-[box-shadow,opacity] duration-200"
                :title="song.payment_required && song.payment_amount ? `需要 ${song.payment_amount} 元 SC` : ''"
              >
                <svg v-if="song.payment_required" class="min-h-5 size-5"><use href="#fas-comment-dollar" /></svg>
                <span
                  v-if="song.payment_required"
                  class="text-[0.625rem] leading-snug"
                >
                  ¥{{ song.payment_amount }}
                </span>
              </span>
            </transition-group>
            <transition-group
              tag="span"
              class="group grid grid-areas-stack portrait:row-span-2 items-center pl-4 portrait:pl-3 h-full cursor-text"
              enter-from-class="opacity-0"
              enter-active-class="transition-opacity"
              leave-active-class="transition-opacity"
              leave-to-class="opacity-0"
              @click="modifyStart({ id: song.$id, field: 'language' })"
            >
              <input
                v-if="modifyingTarget.id === song.$id && modifyingTarget.field === 'language'"
                key="input"
                ref="modifyingInput"
                type="text"
                class="z-10 w-full h-2/3 bg-white
                rounded focus:outline-none ring-2 ring-blue ring-offset-[4.5px] ring-offset-white"
                :value="song.language"
                @blur="// @ts-ignore
                  modifyFinish({ $id: song.$id, language: $event.target.value })"
                @keydown.enter="// @ts-ignore
                  $event.target.blur()"
                @keydown.esc="// @ts-ignore
                  $event.target.blur()"
              >
              <span
                key="text"
                class="flex flex-row items-center w-full h-full !h-2/3 rounded ring-2 ring-white-alta
                group-hover:ring-blue ring-offset-[4.5px] ring-offset-white-alta transition-[box-shadow,opacity] duration-200"
              >
                {{ song.language }}
              </span>
            </transition-group>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Song, Playlist, PlaylistColumn, PlaylistSortingOrder } from '../../pages/playlist.vue'

const props = defineProps<{
  // Includes modifications
  data: Playlist
  sortingColumn: null | PlaylistColumn
  sortingOrder: PlaylistSortingOrder
  countTotal: number
  countDisplayed: number
}>()
const emit = defineEmits<{
  toggleSorting: [PlaylistColumn]
  stageChanges: [changes: Song]
}>()

const listArea = ref<HTMLDivElement>()
function scrollList (position: 'top' | 'bottom') {
  if (position === 'top') {
    nextTick(() => listArea.value?.scroll({
      top: 0,
      behavior: 'smooth'
    }))
  }
  else {
    nextTick(() => listArea.value?.scroll({
      top: listArea.value?.scrollHeight,
      behavior: 'smooth'
    }))
  }
}

const selectableIds = computed<Array<Song['$id']>>(() => props.data.map(song => song.$id))
const selectedIds = ref<Set<Song['$id']>>(new Set())

interface ModifyTarget {
  id: Song['$id']
  field: 'name' | 'artist' | 'payment_amount' | 'language'
}
const modifyingTarget = ref<{
  [P in keyof ModifyTarget]: ModifyTarget[P] | null
}>({
  id: null,
  field: null
})
const modifyingInput = ref<Array<HTMLInputElement>>()

function modifyStart (target: ModifyTarget) {
  modifyingTarget.value.id = target.id
  modifyingTarget.value.field = target.field
  nextTick(() => modifyingInput.value?.[0]?.focus())
}
function modifyFinish (changes: Song) {
  modifyingTarget.value.id = null
  modifyingTarget.value.field = null
  emit('stageChanges', changes)
}
function modifyNext (currentTarget: ModifyTarget) {
  const fields: Array<ModifyTarget['field']> = ['name', 'artist', 'payment_amount', 'language']
  modifyingInput.value?.[0]?.blur()
  modifyingTarget.value.id = currentTarget.id
  modifyingTarget.value.field = fields[fields.findIndex(field => field === currentTarget.field) + 1]
  nextTick(() => modifyingInput.value?.[0]?.focus())
}

function create () {
  const id = crypto.randomUUID()
  emit('stageChanges', { $id: id, hidden: false, name: '', artist: '', payment_amount: null, language: '' })
  scrollList('bottom')
  modifyingTarget.value.id = id
  modifyingTarget.value.field = 'name'
  nextTick(() => modifyingInput.value?.[0]?.focus({ preventScroll: true }))
}
</script>
