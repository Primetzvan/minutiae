FROM debian:buster
RUN apt-get update && \
apt-get upgrade && \
apt install mariadb-server -y && \
apt-get -y install aptitude && \
apt-get install systemd -y 
EXPOSE 3306/tcp \
4567/tcp \
4568/tcp \
4444/tcp \
4567/udp
#ADD start.sql /docker-entrypoint-initdb.d
RUN mkdir /start.sql
COPY ./start.sql .
RUN service mysql start && \
mysql < start.sql
#COPY databasesetup.sh .
#RUN ["chmod", "+x", "databasesetup.sh"] && \
#RUN ./databasesetup.sh
#COPY galeracnf.sh .
#RUN ["chmod", "+x", "galeracnf.sh"] && \
# ./galeracnf.sh
#COPY cluster.sh .
#RUN ["chmod", "+x", "cluster.sh"] && \
#./cluster.sh
#ENTRYPOINT ["mysqld"]
CMD service mysql start && tail -f /dev/null
