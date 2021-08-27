#!/bin/sh

#Enable SSH

sudo systemctl enable ssh

#Datenbank Setup

sudo chmod +x newnodesetup.sh

sudo ./newnodesetup.sh

sudo chmod +x kioskmode.sh

sudo ./kioskmode.sh

sudo reboot

