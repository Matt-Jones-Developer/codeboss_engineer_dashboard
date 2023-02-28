// define and export the Intern class
const Employee = require('./Employee')

class Intern extends Employee {
  constructor(name, id, email, school) {
    // define intern
    super(name, id, email)
    this.school= school;
  }

  // functions
  getSchool() {

    return this.school;
  }

  getRole() {
    return 'Intern';
  }

}



module.exports = Intern;