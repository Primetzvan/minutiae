sudo apt-get update
sudo apt-get upgrade
sudo apt-get install mosquitto
sudo nano /etc/mosquitto/mosquitto.conf

# mosquitto client for checking if everything worked purposes
#sudo apt-get install mosquitto-clients
#mosquitto_sub -h localhost -t test

# Make mosquitto only accessible on localhost
echo -e "\nlistener 1883 localhost" | sudo tee -a /etc/mosquitto/mosquitto.conf > /dev/null

sudo mosquitto -c /etc/mosquitto/mosquitto.conf

echo "reboot to make changes effective"
#reboot now