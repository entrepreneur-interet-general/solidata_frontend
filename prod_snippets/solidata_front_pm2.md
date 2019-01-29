
### PM2 FOR NODE PROCESSES
cf : https://stackoverflow.com/questions/51875055/how-to-run-nuxt-under-pm2
cf : http://pm2.keymetrics.io/docs/usage/application-declaration/ 

----------


< go to the root folder for all your nuxt apps >
```
cd /var/www
```

< manage app node with pm2 >

```
npm install pm2 -g
```

< init pm2 ecosystem file >

````
pm2 init
sudo nano ecosystem.config.js
````

< for instance for two apps `solidata-preprod` and `solidata` in two separate folders needing to be launched with different npm scripts from their own `package.json` files>
```
module.exports = {
  apps : [
    {
      name: "solidata-preprod",
      script:"npm",
      cwd:"/var/www/solidata-preprod.co-demos.com",
      args:"run start_preprod"
    },
    {
      name: "solidata",
      script:"npm",
      cwd:"/var/www/solidata.co-demos.com",
      args:"run start"
    },
  ],
};
```


< run pm2 >
```
sudo pm2 start
sudo pm2 start ecosystem.config.js
```
or 
```
sudo npm run build && pm2 start ecosystem.config.js --only solidata
```

< list processes >
```
pm2 list
```


----------

```
# Start all applications
pm2 start ecosystem.config.js

# Start only the app named worker-app
pm2 start ecosystem.config.js --only worker-app

# Stop all
pm2 stop ecosystem.config.js

# Restart all
pm2 start   ecosystem.config.js
## Or
pm2 restart ecosystem.config.js

# Reload all
pm2 reload ecosystem.config.js

# Delete all
pm2 delete ecosystem.config.js
```

---------
```
pm2 start   ecosystem.config.js --only api-app
pm2 restart ecosystem.config.js --only api-app
pm2 reload  ecosystem.config.js --only api-app
pm2 delete  ecosystem.config.js --only api-app
```