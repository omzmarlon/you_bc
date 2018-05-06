CREATE DATABASE poke_you_bc CHARACTER SET = utf16;

CREATE USER IF NOT EXISTS 'youbcuser'@'localhost' IDENTIFIED BY 'youbcuser';
GRANT ALL PRIVILEGES ON poke_you_bc . * TO 'youbcuser'@'localhost';

SET NAMES utf8mb4;
