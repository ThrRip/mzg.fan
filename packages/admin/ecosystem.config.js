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
        'NUXT_BACKEND_API_KEY': ''
      }
    }
  ]
}
