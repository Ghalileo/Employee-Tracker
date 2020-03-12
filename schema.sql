DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE employee (
id INT AUTO_INCREMENT,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY(id)
);

SELECT * FROM employee;

CREATE TABLE position (
id INT AUTO_INCREMENT,
title VARCHAR(30),
salary decimal,
department_id INT,
PRIMARY KEY(id)
);

SELECT * FROM position;

CREATE TABLE department (
id INT AUTO_INCREMENT,
deparment_name VARCHAR(30),
PRIMARY KEY(id)
);

SELECT * FROM department;