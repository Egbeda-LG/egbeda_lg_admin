#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/egbeda_lg_admin}"
APP_NAME="${APP_NAME:-egbeda-lg-admin}"
export APP_DIR APP_NAME

cd "$APP_DIR"

if [ ! -f .next/standalone/server.js ]; then
  echo "Standalone Next.js build is missing. Deploy a release bundle before starting."
  exit 1
fi

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only "$APP_NAME" --update-env
else
  pm2 start ecosystem.config.cjs --only "$APP_NAME"
fi

pm2 save
pm2 status "$APP_NAME"