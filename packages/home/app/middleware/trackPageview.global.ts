/*
 * Copyright (c) 2024-2025 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Omits } from './omit.global'

export default defineNuxtRouteMiddleware(() => {
  if (
    !useAppConfig().statsBase ||
    useState<Omits>('omits').value.stats ||
    import.meta.client ||
    import.meta.dev ||
    !useRequestHeader('user-agent')
  ) return

  const fetchHeaders: Record<string, string> = {}
  const requestHeaders = useRequestHeaders();
  ['user-agent', 'x-forwarded-for', 'x-forwarded-proto', 'x-forwarded-host'].forEach(header => {
    if (requestHeaders[header]) { fetchHeaders[header] = requestHeaders[header] }
  })

  useFetch('/api/event', {
    baseURL: useAppConfig().statsBase,
    method: 'POST',
    headers: fetchHeaders,
    body: {
      // domain
      d: new URL(useRequestURL()).hostname,
      // name
      n: 'pageview',
      // url
      u: useRequestURL(),
      // referrer
      r: useRequestHeader('referer')
    }
  })
})
