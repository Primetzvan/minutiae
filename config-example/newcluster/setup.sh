#!/bin/sh

if [ -z "$1" ]
then
	echo "Enter password!"

else

	# Enable SSH
	sudo systemctl enable ssh
	# Database Setup
	sudo chmod +x startdb.sh
	sudo ./startdb.sh $1
	echo "$(cat autostart.sh)" > /etc/rc.local
	sudo chmod +x kioskmode.sh
	sudo ./kioskmode.sh
	sudo reboot	
fi
