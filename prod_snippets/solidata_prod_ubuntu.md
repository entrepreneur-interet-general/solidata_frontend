
### INITIAL SETUP UBUNTU 18.04
https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04 


**config preprod #1** 
- ubuntu 18.04
- 3Go RAM / 2CPU
- 60Go memory

IP address : `YOUR.SERVER.IP.ADDRESS`

< connect by ssh from local terminal >
```
ssh root@YOUR.SERVER.IP.ADDRESS
```

- SETUP BASICS UBUNTU
```
sudo apt-get update
sudo apt install python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools
sudo apt install python3-venv
sudo apt  install tree
sudo apt  install members
sudo apt-get install libxml2-dev libxslt1-dev
sudo apt  install git
sudo apt  install node
```

- ADD USER ON DISTANT
```
adduser sammy
```
< pwd : `USR_PWD_FOR_SERVER` >

< add user to sudo group >
```
usermod -aG sudo sammy
````

< copy ssh key to user >
```
rsync --archive --chown=sammy:sammy ~/.ssh /home/sammy
```

< create an admin group for data exchanges >
https://www.techrepublic.com/article/how-to-create-users-and-groups-in-linux-from-the-command-line/
```
sudo groupadd your_group
````

< add user(s) + www-data (nginx user) to the your_group group >
```
sudo usermod -aG your_group sammy
sudo usermod -aG your_group www-data
```

< The -a option tells usermod we are appending and the -G option tells usermod we are appending to the group name that follows the option.>

< check who is part of a group >
```
grep your_group /etc/group
```
OR
```
sudo apt-get install members
members your_group
```


< exit from ssh session >
```
exit
```

< open ssh session with user >
```
ssh sammy@YOUR.SERVER.IP.ADDRESS
```
< optional from root : open ssh session with user >
```
su - sammy
```

< log back as user >
- digital ocean user sammy 
`ssh sammy@YOUR.SERVER.IP.ADDRESS`
- passphrase public key: 
`SSH_PWD_FOR_SERVER`
- pwd for sammy@YOUR.SERVER.IP.ADDRESS
`USR_PWD_FOR_SERVER`


-----------------------

###FIREWALL
https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server 
https://scottlinux.com/2011/10/10/ufw-allow-from-specific-ip-on-specific-port/ 

<check ufw status >
```
sudo ufw status
```

< check which apps are allowed >
```
sudo ufw app list

sudo ufw allow OpenSSH
sudo ufw enable
```

< Using IPv6 with UFW >
```
sudo vim /etc/default/ufw
IPV6=yes
```

< set default >
```
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

< allow ports >
```
sudo ufw allow OpenSSH
sudo ufw allow ssh
sudo ufw allow ftp
sudo ufw allow www
sudo ufw allow 80
sudo ufw allow 3000
sudo ufw allow 4000
```

< allow an IP to connect to MongoDB’s ports >
```
sudo ufw allow from YOUR.LOCAL.IP.ADDRESS/32 to any port 27017  
sudo ufw allow from YOUR.LOCAL.IP.ADDRESS to any port 27017
sudo ufw allow from YOUR.SERVER.IP.ADDRESS to any port 27017
```

< if you want to access to mongodb from ext >
```
sudo ufw allow 27017 
```

< if you want to access to mongodb from specific Ops >
```
sudo ufw allow from YOUR.LOCAL.IP.ADDRESS proto udp to any port 27017
```

< if you want to allow some specific port range >
```
sudo ufw allow 8000:8010/tcp
```

< delete rules >
```
sudo ufw delete allow 27017
sudo ufw delete allow from YOUR.LOCAL.IP.ADDRESS/32 to any port 27017
```

< enable UFW >
```
sudo ufw enable
sudo ufw status
```