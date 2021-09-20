#!/bin/sh

if [ -z "$1" ] || [ -z "$2" ]
then
	echo "Enter new username and password!"
else

# Enable SSH
sudo systemctl enable ssh
# Install nodejs 12
REQUIRED_PKG="nodejs"
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $REQUIRED_PKG|grep "install ok installed")
echo Checking for $REQUIRED_PKG: "$PKG_OK"
if [ "" = "$PKG_OK" ]; then
  echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG."
  sudo apt update
  sudo apt -y upgrade
  sudo apt update
  sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt -y install $REQUIRED_PKG
  sudo apt -y  install gcc g++ make
  dpkg -s $REQUIRED_PKG
fi
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

