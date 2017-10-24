DROP TABLE IF EXISTS test_table;

CREATE TABLE test_table (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

INSERT INTO test_table VALUES (1, 'first_name', 'last_name');