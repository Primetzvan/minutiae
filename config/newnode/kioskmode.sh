#Kioskmode

sudo apt-get update
sudo apt-get upgrade -y

sudo apt install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox -y

sudo apt install --no-install-recommends chromium-browser libgles2-mesa -y

cat conf.txt >> /etc/xdg/openbox/autostart 

echo "[[ -z \$DISPLAY && \$XDG_VTNR -eq 1 ]] && startx -- -nocursor" >> /home/pi/.bash_profile

