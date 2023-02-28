// import modules
const readline = require('readline');
const fs = require('fs');
const path = require('path');
// utility functions 

// capitalise first letter only 
function capitalise(str) {
  if (typeof str === 'string') {
    return str[0].toUpperCase() + str.slice(1);
  }
  return str;
}
// capitalise each word
function capitaliseAll(str) {
  if (typeof str == 'string') {
    return str.split(' ').map(capitalise).join(' ')
  }
  return str;
}

const isIdAlreadyUsed = (id) => {
  // readJson()
  return teamFile.some((employee) => {
    return employee.id === id;
  });
};


// control json read and write [TODO]
// write json
function writeToJson(teamFile) {
  const teamFilePath = path.join(__dirname, '..', 'output', teamFile);
  const data = JSON.stringify(teamFile, null, 2);
  try {
    if (fs.existsSync(teamFilePath)) {
      fs.writeFileSync(teamFilePath, data);
    } else {
      fs.mkdirSync(path.join(__dirname, '..', 'output'), { recursive: true });
      fs.writeFileSync(teamFilePath, data);
    }
  } catch (err) {
    console.error(err);
  }
}

// read json [TODO]
function readJson() {
  // search output folder if file exists (read)
  const teamFilePath = path.join(__dirname, '..', 'output', 'teamFile.json');
  // console.log(teamFilePath)
  if (fs.existsSync(teamFilePath)) {
    const teamData = fs.readFileSync(teamFilePath);
    const teamFile = JSON.parse(teamData);
    console.log('JSON found. Continuing..');
    // debug log
    console.log(teamFile)
    return teamFile;
  } else {
    console.log('No JSON file exists. Continuing..');
  }

}

// Function for displaying feedback messages
async function displayMessage(message, delay) {

  const { promisify } = require('util');
  const sleep = promisify((ms, func) => setTimeout(func, ms));
  // Clear the console
  console.clear();
  // Move the cursor to top
  readline.cursorTo(process.stdout, 0, 0);
  // Display the message
  console.log(message);
  // set a delay
  await sleep(delay);
}

function displayTeamMessage(team, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let message = "";
      if (team.length === 0) {
        message += "No manager added yet.\n";
      } else {
        message += `Manager: ${team[0].getName()} (${team[0].getRole()})\n`;
      }
      message += `Team members: ${team.length}\n`;
      console.log(message);
      resolve({ message, team });
    }, delay);
  });
}

// display done message
async function displayDoneMessage(message, duration, clear = false) {
  console.log(message);
  await new Promise(resolve => setTimeout(resolve, duration));
  if (clear) {
    console.clear();
  }
}

module.exports = {
  capitalise,
  capitaliseAll,
  isIdAlreadyUsed,
  writeToJson,
  readJson,
  displayMessage,
  displayTeamMessage,
  displayDoneMessage
}