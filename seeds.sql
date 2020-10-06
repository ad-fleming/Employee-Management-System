DROP DATABASE IF EXISTS employee_managementDB;

CREATE DATABASE employee_managementDB;

use employee_managementDB;

create table department(
id int auto_increment,
name varchar(30),
primary key (id)
);
insert into department(name)
values("Sales"),( "Engineering"),("Finance"),("Legal");

select * from department;

create table role(
id int auto_increment not null,
title varchar(30),
salary decimal (8,2),
department_id int not null,
primary key (id),
foreign key (department_id) references department (id)

);
insert into role (title, salary, department_id)
values("Sales Person", 80000, 1),("Sales Lead", 100000, 1),("Software Engineer", 120000, 2),("Lead Engineer", 150000, 2),("Accountant", 125000, 3),("Lawyer", 190000, 3),("Legal Team Lead", 250000, 3);
select * from role;



create table employee (
	id integer auto_increment not null,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    department_id int,
    primary key (id),
    foreign key (role_id) references role (id),
    foreign key (department_id) references department (id)
    -- foreign key (manager_id) references manager
    
);

insert into employee (first_name, last_name, role_id, department_id)
values("John", "Doe", 2, 1),("Mike", "Chan", 1, 1),("Ashley", "Rodriguez", 4, 2),("Kevin", "Tupik", 3, 2),("Malia", "Brown", 5, 3),("Sarah", "Lourd", 7, 3),("Tom", "Allen", 6, 3),("Christian", "Eckenrode", 4, 2);

select * from employee;



-- create table manager(
-- id int auto_increment,
-- role_id int not null,
-- department_id int not null,
-- primary key (id),
-- foreign key (role_id) references role (id),
-- foreign key (department_id) references department (id)
-- );
-- insert into manager (role_id, department_id)
-- values()