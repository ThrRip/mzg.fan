module.exports = {
  apps: [
    {
      name: 'mzg.fan-admin',
      script: './.output/server/index.mjs',
      interpreter: 'bun',
      port: 12321,
      max_memory_restart: '200M',
      env: {
        'NITRO_PORT': 12321,
        'NUXT_APP_SECURE_CONTEXT': true,
        'NUXT_BACKEND_API_KEY': ''
      }
    }
  ]
}
