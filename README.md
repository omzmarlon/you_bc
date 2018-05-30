# YOU.BC - a easy way to find friends in college #
http://youbc.marlonomz.com (For best experience, please use your mobile device or emulate mobile device in a browser)

**Note:** Please use Invitation Code: YOUBC

## Introduction
You.BC is a mobile web application that provides a simple solution for students at universities to exchange WeChat ID. With a simple swipe, students can easily match up with other students, who might be a study buddy, a roommate, or even a soul mate. Potential matching candidates are recommended by their major, interests, personalities and many other factors.

This is a personal project created by [@Marlon Ou](https://github.com/omzmarlon) and [@Yifan Yang](https://github.com/tomyang729/).

## Contents

* [Features](#features)
* [Demo](#demo)
* [Installation and Local Build](#installation-and-local-build)
* [Tech Stack](#tech-stack)

## Features
* Single page application
* Restful API
* Interactive UX design
* More to come...

## Demo
[See Demo](https://youtu.be/2L7fTw9j4LA)

## Installation and Local Build

### Install Maven:
1. Download latest binary maven from: https://maven.apache.org/download.cgi  to appropriate directory
2. Install maven by unzip and setting appropriate path by following this page: https://maven.apache.org/install.html

### Full application build
~~~~
# Run in project root
# This will fully package web-app and backend service into a jar
# No additional installation required except Maven
mvn clean install
~~~~
~~~~
# Run application
java -jar you_bc-service/target/youbc-service-1.0.0.jar
~~~~

### Only Server Build
~~~~
# run this cmd in you_bc-service
mvn clean install
~~~~


##### jOOQ code gen:
~~~~
# run this cmd in you_bc-service
mvn install -PjooqCodeGen
~~~~

### Only Client Build
~~~~
# Frontend Dev:
yarn install
yarn start-dev

# Throught maven:
# run this cmd in you_bc-webapp
mvn clean install
~~~~
### Database setup
* Make sure you have mysql installed properly
* Configure db, username and password in database.properties
* create database and tables using scripts in you_bc-service/src/main/resources/schemas 

* If you are on mac, create my.cnf at /etc/mysql, and then add these:
~~~~
[mysqld]

character-set-server=utf8mb4

[mysql]

default-character-set=utf8mb4 
~~~~

* In the chosen database, call:
~~~~
SET NAMES utf8mb4;
~~~~

* Make sure related variables are utf8mb4:

~~~~
SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
~~~~

## Tech Stack

* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Webpack](https://webpack.js.org)
* [Spring Framework](https://spring.io/)
* [jooq](https://www.jooq.org/)
* [Mysql](https://www.mysql.com/)
* [Maven](https://maven.apache.org/)
* [AWS](https://aws.amazon.com/)