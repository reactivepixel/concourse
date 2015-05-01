install Homebrew if not already installed
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update

brew doctor

brew install node 

npm install

sudo npm install -g gulp bower nodev

gulp

MongoDB
brew install mongodb && mongod

create local space for Mongo Data
mkdir -p /data/db

start mongo Server
mongod

For Development Server Run
nodev app.js