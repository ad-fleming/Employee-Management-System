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
                choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager",
                "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
            }
        ]).then(({initialAction})=>{
            if(initialAction === "View All Employees"){
                this.displayEmployees();
            }else if (initialAction === "View All Employees By Department"){
                this.displayEmployeesByDept();
            }else if (initialAction === "View All Employees By Manager"){
                this.displayEmployeesByManager();
            }else if(initialAction === "Add Employee"){
                this.addEmployee()
            }else if (initialAction === "Remove Employee"){
                this.removeEmployee();
            }else if (initialAction === "Update Employee Role"){
                this.updateRole();
            }else if (initialAction === "Update Employee Manager"){
                this.updateManager();
            }
        })
    },
    displayEmployees: function(){
        console.log("I display the employee table");
        connection.query("SELECT first_name, last_name,title, salary, name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", (err, data)=>{
            if(err) throw err;
            console.table(data)
            
        })
    },
    displayEmployeesByDept: function(){
        console.log("I display employees by Dept")
        connection.query(
            ""
        )
        
    },
    displayEmployeesByManager: function(){
        console.log("I display employees by manager")
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
                "Delete from employees where?",
                [
                    {
                        first_name: firstNameToRemove
                    },
                    {
                        last_name: lastNameToRemove
                    }
                ],
                function(err,data){
                    if(err) throw err
                    prompt.displayEmployees();
                }
            )
        })
    },
    updateRole: function(){
        console.log("newRole");
    },
}

module.exports = prompt;