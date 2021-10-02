#!/bin/sh

sudo galera_new_cluster

sudo npm start --silent --prefix /home/pi/newcluster/backend

sudo npm start --silent --prefix /home/pi/newcluster/frontend

echo done
