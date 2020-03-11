DROP DATABASE IF EXISTS burgers_db;
CREATE database burgers_db;

USE burgers_db;

CREATE TABLE burgers
(
    id INT NOT NULL
    AUTO_INCREMENT,
    burger_name VARCHAR
    (255) NOT NULL,
    eaten BOOLEAN DEFAULT false,
    PRIMARY KEY
    (id)
);
    INSERT INTO burgers
        (burger_name)
    VALUES
        ("McDonalds Burger");
    INSERT INTO burgers
        (burger_name)
    VALUES
        ("Wendy's Burger");
    INSERT INTO burgers
        (burger_name)
    VALUES
        ("Whopper Burger");