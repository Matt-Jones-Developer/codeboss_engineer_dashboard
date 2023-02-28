// define and export the Manager class

const Employee = require('./Employee')

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    // define manager 
    super(name, id, email)
    this.officeNumber = officeNumber;
  }
  // functions
  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return 'Manager';
  }
}

module.exports = Manager;
