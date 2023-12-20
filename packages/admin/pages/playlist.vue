<!-- Modified from ~/packages/home/app.vue -->
<template>
  <div
    class="lg:overflow-y-hidden grid grid-cols-1 grid-rows-[0.06fr_0.44fr_0.5fr] grid-flow-col
    lg:grid-cols-[0.5fr_0.5fr] lg:grid-rows-[auto_1fr] max-lg:gap-y-8 max-lg:landscape:gap-y-6 lg:gap-x-12
    pl-[25%] max-lg:landscape:pl-44 sm:pl-64 pr-6 sm:pr-16 pb-6 max-lg:landscape:pt-8 lg:pb-12 h-2dscreen lg:h-full"
  >
    <h2 class="col-span-2 self-end px-2 portrait:pt-8 lg:py-12 text-4xl lg:text-5xl font-light tracking-wide text-brown">
      歌单编辑
    </h2>
    <PlaylistList
      type="main"
      :data="viewPlaylistData"
      :modification="true"
      :sorting-column="viewPlaylistSortingColumn"
      :sorting-order="viewPlaylistSortingOrder"
      :count-total="// @ts-ignore
        backendPlaylist.length"
      :count-displayed="viewPlaylistData.length"
      @toggle-sorting="viewPlaylistToggleSorting"
      @stage-changes="viewPlaylistStageChanges"
    />
    <PlaylistList
      type="changes"
      :data="backendPlaylist"
      :data-changes="viewPlaylistChangesData"
      :sorting-column="viewPlaylistSortingColumn"
      :sorting-order="viewPlaylistSortingOrder"
      :count-total="viewPlaylistChangesData.length"
      @toggle-sorting="viewPlaylistToggleSorting"
      @undo-changes="viewPlaylistUndoChanges"
    />
  </div>
</template>

<script setup lang="ts">
import { Client, Databases, Query } from 'appwrite'

const props = defineProps<{
  backendClient: Client
}>()

useHead({
  title: '歌单编辑 - 管理面板 | 洺知-故犯'
})

// Backend
const backendDatabases = new Databases(props.backendClient)

export interface Song {
  hidden?: boolean
  name?: string
  artist?: string
  language?: string
  payment_required?: boolean
  payment_amount?: null | number
  $id: string
}
export type Playlist = Array<Song>

const { data: backendPlaylist } = await useAsyncData<Playlist>(
  // Use a random key to avoid caching
  `backend-databases-home-playlist-${Math.random()}`,
  // @ts-ignore
  () => backendDatabases.listDocuments('home', 'playlist', [Query.limit(useAppConfig().backendQueryResultsLimit)]),
  {
    server: false,
    lazy: true,
    default: () => [],
    transform: (res: { total: number, documents: Playlist }): Playlist => res.documents
  }
)

// View
export type PlaylistColumn = 'name' | 'artist' | 'payment_amount' | 'language'
interface SortingSong extends Song {
  namePinyin?: string
  artistPinyin?: string
  languageCode?: string
}
export type PlaylistSortingOrder = 'ascending' | 'descending'
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
  } else
  // Disable sorting because out of ordering options
  if (
    column === viewPlaylistSortingColumn.value &&
    viewPlaylistSortingOrder.value === viewPlaylistSortingOrderOptions.value[viewPlaylistSortingOrderOptions.value.length - 1]
  ) {
    viewPlaylistSortingColumn.value = null
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions.value[0]
  // Rotate between ordering options
  } else {
    const sortingOrderOptionIndex: number =
      viewPlaylistSortingOrderOptions.value.findIndex(option => option === viewPlaylistSortingOrder.value) + 1 >
      viewPlaylistSortingOrderOptions.value.length - 1 ?
        0 :
        viewPlaylistSortingOrderOptions.value.findIndex(option => option === viewPlaylistSortingOrder.value) + 1
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions.value[sortingOrderOptionIndex]
  }
  viewPlaylistDataUpdate()
}

