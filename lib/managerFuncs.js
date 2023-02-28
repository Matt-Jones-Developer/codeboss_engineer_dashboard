// import modules
const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');
const url = require('url');
// import scripts
const createTeamMember = require('../src/createEmployee');
const { displayMessage, displayDoneMessage, readJson } = require('./utils');
const generatePage = require('../src/generateHtml');
const genAscii = require("../lib/ascii");
const typeToText = require('./typeText')

// manager functions 
function managerExists(team, id) {
  const idExists = team.find(employee => employee.id === id && employee.getRole() === 'Manager');
  return idExists ? true : false;
}
// create new team member [TODO]
function createNewMember() {
  createTeamMember()
}

// view current team
async function viewTeam(team) {
  console.log(team)
  // only if exists
  if (team.length > 0) {
    // show array
    // await displayMessage('current team array (to be prettified!):', 800)
    await displayMessage(team, 4000)
    return;
  } else {
    await displayMessage("No team to view.", 2000)
    return;
  }
}

// build and render team html
const buildTeam = team => {
  return new Promise((resolve, reject) => {
    const html = generatePage(team);
    // write to file
    const outputPath = path.join(__dirname, '..', 'output', 'team.html');
    fs.writeFile(outputPath, html, async err => {
      if (err) {
        reject(err);
        return outputPath;
      }
      const fileUrl = url.pathToFileURL(outputPath).toString();
      console.clear()
      // update ascii
      await genAscii.genBuild();
      // displayDoneMessage("\n✅ Team was built and rendered to team.html successfully! ... Good Day!", 3000, true);
      typeToText("\n✅ Team was built and rendered to team.html successfully!...")
      setTimeout(() => {
        displayDoneMessage('Your file has been created and you can find it in the output folder of this directory. Good day!', 3000, true);
        process.exit(0);
      }, 3000);
      resolve(fileUrl);
    });
  });
};

// delete team file and clear array
async function deleteTeam(team) {
  console.clear()
  genAscii.genDelete()
  const { confirm } = await inquirer.prompt([
    {
      type: 'list',
      name: 'confirm',
      message: '🔥 Do you really want to delete the entire team file?!',
      choices: ['yes', 'no'],
      default: 'yes'
    }
  ]);
  if (confirm === 'yes') {
    // clear array
    // team = [];
    team.length = 0;
    console.log('team array:', team)
    // read json
    // readJson()
    // delete Teamfile 
    // const { promisify } = require('util');
    // const unlink = promisify(fs.unlink);
    // await unlink(readJson());

    await displayMessage('🗑 Team deleted successfully.', 2000);
    console.log('Returning to the main menu...');
    return;

  } else {
    console.log('Returning to the main menu...');
  }
}

// specify a team name [TODO]
async function nameTeam(team) {
  // provide a team name 
  console.log(`Please enter a new Team Name:`);
  // teamName = '';
  const teamName = await inquirer.prompt([
    // module.exports = role => ([
    {
      type: 'input',
      name: 'teamName',
      message: `📟💬 What is your Team Name?`,
      validate: function (answer) {
        if (answer.length < 1) {
          return '❗ You must provide a team name.';
        }
        return true;
      }
    }
  ]);
  // append team with teamname
  team.push(teamName)
  console.log('team array with team name:', team)
  return teamName;
}

module.exports = {
  managerExists,
  createNewMember,
  viewTeam,
  buildTeam,
  deleteTeam,
  nameTeam
};