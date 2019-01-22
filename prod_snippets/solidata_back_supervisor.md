

##USING SUPERVISOR TO RUN GUNICORN/PYTHON PROCESS
cf : https://medium.com/ymedialabs-innovation/deploy-flask-app-with-nginx-using-gunicorn-and-supervisor-d7a93aa07c18
cf : https://realpython.com/kickstarting-flask-on-ubuntu-setup-and-deployment/#configure-supervisor


< install supervisor >
```
sudo apt-get install -y supervisor
```

< create a new supervisor process for gunicorn >
```
sudo nano /etc/supervisor/conf.d/solidata_preprod_api.conf
```

```
[program:solidata_preprod_api]
directory=/var/www/solidata-preprod-api.co-demos.com
command=/var/www/solidata-preprod-api.co-demos.com/venv/bin/gunicorn wsgi:app --bind 0.0.0.0:4000
autostart=true
autorestart=true

#stderr_logfile=/var/log/solidata-preprod-api/solidata-preprod-api.err.log
#stdout_logfile=/var/log/solidata-preprod-api/solidata-preprod-api.out.log
```

< check supervisor process>
```
sudo supervisorctl reread
sudo supervisorctl update
sudo service supervisor restart
sudo supervisorctl status
```

< restart supervisor process >
```
sudo systemctl restart solidata_preprod_api
```


------------


### configure nginx for process launched by supervisor

< create a nginx conf file for this server block >
```
sudo nano /etc/nginx/sites-available/solidata-preprod-api.co-demos.com
```

```
server {
        listen 80 ;
        #listen [::]:80;

        server_name solidata-preprod-api.co-demos.com www.solidata-preprod-api.co-demos.com ;

        location / {
                #include proxy_params;

                ### made it work using supervisor + gunicorn
                proxy_pass        http://YOUR.SERVER.IP.ADDRESS:4000;

                proxy_redirect    off;

                proxy_set_header  X-Real-IP            $remote_addr;
                proxy_set_header  X-Forwarded-For      $proxy_add_x_forwarded_for;
                proxy_set_header  X-Forwarded-Proto    $scheme;

                proxy_pass_header Server;
                #proxy_set_header Host $http_host;
                proxy_set_header  X-Scheme $scheme;

                ### supposed to work with gunicorn + custom service --> prefered to use gunicorn + supervisor
                #proxy_pass http://unix:/var/www/solidata-preprod-api.co-demos.com/solidata-preprod-api.sock;
        }
}

```


< create link from `sites-available` to `sites-enabled` >
```
sudo ln -s /etc/nginx/sites-available/solidata-preprod-api.co-demos.com /etc/nginx/sites-enabled
```

< check syntax >
```
sudo nginx -t
```

< restart nginx >
```
sudo systemctl restart nginx
```

< be sure firewall allows ngiinx and desired ports >
```
sudo ufw delete allow 5000
sudo ufw allow 'Nginx Full'
```

