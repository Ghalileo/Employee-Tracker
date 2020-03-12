//Variables required to run this application successfully
const inquirer = require("inquirer");
const mysql = require("mysql");
const employees = [];
const positions = [];
//Connection to the SQL Datavase
const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"tracker_db"
})

//Connection to call function in order to run application
connection.connect((err,data) => {
    if (err) throw err;
    connection.query("SELECT * FROM employee",  (err, result, fields) => {
      if (err) throw err;
      viewDataBase();
    });
  });


//Function which prompts user to explorer different areas of Employee Tracker Database
function viewDataBase () {
    inquirer
        .prompt({
            type: "list",
            message: `Welcome!  Please Choose from the following options:`,
            name: "action",
            choices: [
                "View All Employees",
                "View Departments",
                "View Positions",
                "Add Employee", 
                "Remove Employee",
                "Update Employee Role",
                "Add Department to Database",
                "Add Position to Database"
                // "Update Employee Manager",
                // "View All Roles"
      ]
      //Alternative actions based on user response
        }).then((answers)=>{
            switch(answers.action){
                case "View All Employees":
                    viewAll()
                    break;
                case "Add Employee":
                    addEmployee();
                    break; 
                case "View Departments":
                    viewAllDeparments();
                    break; 
                case "View Positions":
                    viewAllPositions();
                    break;     
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "Add Department to Database":
                    addDepartment();
                    break;
                case "Add Position to Database":
                    addPosition();
                    break;   
            }
        })
    };

//Function which allows you to view all employees
function viewAll () {
    connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    restartProcess();
    });
    
}

function viewAllDeparments () {
    connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    restartProcess();
    });
    
}

function viewAllPositions () {
    connection.query("SELECT * FROM position", (err, res) => {
    if (err) throw err;
    console.table(res);
    restartProcess();
    });
    
}

//Function which allows user to add an employee to the database
function addEmployee() {
    inquirer.prompt([
        {
            message:'Enter new employees first name',
            name:'first',
        },
        {
            message:'Enter new employees last name?',
            name:'last',
        },
        {
            message:'Enter new employees role number.',
            name:'role',
        },
        {
            message:'Enter Employee Manager Number',
            name:'manager',
        }
    ]).then((newData) =>{
    var query = connection.query(
    "INSERT INTO employee SET ?",
    {
        firstName: newData.first,
        lastName: newData.last,
        role_id: newData.role,
        manager_id: newData.manager
    },
    (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " Roles created!\n");
    }
    );
    restartProcess()
});
};

function addPosition() {
    inquirer.prompt([
        {
            message:'Enter name of new position:',
            name:'title',
        },
        {
            message:'Enter salary range:',
            name:'salary',
        },
        {
            message:'Enter Department number',
            name:'theDepartment',
        }
    ]).then((newPos) =>{
    var query = connection.query(
    "INSERT INTO position SET ?",
    {
        title: newPos.title,
        salary: newPos.salary,
        department_id: newPos.theDepartment,
    },
    (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " Roles created!\n");
    }
    );
    restartProcess()
});
};

function addDepartment() {
    inquirer.prompt([
        {
            message:'Please enter title of deparment you would like to add to database:',
            name:'department',
        },
    ]).then((newDept) =>{
        var query = connection.query(
        "INSERT INTO department SET ?",
        {
            department_name: newDept.department,
            
        },
        (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows + " Department created!\n");
        }
        );
        restartProcess()
    });       
}

function removeEmployee() {
    inquirer
        .prompt([
        {
            type:"input",
            message:"Please enter the last name of the employee you would like to remove:",
            name:"delete"
        }
            ]).then((response) =>{
                const query = connection.query(
                "DELETE employee SET ? WHERE ?",
                [
                    {
                        lastName: response.delete
                    }
                    ],
                    (err, res) => {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee removed from database!\n");
                    
                    }
                );
            })
}

//Function which allows you to update employee information
function updateEmployee() {
    inquirer.prompt([
        {
            type:"input",
            message:"Enter employee you would like to update: ",
            name:"person",
            choices: []
        },
        {
            type:"input",
            message:"Enter update to Position",
            name:"newPositions",
            choices: positions
        }
]).then((newData) => { 
        const query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
        {
            role_id: newData.newrole
        },
        {
            firstName: newData.person
        }
        ],
        (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " employee updated!\n");
        
        }
    );
});

}

//Function which allows user to make an additional change or request from starter menu or exit the application
function restartProcess(){
    inquirer
        .prompt({
            type:'confirm',
            message:'Do You have any additional requests?',
            name:'next'

        }
    ).then((reset)=>{
        if (reset.next === true){
            viewDataBase();
        }
        else{
            quit();
        }
    })
}
//Function which ends the applicaiton
function quit(){
    console.log("Now leaving application.....")
    connection.end()
    return;
};