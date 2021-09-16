#!/bin/sh

service mysql stop
service mysql start

mysql -u root -p -e "Show Status Like 'wsrep_cluster_size'"
