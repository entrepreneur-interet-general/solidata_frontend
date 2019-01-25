
### PM2 FOR NODE PROCESSES
cf : https://stackoverflow.com/questions/51875055/how-to-run-nuxt-under-pm2

----------
< go to the root folder for all your nuxt apps >
```
cd /var/www
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