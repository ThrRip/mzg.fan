/*
 * Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export default defineNuxtRouteMiddleware(async to => {
  if (import.meta.client) { return }

  function navigateToHome () {
    return navigateTo(useAppConfig().appHomeBase, { external: true })
  }

  const entryTokenQuery = to.query.entrytoken
  const entryTokenCookie = useCookie('admin_entry_token', {
    maxAge: 2592000,
    httpOnly: true,
    path: useAppConfig().appAdminBasePath,
    sameSite: 'strict',
    // @ts-expect-error
    secure: useRuntimeConfig().appSecureContext
  })
  const entryToken = entryTokenQuery ?? entryTokenCookie.value
  if (!String(entryToken).match(/[A-Za-z0-9]{32}/)) { return navigateToHome() }

  const { Client, Databases, Query } = await import('node-appwrite')
  const backendClient = new Client()
  const backendDatabases = new Databases(backendClient)
  backendClient.setEndpoint(useAppConfig().backendBase)
    .setProject(useAppConfig().backendProjectId)
    .setKey(useRuntimeConfig().backendApiKey as string)

  const entryTokenMatches = (await backendDatabases.listDocuments(
    'admin',
    'entry-tokens',
    [
      Query.equal('token', [String(entryToken)]),
      Query.equal('valid', [true])
    ]
  )).total
  if (entryTokenMatches) {
    entryTokenCookie.value = String(entryToken)
  }
  else {
    return navigateToHome()
  }
})
