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

## Set environment variables
token=$(openssl rand -base64 20)
echo "FRONTEND_KEY=${token}" | sudo tee ./.env > /dev/null #/dev/null mutes output

cd ../
