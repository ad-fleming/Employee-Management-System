const mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompt");
const addEmployee = require("./prompt");
const prompt = require("./prompt");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "password", 
    database: "employee_managementDB"
});


// connection.connect(function(err){
//     if(err) throw err;
//     console.log("connected as ID" + connection.threadId + "\n")
//     prompt.init();
// })


module.exports = {connection};