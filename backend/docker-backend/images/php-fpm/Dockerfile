FROM php:7.4-fpm

ARG INSTALLER_PATH=/usr/local/installphp
ARG INSTALLER_NAME=installer.sh

WORKDIR /usr/local/installphp
COPY ./$INSTALLER_NAME $INSTALLER_PATH

RUN chmod o+x $INSTALLER_PATH/$INSTALLER_NAME && $INSTALLER_PATH/$INSTALLER_NAME

CMD php-fpm

EXPOSE 9000
