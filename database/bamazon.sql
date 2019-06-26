DROP DATABASE IF EXISTS bamazon_DB; 

CREATE DATABASE bamazon_DB; 

USE bamazon_DB; 

create table products(
    item_id int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    product_name VARCHAR(150) NOT NULL, 
    department_name VARCHAR(150) NOT NULL, 
    price decimal(10,4) NOT NULL, 
    stock_quantity int(100) NOT NULL 
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES
("orange Juice","beverages",10.00,500),
("cheerios","breakfast & cereal",6.89,100),
("brownie bites","bakery",12.99,70),
("chicken broth","canned goods",9.99,140),
("Cookies","bakery",12.99,70);


SELECT * FROM products; 