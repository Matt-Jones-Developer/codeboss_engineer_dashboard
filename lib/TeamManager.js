// TeamManager.js
// ICEBOX: TeamManager class that Manager inherits from 

class TeamManager {
  constructor(manager) {
    this.manager = manager;
  }

  async addTeamMember(teamMember) {
    const role = await teamMember.getRole();
    switch (role) {
      case 'Engineer':
        const { github } = await teamMember.getGithub();
        teamMember.setGithub(github);
        break;
      case 'Intern':
        const { school } = await teamMember.getSchool();
        teamMember.setSchool(school);
        break;
    }

    this.manager.team.push(teamMember);
    console.log('Team member added successfully!');
  }


  removeEmployee(employeeId) {
    this.team = this.team.filter((employee) => employee.id !== employeeId);
  }

  editEmployee(employeeId, updatedEmployee) {
    this.team = this.team.map((employee) =>
      employee.id === employeeId ? updatedEmployee : employee
    );
  }

  viewTeam() {
    this.teamManager.viewTeam();
  }

  buildTeam() {
    this.teamManager.buildTeam();
  }

  deleteTeam() {
    this.teamManager.deleteTeam();
  }
}

module.exports = TeamManager;