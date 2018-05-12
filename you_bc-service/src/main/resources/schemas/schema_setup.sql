CREATE DATABASE you_bc CHARACTER SET = utf16;

CREATE USER IF NOT EXISTS 'youbcuser_eng'@'localhost' IDENTIFIED BY 'youbcuser_eng';
GRANT ALL PRIVILEGES ON you_bc . * TO 'youbcuser_eng'@'localhost';

SET NAMES utf8mb4;
