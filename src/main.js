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
