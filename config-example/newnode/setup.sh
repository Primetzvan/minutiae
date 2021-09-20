#!/bin/sh

if [ -z "$1" ] || [ -z "$2" ]
then
	echo "Enter new username and password!"
else

# Enable SSH
sudo systemctl enable ssh
# Database setup
sudo chmod +x additional_Node.sh
sudo ./additional_Node.sh
sudo echo "sudo systemctl start mysql" > /etc/init.d/StartDatabase.sh
sudo chmod 755 /etc/init.d/StartDatabase.sh
sudo update-rc.d /etc/init.d/StartDatabase.sh defaults
sudo chmod +x kioskmode.sh
sudo ./kioskmode.sh
sudo reboot

fi

