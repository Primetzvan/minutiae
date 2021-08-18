# Set environment Variables
  # TODO: has to be done by the docker container later
  # TODO: fragen welches passwort hier sinnvoll wäre
echo "export NESTJS_SECRET_KEY='gugelhupf'" >> ~/.bash_profile
source ~/.bash_profile
printenv # gibt alle environment variablen aus

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


# Other dependencies
npm i --save @nestjs/config