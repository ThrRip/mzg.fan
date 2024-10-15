<!--
  - Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
  -
  - This Source Code Form is subject to the terms of the Mozilla Public
  - License, v. 2.0. If a copy of the MPL was not distributed with this
  - file, You can obtain one at https://mozilla.org/MPL/2.0/.
  -->

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
    <PlaylistMainList
      :data="viewPlaylistData"
      :sorting-column="viewPlaylistSortingColumn"
      :sorting-order="viewPlaylistSortingOrder"
      :count-total="// @ts-ignore
        backendPlaylist.length"
      :count-displayed="viewPlaylistData.length"
      @toggle-sorting="viewPlaylistToggleSorting"
      @stage-changes="viewPlaylistStageChanges"
    />
    <PlaylistChangesList
      :data="backendPlaylist"
      :data-changes="viewPlaylistChangesData"
      :publishing-state="backendPlaylistPublishChangesState"
      :sorting-column="viewPlaylistSortingColumn"
      :sorting-order="viewPlaylistSortingOrder"
      :count-total="viewPlaylistChangesData.length"
      @toggle-sorting="viewPlaylistToggleSorting"
      @undo-changes="viewPlaylistUndoChanges"
      @clear-published-changes="viewPlaylistClearPublishedChanges"
      @publish-changes="backendPlaylistPublishChanges"
    />
  </div>
</template>

<script setup lang="ts">
import { Databases, ID, Query, Permission, Role } from 'appwrite'
import type { AppwriteException, Client } from 'appwrite'

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

const { data: backendPlaylist, refresh: backendPlaylistRefresh } = await useAsyncData<Playlist>(
  // Use a random key to avoid caching
  `backend-databases-home-playlist-${Math.random()}`,
  // @ts-expect-error
  () => backendDatabases.listDocuments('home', 'playlist', [Query.limit(useAppConfig().backendQueryResultsLimit)]),
  {
    server: false,
    lazy: true,
    default: () => [],
    transform: (res: { total: number, documents: Playlist }): Playlist => res.documents
  }
)

export interface SongPublishingState {
  $id: Song['$id']
  state: 'processing' | 'succeeded' | 'failed'
  newId?: Song['$id']
  old?: Song
  error?: AppwriteException
}
export type PlaylistPublishingState = Array<SongPublishingState>

const backendPlaylistPublishChangesState = ref<PlaylistPublishingState>([])
function backendPlaylistPublishChanges (changesIds: Set<Song['$id']>) {
  backendPlaylistPublishChangesState.value = backendPlaylistPublishChangesState.value.concat(
    backendPlaylistPublishChangesState.value,
    [...changesIds].map(changesId => {
      return {
        $id: changesId,
        state: 'processing'
      }
    })
  )

  function cleanup (changesId: Song['$id'], newId?: Song['$id']) {
    backendPlaylistPublishChangesState.value[
      backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId)
    ].state = 'succeeded'
    if (newId) {
      backendPlaylistPublishChangesState.value[
        backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId)
      ].newId = newId
    }
    else {
      backendPlaylistPublishChangesState.value[
        backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId)
      // @ts-expect-error
      ].old = backendPlaylist.value.find(song => song.$id === changesId)
    }
  }
  function fail (changesId: Song['$id'], error: AppwriteException) {
    const changesPublishStateIndex = backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId)
    backendPlaylistPublishChangesState.value[changesPublishStateIndex].state = 'failed'
    backendPlaylistPublishChangesState.value[changesPublishStateIndex].error = error
  }
  function backendPlaylistRefreshIfAllPublishingFinished () {
    if (backendPlaylistPublishChangesState.value.find(_ => _.state === 'processing')) { return }
    backendPlaylistRefresh()
      .then(() => {
        backendPlaylistPublishChangesState.value.forEach((_, index) => {
          if (!_.newId) { return }
          viewPlaylistChangesData.value[
            viewPlaylistChangesData.value.findIndex(changes => changes.$id === _.$id)
          ].$id = _.newId
          backendPlaylistPublishChangesState.value[index].$id = _.newId
          delete backendPlaylistPublishChangesState.value[index].newId
        })
      })
  }

  changesIds.forEach(changesId => {
    const changes = { ...viewPlaylistChangesData.value.find(_ => _.$id === changesId) }

    // New song - using a UUID for "$id" locally
    if (changesId.includes('-')) {
      delete changes.$id
      backendDatabases.createDocument('home', 'playlist', ID.unique(), changes, [Permission.read(Role.any())])
        // Save the ID generated by the backend for correct identifying of changes after the final refresh
        .then(res => cleanup(changesId, res.$id), err => fail(changesId, err))
        .finally(backendPlaylistRefreshIfAllPublishingFinished)
    }
    else

    // Modify song
    // @ts-expect-error
    if (backendPlaylist.value.find(song => song.$id === changes.$id) && Object.keys(changes).length > 1) {
      delete changes.$id
      backendDatabases.updateDocument('home', 'playlist', changesId, changes)
        .then(() => cleanup(changesId), err => fail(changesId, err))
        .finally(backendPlaylistRefreshIfAllPublishingFinished)
    }
    else

    // Delete song
    // @ts-expect-error
    if (backendPlaylist.value.find(song => song.$id === changes.$id) && Object.keys(changes).length === 1) {
      backendDatabases.deleteDocument('home', 'playlist', changesId)
        .then(() => cleanup(changesId), err => fail(changesId, err))
        .finally(backendPlaylistRefreshIfAllPublishingFinished)
    }
  })
}

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
  }
  else
  // Disable sorting because out of ordering options
  if (
    column === viewPlaylistSortingColumn.value &&
    viewPlaylistSortingOrder.value === viewPlaylistSortingOrderOptions.value[viewPlaylistSortingOrderOptions.value.length - 1]
  ) {
    viewPlaylistSortingColumn.value = null
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions.value[0]
  // Rotate between ordering options
  }
  else {
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
  // @ts-expect-error
  const playlist: Playlist = backendPlaylist.value.slice()
  viewPlaylistChangesData.value.forEach((changes: Song) => {
    if (backendPlaylistPublishChangesState.value.find(_ => _.$id === changes.$id && _.state === 'succeeded')) { return }
    if (Object.keys(changes).length === 1 && Object.keys(changes)[0] === '$id') {
      playlist.splice(playlist.findIndex(song => song.$id === changes.$id), 1)
    }
    else
    if (playlist.find(song => song.$id === changes.$id)) {
      playlist[playlist.findIndex(song => song.$id === changes.$id)] = changes
    }
    else {
      playlist.push(changes)
    }
  })
  return playlist
})
const viewPlaylistData = ref<Playlist>(viewPlaylistDataWithChanges.value)
async function viewPlaylistDataUpdate () {
  if (viewPlaylistSortingColumn.value === null) {
    viewPlaylistData.value = viewPlaylistDataWithChanges.value
  }
  else {
    const playlist: Array<SortingSong> = viewPlaylistDataWithChanges.value.map(song => ({ ...song }))
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
    viewPlaylistData.value = playlist
  }
}
watch(viewPlaylistDataWithChanges, () => viewPlaylistDataUpdate())

