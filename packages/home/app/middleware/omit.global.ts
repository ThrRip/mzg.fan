/*
 * Copyright (c) 2024-2025 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export type OmitDirective = 'liveStatus' | 'playlist' | 'playlistMin' | 'stats'
export type Omits = Partial<Record<OmitDirective, boolean>>

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) return

  const omits = useState<Omits>('omits', () => shallowRef({}))

  const header = useRequestHeader('x-mzgfan-home-omit')
  if (!header) return
  const headerDirectives = header.replaceAll(' ', '').split(',')
  if (headerDirectives.includes('all')) {
    omits.value = {
      liveStatus: true,
      playlist: true,
      stats: true
    }
    return
  }
  type OmitHeaderDirective = 'live-status' | 'playlist' | 'playlist-min' | 'stats'
  const directiveTable: Record<OmitHeaderDirective, OmitDirective> = {
    'live-status': 'liveStatus',
    'playlist': 'playlist',
    'playlist-min': 'playlistMin',
    'stats': 'stats'
  }
  Object.keys(directiveTable).forEach(directive => {
    if (headerDirectives.includes(directive)) {
      omits.value[directiveTable[directive as OmitHeaderDirective]] = true
    }
  })
})
