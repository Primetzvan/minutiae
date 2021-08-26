#Kioskmode

sudo apt-get update
sudo apt-get upgrade -y

sudo apt install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox -y

sudo apt install --no-install-recommends chromium-browser libgles2-mesa -y

cat conf.txt >> /etc/xdg/openbox/autostart 

echo "[[ -z '$DISPLAY' && '$XDG_VTNR' -eq 1 ]] && startx -- -nocursor" >> /home/pi/.bash_profile

#Ports freigeben

sudo apt-get install ufw
sudo ufw allow 3306,4567,4568,4444/tcp
sudo ufw allow 4567/udp

sudo reboot
