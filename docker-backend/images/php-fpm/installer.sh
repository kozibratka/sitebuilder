#!/bin/bash

apt-get update
apt-get install -y zip wget nano vim
docker-php-ext-install pdo_mysql
docker-php-ext-enable pdo_mysql

if [ "$NODE_ENV" == "dev-local" ]; then
  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
  php composer-setup.php
  php -r "unlink('composer-setup.php');"
  mv composer.phar /usr/local/bin/composer
fi
