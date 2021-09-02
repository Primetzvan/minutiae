#!/bin/sh

# Enable SSH

sudo systemctl enable ssh

# Database Setup

sudo chmod +x startdb.sh

sudo ./startdb.sh

echo "$(cat autostart.sh)" > /etc/rc.local

sudo chmod +x kioskmode.sh

sudo ./kioskmode.sh

sudo reboot
