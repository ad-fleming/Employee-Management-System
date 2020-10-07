const inquirer = require("inquirer");
// const connection = require("./ems")
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "password", 
    database: "employee_managementDB"
});
connection.connect(function(err){
    if(err) throw err;
    console.log("connected as ID" + connection.threadId + "\n")
    prompt.init();
})

const prompt = {
    init: function (){
        inquirer.prompt([
            {
                name: "initialAction",
                type: "list",
                message: "What would you like to do?",
                choices: ["View All Employees", "View All Employees By Department",
                "Add Employee", "Remove Employee", "Update Employee Role", "Add Role"]
            }
        ]).then(({initialAction})=>{
            if(initialAction === "View All Employees"){
                this.displayEmployees();
            }else if (initialAction === "View All Employees By Department"){
                this.displayEmployeesByDept();
            }else if(initialAction === "Add Employee"){
                this.addEmployee()
            }else if (initialAction === "Remove Employee"){
                this.removeEmployee();
            }else if (initialAction === "Update Employee Role"){
                this.updateRole();
            }else if (initialAction === "Add Role"){
                this.addRole();
            }
        })
    },
    displayEmployees: function(){
        console.log("I display the employee table");
        connection.query("SELECT first_name, last_name,title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", 
        (err, data)=>{
            if(err) throw err;
            console.table(data)
            this.init();
        })
    },
    displayEmployeesByDept: function(){
        console.log("I display employees by Dept")
        connection.query(
            "SELECT * FROM department", (err, data) => {
                const departmentArray = data.map(department => department.name)
                console.log(departmentArray + " Line 55")
                inquirer.prompt([
                    {
                        name: "departmentSearch",
                        type: "list",
                        message: "Which department would you like to search?",
                        choices: departmentArray
                    }
                ]).then(({departmentSearch})=>{
                    connection.query(
                        `SELECT first_name, last_name,title, salary, name 
                        FROM employee
                        INNER JOIN role ON employee.role_id = role.id
                        INNER JOIN department ON role.department_id = department.id
                        WHERE name = "${departmentSearch}";`,
                        (err,data) =>{
                            if(err) throw err
                            console.table(data)
                            this.init();
                        }
                    ) 
                })
            }
        )
    },
    addEmployee: function(){
        console.log("hello");
        connection.query(
            "SELECT * FROM role", (err, data) => {
                const roleArray = data.map(role => role.title)
                console.log(roleArray + "Line 69")
                inquirer.prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "Please enter employee first name"
                    }, 
                    {
                        name: "lastName",
                        type: "input",
                        message: "Please enter employee last name"
                    }, 
                    {
                        name: "role",
                        type: "list",
                        message: "Please enter employee role",
                        choices: roleArray
                    }, 
        
                ]).then(({firstName, lastName, role})=>{
                    const selectedRole = data.find(roleObject => roleObject.title === role)
                    connection.query(
                        "INSERT into employee SET?", 
                        {
                            first_name: firstName, 
                            last_name: lastName,
                            role_id: selectedRole.id,      
                        }, 
                        (err, data) => {
                            if (err) throw err;
                            console.table(data);
                            this.displayEmployees();
                        }
                    )
                })
            }
        ) 
    }, 
    removeEmployee: function(){
        console.log("bye, bye")
        inquirer.prompt([
            {
                name: "firstNameToRemove",
                type: "input", 
                message: "Enter employee First Name"
            },
            {
                name: "lastNameToRemove",
                type: "input", 
                message: "Enter employee Last Name"
            }
        ]).then(({firstNameToRemove, lastNameToRemove})=>{
            connection.query(
                "Delete from employee where?",
                [
                    {
                        first_name: firstNameToRemove
                    },
                    {
                        last_name: lastNameToRemove
                    }
                ],
                (err,data)=>{
                    if(err) throw err
                    this.displayEmployees();
                }
            )
        })
    },
    addRole: function(){
        connection.query(
            "SELECT * FROM department", (err, data) => {
                const departmentArray = data.map(department => department.name)
                console.log(departmentArray + "Line 160")
                inquirer.prompt([
                    {
                        name: "departmentChoice",
                        type: "list",
                        message: "To what department does this role belong?",
                        choices: departmentArray
                    }, 
                    {
                        name: "roleName",
                        type: "input",
                        message: "Please enter role name"
                    }, 
                    {
                        name: "salary",
                        type: "input",
                        message: "Please enter salary",
                    }, 
        
                ]).then(({departmentChoice, roleName, salary})=>{
                    const selectedDepartment = data.find(departmentObject => departmentObject.name === departmentChoice)
                    console.log(selectedDepartment);
                    connection.query(
                        "INSERT into role SET?", 
                        {
                            title: roleName, 
                            salary: parseInt(salary),
                            department_id: selectedDepartment.id,      
                        }, 
                        (err, data) => {
                            if (err) throw err;
                            console.table(data);
                        }
                    )
                })
            }
        )
    },
    updateRole: function(){
        connection.query(
            "SELECT * FROM role", (err, data) => {
                const roleArray = data.map(role => role.title)
                console.log(roleArray + "Line 135")
                inquirer.prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "Please enter employee first name"
                    }, 
                    {
                        name: "lastName",
                        type: "input",
                        message: "Please enter employee last name"
                    }, 
                    {
                        name: "role",
                        type: "list",
                        message: "Please enter new employee role",
                        choices: roleArray
                    }, 
        
                ]).then(({firstName, lastName, role})=>{
                    const selectedRole = data.find(roleObject => roleObject.title === role)
                    connection.query(
                        "UPDATE employee SET ? WHERE ? AND ? ", [
                            {
                                role_id: selectedRole.id,      
                            },
                            {
                                first_name: firstName
                            },
                            {
                                last_name: lastName
                            }
                        ],
                        (err, data)=>{
                            if(err) throw err
                            this.displayEmployees();
                        } 
                    )
                })
            },
        )
    },
}

module.exports = prompt;