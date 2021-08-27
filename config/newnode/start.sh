#!/bin/sh

#Enable SSH

sudo systemctl enable ssh

#Datenbank Setup

sudo chmod +x newnodesetup.sh

sudo ./newnodesetup.sh

sudo echo "sudo systemctl start mysql" > /etc/init.d/StartDatabase.sh
 
sudo chmod 755 /etc/init.d/StartDatabase.sh
sudo update-rc.d /etc/init.d/StartDatabase.sh defaults

sudo chmod +x kioskmode.sh

sudo ./kioskmode.sh

sudo reboot

