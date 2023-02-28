// Create new employees using inquirer prompts and includes 
// additional questions based on which employee is being created

const inquirer = require('inquirer');
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const { isIdAlreadyUsed } = require('../lib/utils') // [TODO]

// create a new manager 
async function createManager() {
  // instance to assign role
  const manager = new Manager();
  const role = manager.getRole();
  console.log(`Please enter the following information to create a new ${role}:`);
  const { name, id, email, officeNumber } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `📟💬 What is your ${role}\'s full name?`,
      validate: function (answer) {
        const words = answer.split(" ");
        if (!isNaN(answer) || words.length !== 2 || answer.length < 1) {
          return '❗ You must provide your full name, no numbers allowed.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'id',
      message: `📟💬 What is your ${role} I.D number?`,
      validate: function (answer) {
        if (isNaN(answer) || answer.length < 1) {
          return '❗ You must provide your I.D number.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'email',
      message: '📟💬 What is your email address?',
      validate: function (answer) {
        if (!answer.includes('@' && '.com') || answer.length < 1) {
          return '❗ You must provide a valid email.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "📟💬 What is your team's office number?",
      validate: function (answer) {
        if (isNaN(answer) || answer.length < 1) {
          return '❗ You must provide your office number.';
        }
        return true;
      }
    }
  ]);

  return { name, id, email, officeNumber }

}

// [TODO] - these will not duplicate - Will use ${role} instead for `DRY' 

// create a new Engineer object
async function createEngineer() {
  // Display a feedback message
  console.log('Please enter the following information to create a new engineer:');

  const engineer = new Engineer();
  const role = engineer.getRole();
  const { name, id, email, github } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `📟💬 What is the ${role}\'s full name?`,
      validate: function (answer) {
        const words = answer.split(" ");
        if (!isNaN(answer) || words.length !== 2 || answer.length < 1) {
          return '❗ You must provide the engineer\'s full name.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'id',
      message: `📟💬 What is the ${role}\'s I.D number?`,
      validate: function (answer) {
        if (isNaN(answer) || answer.length < 1) {
          return '❗ You must provide a valid engineer I.D number.';
        }
        // [TODO]
        // else if (isIdAlreadyUsed(answer)) {
        //   return 'This ID is already taken. Please enter a different ID.';
        // }
        return true;
      }
    },
    {
      type: 'input',
      name: 'email',
      message: `📟💬 What is the ${role}\'s email address?`,
      validate: function (answer) {
        if (!answer.includes('@') || answer.length < 1) {
          return '❗ You must provide a valid engineer email.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'github',
      message: "📟💬 What is the engineer's GitHub username?",
      // BUG: this is not validating!
      validate: function (answer) {
        if (typeof answer !== 'string' || answer.length < 1) {
          return '❗ You must provide the engineer\'s GitHub username.';
        }
        return true;
      }
    }
  ]);

  // Return the engineer object
  return { name, id, email, github };
}

// [TODO] - these will not duplicate - Will use ${role} instead for `DRY' 
// create a new intern
async function createIntern() {

  const intern = new Intern();
  const role = intern.getRole();
  console.log(`Please enter the following information to create a new ${role}:`);
  const { name, id, email, school } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `📟💬 What is the ${role}\'s full name?`,
      validate: function (answer) {
        const words = answer.split(" ");
        if (!isNaN(answer) || words.length !== 2 || answer.length < 1) {
          return '❗ You must provide the intern\'s full name. (include first and last)';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'id',
      message: `📟💬 What is the ${role}\'s I.D number?`,
      validate: function (answer) {
        if (isNaN(answer) || answer.length < 1) {
          return '❗ You must provide a valid intern I.D number.';
        }
        // [TODO]
        // else if (isIdAlreadyUsed(answer)) {
        //   return 'This ID is already taken. Please enter a different ID.';
        // }
        return true;
      }
    },
    {
      type: 'input',
      name: 'email',
      message: `📟💬 What is the ${role}\'s email address?`,
      validate: function (answer) {
        if (!answer.includes('@') || answer.length < 1) {
          return '❗ You must provide a valid intern email.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'school',
      message: "📟💬 What is the intern's school name?",
      validate: function (answer) {
        if (!isNaN(answer) || typeof answer !== 'string' || answer.length < 1) {
          return '❗ You must provide the intern\'s school name.';
        }
        return true;
      }
    }
  ]);

  return { name, id, email, school };
}

// export funcs
module.exports = { 
  createManager, 
  createEngineer, 
  createIntern 
};
