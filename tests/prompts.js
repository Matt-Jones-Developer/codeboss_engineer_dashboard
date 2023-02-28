// all employees

async function setName() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '📟💬 What is your full name?',
      validate: function (answer) {
        if (typeof answer !== 'string' || answer.length < 1) {
          return '❗ You must provide your full name (first and last).';
        }
        return true;
      }
    }
  ]);
  
  this.name = answer.name;
}


async function setId() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: '📟💬 What is your id number?',
      validate: function (answer) {
        if (isNaN(answer) || answer.length < 1) {
          return '❗ You must provide your id number.';
        }
        return true;
      }
    }
  ]);

  this.id = answer.id;
}

async function setEmail() {
  const answer = await inquirer.prompt([
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
    }
  ]);

  this.email = answer.email;
}
