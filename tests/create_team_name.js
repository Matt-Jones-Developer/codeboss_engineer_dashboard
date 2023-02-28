// I want to use this function to add a team name to the team array, before it is rendered to html.  
// In the generateHtml.js file, I would need to add something like ${team.teamName} within a <div>:  within here:   const generatePage = team => {
//   ${team.teamName}
//   return `
// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//   <title>My Team</title>
//   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
//       integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
//   <link rel="stylesheet" href="style.css">
//   <script src="https://kit.fontawesome.com/c502137733.js"></script>
// </head>

// <body>
//   <div class="container-fluid">
//       <div class="row">
//           <div class="col-12 jumbotron mb-3 team-heading">
//               <h1 class="text-center">My Team</h1>
//           </div>
//       </div>
//   </div>//