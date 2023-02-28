if (confirm === 'yes') {
  const { name: managerName, id: managerId, email: managerEmail, officeNumber } = await createManager();
  const manager = new Manager(managerName, managerId, managerEmail, officeNumber);
  // // filter via id?
  // team = team.filter(employee => employee.id !== team.id);
  // // push it to team array
  // team.unshift(manager);
  // Find the index of the old manager in the team array
  const oldManagerIndex = team.findIndex(employee => employee instanceof Manager);

  // If the old manager is found, replace it with the updated manager
  if (oldManagerIndex !== -1) {
    team.splice(oldManagerIndex, 1, manager);
    await displayMessage("Team Manager updated successfully!", 1000);
    await displayMessage(team, 2000);
  } else {
    console.log("No manager found in the team!");
  }
} else {
  console.log('Returning to the main menu...');
}
