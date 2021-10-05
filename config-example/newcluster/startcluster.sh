#!/bin/sh

sudo galera_new_cluster

#sudo npm start --silent --prefix /home/pi/newcluster/backend
sudo pm2 start npm -- start --prefix /home/pi/newcluster/backend

#sudo npm start --silent --prefix /home/pi/newcluster/frontend

sudo pm2 start npm -- start --prefix /home/pi/newcluster/frontend
