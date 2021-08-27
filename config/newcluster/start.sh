#!/bin/sh

#Enable SSH

sudo systemctl enable ssh

#Datenbank Setup

sudo chmod +x startdb.sh

sudo ./startdb.sh

sudo echo "galera_new_cluster" > /etc/init.d/StartDatabase.sh
 
sudo chmod 755 /etc/init.d/StartDatabase.sh
sudo update-rc.d /etc/init.d/StartDatabase.sh defaults

sudo chmod +x kioskmode.sh

sudo ./kioskmode.sh

sudo reboot
