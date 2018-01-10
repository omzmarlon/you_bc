DROP DATABASE IF EXISTS poke_you_bc;

CREATE DATABASE poke_you_bc;

CREATE USER IF NOT EXISTS 'youbcuser'@'localhost' IDENTIFIED BY 'youbcuser';
GRANT ALL PRIVILEGES ON poke_you_bc . * TO 'youbcuser'@'localhost';

SET NAMES utf8;
SET CHARACTER SET utf8;