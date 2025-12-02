#!/bin/bash
source "$(dirname "$0")/deploy.env"

# require sudo
if [[ $EUID -ne 0 ]]; then
  echo "Run with sudo." >&2
  exit 1
fi

echo "==> Updating apt and installing base packages..."
apt-get update -y
apt-get install -y nodejs npm nginx certbot python3-certbot-nginx

# where does the project src live?
echo "==> Ensuring docroot exists: $DOCROOT..."
mkdir -p "$DOCROOT"
chown -R "$WEB_USER":"$WEB_USER" "$DOCROOT"

echo "==> configuring firewall with ufw..."
if command -v ufw >/dev/null 2>&1; then
  if ! ufw status | grep -q "Status: active"; then
    ufw allow OpenSSH || true
    ufw allow "Nginx Full" || true
    ufw --force enable
  else
    echo "ufw already active, ensuring rules..."
    ufw allow OpenSSH || true
    ufw allow "Nginx Full" || true
  fi
fi

CRON_FILE="/etc/cron.d/personal-website-deploy"
echo "==> Enable cron job for deployWebsite.sh on reboot at $CRON_FILE"
cat > "$CRON_FILE" <<EOF
# Auto-deploy personal website on reboot
@reboot ${DEPLOY_USER} sleep 60 && ${APP_DIR}/deploy/deployWebsite.sh >> /var/log/personal-website-deploy.log 2>&1
EOF
chmod 644 "$CRON_FILE"

echo "==> Enabling nginx..."
systemctl enable --now nginx

echo "==> Done."
