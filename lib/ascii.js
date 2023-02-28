// ascii art gen

var figlet = require('figlet');
const util = require('util');

// // access font list
// figlet.fonts(function(err, fonts) {
//   if (err) {
//       console.log('something went wrong...');
//       console.dir(err);
//       return;
//   }
//   console.dir(fonts);
// });

// figlet.metadata('Doom', function(err, options, headerComment) {
//   if (err) {
//       console.log('something went wrong...');
//       console.dir(err);
//       return;
//   }
//   console.dir(options);
//   console.log(headerComment);
// });

// credit to Wesley Clements (Private Tutor) for explaining and teaching me about promisify resolve/reject, err, data
const figletPromise = (text) => {
  return new Promise((resolve, reject) => {
    figlet(text, function(err, data) {
      if (err) {
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
      // console.log(data)
  });
  })
};

async function genCodeboss() {
  await figletPromise ('CODEBOSS')
}

async function genMenu() {
  await figletPromise('-MENU-')
}

async function genCreate() {
  await figletPromise('-CREATE-')
}


async function genBuild() {
  await figletPromise('-BUILD-')
}

async function genDelete() {
  await figletPromise('!DELETE!')
}


module.exports = { 
  genCodeboss, 
  genMenu,
  genCreate,
  genBuild,
  genDelete
};
