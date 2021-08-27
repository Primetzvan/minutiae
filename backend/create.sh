# TODO: download backend selbst
# TODO: load files from github into files folder/sind schon da? -> github folder

# Set environment Variables
  # TODO: has to be done by the docker container later
  # TODO: fragen welches passwort hier sinnvoll wäre -> Nano Id
  # TODO: richtige node version installieren


##
npm install

# Install NestJS CLI -globally
npm i -g @nestjs/cli

# Check your Nest version (once installed)
nest --version

# Install database related dependencies
npm i class-validator class-transformer
npm i class-validator class-transformer

npm i @nestjs/mapped-types

npm install mysql --save  #Database Driver for MariaDB

npm install @nestjs/typeorm typeorm pg


# Install needed dependencies for remaining login security
  # Install needed dependencies for password hashing
npm i bcrypt
npm i -D @types/bcrypt

  # Install needed dependencies for jwt
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-jwt
npm install --save-dev @types/passport-local

npm i nanoid

  # Install needed dependencies for cookies
npm i cookie-parser
npm i -D @types/cookie-parser

# Generating & returning files
npm i file-saver
npm install jszip
##TODO install tar

# Other dependencies
npm i --save @nestjs/config

###npm install --save joi
###npm install --save-dev @types/joi


## Set environment variables
#TODO: kann man so machen?
token=$(openssl rand -base64 20)
echo "FRONTEND_KEY=${token}" | sudo tee ./.env > /dev/null #/dev/null mutes output
token=$(openssl rand -base64 20)
echo "M2M_KEY=${token}" | sudo tee -a ./.env > /dev/null #-a = appends
#echo "export M2M_KEY=${token}" | sudo tee -a /etc/profile.d/nest_environmentvariables.sh > /dev/null #-a = appends

#sudo shutdown -r now
echo "please restart"