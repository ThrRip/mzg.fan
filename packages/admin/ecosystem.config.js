module.exports = {
  apps: [
    {
      name: 'mzg.fan-admin',
      script: './.output/server/index.mjs',
      interpreter: 'bun',
      port: 22321,
      max_memory_restart: '200M',
      env: {
        'NITRO_PORT': 22321,
        'NUXT_APP_SECURE_CONTEXT': true,
        'NUXT_BACKEND_API_KEY': ''
      }
    }
  ]
}
