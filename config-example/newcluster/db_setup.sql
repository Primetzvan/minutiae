DROP USER 'root'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO minutiae@'%';
FLUSH privileges;
CREATE DATABASE mariadb;
COMMIT;
quit
