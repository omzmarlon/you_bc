DROP DATABASE IF EXISTS pokecabin;

CREATE DATABASE pokecabin;

CREATE USER IF NOT EXISTS 'poke_user'@'localhost' IDENTIFIED BY 'poke_user';
GRANT ALL PRIVILEGES ON pokecabin . * TO 'poke_user'@'localhost';
