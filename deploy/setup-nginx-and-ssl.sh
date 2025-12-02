#!/bin/bash
source "$(dirname "$0")/deploy.env"

# requires sudo
if [[ $EUID -ne 0 ]]; then
    echo "Run with sudo." >&2
    exit 1
fi

AVAIL="/etc/nginx/sites-available/${DOMAIN}.conf"
ENABLED="/etc/nginx/sites-enabled/${DOMAIN}.conf"

echo "==> Writing nginx vhost for $DOMAIN at $AVAIL..."
cat > "$AVAIL" <<EOF
# Default catch-all server: redirect IP/unknown hosts to the canonical domain
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    return 301 http://${DOMAIN}\$request_uri;
}

# Main HTTP server for the site
server {
    listen 80;
    listen [::]:80;

    server_name ${DOMAIN} www.${DOMAIN};

    root ${DOCROOT};
    index index.html index.htm;

    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF

# remove default site if present
if [[ -e /etc/nginx/sites-enabled/default ]]; then
  rm -f /etc/nginx/sites-enabled/default
fi

ln -sf "$AVAIL" "$ENABLED"

echo "==> Testing nginx config..."
nginx -t

echo "==> Reloading nginx..."
systemctl reload nginx

echo "==> Installing / updating certbot + nginx plugin..."
apt-get update -y
apt-get install -y certbot python3-certbot-nginx

echo "==> Obtaining / renewing certificate for $DOMAIN and www.$DOMAIN"
certbot --nginx \
  -d "$DOMAIN" -d "www.$DOMAIN" \
  -m "$LETSENCRYPT_EMAIL" \
  --agree-tos --non-interactive --redirect

echo "==> Testing renewal (dry run)..."
certbot renew --dry-run --cert-name "$DOMAIN" || echo "WARNING: Dry-run renew failed, check logs."

echo "==> Nginx + SSL setup complete."
