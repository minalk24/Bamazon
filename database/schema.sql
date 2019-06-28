DROP DATABASE IF EXISTS bamazon_DB; 

CREATE DATABASE bamazon_DB; 

USE bamazon_DB; 

CREATE TABLE products(
    product_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY(product_id)
);