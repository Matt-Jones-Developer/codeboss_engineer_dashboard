// a function that accounts for all employees prompts and includes the additional questions based on 
// which employee is being created
// import enquirer (until updated fix!)
const inquirer = require('inquirer');
const Employee = require("../lib/Employee");
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");

async function createEmployee() {
  let newEmployee = [];
  
  const employeeTypeAnswer = await inquirer.prompt({
    type: 'list',
    name: 'employeeType',
    message: 'What type of employee would you like to create?',
    choices: ['Manager', 'Engineer', 'Intern']
  });

  const employeeType = employeeTypeAnswer.employeeType;
  newEmployee.push(employeeType);

  console.log(employeeType)

    const baseQuestions = [
      {
        type: 'input',
        name: 'id',
        message: '📟💬 What is your I.D number?',
        validate: function (answer) {
          if (isNaN(answer) || answer.length < 1) {
            return '❗ You must provide your ID number.';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'name',
        message: '📟💬 What is your full name?',
        validate: function (answer) {
          if (typeof answer !== 'string' || answer.length < 1) {
            return '❗ You must provide your full name. (include first and last)';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'email',
        message: '📟💬 What is your email address?',
        validate: function (answer) {
          if (!answer.includes('@') || answer.length < 1) {
            return '❗ You must provide a valid email.';
          }
          return true;
        }
      }
    ];

    const answers = await inquirer.prompt(baseQuestions);

    newEmployee.push(answers);
    console.log(newEmployee)


  if (employeeType === 'Manager') {
    const managerQuestions = [
      {
        type: 'input',
        name: 'officeNumber',
        message: '📟💬 What is your office number?',
        validate: function (answer) {
          if (isNaN(answer) || answer.length < 1) {
            return '❗ You must provide your office number.';
          }
          return true;
        }
      }
    ];
    manager = await inquirer.prompt(managerQuestions);
    newEmployee.push(manager);

  } else if (employeeType === 'Engineer') {
    const engineerQuestions = [
      {
        type: 'input',
        name: 'github',
        message: '📟💬 What is your GitHub username?',
        validate: function (answer) {
          if (typeof answer !== 'string' || answer.length < 1) {
            return '❗ You must provide your GitHub username.';
          }
          return true;
        }
      }
    ];
    engineer = await inquirer.prompt(engineerQuestions);
    newEmployee.push(engineer);

  } else if (employeeType === 'Intern') {
    const internQuestions = [
    {
      type: 'input',
      name: 'school',
      message: '📟💬 What school are you attending?',
      validate: function (answer) {
        if (typeof answer !== 'string' || answer.length < 1) {
          return '❗ You must provide the school you are attending.';
        }
        return true;
      }
    }
  ];
  intern = await inquirer.prompt(internQuestions);
  newEmployee.push(intern);
  }

  console.log(newEmployee)


  // if (employeeType === 'Manager') {
  //   newEmployee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
  // } else if (employeeType === 'Engineer') {
  //   newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.github);
  // } else if (employeeType === 'Intern') {
  //   newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school);
  // }

  // console.log(`\nNew ${newEmployee.getRole()} added successfully!\n`);
}

module.exports = createEmployee;
