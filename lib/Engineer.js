// define and export the Engineer class
const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name, id, email, github) {
    // define engineer 
    super(name, id, email);
    this.github = github;
  }
  // class functions
  getGithubUsername() {
    
    return this.github;
  }

  getRole() {
    return 'Engineer';
  }
}

module.exports = Engineer;
