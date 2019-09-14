DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT null,
  product_name VARCHAR(60) NOT NULL,
  department_name VARCHAR(60) NOT NULL, 
  price DECIMAL(10,3) NOT NULL,
  stock_quantity INT(10) NOT NULL, 
  PRIMARY KEY (item_id) 
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUE("The Lion King DVD","Films",19.99,50), ("The Big Bang Theory: All Seasons","TV Show",199.99,40),
     ("Samsung Galaxy S10","Smart Phones",799.99,50),("Apple iphone x","Smart Phones",999.99,50),
     ("H and Y Slow Cooker","Kitchen Appliances",75.80,40),("Joy Of Cooking","Books",14.50,30),
     ("Touch and Teach Word Book","Kids Toys",18.50,15),("Pull and Sing Puppy","Kids Toys",15.60,20),
     ("Becoming by Michelle Obama","Books",11.99,30),("Black Panther 3D","Films",19.90,20);

USE bamazon;
SELECT * FROM products;