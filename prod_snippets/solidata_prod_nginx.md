
### NGINX - SUBDOMAINS AND SERVER BLOCKS
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
https://linuxize.com/post/how-to-install-nginx-on-ubuntu-18-04/ 
https://linuxize.com/post/how-to-set-up-nginx-server-blocks-on-ubuntu-18-04/ 

- SETUP NGINX

< install nginx >
```
sudo apt update
sudo apt install nginx
```
< check status>
```
sudo systemctl status nginx
```
< check possible configs >
```
sudo ufw app list
```
< for http and https >
```
sudo ufw allow 'Nginx Full' 
```
< also >
```
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS’
```

< manage main nginx services >
```
sudo systemctl stop nginx
sudo systemctl start nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
```
< if you want to disable the Nginx service to start at boot >
```
sudo systemctl disable nginx
sudo systemctl enable nginx
```

* All Nginx configuration files are located in the /etc/nginx directory.

* The main Nginx configuration file is /etc/nginx/nginx.conf

* To make Nginx configuration easier to maintain it is recommended to create a separate configuration file for each domain. You can have as many server block files as you need.

* Nginx server block files are stored in /etc/nginx/sites-available directory. The configuration files found in this directory are not used by Nginx unless they are linked to the /etc/nginx/sites-enabled directory.

* To activate a server block you need to create a symlink (a pointer) from the configuration file sites in a sites-available directory to the sites-enabled directory.

* It is recommended to follow the standard naming convention, for example if your domain name is mydomain.com then your configuration file should be named /etc/nginx/sites-available/mydomain.com.conf

* The /etc/nginx/snippets directory contains configuration snippets that can be included in the server block files. If you use repeatable configuration segments then you can refactor those segments into snippets and include the snippet file to the server blocks.

* Nginx log files (access.log and error.log) are located in the /var/log/nginx directory. It is recommended to have a different access and error log files for each server block.

* You can set your domain document root directory to any location you want. The most common locations for webroot include:
    * /home/<user_name>/<site_name>
    * /var/www/<site_name>
    * /var/www/html/<site_name>
    * /opt/<site_name>


- DIRECTORIES FOR BLOCKS OF CODE 

< make a subdirectory for each subdomain on droplet (-p : make parent dir if needed )  >
```
sudo mkdir -p /var/www/solidata-preprod.co-demos.com/
sudo mkdir -p /var/www/solidata-preprod-api.co-demos.com/
sudo mkdir -p /var/www/solidata.co-demos.com/
sudo mkdir -p /var/www/solidata-api.co-demos.com/
…
```

< Change group owner of the directory>
https://askubuntu.com/questions/488485/allowing-a-group-read-write-access-to-a-directory 
````
sudo usermod -aG adminsys www-data
````

< Change group owner of the directory>
https://askubuntu.com/questions/30629/how-can-i-recursively-change-the-permissions-of-files-and-directories 
````
sudo chgrp -R adminsys /var/www
````

< Give write permission to the group / ug == user + group  > 
````
sudo chmod -R ug+rw /var/www
````
