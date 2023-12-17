module.exports = {
  apps: [
    {
      name: 'mzg.fan-home',
      script: './.output/server/index.mjs',
      interpreter: 'bun',
      port: 12320,
      max_memory_restart: '200M',
      env: {
        'NITRO_PORT': 12320
      }
    }
  ]
}
