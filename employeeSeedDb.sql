DROP DATABASE IF EXISTS employeeTrackerDb;
CREATE DATABASE employeeTrackerDb;

USE employeeTrackerDb;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  PRIMARY KEY (id)
);


CREATE TABLE empRole(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salery DECIMAL NULL,
  department_id REFERENCES department(id) INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salery DECIMAL NULL,
  department_id REFERENCES department(id) INT NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO songs (title, artist, genre)
VALUES ("Human", "Krewella", "Dance");

INSERT INTO songs (title, artist, genre)
VALUES ("TRNDSTTR","Black Coast", "Dance");

INSERT INTO songs (title, artist, genre)
VALUES ("Who's Next", "The Who", "Classic Rock");