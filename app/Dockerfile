FROM php:8.1-apache as common

WORKDIR /app

# PHP Extensions
RUN docker-php-ext-install -j$(nproc) opcache pdo_mysql
COPY docker/conf/php.ini /usr/local/etc/php/conf.d/app.ini

# Apache
COPY docker/conf/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY docker/conf/apache.conf /etc/apache2/conf-available/z-app.conf

# COPY source files
COPY . .

RUN a2enmod rewrite remoteip && \
    a2enconf z-app

ENV COMPOSER_ALLOW_SUPERUSER=1

# git, unzip & zip are for composer
RUN apt-get update -qq && \
    apt-get install -qy \
    git \
    gnupg \
    unzip \
    zip && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

FROM common AS dev

COPY test test
COPY migrations migrations

# Installation VIM
RUN apt-get install -qy vim

# Installation Xdebug 
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

COPY conf/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini