#!/bin/sh

# Opening ports

sudo ufw allow 3306,4567,4568,4444/tcp
sudo ufw allow 4567/udp

# Database Setup

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt install mariadb-server -y

sudo systemctl start mysql
sudo mysql --user=root < db_setup.sql

sudo cp galera.cnf /etc/mysql/conf.d/
 
sudo systemctl stop mysql
sudo galera_new_cluster

sudo mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'" --password=root
