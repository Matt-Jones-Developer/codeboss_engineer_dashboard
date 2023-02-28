const inquirer = require("inquirer");
const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

async function createManager() {
  const { name, id, email, officeNumber } = await inquirer.prompt([
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
      name: 'email',
      message: '📟💬 What is your email address?',
      validate: function (answer) {
        if (!answer.includes('@') || answer.length < 1) {
          return '❗ You must provide a valid email.';
        }
        return true;
      }
    },
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
  ]);

  const manager = new Manager(name, id, email, officeNumber);
  team.push(manager);

  console.log("Successfully created a new manager:", manager);

  // You can return the created manager object if needed
  return manager;
}

module.exports = createManager;