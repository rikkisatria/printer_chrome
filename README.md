:: install plugin
npm init -y
npm install chrome-raw-print express

:: run plugin
node src/server.js

:::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::

:: pengaturan nginx
server {
listen 80;
server_name localhost;

    # PHP App (utama)
    location / {
        proxy_pass http://localhost:8081; # atau root ke folder PHP
    }

    # Node App, misalnya diakses via http://localhost/node
    location /node/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }

}

:: pengaturan apache
sudo apachectl -M | grep proxy

---

sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel # Jika Node.js pakai websocket (misal: socket.io)
sudo apachectl restart

---

sudo nano /etc/apache2/extra/httpd-vhosts.conf

---

<VirtualHost \*:80>
ServerName localhost
DocumentRoot "/Users/yourname/Sites/php-app"

    <Directory "/Users/yourname/Sites/php-app">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Reverse proxy ke Node.js saat akses /node/
    ProxyPass "/node/" "http://localhost:3000/"
    ProxyPassReverse "/node/" "http://localhost:3000/"

</VirtualHost>

---

sudo apachectl restart

---

node src/server.js
