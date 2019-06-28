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
("iphone", "phone", 1000, 200),
("samsung", "phone", 900, 150),

("macbook", "laptop", 1200, 350),
("dell", "laptop", 750, 100),

("cannon", "camera", 1100, 200),
("nikon", "camera", 950, 350),

("LG", "TV", 650, 180),
("Sony", "TV", 725, 250),

("XBOX", "Gaming Console", 240,150),
("Playstation","Gaming Console",225,210);

SELECT * FROM products; 