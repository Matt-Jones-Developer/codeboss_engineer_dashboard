const inquirer = require('inquirer');

async function myPrompt() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
  ];

  const ui = new inquirer.ui.BottomBar();

  ui.log.write('Welcome to my prompt\n');
  ui.updateBottomBar('Enter your name below\n');

  const answers = await inquirer.prompt(questions);

  ui.updateBottomBar(`Hello ${answers.name}!\n`);
}

myPrompt();
