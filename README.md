# YOU.BC - UBC's first online social network #
### Server Build
./gradlew build

./gradlew bootRun

### Client Build
(In web/)

yarn install

yarn start-dev

### Database Additional setup
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

### Install Maven:
1. Download latest binary maven from: https://maven.apache.org/download.cgi  to appropriate directory
2. Install maven by unzip and setting appropriate path by following this page: https://maven.apache.org/install.html
