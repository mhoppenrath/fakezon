DROP DATABASE IF EXISTS fakazon;
CREATE DATABASE fakazon;


USE fakazon;

CREATE TABLE Products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price INTEGER(11) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("a spork", "utensil", 1, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Dragon Age game", "Video Game", 45, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("ET the Game", "Video Game ", 0, 1000000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("a beer", "drink", 5, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("a Car", "automotive", 15000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("an Iron Throne Replica", "Awesome Useless Stuff", 1000, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("a Delorian", "Awesome Useless Stuff", 45000, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("a Lightsaber", "Awesome Useless Stuff", 5, 135);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("A pair of Vulcan ears", "Awesome Useless Stuff", 1, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Teddy Rossevelt's glasses", "Awesome Useless Stuff", 1000000, 1);

SELECT * FROM Products;