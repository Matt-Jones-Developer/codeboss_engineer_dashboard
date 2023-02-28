// a welcome message with ascii and typewriter effect
// import ascii file
const genAscii = require("./ascii")
// print welcome 
async function printWelcomeMessage() {
  
  const { promisify } = require('util');
  const delay = promisify((ms, func) => setTimeout(func, ms));
  console.clear();
  await genAscii.genCodeboss();
  const welcomeMessage = "Welcome to CODEBOSS! Manage all your employees.\n\tGenerate a prettified team.html output file.\n";

  for (const char of welcomeMessage) {
    process.stdout.write(char);
    await delay(25);
  }

  process.stdout.write('\n');
  await delay(500);
}

module.exports = printWelcomeMessage;