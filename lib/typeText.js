// a module that makes welcome and build prompts typewriter effect
// type text idea was demonstrated and inspired by Marc Hudson -  this code is my own though!

async function typeToText(str) {
  
  const { promisify } = require('util');
  const delay = promisify((ms, func) => setTimeout(func, ms));
  // console.clear();
  const fromPrompt = str;
  for (const char of fromPrompt) {
    process.stdout.write(char);
    await delay(25);
  }

  process.stdout.write('\n');
  await delay(500);
}

module.exports = typeToText;