[![Build Status](https://travis-ci.org/reactivepixel/concourse.svg?branch=master)](https://travis-ci.org/reactivepixel/concourse) [![Code Climate](https://codeclimate.com/github/reactivepixel/concourse/badges/gpa.svg)](https://codeclimate.com/github/reactivepixel/concourse)

# Developer Installation

All dependencies and other pre-reqs steps for building this project from zero to running locally are listed, in order, below. These commands assume to are running the most current version of OS X. Yes, that means you should upgrade, as all good devs stay current. These commands should be ran in terminal and can be ran from anywhere unless otherwise specified on the command.

If you find a discrepency, please file an [issue](https://github.com/reactivepixel/concourse/issues).


### Install Homebrew
Install Homebrew if not already installed.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Homebrew is a package management system for OS X and will help with the installation of node and a few other items.


### Install NodeJS and NPM via Homebrew

```
brew update
brew doctor
brew install node
```

### Global NPM Packages for your Dev Environment

Packages by themselves are nice enhancements to our application but to use some of the packages as tools to manipulate the code of our app and make our lives as devs a bit easier some of the packages need to be ran from the command line, which requires a global npm install.

```
sudo npm install -g gulp bower nodev jest
```

### Install MongoDB via Homebrew

```
brew install mongodb && mongod
```

Once installed you need to create local space for MongoDB's Data

```
mkdir -p /data/db
```

## Travis-CI Gem (Optional Installation)

The Travis gem is used only for initially setting up deployments to Heroku. I've gone through this process for Concourse but if you want to use Travis-CI on your heroku projects you will need this at that point. If this is not your intention then skip to next step: **Installing the App**.

When setting up and configuring Travis-CI with Heroku we need to encrypt the Heroku App API Token securely and we are doing this with a Ruby Gem. So, to fully utilize this you need to also Install Ruby onto your computer. This process can be long and involved, so for now I'll link out to a video I made that covers [installing Ruby on Rails onto OS X Yosemite](https://www.youtube.com/watch?v=zCSoVeJhRU0). It should be noted that the version of Ruby that ships with OS X is outdated and will not work.

```
gem install travis
rbenv rehash
```

### Install the App (finally!)

With all the supporting technologies now installed you're able to download this repo's files and start working on it.

In terminal choose a place you want the folder for this repo's files to live. With that done run the clone command to download the files.

```
git clone git@github.com:reactivepixel/concourse.git
```

With that done it's time to navigate into the concourse dir that was just created and finish the installation and setup then startup.


```
cd concourse
npm install
```

# Run the app via Gulp

Gulp is configured to start your Mongod process and the Node Server as well as check that all front end dependencies are in place via Bower.

```
gulp
```

View the app at [http://localhost:3000](http://localhost:3000)