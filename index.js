// scripts modules 
// cannot use my inquirer module here? 
// const inquirer = require("./lib/inquirer");
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
// build a clock into the welcome and main menu screens! [TODO]
const moment = require('moment');
// import script modules
const Manager = require("./lib/Manager");
const printWelcomeMessage = require("./lib/welcome")
const { createManager } = require("./src/createEmployee")
const { mainMenu } = require("./src/mainMenu");
const { capitaliseAll, displayMessage, writeToJson, readJson } = require('./lib/utils');
const genAscii = require("./lib/ascii");

// team array
const team = [];

// Init program 
async function initProgram() {
  await printWelcomeMessage();

  // Manager check - to prevent unauthorised use [TODO]
  const { isManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'isManager',
      message: '👩‍💻 Are you a Manager?:',
      choices: ['Yes', 'No'],
      default: 'Yes'
    }
  ]);

  // without bug:
  if (isManager === 'Yes') {

    // [TODO] build json of team, provide proof of manager status via entering their ID
    // which will then be used to access main menu w personalised welcome message uses the managers ${name} from json
    // allow login access
    console.log('Welcome Manager, you gained access!\n')

    // if no manager- createManager()
    if (team.length === 0) {
      // console.log(team);
      console.log("No manager found. Let's create one now...\n")
      console.clear()
      // go to create menu
      genAscii.genCreate()
      const { name, id, email, officeNumber } = await createManager();
      const manager = new Manager(capitaliseAll(name), id, email, officeNumber);
      // push prompts to new manager
      team.push(manager)
      // displayTeamMessage(team, 2000)
      await displayMessage("Team Manager created successfully!", 1000);
      // [TODO] prettify output
      await displayMessage(team, 2000);

      // save changes to JSON for company data use
      const teamFilePath = path.join(__dirname, 'output', 'teamFile.json');
      // read the existing teamFile (if it exists)
      let teamFile = team;
      if (fs.existsSync(teamFilePath)) {
        console.log(typeof (teamFilePath))
        const teamData = fs.readFileSync(teamFilePath);
        teamFile = JSON.parse(teamData);
      }
      // write the updated teamFile to the output file
      fs.writeFileSync(teamFilePath, JSON.stringify(team));
      // writeToJson(teamFile);
      await displayMessage('A new employee was added to the teamFile json.', 1500);
      // debug
      console.log(readJson())
      // now go to main menu
      await mainMenu(team)
    } else {

      // Check if user is Manager - personalized welcome message [TODO]
      if (team.length > 0 && team[0].getRole() === 'Manager') {
        const manager = team[0];
        console.log(`Welcome ${manager.getName()}!\n`);
        await mainMenu(manager);
      } else {
        console.log('Unauthorized access - terminating program');
        return;
      }
    }
    // final else (for first prompt)
  } else {
    // nice try
    console.log('\nGoodbye subordinate!  You need to be a Manager to access this software.\nThis application will now close.\n')
    return;
  }
}
initProgram()
