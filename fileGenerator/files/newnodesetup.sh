#!/bin/sh

#Datenbank Setup

sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo apt install mariadb-server -y

#sudo mysql_secure_installation

sudo systemctl start mysql
sudo mysql --user=root < start.sql

sudo apt-get install rsync

sudo cp galera.cnf /etc/mysql/conf.d/

sudo ufw allow 3306,4567,4568,4444/tcp
sudo ufw allow 4567/udp
 
sudo systemctl stop mysql
sudo sudo systemctl start mysql

sudo mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'" --password=root

