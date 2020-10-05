DROP DATABASE IF EXISTS ems_db;

create database ems_db;

use ems_db;

create table employees(
	id integer auto_increment not null,
    first_name varchar(75),
    last_name varchar(75),
    title varchar(75),
    department varchar (75),
    salary integer not null,
    manager varchar(75),
    primary key (id)
);

-- Create new example rows
INSERT INTO employees(first_name, last_name, title, department, salary, manager)
values ("John", "Doe", "Sales Lead", "Sales", "100000", "Ashley Rodriguez"), ("Mike", "Chan", "Salesperson", "Sales", "80000", "John Doe"),("Ashley", "Rodriguez", "Lead Engineer", "Engineering", "150000", NULL),
("Kevin", "Tupik", "Software Engineer", "Engineering", "120000", "Ashley Rodriguez"), ("Malia", "Brown", "Accountant", "Finance", "125000", NULL), ("Sarah", "Lourd", "Legal Team Lead", "Legal", "250000", NULL),
("Tom", "Allen", "Lawyer", "Legal", "190000", "Sarh Lourd"), ("Christia", "Eckenrode", "Lead Engineer", "Engineering", "150000", "Mike Chan");

select * from employees