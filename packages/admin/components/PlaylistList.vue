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
        class="group flex flex-row row-span-2 pl-2.5 portrait:pl-2.5 portrait:pr-1 h-full items-center rounded-lg cursor-pointer"
      >
        <input
          type="checkbox"
          class="hidden"
          @click="selectedIds = props.type === 'main' ?
            selectedIds.size === props.data.length ?
              new Set() :
              new Set(props.data.map(song => song.$id)) :
            selectedIds.size === props.dataChanges?.length ?
              new Set() :
              new Set(props.dataChanges?.map(song => song.$id))"
        >
        <span class="grid place-items-center w-5">
          <ClientOnly>
            <svg class="hidden">
              <symbol id="far-square">
                <font-awesome-icon :icon="['far', 'square']" />
              </symbol>
            </svg>
            <svg class="hidden">
              <symbol id="fas-square-check">
                <font-awesome-icon :icon="['fas', 'square-check']" />
              </symbol>
            </svg>
            <svg v-if="selectedIds.size === 0" class="!h-5 rounded-lg transition group-active:scale-90">
              <use href="#far-square" />
            </svg>
            <font-awesome-icon
              v-if="selectedIds.size !== 0 &&
                selectedIds.size !== (props.type === 'main' ? props.data.length : props.dataChanges?.length)"
              :icon="['fas', 'square-minus']"
              class="!h-5 text-blue group-hover:text-blue-a rounded-lg transition group-active:scale-90"
            />
            <svg
              v-if="(props.type === 'main' ? props.data.length : props.dataChanges?.length) !== 0 &&
                selectedIds.size === (props.type === 'main' ? props.data.length : props.dataChanges?.length)"
              class="!h-5 text-blue group-hover:text-blue-a rounded-lg transition group-active:scale-90"
            >
              <use href="#fas-square-check" />
            </svg>
          </ClientOnly>
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
        <ClientOnly>
          <font-awesome-icon
            :icon="['fas', 'caret-up']"
            class="mt-px opacity-0 transition"
            :class="{
              'opacity-100': props.sortingColumn === 'name',
              'rotate-180': props.sortingOrder === 'descending'
            }"
          />
        </ClientOnly>
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
        <ClientOnly>
          <font-awesome-icon
            :icon="['fas', 'caret-up']"
            class="mt-px opacity-0 transition"
            :class="{
              'opacity-100': props.sortingColumn === 'artist',
              'rotate-180': props.sortingOrder === 'descending'
            }"
          />
        </ClientOnly>
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
        <ClientOnly>
          <font-awesome-icon
            :icon="['fas', 'caret-up']"
            class="mt-px opacity-0 transition"
            :class="{
              'opacity-100': props.sortingColumn === 'payment_amount',
              'transition-opacity rotate-180': props.sortingOrder === 'descending'
            }"
          />
        </ClientOnly>
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
        <ClientOnly>
          <font-awesome-icon
            :icon="['fas', 'caret-up']"
            class="mt-px opacity-0 transition"
            :class="{
              'opacity-100': props.sortingColumn === 'language',
              'rotate-180': props.sortingOrder === 'descending'
            }"
          />
        </ClientOnly>
      </button>
    </div>
    <div class="overflow-y-hidden grid grid-areas-stack h-full">
      <div
        class="flex flex-row order-2 justify-between items-center self-end px-6 pr-2 py-1.5 h-12
        bg-white-alta/75 border-t border-gray backdrop-blur"
      >
        <span v-if="props.type === 'main'">
          <span v-if="props.countTotal !== props.countDisplayed">改动前共 {{ props.countTotal }} 首歌，改动后</span>共 {{ props.countDisplayed }} 首歌
        </span>
        <span v-if="props.type === 'changes'">
          共 {{ props.countTotal }} 首歌有改动
        </span>
        <span v-if="props.type === 'main'" class="flex flex-row gap-x-1 h-full">
          <button
            class="aspect-square flex flex-row justify-center items-center h-full rounded-lg hover:bg-gray
            transition active:scale-95 duration-200"
            title="添加歌曲"
            @click="create"
          >
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'plus']" />
            </ClientOnly>
          </button>
          <button
            class="aspect-square flex flex-row justify-center items-center h-full rounded-lg hover:bg-gray
            transition active:scale-95 duration-200"
            title="删除歌曲"
            @click="selectedIds.forEach(id => { emit('stageChanges', { $id: id }); selectedIds.delete(id) })"
          >
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'minus']" />
            </ClientOnly>
          </button>
        </span>
        <span v-if="props.type === 'changes'" class="flex flex-row gap-x-1 h-full">
          <button
            class="aspect-square flex flex-row justify-center items-center h-full rounded-lg hover:bg-gray
            transition active:scale-95 duration-200"
            title="撤销改动"
            @click="selectedIds.forEach(id => { emit('undoChanges', id); selectedIds.delete(id) })"
          >
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'rotate-left']" />
            </ClientOnly>
          </button>
          <button
            class="aspect-square flex flex-row justify-center items-center h-full rounded-lg hover:bg-gray
            transition active:scale-95 duration-200"
            title="发布改动"
          >
            <ClientOnly>
              <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
            </ClientOnly>
          </button>
        </span>
      </div>
      <div
        ref="listArea"
        class="overflow-y-scroll flex flex-col portrait:gap-y-5 px-2 pt-2.5 portrait:pt-4 pb-14 portrait:pb-16 bg-white-alta"
      >
        <transition-group
          :enter-from-class="props.type === 'changes' ? 'opacity-0 translate-y-[500%]' : ''"
          :enter-active-class="props.type === 'changes' ? 'transition-all duration-700' : ''"
          :leave-to-class="props.type === 'main' ? 'opacity-0 -translate-y-[200%]' : 'opacity-0 translate-y-[500%]'"
          leave-active-class="transition"
          move-class="transition-transform duration-[1300ms]"
        >
          <div
            v-for="song in props.type === 'main' ? props.data : props.dataChanges"
            :key="song.$id"
            class="grid grid-cols-[1.875rem_0.55fr_0.45fr_5rem_5.5rem] portrait:grid-cols-[2.125rem_1fr_3.5rem_4.5rem]
            grid-rows-1 portrait:grid-rows-[auto_auto]"
          >
            <label
              title="选择"
              class="group grid row-span-2 place-items-center
              pl-2.5 portrait:pl-2.5 portrait:pr-1 py-2.5 h-full rounded-lg cursor-pointer"
            >
              <input type="checkbox" class="hidden" @click="selectedIds.has(song.$id) ? selectedIds.delete(song.$id) : selectedIds.add(song.$id)">
              <ClientOnly>
                <svg v-if="!selectedIds.has(song.$id)" class="!h-5 rounded-lg transition group-active:scale-90">
                  <use href="#far-square" />
                </svg>
                <svg v-if="selectedIds.has(song.$id)" class="!h-5 text-blue group-hover:text-blue-a rounded-lg transition group-active:scale-90">
                  <use href="#fas-square-check" />
                </svg>
              </ClientOnly>
            </label>
            <transition-group
              tag="span"
              class="group grid grid-areas-stack items-center px-4 portrait:px-3 h-full portrait:leading-snug"
              :class="{ 'cursor-text': props.type === 'main' }"
              :enter-from-class="props.type === 'main' ? 'opacity-0' : ''"
              :enter-active-class="props.type === 'main' ? 'transition-opacity' : ''"
              :leave-active-class="props.type === 'main' ? 'transition-opacity delay-75' : ''"
              :leave-to-class="props.type === 'main' ? 'opacity-0' : ''"
              @click="modifyingTarget.id = song.$id; modifyingTarget.field = 'name'; modifying = true"
            >
              <input
                v-if="props.type === 'main' && modifyingTarget.id === song.$id && modifyingTarget.field === 'name'"
                :key="`${song.$id}-modifyingInput-name`"
                ref="modifyingInput"
                type="text"
                class="z-30 w-full h-2/3 bg-white
                rounded focus:outline-none ring-2 ring-blue ring-offset-[4.5px] ring-offset-white"
                :value="song.name"
                @blur="modifying = false; modifyingTarget.id = null; modifyingTarget.field = null;
                       // @ts-ignore
                       emit('stageChanges', { $id: song.$id, name: $event.target.value })"
                @keydown.enter="modifying = false"
                @keydown.esc="modifying = false"
              >
              <span
                :key="`${song.$id}-name`"
                class="flex flex-row items-center w-full"
                :class="{
                  '!h-2/3 rounded ring-2 ring-white-alta group-hover:ring-blue ring-offset-[4.5px] ring-offset-white-alta \
                  transition-[box-shadow,opacity] duration-200': props.type === 'main'
                }"
              >
                <span
                  v-if="props.type === 'main' ||
                    (props.type === 'changes' && props.data.find(unmodified => unmodified.$id === song.$id)?.name === song.name)"
                >
                  {{ song.name }}
                </span>
                <span
                  v-if="props.type === 'changes' && props.data.find(unmodified => unmodified.$id === song.$id)?.name !== song.name"
                  class="flex flex-row gap-x-1.5"
                >
                  <span v-if="props.data.some(unmodified => unmodified.$id === song.$id)" class="px-2.5 py-0.5 rounded-lg bg-pink-l/75">
                    <s>{{ props.data.find(unmodified => unmodified.$id === song.$id)?.name }}</s>
                  </span>
                  <span v-if="song.name" class="px-2.5 py-0.5 rounded-lg bg-blue-l/50">
                    {{ song.name }}
                  </span>
                </span>
              </span>
            </transition-group>
            <transition-group
              tag="span"
              class="group grid grid-areas-stack portrait:order-4 items-center px-4 portrait:px-3 h-full portrait:text-xs"
              :class="{ 'cursor-text': props.type === 'main' }"
              :enter-from-class="props.type === 'main' ? 'opacity-0' : ''"
              :enter-active-class="props.type === 'main' ? 'transition-opacity' : ''"
              :leave-active-class="props.type === 'main' ? 'transition-opacity delay-75' : ''"
              :leave-to-class="props.type === 'main' ? 'opacity-0' : ''"
              @click="modifyingTarget.id = song.$id; modifyingTarget.field = 'artist'; modifying = true"
            >
              <input
                v-if="props.type === 'main' && modifyingTarget.id === song.$id && modifyingTarget.field === 'artist'"
                :key="`${song.$id}-modifyingInput-artist`"
                ref="modifyingInput"
                type="text"
                class="z-30 w-full h-2/3 bg-white
                rounded focus:outline-none ring-2 ring-blue ring-offset-[4.5px] ring-offset-white"
                :value="song.artist"
                @blur="modifying = false; modifyingTarget.id = null; modifyingTarget.field = null;
                       // @ts-ignore
                       emit('stageChanges', { $id: song.$id, artist: $event.target.value })"
                @keydown.enter="modifying = false"
                @keydown.esc="modifying = false"
              >
              <span
                :key="`${song.$id}-artist`"
                class="flex flex-row items-center w-full"
                :class="{
                  '!h-2/3 rounded ring-2 ring-white-alta group-hover:ring-blue ring-offset-[4.5px] ring-offset-white-alta \
                  transition-[box-shadow,opacity] duration-200': props.type === 'main'
                }"
              >
                <span
                  v-if="props.type === 'main' ||
                    (props.type === 'changes' && props.data.find(unmodified => unmodified.$id === song.$id)?.artist === song.artist)"
                >
                  {{ song.artist }}
                </span>
                <span
                  v-if="props.type === 'changes' && props.data.find(unmodified => unmodified.$id === song.$id)?.artist !== song.artist"
                  class="flex flex-row gap-x-1.5"
                >
                  <span v-if="props.data.some(unmodified => unmodified.$id === song.$id)" class="px-2.5 py-0.5 rounded-lg bg-pink-l/75">
                    <s>{{ props.data.find(unmodified => unmodified.$id === song.$id)?.artist }}</s>
                  </span>
                  <span v-if="song.artist" class="px-2.5 py-0.5 rounded-lg bg-blue-l/50">
                    {{ song.artist }}
                  </span>
                </span>
              </span>
            </transition-group>
            <transition-group
              tag="span"
              class="group grid grid-areas-stack portrait:row-span-2 items-center px-4 portrait:px-3 h-full"
              :class="{ 'cursor-text': props.type === 'main' && song.payment_required }"
              :enter-from-class="props.type === 'main' ? 'opacity-0' : ''"
              :enter-active-class="props.type === 'main' ? 'transition-opacity' : ''"
              :leave-active-class="props.type === 'main' ? 'transition-opacity delay-75' : ''"
              :leave-to-class="props.type === 'main' ? 'opacity-0' : ''"
              @click="modifyingTarget.id = song.$id; modifyingTarget.field = 'payment_amount'; modifying = true"
            >
              <input
                v-if="props.type === 'main' && modifyingTarget.id === song.$id && modifyingTarget.field === 'payment_amount'"
                :key="`${song.$id}-modifyingInput-payment_amount`"
                ref="modifyingInput"
                type="text"
                class="z-30 w-full h-2/3 text-center bg-white
                rounded focus:outline-none ring-2 ring-blue ring-offset-[4.5px] ring-offset-white"
                :class="{ '': props.type === 'main' }"
                :value="song.payment_amount"
                @blur="modifying = false; modifyingTarget.id = null; modifyingTarget.field = null;
                       // @ts-ignore
                       emit('stageChanges', { $id: song.$id, payment_amount: $event.target.value })"
                @keydown.enter="modifying = false"
                @keydown.esc="modifying = false"
              >
              <span
                :key="`${song.$id}-payment_amount`"
                class="flex flex-col justify-center items-center h-full"
                :class="{
                  '!h-2/3 rounded ring-2 ring-white-alta group-hover:ring-blue ring-offset-[4.5px] ring-offset-white-alta \
                  transition-[box-shadow,opacity] duration-200': props.type === 'main'
                }"
                :title="song.payment_required && song.payment_amount ? `需要 ${song.payment_amount} 元 SC` : ''"
              >
                <font-awesome-icon v-if="props.type === 'main' && song.payment_required" :icon="['fas', 'comment-dollar']" class="!h-5" />
                <span :class="{ 'text-[0.625rem] leading-snug': props.type === 'main' }">
                  <span
                    v-if="(props.type === 'main' && song.payment_amount) ||
                      (props.type === 'changes' && song.payment_amount &&
                        props.data.find(unmodified => unmodified.$id === song.$id)?.payment_amount === song.payment_amount)"
                  >
                    ¥{{ song.payment_amount }}
                  </span>
                  <span
                    v-if="props.type === 'changes' && props.data.find(unmodified => unmodified.$id === song.$id)?.payment_amount !== song.payment_amount"
                    class="flex flex-col gap-y-1 text-sm"
                  >
                    <span
                      v-if="props.data.find(unmodified => unmodified.$id === song.$id)?.payment_amount"
                      class="px-2 py-0.5 w-fit rounded-md bg-pink-l/75"
                    >
                      <s>¥{{ props.data.find(unmodified => unmodified.$id === song.$id)?.payment_amount }}</s>
                    </span>
                    <span v-if="song.payment_amount" class="px-2 py-0.5 w-fit rounded-md bg-blue-l/50">
                      ¥{{ song.payment_amount }}
                    </span>
                  </span>
                </span>
              </span>
            </transition-group>
            <transition-group
              tag="span"
              class="group grid grid-areas-stack portrait:row-span-2 items-center pl-4 portrait:pl-3 h-full"
              :class="{ 'cursor-text': props.type === 'main' }"
              :enter-from-class="props.type === 'main' ? 'opacity-0' : ''"
              :enter-active-class="props.type === 'main' ? 'transition-opacity' : ''"
              :leave-active-class="props.type === 'main' ? 'transition-opacity delay-75' : ''"
              :leave-to-class="props.type === 'main' ? 'opacity-0' : ''"
              @click="modifyingTarget.id = song.$id; modifyingTarget.field = 'language'; modifying = true"
            >
              <input
                v-if="props.type === 'main' && modifyingTarget.id === song.$id && modifyingTarget.field === 'language'"
                :key="`${song.$id}-modifyingInput-language`"
                ref="modifyingInput"
                type="text"
                class="z-30 w-full h-2/3 bg-white
                rounded focus:outline-none ring-2 ring-blue ring-offset-[4.5px] ring-offset-white"
                :value="song.language"
                @blur="modifying = false; modifyingTarget.id = null; modifyingTarget.field = null;
                       // @ts-ignore
                       emit('stageChanges', { $id: song.$id, language: $event.target.value })"
                @keydown.enter="modifying = false"
                @keydown.esc="modifying = false"
              >
              <span
                :key="`${song.$id}-language`"
                class="flex flex-row items-center w-full h-full"
                :class="{
                  '!h-2/3 rounded ring-2 ring-white-alta group-hover:ring-blue ring-offset-[4.5px] ring-offset-white-alta \
                  transition-[box-shadow,opacity] duration-200': props.type === 'main'
                }"
              >
                <span
                  v-if="props.type === 'main' ||
                    (props.type === 'changes' && props.data.find(unmodified => unmodified.$id === song.$id)?.language === song.language)"
                >
                  {{ song.language }}
                </span>
                <span
                  v-if="props.type === 'changes' && props.data.find(unmodified => unmodified.$id === song.$id)?.language !== song.language"
                  class="flex flex-row gap-x-1.5"
                >
                  <span v-if="props.data.some(unmodified => unmodified.$id === song.$id)" class="px-2.5 py-0.5 rounded-lg bg-pink-l/75">
                    <s>{{ props.data.find(unmodified => unmodified.$id === song.$id)?.language }}</s>
                  </span>
                  <span v-if="song.language" class="px-2.5 py-0.5 rounded-lg bg-blue-l/50">
                    {{ song.language }}
                  </span>
                </span>
              </span>
            </transition-group>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Song, Playlist, PlaylistColumn, PlaylistSortingOrder } from '../pages/playlist.vue'

