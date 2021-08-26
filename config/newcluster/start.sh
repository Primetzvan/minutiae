#!/bin/sh

#Enable SSH

sudo systemctl enable ssh

#Datenbank Setup

sudo chmod +x startdb.sh

sudo ./startdb.sh

sudo reboot
