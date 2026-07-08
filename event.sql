CREATE DATABASE IF NOT EXISTS college_event;

USE college_event;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    department VARCHAR(50),
    semester VARCHAR(20),
    password VARCHAR(100)
);