module.exports = {
  apps: [
    {
      name: 'egbeda-lg-admin',
      script: '.next/standalone/server.js',
      cwd: process.env.APP_DIR || '/var/www/egbeda_lg_admin',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '200M',
      node_args: '--max-old-space-size=160',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: 6001,
        NEXT_PUBLIC_API_BASE_URL: 'https://api.egbedalga.oy.gov.ng',
      },
    },
  ],
}