const props = defineProps<{
  type: 'main' | 'changes'

  // For a Main list, pass the modified list as "data"
  // For a Changes list, pass the unmodified list as "data" and the modified-only list as "dataChanges"
  data: Playlist
  dataChanges?: Playlist
  modification?: boolean
  sortingColumn: null | PlaylistColumn
  sortingOrder: PlaylistSortingOrder
  countTotal: number
  countDisplayed?: number
}>()
const emit = defineEmits<{
  toggleSorting: [PlaylistColumn],
  stageChanges: [changes: Song],
  undoChanges: [changesId: Song['$id']]
}>()

const listArea = ref<HTMLDivElement>()
function scrollList (position: 'top' | 'bottom') {
  switch (position) {
    case 'top':
      listArea.value?.scroll({
        top: 0,
        behavior: 'smooth'
      })
      break
    case 'bottom':
      listArea.value?.scroll({
        top: listArea.value?.scrollHeight,
        behavior: 'smooth'
      })
  }
}

const selectedIds = ref<Set<string>>(new Set())

const modifying = ref<Boolean>(false)
const modifyingTarget = ref<{
  id: Song['$id'] | null
  field: 'name' | 'artist' | 'payment_amount' | 'language' | null
}>({
  id: null,
  field: null
})
const modifyingInput = ref<Array<HTMLInputElement>>()
watch(modifying, (value) => {
  value ?
    nextTick(() => modifyingInput.value?.[0]?.focus()) :
    nextTick(() => modifyingInput.value?.[0]?.blur())
})

function create () {
  const id = crypto.randomUUID()
  emit('stageChanges', { $id: id, hidden: false, name: '', artist: '', payment_amount: null, language: '' })
  setTimeout(() => scrollList('bottom'), 50)
  modifyingTarget.value.id = id
  modifyingTarget.value.field = 'name'
  setTimeout(() => { modifying.value = true }, 2000)
}
</script>