function viewPlaylistStageChanges (changes: Song) {
  if (backendPlaylistPublishChangesState.value.find(_ => _.$id === changes.$id)) {
    backendPlaylistPublishChangesState.value.splice(
      backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changes.$id),
      1
    )
  }

  // @ts-expect-error
  const songUnmodified = backendPlaylist.value.find(song => song.$id === changes.$id)
  const changesStaged = viewPlaylistChangesData.value.find(song => song.$id === changes.$id)

  const changesFieldsAccepted: Set<keyof Song> = new Set(['$id', 'hidden', 'name', 'artist', 'payment_amount', 'language'])

  // New song
  if (!songUnmodified && Object.keys(changes).length === changesFieldsAccepted.size) {
    const changesFields: Set<string> = new Set(Object.keys(changes))
    let changesFieldsFulfilled: boolean = true
    changesFieldsAccepted.forEach(field => {
      if (!changesFields.has(field)) { changesFieldsFulfilled = false }
    })
    if (changesFieldsFulfilled) {
      changes.payment_required = Boolean(changes.payment_amount)
      viewPlaylistChangesData.value.push(changes)
    }
  }
  else

  // Modify song
  if (viewPlaylistData.value.find(song => song.$id === changes.$id) && Object.keys(changes).length > 1) {
    if (changesStaged) {
      let diffFromStaged = false
      for (const field in changes) {
        // @ts-expect-error
        if (field !== '$id' && changes[field] !== changesStaged[field]) {
          diffFromStaged = true
          break
        }
      }
      if (diffFromStaged) {
        for (const field in changesStaged) {
          // @ts-expect-error
          if (field !== 'payment_required' && changes[field] === undefined) { changes[field] = changesStaged[field] }
        }
      }
      else { return }
    }
    let diffFromUnmodified = false
    if (changes.$id.includes('-')) { diffFromUnmodified = true }
    else {
      for (const field in changes) {
      // @ts-expect-error
        if (field !== '$id' && changes[field] !== songUnmodified[field]) {
          diffFromUnmodified = true
          break
        }
      }
      if (!changesStaged && diffFromUnmodified) {
        changesFieldsAccepted.forEach(field => {
        // @ts-expect-error
          if (field !== 'payment_required' && changes[field] === undefined) { changes[field] = songUnmodified[field] }
        })
      }
    }

    if (diffFromUnmodified) {
      changes.payment_required = Boolean(changes.payment_amount)
      if (changesStaged) {
        viewPlaylistChangesData.value[viewPlaylistChangesData.value.findIndex(_ => _.$id === changes.$id)] = changes
      }
      else {
        viewPlaylistChangesData.value.push(changes)
      }
    }
    else
    if (changesStaged) {
      viewPlaylistChangesData.value.splice(viewPlaylistChangesData.value.findIndex(_ => _.$id === changes.$id), 1)
    }
  }
  else

  // Delete song
  if (
    viewPlaylistData.value.find(song => song.$id === changes.$id) &&
    Object.keys(changes).length === 1 &&
    changes.$id
  ) {
    if (!songUnmodified) {
      viewPlaylistChangesData.value.splice(viewPlaylistChangesData.value.findIndex(_ => _.$id === changes.$id), 1)
    }
    else
    if (changesStaged) {
      viewPlaylistChangesData.value[viewPlaylistChangesData.value.findIndex(_ => _.$id === changes.$id)] = changes
    }
    else {
      viewPlaylistChangesData.value.push(changes)
    }
  }
}

function viewPlaylistUndoChanges (changesIds: Set<Song['$id']>) {
  changesIds.forEach(changesId => {
    viewPlaylistChangesData.value.splice(
      viewPlaylistChangesData.value.findIndex(changes => changes.$id === changesId),
      1
    )
  })
}

function viewPlaylistClearPublishedChanges () {
  const stateCleaned: PlaylistPublishingState = []
  backendPlaylistPublishChangesState.value.forEach(_ => {
    if (_.state === 'succeeded') {
      viewPlaylistChangesData.value.splice(viewPlaylistChangesData.value.findIndex(changes => changes.$id === _.$id), 1)
    }
    else {
      stateCleaned.push(_)
    }
  })
  backendPlaylistPublishChangesState.value = stateCleaned
}
</script>
