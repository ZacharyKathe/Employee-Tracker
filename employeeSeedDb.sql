DROP DATABASE IF EXISTS employeeTrackerDb;
CREATE DATABASE employeeTrackerDb;

USE employeeTrackerDb;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  depName VARCHAR(30) NULL,
  PRIMARY KEY (id)
);


CREATE TABLE empRole(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salery DECIMAL NULL,
  department_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NULL,
  empRole_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);

-- Creating departments
INSERT INTO department (depName)
VALUES ("human resources");
INSERT INTO department (depName)
VALUES ("back-end development");
INSERT INTO department (depName)
VALUES ("front-end development");


-- Creating employee roles
INSERT INTO empRole (title, salery, department_id)
VALUES ("python developer","90000.00", "2");
INSERT INTO empRole (title, salery, department_id)
VALUES ("javaScript developer","90000.00", "3");
INSERT INTO empRole (title, salery, department_id)
VALUES ("on-bording","45000.00", "1");
INSERT INTO empRole (title, salery, department_id)
VALUES ("html/CSS dev","80000.00", "3");
INSERT INTO empRole (title, salery, department_id)
VALUES ("QA test writer","90000.00", "2");

-- Creating employees
INSERT INTO employee (first_name, last_name, empRole_id, manager_id)
VALUES ("Zachary", "kathe", "2", "1");
INSERT INTO employee (first_name, last_name, empRole_id, manager_id)
VALUES ("Smith", "wills", "3", "2");
INSERT INTO employee (first_name, last_name, empRole_id, manager_id)
VALUES ("Maydock", "Bernie", "1", "3");
INSERT INTO employee (first_name, last_name, empRole_id, manager_id)
VALUES ("May", "Benish", "2", "1");


-- Inner join employee employee role

SELECT *
    FROM employee JOIN empRole ON employee.empRole_id = empRole.id
    JOIN department ON department.id = empRole.department_id;