const viewPlaylistChangesData = ref<Playlist>([])
const viewPlaylistDataWithChanges = computed<Playlist>(() => {
  // @ts-ignore
  const playlist: Playlist = backendPlaylist.value.slice()
  viewPlaylistChangesData.value.forEach((changes: Song) => {
    if (Object.keys(changes).length === 1 && Object.keys(changes)[0] === '$id') {
      playlist.splice(playlist.findIndex(song => song.$id === changes.$id), 1)
    } else
    if (playlist.some(song => song.$id === changes.$id)) {
      playlist[playlist.findIndex(song => song.$id === changes.$id)] = changes
    } else {
      playlist.push(changes)
    }
  })
  return playlist
})
const viewPlaylistData = ref<Playlist>(viewPlaylistDataWithChanges.value)
async function viewPlaylistDataUpdate () {
  if (viewPlaylistSortingColumn.value === null) {
    viewPlaylistData.value = viewPlaylistDataWithChanges.value
  } else {
    const playlist: Array<SortingSong> = viewPlaylistDataWithChanges.value.slice()
    const orderModifier = viewPlaylistSortingOrder.value === 'ascending' ? 1 : -1

    // Sort by song name or artist in alphabetical order
    if (viewPlaylistSortingColumn.value === 'name' || viewPlaylistSortingColumn.value === 'artist') {
      const pinyinPro = await import('pinyin-pro')
      playlist.map((song) => {
        // @ts-ignore
        song[`${viewPlaylistSortingColumn.value}Pinyin`] =
          // @ts-ignore
          pinyinPro.pinyin(song[viewPlaylistSortingColumn.value], { toneType: 'none', nonZh: 'consecutive' })
            .replaceAll(' ', '')
        return song
      })
      playlist.sort((a, b) => {
        // @ts-ignore
        if (a[`${viewPlaylistSortingColumn.value}Pinyin`] < b[`${viewPlaylistSortingColumn.value}Pinyin`]) {
          return -1 * orderModifier
        } else
        // @ts-ignore
        if (a[`${viewPlaylistSortingColumn.value}Pinyin`] > b[`${viewPlaylistSortingColumn.value}Pinyin`]) {
          return 1 * orderModifier
        } else {
          return 0
        }
      })
    } else

    // Sort by payment requirement
    if (viewPlaylistSortingColumn.value === 'payment_amount') {
      playlist.sort((a, b) => {
        if (a.payment_required === false || b.payment_required === false) {
          return (Number(a.payment_required ?? 0) - Number(b.payment_required ?? 0)) * orderModifier
        }
        return ((a.payment_amount ?? 0) - (b.payment_amount ?? 0)) * orderModifier
      })
    } else

    // Sort by language
    if (viewPlaylistSortingColumn.value === 'language') {
      const languageOrder = ['国语', '粤语', '日语']
      playlist.sort((a, b) => {
        return (languageOrder.findIndex(language => a.language === language) -
          languageOrder.findIndex(language => b.language === language)) * orderModifier
      })
    }
    viewPlaylistData.value = playlist
  }
}
watch(viewPlaylistDataWithChanges, () => viewPlaylistDataUpdate())

function viewPlaylistStageChanges (changes: Song) {
  const changesFieldsAccepted: Set<keyof Song> = new Set(['$id', 'hidden', 'name', 'artist', 'payment_amount', 'language'])

  // New song
  // @ts-ignore
  if (!backendPlaylist.value.some(song => song.$id === changes.$id) && Object.keys(changes).length === changesFieldsAccepted.size) {
    const changesFields: Set<string> = new Set(Object.keys(changes))
    let changesFieldsFulfilled: boolean = true
    changesFieldsAccepted.forEach((field) => {
      if (!changesFields.has(field)) { changesFieldsFulfilled = false }
    })
    if (changesFieldsFulfilled) {
      changes.payment_required = Boolean(changes.payment_amount)
      viewPlaylistChangesData.value.push(changes)
    }
  } else

  // Modify song
  if (viewPlaylistData.value.some(song => song.$id === changes.$id) && Object.keys(changes).length > 1) {
    const song = viewPlaylistData.value.find(_ => _.$id === changes.$id)
    let changesValid = false
    for (const field in changes) {
      // @ts-ignore
      if (field !== '$id' && changes[field] !== song[field]) { changesValid = true; break }
    }
    if (changesValid) {
      const changesPrevious = viewPlaylistChangesData.value.find(song => song.$id === changes.$id)
      // @ts-ignore
      changes.payment_required = Boolean(changes.payment_amount ?? song.payment_required)
      changesFieldsAccepted.forEach((field) => {
        // @ts-ignore
        if (changes[field] === undefined) { changes[field] = changesPrevious ? changesPrevious[field] : song[field] }
      })
      if (changesPrevious) {
        viewPlaylistChangesData.value.splice(viewPlaylistChangesData.value.findIndex(song => song.$id === changes.$id), 1)
      }
      viewPlaylistChangesData.value.push(changes)
    }
  } else

  // Delete song
  if (
    viewPlaylistData.value.some(song => song.$id === changes.$id) &&
    Object.keys(changes).length === 1 &&
    changes.$id
  ) {
    if (viewPlaylistChangesData.value.some(song => song.$id === changes.$id)) {
      viewPlaylistChangesData.value.splice(viewPlaylistChangesData.value.findIndex(song => song.$id === changes.$id), 1)
    }
    // If the song is not published yet, do not create a change
    // @ts-ignore
    if (backendPlaylist.value.some(song => song.$id === changes.$id)) {
      viewPlaylistChangesData.value.push(changes)
    }
  }
}

function viewPlaylistUndoChanges (changesIds: Set<Song['$id']>) {
  changesIds.forEach((changesId) => {
    viewPlaylistChangesData.value.splice(
      viewPlaylistChangesData.value.findIndex(changes => changes.$id === changesId),
      1
    )
  })
}
</script>
