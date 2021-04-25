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


    
startEmployeeTracker()