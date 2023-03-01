// How does our system work?  // How do the components fit together?

// classes:
  // unlike my previous approach, I now realise that keeping the classes bare-bone is fine 
  // Then creating constructors for each employee type is the best approach
  // classes currently pass the majority of the tests 

// Tests:
  // failed tests to solve:

    // 2 of 4 test suites fail:
      // Manager:
      // SOLVED ! (I had this.name instead of this.officeNumber (haha))
      // 1.  'can set office number via constructor arg' (officeNumber) ? (setter not found?)
        // Why is it that this fails yet github passes?? I have 2 identical class layouts, doing the same, yet 1 is failing?
      // 2. can get office number via getOffice() // we have getOfficeNumber ??


    // 3 of 17 tests failed:
      // Engineer: PASSED! 
      // PASSES!!?: 'can SET github account via constructor' (setter found)
      // SOLVED: changed name to getGithubUsername, from getGithub
      // 3. 'can get github username via getGithub() - needs a getGithub() getter


    // ALL intern tests pass?? haha
    // ALL employee tests pass OK

// functions:
  // init() - starts the program (ascii, welcome)
  // createManager() - creates a new manager if array empty
  // mainMenu() - once manager exists, show the main menu
    // menu offers:
      // create new manager (if they got fired or errors)
      // create new engineer
      // create new intern 
      // change manager - should we have a different manager at another office!
        // could generate a new array and ++ the index, or ++ a number onto the end 
      // Quit - exit program 

    // main menu functions: mainMenu()
    // createEmployee() - better than separating each employee type and easier to maintain
      // use a switch case to return a new employee instance 
      // have a 'specificInfo' argument for each role 
      // then have each employee type prompts
      // changeManager() - easily swap out to another manager ?
    // mainMenu()
      // offers each option as a menu item:
        // please select:
        // ... as drafted above 
        // switch (choice)
          // case 1; createManager()
          // case 2: createEngineer()
          // case 3: createIntern()
          // case 4: changeManager()
          // case 5: (exit) log("Goodbye!")
          // default: "invalid" ? if required
          

        // after each creation, we go back to mainMenu()

// app flow (as per our flow chart)
// 1. init()
  // init starts the app, calls the ascii and the welcome message
  // a prompt requests whether the user is a manager or not
    // if yes (bool?): && IF employee array.length < 1: (is empty):
      // then create a new manager and store it in array
    // else (they already exist in the array (look for name or ID?))
      // go straight to mainMenu()
  
  // mainMenu()
    // user picks an option
    // switch case deal with each case
    // once complete return to mainMenu


    // instantiate new employees:

      // team.push(new Manager('Betty', 1, 'test@test.com'))
      // team.push(new Engineer('Matt', 2, 'test@test.com'))
      // team.push(new Intern('Dave', 3, 'test@test.com'))

      // render to html
      // let htmlDoc = render(team)

      // for intro

      // -> welcome + logo
      // // security 
      // -> if 'isManager' 'yes'
      //   -> proof of ID (type manager ONLY)
      //   -> retry/confirm loop
      //     -> retry or exit 
      // -> else: exit 

      // // returning manager 
      // -> check for JSON 
      //   -> if no and team.length === 0:
      //     -> create manager prompt 
      //   -> else 
      //   (JSON exists)
      //     -> call welcome 'personalised manager' prompt 
