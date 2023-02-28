// scripts modules 
// cannot create an inquirer module here? 
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
const { capitaliseAll, displayMessage, displayTeamMessage, writeToJson, readJson } = require('./lib/utils');
const genAscii = require("./lib/ascii");
// const { managerExists } = require('./lib/managerFuncs'); [TODO]

// team array
const team = [];

// Init program 
async function initProgram() {
  await printWelcomeMessage();

  // Manager check - to prevent unauthorised use
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
  if (isManager === 'Yes' && team.length === 0) {

    // provide proof via entering their ID - which will then be used to access main menu!
    // if (isManager === 'Yes') { // isManager === 'Yes' && team.length === 0) 
    // allow login access
    console.log('Welcome (Alleged) Manager, you gained access!\n')
    //   // console.log('is team accessible: ',team) // yes
    //   // require proof

    //   const teamFilePath = path.join(__dirname, 'output', 'teamFile.json');
    console.log("Please prove you're a manager:")
    // readJson()
    //   // debug saved file ONLY
    //   if (fs.existsSync(teamFilePath)) {

    // add readJson() here when solved 

    //     // delete/clear the old array (debug only at this point!)
    //     // fs.writeFile('team.json', '[]', function () { console.log('done') });
    //     // read file
    //     const teamData = fs.readFileSync(teamFilePath);
    //     // parse it back into the array
    //     const teamFile = JSON.parse(teamData);
    //     console.log('json found. Continuing..')
    //     // check if manager 
    // managerExists(team, id)
    //     // debug fileWrite
    //     console.log(teamFile)
    //   } else {
    //     console.log('No json file exists. Continuing..')
    //   }
    // set an idExists bool
    let idExists = false;
    // loop until exit
    while (!idExists) {
      // readJson()
      const teamFilePath = path.join(__dirname, 'output', 'teamFile.json');
      const teamData = fs.readFileSync(teamFilePath);
      // parse it back into the array
      const teamFile = JSON.parse(teamData);
      const { id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: '📟💬 What is your manager I.D number?'
        }
      ]);
      //     // const idExists = teamFile.find(employee => employee.id === id && employee.role === 'Manager');
      idExists = teamFile.find(employee => Number(employee.id) === Number(id));
      if (idExists) {
        // const teamData = require('./output/teamFile.json');
        const name = teamFile.name;
        await displayMessage(`\nWelcome back ${name} your ID was confirmed. Heading to the main menu now...\n`, 2000);
        // will still run 'createManager' here, since the array hasn't been added to! [TODO]
        // make sure the team array gets updated with the stored json manager!
        // Read the JSON file
        // const teamData = fs.readFileSync('./output/teamFile.json');
        // // Parse the JSON data into an array
        // team = JSON.parse(teamData);
        // console.log(team)
        // console.clear()
        // await mainMenu()
      } else {
        // keep asking 
        const { retry } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'retry',
            message: "Sorry, I cannot find that ID. Would you like to try again?",
            default: true
          }
        ]);
        if (!retry) {
          console.log("\nExiting now...\n");
          // quit
          return;
        }
      }
    }

    // recall any saved managers data - if exists
    // if (fs.existsSync('team.json')) {
    //   // read file
    //   const teamData = fs.readFileSync('team.json');
    //   // parse it back into the array
    //   const team = JSON.parse(teamData);

    // else {
    //   console.log('Team data not found. Let\'s create a new manager now...\n')
    //   // console.clear()
    //   createManager()
    // }

    // // if manager successfully created call mainMenu() 
    // if (fs.existsSync('team.json')) {
    //   mainMenu()
    // }

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
      // prettify output
      await displayMessage(team, 2000);


      // save new changes to JSON for fun
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
      await displayMessage('A new employee was added to the teamFile json.', 1000);

      // debug
      console.log(readJson())

      // now go to main menu
      await mainMenu(team)
    } else {

      // Check if user is Manager - personalized welcome message (ICEBOX)
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
