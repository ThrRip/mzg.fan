import { Client, Databases, Query } from 'node-appwrite'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client) { return }

  const entryTokenQuery = to.query.entrytoken
  const entryTokenCookie = useCookie('admin_entry_token')
  let entryToken = entryTokenQuery ?? entryTokenCookie.value
  if (!String(entryToken).match(/[A-Za-z0-9]{32}/)) { entryToken = null }

  function returnToHome () {
    return navigateTo(useAppConfig().appHomeBase, { external: true })
  }

  const backendClient = new Client()
  const backendDatabases = new Databases(backendClient)
  backendClient.setEndpoint(useAppConfig().backendBase)
    .setProject(useAppConfig().backendProjectId)
    .setKey(useRuntimeConfig().backendApiKey)

  if (entryToken) {
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
    } else {
      returnToHome()
    }
  } else {
    returnToHome()
  }
})
