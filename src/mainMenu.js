// a module that offers a main menu for managers only
const inquirer = require("inquirer");
const fs = require('fs');
const open = require('open');
const url = require('url');

// const createManager = require("./newManager");
const Manager = require('../lib/Manager');
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const { createManager, createEngineer, createIntern } = require("./createEmployee")
const { deleteTeam, viewTeam, buildTeam } = require("../lib/managerFuncs")
const genAscii = require("../lib/ascii");
const { capitaliseAll, displayMessage } = require("../lib/utils");


isMain = true;

async function mainMenu(team) {
  console.log('is team passing here?: ', team)

  while (isMain) {
    console.clear()
    // mainMenu.displayMenu();
    // generate the menu ascii
    await genAscii.genMenu();
    // create the menu
    const { menuOptions } = await inquirer.prompt([
      {
        type: 'list',
        name: 'menuOptions',
        message: '\n📟💬 Welcome to the main menu!\n\tPlease select an option:',
        choices: [
          'Change Manager',
          'Create Engineer',
          'Create Intern',
          'View Team',
          'Build Team',
          'Delete Team',
          'Quit']
      }
    ]);

    // switch to handle menu
    switch (menuOptions) {
      case 'Change Manager':
        const { confirm } = await inquirer.prompt([
          {
            type: 'list',
            name: 'confirm',
            message: '📟💬 Do you really want to change the manager?',
            choices: ['yes', 'no'],
            default: 'yes'
          }
        ]);
        if (confirm === 'yes') {
          console.clear()
          genAscii.genCreate()
          const { name: managerName, id: managerId, email: managerEmail, officeNumber } = await createManager();
          const manager = new Manager(capitaliseAll(managerName), managerId, managerEmail, officeNumber);
          // remove old manager
          // grab the manager index 
          const managerIndex = team.findIndex(employee => employee instanceof Manager);
          // splice previous manager object from the array
          if (managerIndex !== -1) {
            team.splice(managerIndex, 1, manager);
            await displayMessage("Previous Team Manager was removed.", 1000);
            // await displayMessage(team, 2000);
          } else {
            console.log("No manager found in the team!");
          }
          // update user
          await displayMessage("Team Manager updated successfully!", 1000);
          await displayMessage(team, 3000);
        } else {
          console.log('Returning to the main menu...');
        }
        break;

      // create new engineer
      case 'Create Engineer':
        console.clear()
        genAscii.genCreate()
        const { name: engineerName, id: engineerId, email: engineerEmail, github } = await createEngineer();
        const engineer = new Engineer(capitaliseAll(engineerName), engineerId, engineerEmail, github);
        // push and update
        team.push(engineer)
        await displayMessage("Team Engineer created successfully!", 1000);
        await displayMessage(team, 2000);
        break;
      // create new intern 
      case 'Create Intern':
        console.clear()
        genAscii.genCreate()
        // instantiate
        const { name: internName, id: internId, email: internEmail, school } = await createIntern();
        const intern = new Intern(capitaliseAll(internName), internId, internEmail, capitaliseAll(school));
        // push and update
        team.push(intern)
        await displayMessage("Team Intern created successfully!", 1000);
        await displayMessage(team, 2000);
        break;
      // view team
      case 'View Team':
        await viewTeam(team);
        break;
      // build team
      case 'Build Team':
        // buildTeam as url
        const url = buildTeam(team);
        // open url - 2 args - fail!
        await open('url', { url: url });
        break;
      // delete team (json)
      case 'Delete Team':
        console.log(team)
        await deleteTeam(team);
        break;
      // Quit - exit program 
      case 'Quit':
        console.log('\tUntil next time ...Goodbye!\n');
        return;
      // 
      default:
        console.log('Invalid choice. Please try again.');
        break;
    }

  }
}


// export module
module.exports = { mainMenu };