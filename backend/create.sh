# TODO: download backend selbst
# TODO: load files from github into files folder/sind schon da? -> github folder

# Set environment Variables
  # TODO: richtige node version installieren


##
npm install

## Set environment variables
token=$(openssl rand -base64 20)
echo "FRONTEND_KEY=${token}" | sudo tee ./.env > /dev/null #/dev/null mutes output
token=$(openssl rand -base64 20)
echo "M2M_KEY=${token}" | sudo tee -a ./.env > /dev/null #-a = appends
#echo "export M2M_KEY=${token}" | sudo tee -a /etc/profile.d/nest_environmentvariables.sh > /dev/null #-a = appends