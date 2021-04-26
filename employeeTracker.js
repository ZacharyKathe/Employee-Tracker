const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'employeeTrackerDb',
  });

  const startEmployeeTracker = () =>{
    inquirer
      .prompt([
           {
               type: 'list',
               message: 'What would you like to do?',
               choices: ['View all employees', 'View all employees by department', 'View by Manager', "Add Employee", "Remove Employee"],
               name: 'questions'
           }
      ])
      .then((answers) =>{
          switch (answers.questions) {
              case 'View all employees':
                viewAllEmployed();  
                  break;
              case 'View all employees by department':
                viewAllByDepartment();
                  break;
              case 'View by Manager':
                viewAllByManager();
                  break;
              case "Add Employee":
                addEmployee();
                  break;
              default:
                  console.log("invalid action")
                  break;
          }
      });
    
    }


const viewAllEmployed = () => {
    const query = 
      'SELECT * FROM employee INNER JOIN empRole ON employee.empRole_id = empRole.id'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startEmployeeTracker();
    });
}

const viewAllByDepartment = () => {
    inquirer
      .prompt([
          {
              type: "input",
              message: "Type a department number to search",
              name: "department"
          }
      ])
      .then((answers) => {
        const query = 'SELECT *FROM employee JOIN empRole ON employee.empRole_id = empRole.id JOIN department ON department.id = empRole.department_id WHERE ?'
        connection.query(query, {empRole_id: answers.department}, (err,res)=>{
            if (err) throw err;
            console.table(res);
            startEmployeeTracker();
        })

      })
          

}

const viewAllByManager = () => {
    inquirer
      .prompt([{
        type: "input",
        message: "Type a manager number to search employees under that manager",
        name: "manager"
      }])
      .then((answers) => {
        const query = 'SELECT *FROM employee JOIN empRole ON employee.empRole_id = empRole.id JOIN department ON department.id = empRole.department_id WHERE ?'
        connection.query(query, {manager_id: answers.manager}, (err,res)=>{
            if (err) throw err;
            console.table(res);
            startEmployeeTracker();
        })
      })
      

}

const addEmployee = () =>{
    inquirer
      .prompt([
          {
        type: "input",
        message: "Type new employee first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Type new employee last name",
        name: "lastName"
      },
      {
        type: "list",
        message: "Pick a role for them",
        choices: ["python developer", "javaScript developer", "on-bording", "html/CSS dev","QA test writer"],
        name: "role_idChoice"
      },
      {
        type: "input",
        message: "Type a managers id that over looks their work",
        name: "manager_id"
      }
      ])
    .then((answers) =>{
        if (answers.role_idChoice === "python developer"){
            answers.role_idChoice = '1';
        }
        else if (answers.role_idChoice === "javaScript developer"){
            answers.role_idChoice = '2';
        }
        else if (answers.role_idChoice === "on-bording"){
            answers.role_idChoice = '3';
        }
        else if (answers.role_idChoice === "html/CSS dev"){
            answers.role_idChoice = '4';
        }
        else answers.role_idChoice = '5';
        
        console.table(answers);
        
        const {firstName, lastName, role_idChoice, manager_id} = answers;
        const query = `INSERT INTO employee SET ?`
        connection.query(query,({first_name: firstName, last_name: lastName, emprole_id: role_idChoice, manager_id: manager_id}),(err,res) => {
            if (err) throw err;
            console.table(res);
            startEmployeeTracker();
        })
    })
};


    
startEmployeeTracker();