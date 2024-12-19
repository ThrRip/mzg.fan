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
      :count-total="backendPlaylist.length"
      :count-displayed="viewPlaylistData.length"
      @toggle-sorting="viewPlaylistToggleSorting"
      @stage-changes="viewPlaylistStageChanges"
    />
    <PlaylistChangesList
      :data="backendPlaylist"
      :data-changes="viewPlaylistChangesData"
      :publishing-state="backendPlaylistPublishChangesState"
      :further-changes="viewPlaylistFurtherChangesIds"
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

const { data: backendPlaylist, refresh: backendPlaylistRefresh, status: backendPlaylistStatus } = await useAsyncData(
  // Use a random key to avoid caching
  `backend-databases-home-playlist-${Math.random()}`,
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

  function succeed (changesId: Song['$id'], newId?: Song['$id']) {
    const publishIndex = backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId)
    // @ts-expect-error
    backendPlaylistPublishChangesState.value[publishIndex].state = 'succeeded'
    // @ts-expect-error
    if (newId) { backendPlaylistPublishChangesState.value[publishIndex].newId = newId }
  }
  function fail (changesId: Song['$id'], error: AppwriteException) {
    const publishIndex = backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId)
    // @ts-expect-error
    backendPlaylistPublishChangesState.value[publishIndex].state = 'failed'
    // @ts-expect-error
    backendPlaylistPublishChangesState.value[publishIndex].error = error
  }
  function cleanup (changesId: Song['$id']) {
    const publishIndex = backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId)
    // @ts-expect-error
    if (!backendPlaylistPublishChangesState.value[publishIndex].newId) {
      // @ts-expect-error
      backendPlaylistPublishChangesState.value[publishIndex].old =
        backendPlaylist.value.find(song => song.$id === changesId)
    }
    if (backendPlaylistPublishChangesState.value.findIndex(_ => _.state === 'processing') !== -1) { return }
    backendPlaylistRefresh()
      .then(() => {
        backendPlaylistPublishChangesState.value.forEach((_, index) => {
          if (!_.newId) { return }
          // @ts-expect-error
          viewPlaylistChangesData.value[
            viewPlaylistChangesData.value.findIndex(changes => changes.$id === _.$id)
          ].$id = _.newId
          // @ts-expect-error
          backendPlaylistPublishChangesState.value[index].$id = _.newId
          // @ts-expect-error
          delete backendPlaylistPublishChangesState.value[index].newId
        })
        viewPlaylistDataUpdate('backend')
      })
  }

  changesIds.forEach(changesId => {
    viewPlaylistFurtherChangesIds.value.delete(changesId)

    const changes = { ...viewPlaylistChangesData.value.find(_ => _.$id === changesId) }

    // New song - using a UUID for "$id" locally
    if (changesId.includes('-')) {
      delete changes.$id
      backendDatabases.createDocument('home', 'playlist', ID.unique(), changes, [Permission.read(Role.any())])
        // Save the ID generated by the backend for correct identifying of changes after the final refresh
        .then(res => succeed(changesId, res.$id), err => fail(changesId, err))
        .finally(() => cleanup(changesId))
    }
    else

    // Modify song
    if (
      backendPlaylist.value.findIndex(song => song.$id === changes.$id) !== -1 &&
      Object.keys(changes).length > 1
    ) {
      delete changes.$id
      backendDatabases.updateDocument('home', 'playlist', changesId, changes)
        .then(() => succeed(changesId), err => fail(changesId, err))
        .finally(() => cleanup(changesId))
    }
    else

    // Delete song
    if (
      backendPlaylist.value.findIndex(song => song.$id === changes.$id) !== -1 &&
      Object.keys(changes).length === 1
    ) {
      backendDatabases.deleteDocument('home', 'playlist', changesId)
        .then(() => succeed(changesId), err => fail(changesId, err))
        .finally(() => cleanup(changesId))
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
const viewPlaylistSortingOrder = ref<PlaylistSortingOrder>()
const viewPlaylistSortingOrderOptions: Record<PlaylistColumn, Array<PlaylistSortingOrder>> = {
  name: ['ascending', 'descending'],
  artist: ['ascending', 'descending'],
  payment_amount: ['descending', 'ascending'],
  language: ['ascending', 'descending']
}
function viewPlaylistToggleSorting (column: PlaylistColumn) {
  // Enable sorting or switch to another column
  if (viewPlaylistSortingColumn.value === null || column !== viewPlaylistSortingColumn.value) {
    viewPlaylistSortingColumn.value = column
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions[column][0]
  }
  else
  // Disable sorting because out of ordering options
  if (
    column === viewPlaylistSortingColumn.value &&
    viewPlaylistSortingOrder.value ===
      viewPlaylistSortingOrderOptions[column][viewPlaylistSortingOrderOptions[column].length - 1]
  ) {
    viewPlaylistSortingColumn.value = null
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions[column][0]
    viewPlaylistDataUpdate()
    return
  }
  // Rotate between ordering options
  else {
    viewPlaylistSortingOrder.value = viewPlaylistSortingOrderOptions[column][
      viewPlaylistSortingOrderOptions[column].indexOf(viewPlaylistSortingOrder.value as PlaylistSortingOrder) + 1
    ]
  }
  viewPlaylistDataUpdate()
}

let viewPlaylistDataChangesMerged_: Playlist = []
function viewPlaylistDataMergeChanges (data: Playlist, changes: Playlist) {
  const playlist = data.slice()
  changes.forEach((changes: Song) => {
    if (
      backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changes.$id && _.state === 'succeeded') !== -1
    ) { return }
    if (Object.keys(changes).length === 1 && Object.keys(changes)[0] === '$id') {
      playlist.splice(playlist.findIndex(song => song.$id === changes.$id), 1)
    }
    else
    if (playlist.findIndex(song => song.$id === changes.$id) !== -1) {
      playlist[playlist.findIndex(song => song.$id === changes.$id)] = changes
    }
    else {
      playlist.push(changes)
    }
  })
  viewPlaylistDataChangesMerged_ = playlist
  return playlist
}
async function viewPlaylistDataSort (data: Playlist, column: PlaylistColumn, order: PlaylistSortingOrder) {
  const playlist: Array<SortingSong> = data.slice()
  const orderModifier = order === 'ascending' ? 1 : -1

  // Sort by song name or artist in alphabetical order
  if (column === 'name' || column === 'artist') {
    const pinyinPro = await import('pinyin-pro')
    playlist.forEach((song, index) => {
      // @ts-expect-error
      playlist[index][`${column}Pinyin`] =
        // @ts-expect-error
        pinyinPro.pinyin(song[column], { toneType: 'none', nonZh: 'consecutive' })
          .replaceAll(' ', '')
    })
    playlist.sort((a, b) => {
      // @ts-expect-error
      if (a[`${column}Pinyin`] < b[`${column}Pinyin`]) {
        return -1 * orderModifier
      }
      else
      // @ts-expect-error
      if (a[`${column}Pinyin`] > b[`${column}Pinyin`]) {
        return 1 * orderModifier
      }
      else {
        return 0
      }
    })
  }
  else

  // Sort by payment requirement
  if (column === 'payment_amount') {
    playlist.sort((a, b) => {
      if (a.payment_required === false || b.payment_required === false) {
        return (Number(a.payment_required ?? 0) - Number(b.payment_required ?? 0)) * orderModifier
      }
      return ((a.payment_amount ?? 0) - (b.payment_amount ?? 0)) * orderModifier
    })
  }
  else

  // Sort by language
  if (column === 'language') {
    const languageOrder = ['国语', '粤语', '日语']
    // @ts-expect-error
    playlist.sort((a, b) => ((languageOrder.indexOf(a.language) - languageOrder.indexOf(b.language)) * orderModifier))
  }

  return playlist
}
const viewPlaylistData = ref<Playlist>([])
function viewPlaylistDataUpdate (hint?: 'backend' | 'changes') {
  let playlist: Playlist = hint === 'backend' ? backendPlaylist.value : viewPlaylistDataChangesMerged_
  if (hint === 'backend' || hint === 'changes') {
    playlist = viewPlaylistDataMergeChanges(backendPlaylist.value, viewPlaylistChangesData.value)
  }
  if (viewPlaylistSortingColumn.value && viewPlaylistSortingOrder.value) {
    viewPlaylistDataSort(
      playlist,
      viewPlaylistSortingColumn.value,
      viewPlaylistSortingOrder.value
    ).then(dataSorted => {
      playlist = dataSorted
      viewPlaylistData.value = playlist
    })
  }
  else { viewPlaylistData.value = playlist }
}

const viewPlaylistDataInitFinish = watch(backendPlaylistStatus, value => {
  if (value === 'success') {
    viewPlaylistDataUpdate('backend')
    viewPlaylistDataInitFinish()
  }
})

const viewPlaylistChangesData = ref<Playlist>([])
function viewPlaylistStageChanges (changes: Song) {
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
  if (viewPlaylistData.value.findIndex(song => song.$id === changes.$id) !== -1 && Object.keys(changes).length > 1) {
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
      viewPlaylistFurtherChangeCheck(changes.$id)
    }
    else
    if (changesStaged) {
      viewPlaylistChangesData.value.splice(viewPlaylistChangesData.value.findIndex(_ => _.$id === changes.$id), 1)
    }
  }
  else

  // Delete song
  if (
    viewPlaylistData.value.findIndex(song => song.$id === changes.$id) !== -1 &&
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
    viewPlaylistFurtherChangeCheck(changes.$id)
  }

  viewPlaylistDataUpdate('changes')
}
const viewPlaylistFurtherChangesIds = ref<Set<Song['$id']>>(new Set())
function viewPlaylistFurtherChangeCheck (changesId: Song['$id']) {
  // If changes were made to a song with publishing history, mark for transition and clear its previous publishing state
  if (backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId) !== -1) {
    viewPlaylistFurtherChangesIds.value.add(changesId)
    setTimeout(() => viewPlaylistFurtherChangesIds.value.delete(changesId), 200)
    backendPlaylistPublishChangesState.value.splice(
      backendPlaylistPublishChangesState.value.findIndex(_ => _.$id === changesId),
      1
    )
  }
}

function viewPlaylistUndoChanges (changesIds: Set<Song['$id']>) {
  changesIds.forEach(changesId => {
    viewPlaylistChangesData.value.splice(
      viewPlaylistChangesData.value.findIndex(changes => changes.$id === changesId),
      1
    )
  })
  viewPlaylistDataUpdate('changes')
}

function viewPlaylistClearPublishedChanges () {
  for (let index = backendPlaylistPublishChangesState.value.length - 1; index >= 0; index--) {
    if ((backendPlaylistPublishChangesState.value[index] as SongPublishingState).state === 'succeeded') {
      viewPlaylistChangesData.value.splice(
        viewPlaylistChangesData.value.findIndex(changes => (
          changes.$id === (backendPlaylistPublishChangesState.value[index] as SongPublishingState).$id)
        ),
        1
      )
      backendPlaylistPublishChangesState.value.splice(index, 1)
    }
  }
}
</script>
