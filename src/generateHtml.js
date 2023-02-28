// generate the html page

// // const { nameTeam } = require("../lib/managerFuncs");
// const { teamName } = require("../lib/managerFuncs");

// creates the team
const generateTeam = team => {

  // create a team name
  const genTeamName = team => {
    // add a team name [TODO]
  }

  // creates the manager html
  const generateManager = manager => {
    return `
        <div class="col-lg-4 col-md-6 col-sm-12 col-12">
          <div class="card employee-card text-center">
            <div class="card-header">
              <h2 class="card-title manager">${manager.getName()}</h2>
              <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
            </div>
            <div class="card-body card-custom">
              <ul class="list-group">
                  <li class="list-group-item">ID: ${manager.getId()}</li>
                  <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                  <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
              </ul>
            </div>
          </div>
        </div>
    `;
  };

  // creates the html for engineers
  const generateEngineer = engineer => {
    return `
        <div class="col-lg-4 col-md-6 col-sm-12 col-12">
          <div class="card employee-card text-center">
            <div class="card-header">
              <h2 class="card-title engineer">${engineer.getName()}</h2>
              <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
            </div>
            <div class="card-body card-custom">
              <ul class="list-group">
                <li class="list-group-item">ID: ${engineer.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithubUsername()}" target="_blank" rel="noopener noreferrer">${engineer.getGithubUsername()}</a></li>
              </ul>
            </div>
          </div>
        </div>
    `;
  };

  // creates the html for interns
  const generateIntern = intern => {
    return `
        <div class="col-lg-4 col-md-6 col-sm-12 col-12">
          <div class="card employee-card text-center">
            <div class="card-header">
              <h2 class="card-title intern">${intern.getName()}</h2>
              <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
            </div>
            <div class="card-body card-custom">
              <ul class="list-group">
                <li class="list-group-item">ID: ${intern.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                <li class="list-group-item">School: ${intern.getSchool()}</li>
              </ul>
            </div>
          </div>
        </div>
    `;
  };

  const html = [];

  html.push(team
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => generateManager(manager))
  );
  html.push(team
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => generateEngineer(engineer))
    .join("")
  );
  html.push(team
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => generateIntern(intern))
    .join("")
  );

  console.log(team)
  return html.join("");

}

// exports function to generate entire page
// module.exports = team => {
const generatePage = team => {
  // ${team.teamName}
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>CodeBoss_team manager utility interface</title>
  <link rel="icon" type="image/x-icon" href="../src/img/terminal.png">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,600,800,900">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,800,900">
  <link rel="stylesheet" href="style.css">
  <script defer src="https://kit.fontawesome.com/6f088b358c.js" crossorigin="anonymous"></script>
</head>

<body>
  <header class="header">
  <div class="row">
    <div class="col-12 row jumbotron mb-3 team-heading justify-content-center">
      <!-- <i class="fa-solid fa-ghost fa-4x"></i> -->
      <i class="fa-solid fa-terminal fa-4x"></i>
      <h1 class="text-center">CodeBoss Team</h1>
      <i class="fa-solid fa-people-group fa-5x"></i>
    </div>
  </div>
  </header>
  <main class="main">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="team-area col-12 d-flex align-items-stretch">
          ${generateTeam(team)}
        </div>
      </div>
    </div>
  </main>
</body>
</html>
    `;
};

module.exports = generatePage;
