module.exports = {
  apps: [
    {
      name: 'mzg.fan',
      port: 22320,
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        'NITRO_PORT': 22320
      }
    }
  ]
}
