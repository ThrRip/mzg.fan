<template>
  <div />
</template>

<script setup lang="ts">
const route = useRoute()

if (route.query.entrytoken) {
  const entryRouteQueries = { ...route.query }
  delete entryRouteQueries.entrytoken
  await navigateTo({ path: route.path, query: entryRouteQueries })
}
</script>
