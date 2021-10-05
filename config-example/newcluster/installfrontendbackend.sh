git init
git remote add -f origin https://github.com/Primetzvan/minutiae-test.git
git config core.sparsecheckout true
echo frontend >> .git/info/sparse-checkout
echo backend >> .git/info/sparse-checkout
git pull origin main

cd backend
sudo npm install -f

cd ../frontend
sudo npm install -f

cd ../

## Set environment variables
token=$(openssl rand -base64 20)
echo "FRONTEND_KEY=${token}" | sudo tee /home/pi/newcluster/backend/.env > /dev/null #/dev/null mutes output

echo "DATABASE_USER='$1'" | sudo tee -a /home/pi/newcluster/backend/.env > /dev/null #/dev/null mutes output
echo "DATABASE_PASSWORD='$2'" | sudo tee -a /home/pi/newcluster/backend/.env > /dev/null #/dev/null mutes output
echo "CREATE_FINGER_SESSION_EXPIRES=10" | sudo tee -a /home/pi/newcluster/backend/.env > /dev/null #/dev/null mutes output
