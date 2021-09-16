CREATE USER minutiae@'%' identified by 'raspberry';
GRANT ALL privileges on *.* to minutiae@'%';
Grant ALL on *.* to root@localhost identified by 'root' with grant option;
FLUSH privileges;
CREATE DATABASE mariadb;
COMMIT;
quit
