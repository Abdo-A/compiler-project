//For console

const scannerFunction = require("./scannerFunction");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Please enter the code? ", value => {
  code = value;
  return startApp();
});

const startApp = () => {
  scannerFunction(code);
};

// const fs = require('fs');
//     let text = "";
//     readFile = () => {
//         text = fs.readFileSync('readMe.txt', 'utf8');
//         console.log(text);
//     }

//     writeFile = () => {
//         const fileText = fs.writeFileSync('readMe.txt', "text to be written");
//     }
