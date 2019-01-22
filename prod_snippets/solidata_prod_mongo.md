## MONGO DB WALKTHROUGH FOR UBUNTU
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04


- INSTALL MONGO DB

< install MongoDB package (-y == —yes == —assume-yes)>
```
sudo apt update
sudo apt install -y mongodb
```
< check service status > 
```
sudo systemctl status mongodb
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```

< optionnel : stop/start/restart MongoDB service >
```
sudo systemctl stop mongodb
sudo systemctl start mongodb
sudo systemctl restart mongodb
```
< By default, MongoDB is configured to start automatically with the server. If you wish to disable/enable the automatic startup, type: >
```
sudo systemctl disable mongodb
sudo systemctl enable mongodb
```

-----------
- UNINSTALL 
- https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ 

```
sudo systemctl stop mongodb
sudo apt-get purge mongodb-*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```

-----------


< optionnal : allow an external IP to connect to MongoDB’s ports >
```
sudo ufw allow from YOUR.LOCAL.IP.ADDRESS/32 to any port 27017  
```
< add your server's publicly-routable IP address to the mongod.conf file >
```
sudo nano /etc/mongodb.conf
```

< let this : restrict to local interface >
< remote connection to db are prohibited except via SSH tunnel >
```
…

logappend=true

# bind_ip = 127.0.0.1
bind_ip = 127.0.0.1,YOUR.SERVER.IP.ADDRESS
# bind_ip = 0.0.0.0
#port = 27017
…
```
< restart service >
```
sudo systemctl restart mongodb
```

< optional : enable automatically starting MongoDB when the system starts >
```
sudo systemctl enable mongod
sudo systemctl stop mongod
sudo systemctl start mongod
sudo systemctl restart mongod
sudo systemctl status mongod
```

- SECURE CONNEXION
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04#part-two-securing-mongodb 
https://docs.mongodb.com/v3.2/tutorial/enable-authentication/

< run MongoDB >
```
mongo
```

< in mongo CLI >
```
use admin

db.createUser({user:"AdminJpy",pwd:"A_MONGO_DB_ADMIN_PWD",roles:[{role:"userAdminAnyDatabase",db:"admin"}]})

db.createUser({user:"RootJpy",pwd:"A_MONGO_DB_ADMIN_PWD",roles:[{role:"root",db:"admin"}]})
```

< Type 'exit' and press ENTER or use CTRL+C to leave the client. >


----------

https://www.tecmint.com/install-mongodb-on-ubuntu-18-04/ 

< add —auth to service >
```
sudo nano /lib/systemd/system/mongodb.service 
```
< correct/add this line>
```
ExecStart=/usr/bin/mongod --auth --unixSocketPrefix=${SOCKETPATH} --config ${CONF} $DAEMON_OPTS

systemctl daemon-reload
```
-------
OR
--------
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04#part-two-securing-mongodb 

< enable security >
```
sudo nano /etc/mongodb.conf
````

```
Turn on/off security.  Off is currently the default
#noauth = true
auth = true
```
----------

< restart service >
```
sudo systemctl restart mongodb
sudo systemctl status mongod
```
< test access >
```
mongo
show dbs
```
—> must show error like : 
```
2019-01-18T22:07:43.656+0000 E QUERY    [thread1] Error: listDatabases failed:{
	"ok" : 0,
	"errmsg" : "not authorized on admin to execute command { listDatabases: 1.0, $db: \"admin\" }",
	"code" : 13,
	"codeName" : "Unauthorized"
} :
```
< run mongo with admin user >
```
mongo -u AdminJpy -p --authenticationDatabase admin
```
—> enter password : `A_MONGO_DB_ADMIN_PWD`
```
show dbs 
```

< test from local terminal >
```
mongo -u AdminJpy -p --authenticationDatabase admin --host XXX.XXX.XXX.XX
```



< create an user for solidata db —> this guy must be added in config_prod.py (secret) in solidata_backend >
```
use solidata
db.createUser({user:"AdminSolidata",pwd:"A_MONGO_DB_USER_PWD",roles:[{role:"readWrite",db:"solidata"}]})
```

-------------

### CONCLUSION

**THAT WAY DB IS PROTECTED BY :**
+ ADMIN USER + MANDATORY PWD TO CONNECT AND CREATE USERS
+ DB USER + MANDATORY PWD TO CONNECT TO CB
+ SSH TUNNEL MANDATORY + PASSPHRASE TO CONNECT TO SERVER OR DB
+ UFW ONLY ALLOWS SERVER IP AND DEV IP TO ACCESS PORT 2017
+  no other way to connect…
