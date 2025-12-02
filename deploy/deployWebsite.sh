#!/bin/bash
source "$(dirname "$0")/deploy.env"

# clone / update repo
echo "==> Updating repo at $APP_DIR"
if [[ -d "$APP_DIR/.git" ]]; then
    cd "$APP_DIR"
    git pull
else
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# npm install + build
echo "==> Installing npm dependencies..."
npm ci
echo "==> Building site..."
npm run build

# sync build dir with /var/www
echo "==> Syncing dist/ to $DOCROOT..."
sudo rsync -av --delete dist/ "$DOCROOT/"

echo "==> Done."
