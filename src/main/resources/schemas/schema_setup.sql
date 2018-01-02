DROP DATABASE IF EXISTS poke_you_bc;

CREATE DATABASE poke_you_bc;

CREATE USER IF NOT EXISTS 'poke_you_bc_user'@'localhost' IDENTIFIED BY 'poke_you_bc_user';
GRANT ALL PRIVILEGES ON poke_you_bc . * TO 'poke_you_bc_user'@'localhost';

SET NAMES utf8;
SET CHARACTER SET utf8;