###NPM - NODE/NPM/NUXT ON UBUNTU 18.04

< basic install on ubuntu 18.04 >
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo npm install -g npm
```

< install latest version of rpm and node > 
```
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.profile
nvm install 11.1.0
nvm use 11.1.0
```

< check versions >
```
nodejs -v
npm -v
```

< If you want to install yarn, run this commands:>
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```


```cd /var/www/solidata-preprod.api.co-demos.com```
OR
```cd /var/www/solidata.api.co-demos.com```

< install dependencies>
```
npm install 
```

< serve with hot reload at localhost:3000 >
```
npm run dev
```

< build for production and launch server >
```
npm run build
npm start
```


< manage app node with pm2 >
```
npm install pm2 -g
pm2 start <appfolder>/server/index.js
pm2 start npm — start
```


< nginx config >
```
server {
    listen 80;
    listen [::]:80;
    index index.html;
    server_name solidata-preprod.co-demos.com www.solidata-preprod.co-demos.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

< create link >
```
sudo ln -s /etc/nginx/sites-available/solidata-preprod.co-demos.com /etc/nginx/sites-enabled
```

< restart nginx >
```
sudo nginx -t
sudo systemctl restart nginx
```