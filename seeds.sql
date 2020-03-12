USE tracker_db;

INSERT INTO employee (firstName, lastName, role_id,manager_id)
VALUES ("Oseghale", "Okogbo",01,001),
("Johnathan", "Strong", 02,002),
("Jay", "dilla", 13, 006),
("Jayda", "Nguyen", 14, 007),
("Fara", "Librando", 16, 012),
("Cloud", "Strife", 03,003),
("Tyrell", "Wellick", 05,006),
("Elliot", "Alderson", 07,010),
("Candice", "King", 14,015),
("Joanna", "Lawrell",15,008);

SELECT * FROM employee;