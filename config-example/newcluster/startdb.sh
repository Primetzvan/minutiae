#!/bin/sh

# Opening ports

sudo ufw allow 3306,4567,4568,4444/tcp
sudo ufw allow 4567/udp

# Database Setup

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt install mariadb-server -y

SQL1="CREATE USER minutiae@'%' identified by '"
SQL2="';"

sudo echo $SQL1$1$SQL2

sudo sed -i "1s/^/$SQL1$1$SQL2\n/" db_setup.sql

sudo systemctl start mysql
sudo mysql --user=root < db_setup.sql

#sudo sed -i "2d" db_setup.sql

sudo cp galera.cnf /etc/mysql/conf.d/
 
sudo systemctl stop mysql
sudo galera_new_cluster

sudo mysql -u minutiae -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'" --password=$1
