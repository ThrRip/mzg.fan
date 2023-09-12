module.exports = {
  apps: [
    {
      name: 'mzg.fan-home',
      script: './.output/server/index.mjs',
      interpreter: 'bun',
      port: 22320,
      max_memory_restart: '300M',
      env: {
        'NITRO_PORT': 22320
      }
    }
  ]
}
