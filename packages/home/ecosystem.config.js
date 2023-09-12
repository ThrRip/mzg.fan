module.exports = {
  apps: [
    {
      name: 'mzg.fan-home',
      script: './.output/server/index.mjs',
      port: 22320,
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '150M',
      env: {
        'NITRO_PORT': 22320
      }
    }
  ]
}
