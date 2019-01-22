###GIT WALKTHROUGH (ubuntu 18.04)
cf : https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04

- INSTALL GIT 
```
sudo apt-get update
sudo apt-get install git
git --version
```
- FROM `/var/wwww` 

for each : 
```
cd /var/www/solidata-preprod.co-demos.com
cd /var/www/solidata.co-demos.com
cd /var/www/solidata-preprod-api.co-demos.com
cd /var/www/solidata-api.co-demos.com
```
…
< do >
```
git init . 
```
----------------

< add remote repo links >
```
git remote add origin https://github.com/entrepreneur-interet-general/solidata_frontend.git
```
OR 
```
git remote add origin https://github.com/entrepreneur-interet-general/solidata_backend.git
```
-------------
< if need for reset remote’s url : >
```
git remote set-url origin https://github.com/entrepreneur-interet-general/solidata_frontend.git
```
OR
```
git remote set-url origin https://github.com/entrepreneur-interet-general/solidata_backend.git
```

------------

< pull repo >
```
git pull origin master
```
OR 
```
git fetch --all
git reset --hard origin/master
```

- IF NEEDED : REMOVE FILE FROM GIT HISTORY

< remove file from repo previously not in gitignore >
```
git rm -r --cached .
git add .
git commit -m "Removing all files specified in .gitignore"
```

< set up config >
```
git config --global user.name “sammy”
git config --global user.email “sammy@email.com”
```